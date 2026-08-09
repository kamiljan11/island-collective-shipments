import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const sendNotificationSchema = z.object({
  campaign_id: z.string().uuid(),
  order_ids: z.array(z.string().uuid()).min(1).max(500),
  notification_type: z.enum(["deposit_request", "pickup_ready", "status_update", "custom"]),
  subject: z.string().min(1).max(500),
  message: z.string().min(1).max(5000),
});

export const sendBulkNotification = createServerFn({ method: "POST" })
  .inputValidator((input: z.infer<typeof sendNotificationSchema>) =>
    sendNotificationSchema.parse(input)
  )
  .handler(async ({ data }) => {
    const { createClient } = await import("@supabase/supabase-js");

    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the orders with their email addresses
    const { data: orders, error: ordersError } = await supabase
      .from("group_orders")
      .select("id, email, contact_name, company_name, quantity, deposit_amount")
      .in("id", data.order_ids);

    if (ordersError || !orders || orders.length === 0) {
      throw new Error("No orders found");
    }

    // Get campaign info for context
    const { data: campaign } = await supabase
      .from("group_campaigns")
      .select("title, currency")
      .eq("id", data.campaign_id)
      .single();

    const results: { email: string; success: boolean; error?: string }[] = [];

    for (const order of orders) {
      // Personalize the message
      const personalizedMessage = data.message
        .replace(/\{name\}/g, order.contact_name)
        .replace(/\{company\}/g, order.company_name)
        .replace(/\{quantity\}/g, String(order.quantity))
        .replace(/\{deposit\}/g, `${order.deposit_amount.toLocaleString()} ${campaign?.currency || "ISK"}`)
        .replace(/\{campaign\}/g, campaign?.title || "");

      const personalizedSubject = data.subject
        .replace(/\{campaign\}/g, campaign?.title || "")
        .replace(/\{name\}/g, order.contact_name);

      try {
        // Log the notification
        await supabase.from("notification_logs").insert({
          campaign_id: data.campaign_id,
          order_id: order.id,
          notification_type: data.notification_type,
          recipient_email: order.email,
          subject: personalizedSubject,
          message: personalizedMessage,
        });

        // Send the actual email via Lovable API
        const lovableApiKey = process.env.LOVABLE_API_KEY;
        if (lovableApiKey) {
          const emailResponse = await fetch("https://email.lovable.dev/v1/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${lovableApiKey}`,
            },
            body: JSON.stringify({
              sender_domain: "notify.flyt.is",
              from: `MAS Logistics <noreply@flyt.is>`,
              to: order.email,
              subject: personalizedSubject,
              html: buildEmailHtml(personalizedSubject, personalizedMessage, order.contact_name),
            }),
          });

          if (!emailResponse.ok) {
            const errBody = await emailResponse.text();
            console.error("Email send failed:", errBody);
            results.push({ email: order.email, success: false, error: errBody });
            continue;
          }
        }

        results.push({ email: order.email, success: true });
      } catch (err) {
        console.error("Notification error for", order.email, err);
        results.push({
          email: order.email,
          success: false,
          error: err instanceof Error ? err.message : String(err),
        });
      }
    }

    // Update order statuses if this is a deposit request
    if (data.notification_type === "deposit_request") {
      await supabase
        .from("group_orders")
        .update({ status: "approved" })
        .in("id", data.order_ids)
        .eq("status", "pending");
    }

    return {
      sent: results.filter((r) => r.success).length,
      failed: results.filter((r) => !r.success).length,
      results,
    };
  });

function buildEmailHtml(subject: string, message: string, name: string): string {
  const paragraphs = message.split("\n").filter(Boolean).map(
    (p) => `<p style="margin: 0 0 16px; color: #333333; font-size: 15px; line-height: 1.6;">${p}</p>`
  ).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 560px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e4e4e7;">
    <div style="background: #18181b; padding: 24px 32px;">
      <h1 style="margin: 0; color: #ffffff; font-size: 18px; font-weight: 800; letter-spacing: -0.025em;">
        MAS <span style="color: #f97316;">LOGISTICS</span>
      </h1>
    </div>
    <div style="padding: 32px;">
      <h2 style="margin: 0 0 20px; font-size: 20px; font-weight: 700; color: #18181b;">${subject}</h2>
      ${paragraphs}
    </div>
    <div style="padding: 20px 32px; background: #fafafa; border-top: 1px solid #e4e4e7;">
      <p style="margin: 0; font-size: 12px; color: #a1a1aa;">
        MAS Logistics (Mountain All Service ehf.) · Reykjavík, Iceland
      </p>
    </div>
  </div>
</body>
</html>`;
}
