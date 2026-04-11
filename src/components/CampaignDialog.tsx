import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import { submitGroupOrder } from "@/utils/orders.functions";
import { supabase } from "@/integrations/supabase/client";
import { X, Users, Shield, RotateCcw, CreditCard, CheckCircle } from "lucide-react";
import winterTiresImg from "@/assets/winter-tires-container.jpg";

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

export function CampaignDialog({
  campaign,
  onClose,
  onUpdate,
}: {
  campaign: Campaign;
  onClose: () => void;
  onUpdate: (updated: Campaign) => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const submitOrderFn = useServerFn(submitGroupOrder);

  const progress = Math.min((campaign.current_slots / campaign.target_slots) * 100, 100);
  const spotsLeft = campaign.target_slots - campaign.current_slots;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await submitOrderFn({
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
      setSubmitted(true);
      // Refresh campaign data
      const { data: updated } = await supabase
        .from("group_campaigns")
        .select("*")
        .eq("id", campaign.id)
        .single();
      if (updated) onUpdate(updated);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClasses =
    "w-full bg-secondary/50 border border-border/60 rounded-lg px-4 py-2.5 text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-colors";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-8 px-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.97 }}
          className="bg-card border border-border/60 rounded-2xl w-full max-w-lg relative"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-muted-foreground hover:text-foreground transition-colors bg-secondary/80 rounded-full p-1.5"
          >
            <X size={16} />
          </button>

          {/* Image */}
          <div className="w-full h-48 rounded-t-2xl overflow-hidden">
            <img
              src={campaign.image_url || winterTiresImg}
              alt={campaign.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6">
            {/* Title & description */}
            <h2 className="text-xl font-bold tracking-tight mb-2">{campaign.title}</h2>
            {campaign.description && (
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {campaign.description}
              </p>
            )}

            {/* Progress bar */}
            <div className="mb-5">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="flex items-center gap-1">
                  <Users size={12} className="text-primary" />
                  <span className="font-medium">{campaign.current_slots}</span>
                  <span className="text-muted-foreground">/ {campaign.target_slots} spots</span>
                </span>
                <span className={`font-medium ${spotsLeft <= 5 ? "text-destructive" : "text-muted-foreground"}`}>
                  {spotsLeft} left
                </span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                    background: progress >= 80 ? "var(--hub-green)" : "var(--primary)",
                  }}
                />
              </div>
            </div>

            {/* Price info */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-secondary/30 rounded-lg p-3 text-center">
                <p className="text-[11px] text-muted-foreground mb-0.5">Deposit / unit</p>
                <p className="text-lg font-bold text-primary">
                  {campaign.deposit_amount.toLocaleString()} {campaign.currency}
                </p>
              </div>
              {campaign.unit_price_estimate && (
                <div className="bg-secondary/30 rounded-lg p-3 text-center">
                  <p className="text-[11px] text-muted-foreground mb-0.5">Est. unit price</p>
                  <p className="text-lg font-bold">
                    {campaign.unit_price_estimate.toLocaleString()} {campaign.currency}
                  </p>
                </div>
              )}
            </div>

            {/* Trust elements */}
            <div className="space-y-2 mb-6 text-xs">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield size={13} className="text-primary shrink-0" />
                Registered Icelandic company (Mountain All Service ehf.)
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <RotateCcw size={13} className="text-primary shrink-0" />
                Full refund if target isn't reached
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CreditCard size={13} className="text-primary shrink-0" />
                Deposit deducted from final price
              </div>
            </div>

            {/* Form or success */}
            {submitted ? (
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
                <CheckCircle size={32} className="text-primary mx-auto mb-3" />
                <h3 className="text-base font-semibold mb-1">You're on the list!</h3>
                <p className="text-sm text-muted-foreground">
                  We'll email you when the order is confirmed with deposit instructions.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <h3 className="text-sm font-semibold">Join this deal</h3>
                <p className="text-xs text-muted-foreground -mt-1">
                  No payment now. We contact you when the order is confirmed.
                </p>

                {error && (
                  <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-2.5 text-xs text-destructive">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-muted-foreground block mb-1">Contact name *</label>
                    <input name="contact_name" required className={inputClasses} />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-muted-foreground block mb-1">Company *</label>
                    <input name="company_name" required className={inputClasses} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-muted-foreground block mb-1">Kennitala *</label>
                    <input name="kennitala" required className={inputClasses} />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-muted-foreground block mb-1">Quantity *</label>
                    <input name="quantity" type="number" min="1" defaultValue="1" required className={inputClasses} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-muted-foreground block mb-1">Email *</label>
                    <input name="email" type="email" required className={inputClasses} />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-muted-foreground block mb-1">Phone</label>
                    <input name="phone" className={inputClasses} />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-muted-foreground block mb-1">Notes</label>
                  <textarea name="notes" rows={2} className={`${inputClasses} resize-y`} placeholder="Specific sizes, models, preferences..." />
                </div>

                <button
                  type="submit"
                  disabled={submitting || spotsLeft <= 0 || campaign.status !== "active"}
                  className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {submitting
                    ? "Signing up..."
                    : campaign.status !== "active"
                      ? "Campaign closed"
                      : spotsLeft <= 0
                        ? "Campaign full"
                        : "Join Interest List"}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
