import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Package, ShoppingCart, FileText, Users } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [stats, setStats] = useState({
    campaigns: 0,
    orders: 0,
    quotes: 0,
    pendingOrders: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      const [campaigns, orders, quotes, pending] = await Promise.all([
        supabase.from("group_campaigns").select("id", { count: "exact", head: true }),
        supabase.from("group_orders").select("id", { count: "exact", head: true }),
        supabase.from("quote_requests").select("id", { count: "exact", head: true }),
        supabase
          .from("group_orders")
          .select("id", { count: "exact", head: true })
          .eq("status", "pending"),
      ]);
      setStats({
        campaigns: campaigns.count || 0,
        orders: orders.count || 0,
        quotes: quotes.count || 0,
        pendingOrders: pending.count || 0,
      });
    }
    fetchStats();
  }, []);

  const cards = [
    { label: "Active Campaigns", value: stats.campaigns, icon: Package, color: "text-primary" },
    { label: "Total Orders", value: stats.orders, icon: ShoppingCart, color: "text-hub-green" },
    { label: "Pending Orders", value: stats.pendingOrders, icon: Users, color: "text-hub-amber" },
    { label: "Quote Requests", value: stats.quotes, icon: FileText, color: "text-muted-foreground" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-black tracking-tight mb-6">DASHBOARD</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold tracking-wider text-muted-foreground">{card.label.toUpperCase()}</span>
              <card.icon size={18} className={card.color} />
            </div>
            <p className="text-3xl font-black">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
