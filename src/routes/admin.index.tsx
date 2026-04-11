import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Package,
  ShoppingCart,
  FileText,
  Lightbulb,
  TrendingUp,
  Clock,
  CheckCircle2,
  Truck,
} from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

type RecentItem = {
  type: "order" | "quote" | "idea";
  title: string;
  subtitle: string;
  date: string;
  status: string;
};

function AdminDashboard() {
  const [stats, setStats] = useState({
    activeCampaigns: 0,
    totalOrders: 0,
    pendingOrders: 0,
    depositsPaid: 0,
    totalQuotes: 0,
    newQuotes: 0,
    doorDeliveryQuotes: 0,
    totalIdeas: 0,
    totalVotes: 0,
    totalRevenue: 0,
  });
  const [recent, setRecent] = useState<RecentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      const [campaigns, orders, quotes, ideas] = await Promise.all([
        supabase.from("group_campaigns").select("*"),
        supabase.from("group_orders").select("*").order("created_at", { ascending: false }),
        supabase.from("quote_requests").select("*").order("created_at", { ascending: false }),
        supabase.from("product_ideas").select("*").order("created_at", { ascending: false }),
      ]);

      const allOrders = orders.data || [];
      const allQuotes = quotes.data || [];
      const allIdeas = ideas.data || [];
      const allCampaigns = campaigns.data || [];
      const activeCampaigns = allCampaigns.filter((c) => c.status === "active" || c.status === "funded");

      const depositsPaid = allOrders.filter((o) => o.deposit_paid);
      const totalRevenue = depositsPaid.reduce((s, o) => s + (o.deposit_amount || 0), 0);

      setStats({
        activeCampaigns: activeCampaigns.length,
        totalOrders: allOrders.length,
        pendingOrders: allOrders.filter((o) => o.status === "pending").length,
        depositsPaid: depositsPaid.length,
        totalQuotes: allQuotes.length,
        newQuotes: allQuotes.filter((q) => q.status === "new").length,
        doorDeliveryQuotes: allQuotes.filter((q) => q.delivery_to_door).length,
        totalIdeas: allIdeas.length,
        totalVotes: allIdeas.reduce((s, i) => s + (i.votes || 0), 0),
        totalRevenue,
      });

      // Build recent activity feed (last 10 items across all types)
      const recentItems: RecentItem[] = [];

      const campaignMap = new Map(allCampaigns.map((c) => [c.id, c.title]));

      allOrders.slice(0, 5).forEach((o) => {
        recentItems.push({
          type: "order",
          title: `${o.contact_name} — ${o.company_name}`,
          subtitle: `${campaignMap.get(o.campaign_id) || "Unknown"} × ${o.quantity}`,
          date: o.created_at,
          status: o.status,
        });
      });

      allQuotes.slice(0, 5).forEach((q) => {
        recentItems.push({
          type: "quote",
          title: q.company_name,
          subtitle: q.content.slice(0, 60) + (q.content.length > 60 ? "…" : ""),
          date: q.created_at,
          status: q.status,
        });
      });

      allIdeas.slice(0, 3).forEach((i) => {
        recentItems.push({
          type: "idea",
          title: i.title,
          subtitle: `${i.votes} votes`,
          date: i.created_at,
          status: i.status,
        });
      });

      recentItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setRecent(recentItems.slice(0, 10));
      setLoading(false);
    }
    fetchAll();
  }, []);

  const cards = [
    { label: "Active Campaigns", value: stats.activeCampaigns, icon: Package, color: "text-primary", link: "/admin/campaigns" as const },
    { label: "Total Orders", value: stats.totalOrders, icon: ShoppingCart, color: "text-hub-green", link: "/admin/orders" as const },
    { label: "Pending Orders", value: stats.pendingOrders, icon: Clock, color: "text-hub-amber", link: "/admin/orders" as const },
    { label: "Deposits Paid", value: stats.depositsPaid, icon: CheckCircle2, color: "text-hub-green", link: "/admin/orders" as const },
    { label: "Quote Requests", value: stats.totalQuotes, icon: FileText, color: "text-muted-foreground", link: "/admin/quotes" as const },
    { label: "New Quotes", value: stats.newQuotes, icon: FileText, color: "text-primary", link: "/admin/quotes" as const },
    { label: "Product Ideas", value: stats.totalIdeas, icon: Lightbulb, color: "text-hub-amber", link: "/admin/ideas" as const },
    { label: "Total Votes", value: stats.totalVotes, icon: TrendingUp, color: "text-chart-2", link: "/admin/ideas" as const },
  ];

  const typeIcons: Record<string, typeof Package> = {
    order: ShoppingCart,
    quote: FileText,
    idea: Lightbulb,
  };

  const typeColors: Record<string, string> = {
    order: "text-hub-green",
    quote: "text-primary",
    idea: "text-hub-amber",
  };

  const statusBadgeColors: Record<string, string> = {
    pending: "bg-hub-amber/20 text-hub-amber",
    approved: "bg-primary/20 text-primary",
    deposit_paid: "bg-hub-green/20 text-hub-green",
    new: "bg-primary/20 text-primary",
    reviewed: "bg-hub-amber/20 text-hub-amber",
    quoted: "bg-hub-green/20 text-hub-green",
    planned: "bg-chart-2/20 text-chart-2",
    launched: "bg-hub-green/20 text-hub-green",
  };

  if (loading) {
    return <p className="text-muted-foreground">Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-black tracking-tight mb-6">DASHBOARD</h1>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.link}
            className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-colors group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold tracking-wider text-muted-foreground">
                {card.label.toUpperCase()}
              </span>
              <card.icon size={16} className={card.color} />
            </div>
            <p className="text-2xl font-black">{card.value}</p>
          </Link>
        ))}
      </div>

      {/* Revenue + Door delivery row */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-hub-green" />
            <span className="text-xs font-semibold tracking-wider text-muted-foreground">DEPOSITS COLLECTED</span>
          </div>
          <p className="text-3xl font-black">{stats.totalRevenue.toLocaleString()} <span className="text-lg text-muted-foreground">ISK</span></p>
          <p className="text-xs text-muted-foreground mt-1">from {stats.depositsPaid} paid deposits</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Truck size={16} className="text-chart-2" />
            <span className="text-xs font-semibold tracking-wider text-muted-foreground">DOOR DELIVERY REQUESTS</span>
          </div>
          <p className="text-3xl font-black">{stats.doorDeliveryQuotes}</p>
          <p className="text-xs text-muted-foreground mt-1">out of {stats.totalQuotes} quote requests</p>
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <h2 className="text-sm font-bold tracking-wider">RECENT ACTIVITY</h2>
        </div>
        {recent.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground text-sm">No activity yet.</div>
        ) : (
          <div className="divide-y divide-border">
            {recent.map((item, i) => {
              const Icon = typeIcons[item.type] || Package;
              return (
                <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors">
                  <Icon size={16} className={typeColors[item.type]} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.subtitle}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusBadgeColors[item.status] || "bg-secondary text-secondary-foreground"}`}>
                    {item.status}
                  </span>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
