import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Users, ArrowRight, Shield, CreditCard, RotateCcw } from "lucide-react";
import winterTiresImg from "@/assets/winter-tires-container.jpg";
import { IdeaBox } from "@/components/IdeaBox";

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
      { title: "Bulk Deals — Save on Shipping from Europe | MAS Logistics" },
      { name: "description", content: "Join a group order and split container shipping from Europe to Iceland. Small deposit, big savings. Full refund if the target isn't reached." },
      { property: "og:title", content: "Bulk Deals — MAS Logistics" },
      { property: "og:description", content: "Pool orders with others, fill a container, save up to 40% on freight." },
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
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-[640px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <p className="text-xs text-primary tracking-widest mb-4">BULK DEALS</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Split the container.
            <br />
            <span className="text-primary">Keep the savings.</span>
          </h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
            We find products with high demand, organize a group order, and ship by container. You reserve a spot with a small deposit — when enough people join, we ship and everyone pays less.
          </p>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3 mb-12"
        >
          {[
            { icon: Shield, label: "Secure deposits", sub: "Registered Icelandic company" },
            { icon: RotateCcw, label: "Full refund", sub: "If target isn't reached" },
            { icon: CreditCard, label: "Small deposit", sub: "Deducted from final price" },
          ].map((badge) => (
            <div key={badge.label} className="bg-card border border-border/60 rounded-xl p-4 text-center">
              <badge.icon size={18} className="mx-auto mb-2 text-primary" />
              <p className="text-xs font-medium">{badge.label}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{badge.sub}</p>
            </div>
          ))}
        </motion.div>

        {/* Campaigns */}
        {loading ? (
          <div className="text-center py-20 text-muted-foreground text-sm">Loading deals...</div>
        ) : campaigns.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card border border-border/60 rounded-xl p-12 text-center"
          >
            <div className="text-4xl mb-4">📦</div>
            <h2 className="text-lg font-semibold mb-2">No active deals right now</h2>
            <p className="text-sm text-muted-foreground mb-6">
              We're preparing the next group order. In the meantime, you can use our import service to get anything from Europe.
            </p>
            <Link to="/import" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
              Use Import Service <ArrowRight size={14} />
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
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
          <h2 className="text-xl font-bold tracking-tight mb-8 text-center">
            How it works
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { num: "1", title: "We post a deal", desc: "A product with demand + a target number of orders." },
              { num: "2", title: "You reserve a spot", desc: "Small deposit to lock in your place. No further commitment." },
              { num: "3", title: "Target reached", desc: "We place the order. If not enough people join — full refund." },
              { num: "4", title: "Delivery", desc: "Pay the remainder, receive your goods + a VAT invoice." },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center mx-auto mb-3">
                  {step.num}
                </div>
                <h3 className="text-xs font-semibold mb-1">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Idea Box */}
        <IdeaBox />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-card border border-border/60 rounded-xl p-8 text-center"
        >
          <h2 className="text-lg font-bold mb-2">Need something specific?</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-5">
            Don't see what you're looking for? Send us a product link from any European store — we'll buy it and ship it to you.
          </p>
          <Link
            to="/import"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Import Service <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
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
        className="block bg-card border border-border/60 rounded-xl overflow-hidden hover:border-primary/30 transition-colors group"
      >
        <div className="flex gap-4 p-5">
          <div className="w-24 h-24 rounded-lg bg-secondary overflow-hidden shrink-0">
            <img
              src={campaign.image_url || winterTiresImg}
              alt={campaign.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                {campaign.title}
              </h3>
              <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-0.5" />
            </div>

            {campaign.description && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{campaign.description}</p>
            )}

            <div className="mt-3">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="flex items-center gap-1">
                  <Users size={12} className="text-primary" />
                  <span className="font-medium">{campaign.current_slots}</span>
                  <span className="text-muted-foreground">/ {campaign.target_slots}</span>
                </span>
                <span className="text-muted-foreground">{spotsLeft} left</span>
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

            <div className="flex items-center gap-3 mt-2 text-xs">
              <span className="text-primary font-medium">
                Deposit: {campaign.deposit_amount.toLocaleString()} {campaign.currency}
              </span>
              {campaign.unit_price_estimate && (
                <span className="text-muted-foreground">
                  ~{campaign.unit_price_estimate.toLocaleString()} {campaign.currency}/unit
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
