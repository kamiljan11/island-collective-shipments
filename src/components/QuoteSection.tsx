import { motion } from "framer-motion";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitQuoteRequest } from "@/utils/orders.functions";

export function QuoteSection() {
  const [formType, setFormType] = useState<"links" | "sourcing">("links");
  const [priority, setPriority] = useState<"standard" | "urgent">("standard");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const submitFn = useServerFn(submitQuoteRequest);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await submitFn({
        data: {
          form_type: formType,
          priority,
          content: formData.get("content") as string,
          estimated_value: (formData.get("estimated_value") as string) || undefined,
          weight_info: (formData.get("weight_info") as string) || undefined,
          company_name: formData.get("company_name") as string,
          kennitala: formData.get("kennitala") as string,
          email: formData.get("email") as string,
        },
      });
      setSubmitted(true);
    } catch (err) {
      setError("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="quote" className="py-24 px-4 bg-secondary/20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-card border border-hub-green/30 rounded-xl p-12">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-2">Quote Request Sent!</h2>
            <p className="text-muted-foreground">
              We'll respond within 24 business hours with a detailed quote.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="py-24 px-4 bg-secondary/20">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">
            REQUEST <span className="text-primary">QUOTE</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Our team will respond with a quote within 24 business hours.
          </p>

          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 sm:p-8 space-y-6">
            {error && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-md p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Type toggle */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setFormType("links")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${formType === "links" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
              >
                I have Links
              </button>
              <button
                type="button"
                onClick={() => setFormType("sourcing")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${formType === "sourcing" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
              >
                Sourcing Request
              </button>
            </div>

            {/* Priority */}
            <div>
              <label className="text-xs font-semibold tracking-wider text-muted-foreground block mb-2">
                SHIPPING PRIORITY
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPriority("standard")}
                  className={`flex-1 px-4 py-3 rounded-md text-sm transition-colors border ${priority === "standard" ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground"}`}
                >
                  <span className="font-semibold block">Freight (STD)</span>
                  <span className="text-xs">14-Day Cycle</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPriority("urgent")}
                  className={`flex-1 px-4 py-3 rounded-md text-sm transition-colors border ${priority === "urgent" ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground"}`}
                >
                  <span className="font-semibold block">Urgent Air</span>
                  <span className="text-xs">3-5 Day Express</span>
                </button>
              </div>
            </div>

            {/* Fields */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold tracking-wider text-muted-foreground block mb-1.5">
                  {formType === "links" ? "SUPPLIER LINK / CATALOG ITEM *" : "WHAT DO YOU NEED? *"}
                </label>
                <textarea
                  name="content"
                  required
                  className="w-full bg-input border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px] resize-y"
                  placeholder={formType === "links" ? "Paste links to products or describe what you need..." : "Describe the items, brands, specifications..."}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold tracking-wider text-muted-foreground block mb-1.5">EST. TOTAL VALUE</label>
                  <input name="estimated_value" className="w-full bg-input border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="€0" />
                </div>
                <div>
                  <label className="text-xs font-semibold tracking-wider text-muted-foreground block mb-1.5">WEIGHT/PALLETS</label>
                  <input name="weight_info" className="w-full bg-input border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="e.g. 200kg / 1 pallet" />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold tracking-wider text-muted-foreground block mb-1.5">COMPANY NAME *</label>
                <input name="company_name" required className="w-full bg-input border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold tracking-wider text-muted-foreground block mb-1.5">KENNITALA *</label>
                  <input name="kennitala" required className="w-full bg-input border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="text-xs font-semibold tracking-wider text-muted-foreground block mb-1.5">EMAIL ADDRESS *</label>
                  <input name="email" type="email" required className="w-full bg-input border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Quote Request"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
