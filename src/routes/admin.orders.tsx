import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ChevronDown, Users, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

type Order = {
  id: string;
  campaign_id: string;
  company_name: string;
  contact_name: string;
  kennitala: string;
  email: string;
  phone: string | null;
  quantity: number;
  deposit_amount: number;
  deposit_paid: boolean;
  status: string;
  notes: string | null;
  payment_reference: string | null;
  created_at: string;
  campaign_title?: string;
};

type CampaignInfo = {
  id: string;
  title: string;
  target_slots: number;
  internal_target_slots: number | null;
  current_slots: number;
};

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
});

const ORDER_STATUSES = [
  { value: "pending", label: "Pending", description: "Waiting for review" },
  { value: "approved", label: "Approved", description: "Deposit requested" },
  { value: "deposit_paid", label: "Deposit Paid", description: "Payment confirmed" },
  { value: "ordered", label: "Ordered", description: "Container ordered" },
  { value: "shipped", label: "Shipped", description: "In transit to Iceland" },
  { value: "delivered", label: "Delivered", description: "Received by customer" },
  { value: "cancelled", label: "Cancelled", description: "Order cancelled" },
];

function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [campaigns, setCampaigns] = useState<CampaignInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCampaign, setFilterCampaign] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const fetchData = async () => {
    const [ordersRes, campaignsRes] = await Promise.all([
      supabase.from("group_orders").select("*").order("created_at", { ascending: false }),
      supabase.from("group_campaigns").select("id, title, target_slots, internal_target_slots, current_slots"),
    ]);

    const campaignMap = new Map(
      (campaignsRes.data || []).map((c) => [c.id, c.title])
    );

    setOrders(
      (ordersRes.data || []).map((o) => ({
        ...o,
        campaign_title: campaignMap.get(o.campaign_id) || "Unknown",
      }))
    );
    setCampaigns(campaignsRes.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (orderId: string, newStatus: string) => {
    await supabase.from("group_orders").update({ status: newStatus }).eq("id", orderId);
    fetchData();
  };

  const toggleDepositPaid = async (orderId: string, paid: boolean) => {
    await supabase
      .from("group_orders")
      .update({ deposit_paid: paid, status: paid ? "deposit_paid" : "approved" })
      .eq("id", orderId);
    fetchData();
  };

  const filtered = orders.filter((o) => {
    if (filterCampaign !== "all" && o.campaign_id !== filterCampaign) return false;
    if (filterStatus !== "all" && o.status !== filterStatus) return false;
    return true;
  });

  // Compute stats for selected campaign
  const selectedCampaign = filterCampaign !== "all"
    ? campaigns.find((c) => c.id === filterCampaign)
    : null;

  const campaignOrders = filterCampaign !== "all"
    ? orders.filter((o) => o.campaign_id === filterCampaign)
    : orders;

  const stats = {
    total: campaignOrders.length,
    totalQty: campaignOrders.reduce((s, o) => s + o.quantity, 0),
    pending: campaignOrders.filter((o) => o.status === "pending").length,
    approved: campaignOrders.filter((o) => o.status === "approved").length,
    depositPaid: campaignOrders.filter((o) => o.deposit_paid).length,
    cancelled: campaignOrders.filter((o) => o.status === "cancelled").length,
  };

  const conversionRate = stats.total > 0
    ? Math.round((stats.depositPaid / stats.total) * 100)
    : 0;

  const statusColors: Record<string, string> = {
    pending: "bg-hub-amber/20 text-hub-amber",
    approved: "bg-primary/20 text-primary",
    deposit_paid: "bg-hub-green/20 text-hub-green",
    ordered: "bg-chart-2/20 text-chart-2",
    shipped: "bg-chart-2/20 text-chart-2",
    delivered: "bg-hub-green/20 text-hub-green",
    cancelled: "bg-destructive/20 text-destructive",
  };

  return (
    <div>
      <h1 className="text-2xl font-black tracking-tight mb-6">ORDERS</h1>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
        <div className="bg-card border border-border rounded-lg p-3">
          <p className="text-[10px] font-semibold tracking-wider text-muted-foreground">SIGN-UPS</p>
          <p className="text-2xl font-black">{stats.total}</p>
          <p className="text-xs text-muted-foreground">{stats.totalQty} units total</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <p className="text-[10px] font-semibold tracking-wider text-muted-foreground">PENDING</p>
          <p className="text-2xl font-black text-hub-amber">{stats.pending}</p>
          <p className="text-xs text-muted-foreground">awaiting review</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <p className="text-[10px] font-semibold tracking-wider text-muted-foreground">DEPOSIT PAID</p>
          <p className="text-2xl font-black text-hub-green">{stats.depositPaid}</p>
          <p className="text-xs text-muted-foreground">confirmed</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <p className="text-[10px] font-semibold tracking-wider text-muted-foreground">CANCELLED</p>
          <p className="text-2xl font-black text-destructive">{stats.cancelled}</p>
          <p className="text-xs text-muted-foreground">drop-offs</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <p className="text-[10px] font-semibold tracking-wider text-muted-foreground">CONVERSION</p>
          <p className="text-2xl font-black">{conversionRate}%</p>
          <p className="text-xs text-muted-foreground">sign-up → paid</p>
        </div>
        {selectedCampaign && (
          <div className="bg-hub-amber/5 border border-hub-amber/20 rounded-lg p-3">
            <p className="text-[10px] font-semibold tracking-wider text-hub-amber flex items-center gap-1">
              <AlertTriangle size={10} /> INT. TARGET
            </p>
            <p className="text-2xl font-black text-hub-amber">
              {stats.depositPaid}/{selectedCampaign.internal_target_slots || selectedCampaign.target_slots}
            </p>
            <p className="text-xs text-muted-foreground">
              public: {selectedCampaign.current_slots}/{selectedCampaign.target_slots}
            </p>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={filterCampaign}
          onChange={(e) => setFilterCampaign(e.target.value)}
          className="bg-input border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="all">All Campaigns</option>
          {campaigns.map((c) => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-input border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="all">All Statuses</option>
          {ORDER_STATUSES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>

        <span className="text-sm text-muted-foreground self-center ml-auto">
          {filtered.length} order{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <p className="text-muted-foreground">No orders found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => (
            <div key={order.id} className="bg-card border border-border rounded-xl overflow-hidden">
              {/* Summary row */}
              <button
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                className="w-full flex items-center gap-4 px-4 py-3 text-left hover:bg-secondary/30 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-semibold text-sm">{order.contact_name}</span>
                    <span className="text-xs text-muted-foreground">{order.company_name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${statusColors[order.status] || "bg-secondary text-secondary-foreground"}`}>
                      {order.status}
                    </span>
                    {order.deposit_paid && (
                      <CheckCircle2 size={14} className="text-hub-green" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span>{order.campaign_title}</span>
                    <span>×{order.quantity}</span>
                    <span>{new Date(order.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-muted-foreground transition-transform ${expandedOrder === order.id ? "rotate-180" : ""}`}
                />
              </button>

              {/* Expanded details */}
              {expandedOrder === order.id && (
                <div className="px-4 pb-4 pt-1 border-t border-border space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-xs text-muted-foreground">Email</span>
                      <p>{order.email}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Phone</span>
                      <p>{order.phone || "—"}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Kennitala</span>
                      <p>{order.kennitala}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Deposit</span>
                      <p className="font-semibold">
                        {order.deposit_amount.toLocaleString()} ISK
                        {order.deposit_paid && (
                          <span className="text-hub-green ml-2 text-xs">✓ PAID</span>
                        )}
                      </p>
                    </div>
                    {order.notes && (
                      <div className="sm:col-span-2">
                        <span className="text-xs text-muted-foreground">Notes</span>
                        <p className="text-muted-foreground">{order.notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border">
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-semibold text-muted-foreground">STATUS:</label>
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className="bg-input border border-border rounded-md px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        {ORDER_STATUSES.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={() => toggleDepositPaid(order.id, !order.deposit_paid)}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold ${
                        order.deposit_paid
                          ? "bg-hub-green/20 text-hub-green"
                          : "bg-primary text-primary-foreground hover:bg-primary/90"
                      }`}
                    >
                      {order.deposit_paid ? "✓ Deposit Paid" : "Mark Deposit Paid"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
