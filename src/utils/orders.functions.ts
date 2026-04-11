import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const quoteSchema = z.object({
  form_type: z.enum(["links", "sourcing"]),
  priority: z.enum(["standard", "urgent"]),
  content: z.string().min(1).max(5000),
  estimated_value: z.string().max(100).optional(),
  weight_info: z.string().max(200).optional(),
  company_name: z.string().min(1).max(255),
  kennitala: z.string().min(1).max(20),
  email: z.string().email().max(255),
});

export const submitQuoteRequest = createServerFn({ method: "POST" })
  .inputValidator((input: z.infer<typeof quoteSchema>) => quoteSchema.parse(input))
  .handler(async ({ data }) => {
    const { createClient } = await import("@supabase/supabase-js");

    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase.from("quote_requests").insert({
      form_type: data.form_type,
      priority: data.priority,
      content: data.content,
      estimated_value: data.estimated_value || null,
      weight_info: data.weight_info || null,
      company_name: data.company_name,
      kennitala: data.kennitala,
      email: data.email,
    });

    if (error) {
      console.error("Quote request error:", error);
      throw new Error("Failed to submit quote request");
    }

    return { success: true };
  });

const groupOrderSchema = z.object({
  campaign_id: z.string().uuid(),
  company_name: z.string().min(1).max(255),
  kennitala: z.string().min(1).max(20),
  email: z.string().email().max(255),
  phone: z.string().max(20).optional(),
  contact_name: z.string().min(1).max(255),
  quantity: z.number().min(1).max(1000),
  notes: z.string().max(2000).optional(),
});

export const submitGroupOrder = createServerFn({ method: "POST" })
  .inputValidator((input: z.infer<typeof groupOrderSchema>) => groupOrderSchema.parse(input))
  .handler(async ({ data }) => {
    const { createClient } = await import("@supabase/supabase-js");

    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get campaign to check deposit amount
    const { data: campaign, error: campaignError } = await supabase
      .from("group_campaigns")
      .select("deposit_amount, target_slots, current_slots, status")
      .eq("id", data.campaign_id)
      .single();

    if (campaignError || !campaign) {
      throw new Error("Campaign not found");
    }

    if (campaign.status !== "active") {
      throw new Error("Campaign is no longer accepting orders");
    }

    if (campaign.current_slots >= campaign.target_slots) {
      throw new Error("Campaign is full");
    }

    // Insert the order
    const { error: orderError } = await supabase.from("group_orders").insert({
      campaign_id: data.campaign_id,
      company_name: data.company_name,
      kennitala: data.kennitala,
      email: data.email,
      phone: data.phone || null,
      contact_name: data.contact_name,
      quantity: data.quantity,
      deposit_amount: campaign.deposit_amount * data.quantity,
      notes: data.notes || null,
    });

    if (orderError) {
      console.error("Group order error:", orderError);
      throw new Error("Failed to submit order");
    }

    // Increment campaign slots
    await supabase.rpc("increment_campaign_slots", {
      campaign_id: data.campaign_id,
      amount: data.quantity,
    });

    return {
      success: true,
      deposit_amount: campaign.deposit_amount * data.quantity,
      currency: "ISK",
    };
  });
