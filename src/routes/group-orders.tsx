import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Users, Clock, ArrowRight, Shield, CreditCard, RotateCcw, Link2 } from "lucide-react";
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

export const Route = createFileRoute("/group-orders")({
  head: () => ({
    meta: [
      { title: "Group Orders — MAS Logistics" },
      { name: "description", content: "Join group orders to save on bulk shipping from Europe to Iceland. Container shipments with small deposits." },
      { property: "og:title", content: "Group Orders — MAS Logistics" },
      { property: "og:description", content: "Join group orders to save on bulk shipping from Europe to Iceland." },
    ],
  }),
  component: GroupOrdersPage,
});

function GroupOrdersPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCampaigns() {
      const { data } = await supabase
        .from("group_campaigns")
        .select("*")
        .in("status", ["active", "funded"])
        .order("created_at", { ascending: false });
      setCampaigns(data || []);
      setLoading(false);
    }
    fetchCampaigns();
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-1.5 mb-6">
            <span className="text-primary text-xs">●</span>
            <span className="text-xs tracking-wider text-muted-foreground">
              BULK PURCHASING • SAVE ON FREIGHT
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            GROUP <span className="text-primary">ORDERS</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We organize container shipments for specific products. Reserve your spot with a small deposit — when enough people join, we ship the container and everyone saves.
          </p>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid sm:grid-cols-3 gap-4 mb-12"
        >
          <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
            <Shield size={20} className="text-hub-green shrink-0" />
            <div>
              <p className="text-sm font-semibold">Secure Deposits</p>
              <p className="text-xs text-muted-foreground">Mountain All Service ehf. (KT visible)</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
            <RotateCcw size={20} className="text-primary shrink-0" />
            <div>
              <p className="text-sm font-semibold">Full Refund Guarantee</p>
              <p className="text-xs text-muted-foreground">If container doesn't reach target</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
            <CreditCard size={20} className="text-hub-amber shrink-0" />
            <div>
              <p className="text-sm font-semibold">Small Deposit</p>
              <p className="text-xs text-muted-foreground">Deposit deducted from final price</p>
            </div>
          </div>
        </motion.div>

        {/* Campaigns */}
        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading campaigns...</div>
        ) : campaigns.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card border border-border rounded-xl p-12 text-center"
          >
            <div className="text-5xl mb-4">📦</div>
            <h2 className="text-xl font-bold mb-2">No Active Campaigns</h2>
            <p className="text-muted-foreground mb-6">
              We're planning our next group order. Check back soon or contact us to suggest products!
            </p>
            <Link to="/import" className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold inline-flex items-center gap-2 hover:bg-primary/90">
              Use Our Import Service <ArrowRight size={18} />
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {campaigns.map((campaign, i) => (
              <CampaignCard key={campaign.id} campaign={campaign} index={i} />
            ))}
          </div>
        )}

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h2 className="text-2xl font-black tracking-tight mb-8 text-center">
            HOW GROUP ORDERS <span className="text-primary">WORK</span>
          </h2>
          <div className="grid sm:grid-cols-4 gap-6">
            {[
              { num: "01", title: "We Post a Campaign", desc: "We identify a product with demand and set a target number of orders." },
              { num: "02", title: "You Reserve Your Spot", desc: "Pay a small deposit to secure your place. Deposit is deducted from final price." },
              { num: "03", title: "Target Reached", desc: "When enough people join, we order the container. If not — full refund." },
              { num: "04", title: "Delivery", desc: "Container arrives in Iceland. You pay the remainder and receive your goods + VAT invoice." },
            ].map((step) => (
              <div key={step.num} className="relative">
                <span className="text-5xl font-black text-primary/15 absolute -top-1 -left-1">{step.num}</span>
                <div className="pt-10">
                  <h3 className="font-bold text-sm mb-1">{step.title}</h3>
                  <p className="text-xs text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cross-sell to import service */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-secondary/50 border border-border rounded-xl p-8 sm:p-12 text-center"
        >
          <Link2 size={32} className="mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-black tracking-tight mb-2">
            NEED SOMETHING SPECIFIC?
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto mb-6">
            Can't find what you need in our bulk deals? Send us a link from any European store — 
            we'll buy it, ship it, and deliver it to you.
          </p>
          <Link
            to="/import"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-bold text-sm tracking-wider hover:bg-primary/90 transition-colors"
          >
            USE IMPORT SERVICE <ArrowRight size={16} />
          </Link>
        </motion.div>
    </div>
  );
}

function CampaignCard({ campaign, index }: { campaign: Campaign; index: number }) {
  const progress = Math.min((campaign.current_slots / campaign.target_slots) * 100, 100);
  const spotsLeft = campaign.target_slots - campaign.current_slots;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        to="/group-orders/$campaignId"
        params={{ campaignId: campaign.id }}
        className="block bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-colors group"
      >
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            {/* Image */}
            <div className="w-full sm:w-48 h-48 sm:h-40 rounded-lg bg-secondary overflow-hidden shrink-0">
              <img
                src={campaign.image_url || winterTiresImg}
                alt={campaign.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {campaign.title}
                  </h3>
                  {campaign.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {campaign.description}
                    </p>
                  )}
                </div>
                <ArrowRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
              </div>

              {/* Progress bar */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="flex items-center gap-1.5">
                    <Users size={14} className="text-primary" />
                    <span className="font-semibold">{campaign.current_slots}</span>
                    <span className="text-muted-foreground">/ {campaign.target_slots} spots</span>
                  </span>
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Clock size={14} />
                    {spotsLeft} left
                  </span>
                </div>
                <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${progress}%`,
                      background: progress >= 80 ? 'var(--hub-green)' : 'var(--primary)',
                    }}
                  />
                </div>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold">
                  Deposit: {campaign.deposit_amount.toLocaleString()} {campaign.currency}
                </span>
                {campaign.unit_price_estimate && (
                  <span className="text-muted-foreground">
                    Est. unit price: {campaign.unit_price_estimate.toLocaleString()} {campaign.currency}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
