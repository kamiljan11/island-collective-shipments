import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useServerFn } from "@tanstack/react-start";
import { submitGroupOrder } from "@/utils/orders.functions";
import { Users, Clock, Shield, RotateCcw, CreditCard, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

type Campaign = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  deposit_amount: number;
  currency: string;
  target_slots: number;
  current_slots: number;
  unit_price_estimate: number | null;
  status: string;
  starts_at: string;
  ends_at: string | null;
};

export const Route = createFileRoute("/group-orders/$campaignId")({
  head: () => ({
    meta: [
      { title: "Join Campaign — MAS Logistics" },
      { name: "description", content: "Reserve your spot in this group order with a small deposit." },
    ],
  }),
  component: CampaignDetailPage,
});

function CampaignDetailPage() {
  const { campaignId } = Route.useParams();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [depositInfo, setDepositInfo] = useState<{ amount: number; currency: string } | null>(null);

  const submitOrderFn = useServerFn(submitGroupOrder);

  useEffect(() => {
    async function fetchCampaign() {
      const { data } = await supabase
        .from("group_campaigns")
        .select("*")
        .eq("id", campaignId)
        .single();
      setCampaign(data);
      setLoading(false);
    }
    fetchCampaign();
  }, [campaignId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!campaign) return;
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const result = await submitOrderFn({
        data: {
          campaign_id: campaign.id,
          company_name: formData.get("company_name") as string,
          kennitala: formData.get("kennitala") as string,
          email: formData.get("email") as string,
          phone: (formData.get("phone") as string) || undefined,
          contact_name: formData.get("contact_name") as string,
          quantity: parseInt(formData.get("quantity") as string) || 1,
          notes: (formData.get("notes") as string) || undefined,
        },
      });
      setDepositInfo({ amount: result.deposit_amount, currency: result.currency });
      setSubmitted(true);
      // Refresh campaign data
      const { data: updated } = await supabase
        .from("group_campaigns")
        .select("*")
        .eq("id", campaignId)
        .single();
      if (updated) setCampaign(updated);
    } catch (err: any) {
      setError(err.message || "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-16 px-4 flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen pt-28 pb-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Campaign Not Found</h1>
          <Link to="/group-orders" className="text-primary hover:underline">
            ← Back to Group Orders
          </Link>
        </div>
      </div>
    );
  }

  const progress = Math.min((campaign.current_slots / campaign.target_slots) * 100, 100);
  const spotsLeft = campaign.target_slots - campaign.current_slots;

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/group-orders"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft size={16} /> Back to Group Orders
        </Link>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Campaign info — left */}
          <div className="lg:col-span-3">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {campaign.image_url && (
                <div className="w-full h-48 sm:h-64 rounded-xl bg-secondary overflow-hidden mb-6">
                  <img src={campaign.image_url} alt={campaign.title} className="w-full h-full object-cover" />
                </div>
              )}

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
                {campaign.title}
              </h1>

              {campaign.description && (
                <p className="text-muted-foreground text-lg mb-6">{campaign.description}</p>
              )}

              {/* Flow explanation */}
              <div className="bg-secondary/50 border border-border rounded-xl p-5 mb-6">
                <h3 className="text-sm font-bold mb-3">HOW IT WORKS</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-black text-xs mt-0.5">1</span>
                    <span className="text-muted-foreground">Sign up to the interest list — <strong className="text-foreground">no payment yet</strong></span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-black text-xs mt-0.5">2</span>
                    <span className="text-muted-foreground">When we confirm the order, we'll ask for a <strong className="text-foreground">50% deposit</strong></span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-black text-xs mt-0.5">3</span>
                    <span className="text-muted-foreground">Container ships → you pay remainder and receive goods + VAT invoice</span>
                  </div>
                </div>
              </div>
              {/* Progress */}
              <div className="bg-card border border-border rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="flex items-center gap-2">
                    <Users size={16} className="text-primary" />
                    <span className="font-bold text-lg">{campaign.current_slots}</span>
                    <span className="text-muted-foreground">/ {campaign.target_slots} spots filled</span>
                  </span>
                  <span className={`font-semibold ${spotsLeft <= 5 ? "text-destructive" : "text-muted-foreground"}`}>
                    {spotsLeft} left
                  </span>
                </div>
                <div className="h-4 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${progress}%`,
                      background: progress >= 80 ? 'var(--hub-green)' : 'var(--primary)',
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Container ships when target is reached. Your deposit is fully refundable if target isn't met.
                </p>
              </div>

              {/* Details */}
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-card border border-border rounded-xl p-4">
                  <p className="text-xs text-muted-foreground mb-1">DEPOSIT PER UNIT</p>
                  <p className="text-2xl font-black text-primary">
                    {campaign.deposit_amount.toLocaleString()} {campaign.currency}
                  </p>
                </div>
                {campaign.unit_price_estimate && (
                  <div className="bg-card border border-border rounded-xl p-4">
                    <p className="text-xs text-muted-foreground mb-1">EST. UNIT PRICE</p>
                    <p className="text-2xl font-black">
                      {campaign.unit_price_estimate.toLocaleString()} {campaign.currency}
                    </p>
                    <p className="text-xs text-muted-foreground">Deposit deducted from this</p>
                  </div>
                )}
              </div>

              {/* Trust elements */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Shield size={16} className="text-hub-green shrink-0" />
                  <span>Mountain All Service ehf. — registered Icelandic company</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <RotateCcw size={16} className="text-primary shrink-0" />
                  <span>100% deposit refund if container target not reached</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CreditCard size={16} className="text-hub-amber shrink-0" />
                  <span>Deposit deducted from final price — you never pay extra</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Signup form — right */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-28"
            >
              {submitted ? (
                <div className="bg-card border border-hub-green/30 rounded-xl p-8 text-center">
                  <CheckCircle size={48} className="text-hub-green mx-auto mb-4" />
                  <h2 className="text-xl font-bold mb-2">You're on the list!</h2>
                  <p className="text-muted-foreground text-sm mb-4">
                    We've added you to the interest list. When we confirm the order, we'll email you with deposit payment instructions (50%).
                  </p>
                  <p className="text-xs text-muted-foreground">
                    No payment required now. We'll be in touch!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 space-y-4">
                  <h2 className="text-lg font-bold">Join Interest List</h2>
                  <p className="text-xs text-muted-foreground -mt-2">No payment required now. We'll contact you when we're ready to proceed.</p>

                  {error && (
                    <div className="bg-destructive/10 border border-destructive/30 rounded-md p-3 text-sm text-destructive">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-semibold tracking-wider text-muted-foreground block mb-1">CONTACT NAME *</label>
                    <input name="contact_name" required className="w-full bg-input border border-border rounded-md px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>

                  <div>
                    <label className="text-xs font-semibold tracking-wider text-muted-foreground block mb-1">COMPANY NAME *</label>
                    <input name="company_name" required className="w-full bg-input border border-border rounded-md px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>

                  <div>
                    <label className="text-xs font-semibold tracking-wider text-muted-foreground block mb-1">KENNITALA *</label>
                    <input name="kennitala" required className="w-full bg-input border border-border rounded-md px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>

                  <div>
                    <label className="text-xs font-semibold tracking-wider text-muted-foreground block mb-1">EMAIL *</label>
                    <input name="email" type="email" required className="w-full bg-input border border-border rounded-md px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>

                  <div>
                    <label className="text-xs font-semibold tracking-wider text-muted-foreground block mb-1">PHONE</label>
                    <input name="phone" className="w-full bg-input border border-border rounded-md px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>

                  <div>
                    <label className="text-xs font-semibold tracking-wider text-muted-foreground block mb-1">QUANTITY *</label>
                    <input name="quantity" type="number" min="1" defaultValue="1" required className="w-full bg-input border border-border rounded-md px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>

                  <div>
                    <label className="text-xs font-semibold tracking-wider text-muted-foreground block mb-1">NOTES</label>
                    <textarea name="notes" rows={3} className="w-full bg-input border border-border rounded-md px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y" placeholder="Specific sizes, models, preferences..." />
                  </div>

                  <div className="bg-secondary rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground">Deposit per unit</p>
                    <p className="text-xl font-black text-primary">
                      {campaign.deposit_amount.toLocaleString()} {campaign.currency}
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting || spotsLeft <= 0}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {submitting ? "Reserving..." : spotsLeft <= 0 ? "Campaign Full" : "Reserve My Spot"}
                  </button>

                  <p className="text-[11px] text-muted-foreground text-center">
                    By reserving, you agree to pay the deposit. Full refund if target isn't reached.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
