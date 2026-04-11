import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ChevronDown } from "lucide-react";

type Quote = {
  id: string;
  form_type: string;
  priority: string;
  content: string;
  estimated_value: string | null;
  weight_info: string | null;
  company_name: string;
  kennitala: string;
  email: string;
  status: string;
  created_at: string;
};

export const Route = createFileRoute("/admin/quotes")({
  component: AdminQuotes,
});

function AdminQuotes() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchQuotes = async () => {
    const { data } = await supabase
      .from("quote_requests")
      .select("*")
      .order("created_at", { ascending: false });
    setQuotes(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("quote_requests").update({ status }).eq("id", id);
    fetchQuotes();
  };

  const statusColors: Record<string, string> = {
    new: "bg-primary/20 text-primary",
    reviewed: "bg-hub-amber/20 text-hub-amber",
    quoted: "bg-hub-green/20 text-hub-green",
    closed: "bg-muted text-muted-foreground",
  };

  return (
    <div>
      <h1 className="text-2xl font-black tracking-tight mb-6">QUOTE REQUESTS</h1>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : quotes.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <p className="text-muted-foreground">No quote requests yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {quotes.map((q) => (
            <div key={q.id} className="bg-card border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === q.id ? null : q.id)}
                className="w-full flex items-center gap-4 px-4 py-3 text-left hover:bg-secondary/30 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-semibold text-sm">{q.company_name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${statusColors[q.status] || "bg-secondary text-secondary-foreground"}`}>
                      {q.status}
                    </span>
                    <span className="text-xs text-muted-foreground">{q.form_type} • {q.priority}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 truncate">{q.content}</p>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-muted-foreground transition-transform ${expanded === q.id ? "rotate-180" : ""}`}
                />
              </button>

              {expanded === q.id && (
                <div className="px-4 pb-4 pt-1 border-t border-border space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-xs text-muted-foreground">Email</span>
                      <p>{q.email}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Kennitala</span>
                      <p>{q.kennitala}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Estimated Value</span>
                      <p>{q.estimated_value || "—"}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Weight Info</span>
                      <p>{q.weight_info || "—"}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-xs text-muted-foreground">Content</span>
                      <p className="whitespace-pre-wrap">{q.content}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2 border-t border-border">
                    <label className="text-xs font-semibold text-muted-foreground">STATUS:</label>
                    <select
                      value={q.status}
                      onChange={(e) => updateStatus(q.id, e.target.value)}
                      className="bg-input border border-border rounded-md px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="new">New</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="quoted">Quoted</option>
                      <option value="closed">Closed</option>
                    </select>
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
