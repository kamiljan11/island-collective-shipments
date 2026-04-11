import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Users, ArrowRight, Clock, Package, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import { submitQuoteRequest } from "@/utils/orders.functions";
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
};

export function HubSection() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from("group_campaigns")
        .select("*")
        .in("status", ["active", "funded"])
        .order("created_at", { ascending: false })
        .limit(4);
      setCampaigns(data || []);
      setLoading(false);
    }
    fetch();
  }, []);

  return (
    <section id="hub" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-2 rounded-full bg-hub-green animate-pulse" />
          <span className="text-xs font-bold tracking-widest text-muted-foreground">LIVE HUB</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* LEFT — Active Campaigns (3 cols) */}
          <div className="lg:col-span-3">
            <div className="flex items-end justify-between mb-4">
              <div>
                <h2 className="text-2xl font-black tracking-tight">
                  BULK <span className="text-primary">DEALS</span>
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Join an open campaign — no payment until confirmed
                </p>
              </div>
              <Link
                to="/group-orders"
                className="text-xs font-bold tracking-widest text-primary hover:underline flex items-center gap-1 shrink-0"
              >
                ALL <ArrowRight size={12} />
              </Link>
            </div>

            {loading ? (
              <div className="bg-card border border-border rounded-xl p-12 text-center text-muted-foreground text-sm">
                Loading...
              </div>
            ) : campaigns.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-12 text-center">
                <Package size={32} className="mx-auto mb-3 text-muted-foreground" />
                <p className="font-bold mb-1">No Active Deals</p>
                <p className="text-sm text-muted-foreground mb-4">
                  We're preparing the next container. Check back soon!
                </p>
                <a href="#hub-quote" className="text-primary text-sm font-semibold hover:underline">
                  Request a custom quote instead →
                </a>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {campaigns.map((campaign, i) => {
                  const progress = Math.min((campaign.current_slots / campaign.target_slots) * 100, 100);
                  const spotsLeft = campaign.target_slots - campaign.current_slots;

                  return (
                    <motion.div
                      key={campaign.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <Link
                        to="/group-orders/$campaignId"
                        params={{ campaignId: campaign.id }}
                        className="block bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-colors group h-full"
                      >
                        <div className="h-32 bg-secondary overflow-hidden">
                          <img
                            src={campaign.image_url || winterTiresImg}
                            alt={campaign.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-sm group-hover:text-primary transition-colors mb-2 line-clamp-1">
                            {campaign.title}
                          </h3>

                          {/* Progress */}
                          <div className="mb-2">
                            <div className="flex items-center justify-between text-[11px] mb-1">
                              <span className="flex items-center gap-1">
                                <Users size={10} className="text-primary" />
                                <span className="font-semibold">{campaign.current_slots}</span>
                                <span className="text-muted-foreground">/ {campaign.target_slots}</span>
                              </span>
                              <span className="text-muted-foreground">
                                {spotsLeft} left
                              </span>
                            </div>
                            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                  width: `${progress}%`,
                                  background: progress >= 80 ? 'var(--hub-green)' : 'var(--primary)',
                                }}
                              />
                            </div>
                          </div>

                          <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">
                            Deposit: {campaign.deposit_amount.toLocaleString()} {campaign.currency}
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT — Quick Quote (2 cols) */}
          <div className="lg:col-span-2" id="hub-quote">
            <QuickQuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickQuoteForm() {
  const [formType, setFormType] = useState<"links" | "sourcing">("links");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const submitFn = useServerFn(submitQuoteRequest);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    try {
      await submitFn({
        data: {
          form_type: formType,
          priority: "standard",
          content: fd.get("content") as string,
          estimated_value: (fd.get("estimated_value") as string) || undefined,
          company_name: fd.get("company_name") as string,
          kennitala: fd.get("kennitala") as string,
          email: fd.get("email") as string,
        },
      });
      setSubmitted(true);
    } catch {
      setError("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-full">
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight">
            CUSTOM <span className="text-primary">QUOTE</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Need something specific? We'll source it.
          </p>
        </div>
      </div>

      {submitted ? (
        <div className="bg-card border border-hub-green/30 rounded-xl p-8 text-center">
          <div className="text-4xl mb-3">✅</div>
          <h3 className="font-bold text-lg mb-1">Quote Sent!</h3>
          <p className="text-sm text-muted-foreground">
            We'll respond within 24 business hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-5 space-y-3">
          {error && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-md p-2 text-xs text-destructive">
              {error}
            </div>
          )}

          {/* Type toggle */}
          <div className="grid grid-cols-2 gap-0 text-center">
            <button
              type="button"
              onClick={() => setFormType("links")}
              className={`py-2 text-[11px] font-bold tracking-wider rounded-l-md transition-colors ${formType === "links" ? "bg-foreground text-background" : "bg-secondary text-muted-foreground"}`}
            >
              I HAVE LINKS
            </button>
            <button
              type="button"
              onClick={() => setFormType("sourcing")}
              className={`py-2 text-[11px] font-bold tracking-wider rounded-r-md transition-colors ${formType === "sourcing" ? "bg-foreground text-background" : "bg-secondary text-muted-foreground"}`}
            >
              FIND IT FOR ME
            </button>
          </div>

          <div>
            <label className="text-[10px] font-semibold tracking-wider text-muted-foreground block mb-1">
              {formType === "links" ? "PRODUCT LINK / DETAILS *" : "WHAT DO YOU NEED? *"}
            </label>
            <textarea
              name="content"
              required
              rows={3}
              className="w-full bg-input border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
              placeholder={formType === "links" ? "https://supplier.eu/product..." : "Brand, model, specs..."}
            />
          </div>

          <div>
            <label className="text-[10px] font-semibold tracking-wider text-muted-foreground block mb-1">EST. VALUE</label>
            <input
              name="estimated_value"
              className="w-full bg-input border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="e.g. 2,000 EUR"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-semibold tracking-wider text-muted-foreground block mb-1">COMPANY *</label>
              <input name="company_name" required className="w-full bg-input border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="text-[10px] font-semibold tracking-wider text-muted-foreground block mb-1">KENNITALA *</label>
              <input name="kennitala" required className="w-full bg-input border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-semibold tracking-wider text-muted-foreground block mb-1">EMAIL *</label>
            <input name="email" type="email" required className="w-full bg-input border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="you@company.is" />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary text-primary-foreground py-2.5 rounded-md font-semibold text-sm tracking-wider flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Send size={14} />
            {submitting ? "SENDING..." : "SEND QUOTE REQUEST"}
          </button>

          <p className="text-[10px] text-muted-foreground text-center">
            Response within 24h • Full customs clearance • ISK VAT invoice
          </p>
        </form>
      )}
    </div>
  );
}
