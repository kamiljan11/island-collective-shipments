import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ChevronDown, Trash2, ThumbsUp, ArrowUpDown } from "lucide-react";

type Idea = {
  id: string;
  title: string;
  description: string | null;
  email: string | null;
  votes: number;
  status: string;
  created_at: string;
};

export const Route = createFileRoute("/admin/ideas")({
  component: AdminIdeas,
});

const IDEA_STATUSES = [
  { value: "new", label: "New" },
  { value: "reviewed", label: "Reviewed" },
  { value: "planned", label: "Planned" },
  { value: "launched", label: "Launched" },
  { value: "rejected", label: "Rejected" },
];

function AdminIdeas() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState<"votes" | "date">("date");

  const fetchIdeas = async () => {
    const { data } = await supabase
      .from("product_ideas")
      .select("*")
      .order(sortBy === "votes" ? "votes" : "created_at", { ascending: false });
    setIdeas(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchIdeas();
  }, [sortBy]);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("product_ideas").update({ status }).eq("id", id);
    fetchIdeas();
  };

  const deleteIdea = async (id: string) => {
    if (!confirm("Delete this idea and all its votes?")) return;
    await supabase.from("product_idea_votes").delete().eq("idea_id", id);
    await supabase.from("product_ideas").delete().eq("id", id);
    fetchIdeas();
  };

  const filtered = ideas.filter((i) => {
    if (filterStatus !== "all" && i.status !== filterStatus) return false;
    return true;
  });

  const stats = {
    total: ideas.length,
    new: ideas.filter((i) => i.status === "new").length,
    planned: ideas.filter((i) => i.status === "planned").length,
    totalVotes: ideas.reduce((s, i) => s + i.votes, 0),
  };

  const statusColors: Record<string, string> = {
    new: "bg-primary/20 text-primary",
    reviewed: "bg-hub-amber/20 text-hub-amber",
    planned: "bg-chart-2/20 text-chart-2",
    launched: "bg-hub-green/20 text-hub-green",
    rejected: "bg-destructive/20 text-destructive",
  };

  return (
    <div>
      <h1 className="text-2xl font-black tracking-tight mb-6">PRODUCT IDEAS</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-card border border-border rounded-lg p-3">
          <p className="text-[10px] font-semibold tracking-wider text-muted-foreground">TOTAL IDEAS</p>
          <p className="text-2xl font-black">{stats.total}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <p className="text-[10px] font-semibold tracking-wider text-muted-foreground">NEW</p>
          <p className="text-2xl font-black text-primary">{stats.new}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <p className="text-[10px] font-semibold tracking-wider text-muted-foreground">PLANNED</p>
          <p className="text-2xl font-black text-chart-2">{stats.planned}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <p className="text-[10px] font-semibold tracking-wider text-muted-foreground">TOTAL VOTES</p>
          <p className="text-2xl font-black">{stats.totalVotes}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-input border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="all">All Statuses</option>
          {IDEA_STATUSES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>

        <button
          onClick={() => setSortBy(sortBy === "votes" ? "date" : "votes")}
          className="flex items-center gap-2 bg-input border border-border rounded-md px-3 py-2 text-sm hover:bg-secondary transition-colors"
        >
          <ArrowUpDown size={14} />
          Sort by {sortBy === "votes" ? "votes" : "date"}
        </button>

        <span className="text-sm text-muted-foreground self-center ml-auto">
          {filtered.length} idea{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <p className="text-muted-foreground">No product ideas yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((idea) => (
            <div key={idea.id} className="bg-card border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === idea.id ? null : idea.id)}
                className="w-full flex items-center gap-4 px-4 py-3 text-left hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ThumbsUp size={14} />
                  <span className="text-sm font-bold min-w-[2ch] text-center">{idea.votes}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-semibold text-sm">{idea.title}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${statusColors[idea.status] || "bg-secondary text-secondary-foreground"}`}>
                      {idea.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {idea.email || "Anonymous"} • {new Date(idea.created_at).toLocaleDateString()}
                  </p>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-muted-foreground transition-transform ${expanded === idea.id ? "rotate-180" : ""}`}
                />
              </button>

              {expanded === idea.id && (
                <div className="px-4 pb-4 pt-1 border-t border-border space-y-4">
                  {idea.description && (
                    <div className="text-sm">
                      <span className="text-xs text-muted-foreground">Description</span>
                      <p className="whitespace-pre-wrap mt-1">{idea.description}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border">
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-semibold text-muted-foreground">STATUS:</label>
                      <select
                        value={idea.status}
                        onChange={(e) => updateStatus(idea.id, e.target.value)}
                        className="bg-input border border-border rounded-md px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        {IDEA_STATUSES.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={() => deleteIdea(idea.id)}
                      className="ml-auto p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 size={14} />
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
