import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Users, ArrowRight, Clock, Package } from "lucide-react";
import { motion } from "framer-motion";
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

export function GroupOrdersPreview() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from("group_campaigns")
        .select("*")
        .in("status", ["active", "funded"])
        .order("created_at", { ascending: false })
        .limit(3);
      setCampaigns(data || []);
      setLoading(false);
    }
    fetch();
  }, []);

  return (
    <section id="group-orders" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-block bg-hub-green/10 text-hub-green text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-sm mb-4">
              SERVICE 2 — GROUP ORDERS
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.05]">
              BULK DEALS.
              <br />
              <span className="text-primary">BETTER PRICES.</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mt-4 text-base leading-relaxed">
              We organize container shipments for specific products. Join the interest list — no payment until we confirm the order. Everyone saves on bulk freight.
            </p>
          </div>
          <Link
            to="/group-orders"
            className="inline-flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase hover:underline shrink-0"
          >
            VIEW ALL CAMPAIGNS <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* How it works mini */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-3 gap-4 mb-12"
        >
          {[
            { num: "1", text: "Join the interest list — no payment" },
            { num: "2", text: "We confirm → you pay 50% deposit" },
            { num: "3", text: "Container ships → pay remainder, receive goods + VAT invoice" },
          ].map((step) => (
            <div key={step.num} className="bg-card border border-border rounded-xl p-4 flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xs shrink-0">
                {step.num}
              </span>
              <p className="text-sm text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </motion.div>

        {/* Campaign cards */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground text-sm">Loading campaigns...</div>
        ) : campaigns.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-xl p-12 text-center"
          >
            <Package size={40} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-bold mb-2">No Active Campaigns Yet</h3>
            <p className="text-muted-foreground text-sm mb-6">
              We're preparing our next group order. Check back soon or request a custom quote!
            </p>
            <a
              href="#quote"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-md font-semibold text-sm hover:bg-primary/90"
            >
              Request a Quote <ArrowRight size={16} />
            </a>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign, i) => {
              const progress = Math.min((campaign.current_slots / campaign.target_slots) * 100, 100);
              const spotsLeft = campaign.target_slots - campaign.current_slots;

              return (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to="/group-orders/$campaignId"
                    params={{ campaignId: campaign.id }}
                    className="block bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-colors group h-full"
                  >
                    {campaign.image_url && (
                      <div className="h-40 bg-secondary overflow-hidden">
                        <img
                          src={campaign.image_url}
                          alt={campaign.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="font-bold text-base group-hover:text-primary transition-colors mb-1">
                        {campaign.title}
                      </h3>
                      {campaign.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                          {campaign.description}
                        </p>
                      )}

                      {/* Progress */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="flex items-center gap-1">
                            <Users size={12} className="text-primary" />
                            <span className="font-semibold">{campaign.current_slots}</span>
                            <span className="text-muted-foreground">/ {campaign.target_slots}</span>
                          </span>
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Clock size={12} />
                            {spotsLeft} left
                          </span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${progress}%`,
                              background: progress >= 80 ? 'var(--hub-green)' : 'var(--primary)',
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">
                          Deposit: {campaign.deposit_amount.toLocaleString()} {campaign.currency}
                        </span>
                        <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
