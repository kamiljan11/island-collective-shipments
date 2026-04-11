import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ThumbsUp, Send, Lightbulb } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Idea = {
  id: string;
  title: string;
  description: string | null;
  votes: number;
  created_at: string;
};

function getVoterHash(): string {
  let hash = localStorage.getItem("mas_voter_hash");
  if (!hash) {
    hash = crypto.randomUUID();
    localStorage.setItem("mas_voter_hash", hash);
  }
  return hash;
}

export function IdeaBox() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchIdeas();
    loadVotedIds();
  }, []);

  async function fetchIdeas() {
    const { data } = await supabase
      .from("product_ideas")
      .select("id, title, description, votes, created_at")
      .in("status", ["new", "planned"])
      .order("votes", { ascending: false })
      .limit(20);
    setIdeas(data || []);
    setLoading(false);
  }

  async function loadVotedIds() {
    const hash = getVoterHash();
    const { data } = await supabase
      .from("product_idea_votes")
      .select("idea_id")
      .eq("voter_hash", hash);
    if (data) {
      setVotedIds(new Set(data.map((v) => v.idea_id)));
    }
  }

  async function handleVote(ideaId: string) {
    if (votedIds.has(ideaId)) return;

    const hash = getVoterHash();
    const { error } = await supabase
      .from("product_idea_votes")
      .insert({ idea_id: ideaId, voter_hash: hash });

    if (!error) {
      await supabase.rpc("increment_idea_votes", { idea_id: ideaId });
      setVotedIds((prev) => new Set([...prev, ideaId]));
      setIdeas((prev) =>
        prev
          .map((i) => (i.id === ideaId ? { ...i, votes: i.votes + 1 } : i))
          .sort((a, b) => b.votes - a.votes)
      );
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);

    await supabase.from("product_ideas").insert({
      title: title.trim(),
      description: description.trim() || null,
    });

    setTitle("");
    setDescription("");
    setShowForm(false);
    setSubmitting(false);
    fetchIdeas();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-20"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <Lightbulb size={20} className="text-primary" />
            What should we order next?
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Suggest a product or vote on ideas from others.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          {showForm ? "Cancel" : "+ Suggest"}
        </button>
      </div>

      {/* Submit form */}
      {showForm && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          onSubmit={handleSubmit}
          className="bg-card border border-border/60 rounded-xl p-5 mb-4 space-y-3"
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Product name — e.g. Michelin winter tires 205/55R16"
            required
            className="w-full bg-secondary/50 border border-border/60 rounded-lg px-4 py-2.5 text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Any details — brand, model, where you've seen it, why you want it... (optional)"
            className="w-full bg-secondary/50 border border-border/60 rounded-lg px-4 py-2.5 text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[70px] resize-y"
          />
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Send size={14} /> {submitting ? "Submitting..." : "Submit idea"}
          </button>
        </motion.form>
      )}

      {/* Ideas list */}
      {loading ? (
        <div className="text-sm text-muted-foreground text-center py-8">Loading ideas...</div>
      ) : ideas.length === 0 ? (
        <div className="bg-card border border-border/60 rounded-xl p-8 text-center">
          <p className="text-sm text-muted-foreground">No ideas yet. Be the first to suggest a product!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {ideas.map((idea) => {
            const hasVoted = votedIds.has(idea.id);
            return (
              <div
                key={idea.id}
                className="bg-card border border-border/60 rounded-xl px-5 py-4 flex items-start gap-4"
              >
                <button
                  onClick={() => handleVote(idea.id)}
                  disabled={hasVoted}
                  className={`flex flex-col items-center gap-0.5 pt-0.5 transition-colors ${
                    hasVoted
                      ? "text-primary cursor-default"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <ThumbsUp size={16} className={hasVoted ? "fill-primary" : ""} />
                  <span className="text-xs font-semibold">{idea.votes}</span>
                </button>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium">{idea.title}</h3>
                  {idea.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{idea.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
