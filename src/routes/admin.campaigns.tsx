import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Edit2, Trash2 } from "lucide-react";

type Campaign = {
  id: string;
  title: string;
  description: string | null;
  deposit_amount: number;
  currency: string;
  target_slots: number;
  current_slots: number;
  unit_price_estimate: number | null;
  status: string;
  image_url: string | null;
  starts_at: string;
  ends_at: string | null;
  created_at: string;
};

export const Route = createFileRoute("/admin/campaigns")({
  component: AdminCampaigns,
});

function AdminCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Campaign | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchCampaigns = async () => {
    const { data } = await supabase
      .from("group_campaigns")
      .select("*")
      .order("created_at", { ascending: false });
    setCampaigns(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      title: fd.get("title") as string,
      description: (fd.get("description") as string) || null,
      deposit_amount: parseFloat(fd.get("deposit_amount") as string) || 0,
      target_slots: parseInt(fd.get("target_slots") as string) || 50,
      unit_price_estimate: fd.get("unit_price_estimate")
        ? parseFloat(fd.get("unit_price_estimate") as string)
        : null,
      image_url: (fd.get("image_url") as string) || null,
      status: fd.get("status") as string,
    };

    if (editing) {
      await supabase.from("group_campaigns").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("group_campaigns").insert(payload);
    }

    setShowForm(false);
    setEditing(null);
    setSaving(false);
    fetchCampaigns();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this campaign?")) return;
    await supabase.from("group_campaigns").delete().eq("id", id);
    fetchCampaigns();
  };

  const statusColors: Record<string, string> = {
    active: "bg-hub-green/20 text-hub-green",
    funded: "bg-primary/20 text-primary",
    closed: "bg-muted text-muted-foreground",
    draft: "bg-secondary text-secondary-foreground",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black tracking-tight">CAMPAIGNS</h1>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 hover:bg-primary/90"
        >
          <Plus size={16} /> New Campaign
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-background/80 z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleSave}
            className="bg-card border border-border rounded-xl p-6 w-full max-w-lg space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-lg font-bold">{editing ? "Edit" : "New"} Campaign</h2>

            <div>
              <label className="text-xs font-semibold tracking-wider text-muted-foreground block mb-1">TITLE *</label>
              <input name="title" required defaultValue={editing?.title || ""} className="w-full bg-input border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>

            <div>
              <label className="text-xs font-semibold tracking-wider text-muted-foreground block mb-1">DESCRIPTION</label>
              <textarea name="description" rows={3} defaultValue={editing?.description || ""} className="w-full bg-input border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold tracking-wider text-muted-foreground block mb-1">DEPOSIT (ISK) *</label>
                <input name="deposit_amount" type="number" step="1" required defaultValue={editing?.deposit_amount || ""} className="w-full bg-input border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div>
                <label className="text-xs font-semibold tracking-wider text-muted-foreground block mb-1">TARGET SLOTS *</label>
                <input name="target_slots" type="number" required defaultValue={editing?.target_slots || 50} className="w-full bg-input border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold tracking-wider text-muted-foreground block mb-1">EST. UNIT PRICE (ISK)</label>
              <input name="unit_price_estimate" type="number" step="1" defaultValue={editing?.unit_price_estimate || ""} className="w-full bg-input border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>

            <div>
              <label className="text-xs font-semibold tracking-wider text-muted-foreground block mb-1">IMAGE URL</label>
              <input name="image_url" defaultValue={editing?.image_url || ""} className="w-full bg-input border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>

            <div>
              <label className="text-xs font-semibold tracking-wider text-muted-foreground block mb-1">STATUS</label>
              <select name="status" defaultValue={editing?.status || "active"} className="w-full bg-input border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="funded">Funded</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-md font-semibold text-sm hover:bg-primary/90 disabled:opacity-50">
                {saving ? "Saving..." : "Save"}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="px-4 py-2.5 rounded-md text-sm font-semibold border border-border hover:bg-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : campaigns.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <p className="text-muted-foreground">No campaigns yet. Create your first one!</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-4 py-3 font-semibold text-xs tracking-wider text-muted-foreground">TITLE</th>
                  <th className="px-4 py-3 font-semibold text-xs tracking-wider text-muted-foreground">STATUS</th>
                  <th className="px-4 py-3 font-semibold text-xs tracking-wider text-muted-foreground">SLOTS</th>
                  <th className="px-4 py-3 font-semibold text-xs tracking-wider text-muted-foreground">DEPOSIT</th>
                  <th className="px-4 py-3 font-semibold text-xs tracking-wider text-muted-foreground">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr key={c.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                    <td className="px-4 py-3 font-medium">{c.title}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[c.status] || "bg-secondary text-secondary-foreground"}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{c.current_slots}/{c.target_slots}</td>
                    <td className="px-4 py-3">{c.deposit_amount.toLocaleString()} {c.currency}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { setEditing(c); setShowForm(true); }}
                          className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
