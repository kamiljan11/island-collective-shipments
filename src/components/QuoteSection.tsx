import { motion } from "framer-motion";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitQuoteRequest } from "@/utils/orders.functions";
import { Search, Package } from "lucide-react";

export function QuoteSection() {
  const [formType, setFormType] = useState<"links" | "sourcing">("sourcing");
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
      <section id="custom-order" className="py-24 px-4 bg-secondary/30 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-card border border-border rounded-xl p-12">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-2">Request Sent!</h2>
            <p className="text-muted-foreground">
              We'll get back to you within 24 business hours with pricing and availability.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="custom-order" className="py-24 px-4 bg-secondary/30 border-t border-border">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-10">
            <span className="inline-block bg-secondary text-secondary-foreground text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-sm mb-6">
              CAN'T FIND WHAT YOU NEED?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              CUSTOM <span className="text-primary">SOURCING</span>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-sm leading-relaxed">
              Need a specific product from Europe? We'll find it, buy it, and ship it to you. 
              Send us a link or describe what you need — we handle the rest.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-destructive/10 border border-destructive/30 rounded-md p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              {/* Type toggle */}
              <div className="grid grid-cols-2 gap-0">
                <button
                  type="button"
                  onClick={() => setFormType("links")}
                  className={`py-3 text-sm font-bold tracking-wider transition-colors rounded-l-md flex items-center justify-center gap-2 ${formType === "links" ? "bg-foreground text-background" : "bg-secondary text-muted-foreground"}`}
                >
                  <Package size={14} /> I HAVE A LINK
                </button>
                <button
                  type="button"
                  onClick={() => setFormType("sourcing")}
                  className={`py-3 text-sm font-bold tracking-wider transition-colors rounded-r-md flex items-center justify-center gap-2 ${formType === "sourcing" ? "bg-foreground text-background" : "bg-secondary text-muted-foreground"}`}
                >
                  <Search size={14} /> FIND IT FOR ME
                </button>
              </div>

              {/* Priority */}
              <div>
                <label className="text-xs font-bold tracking-widest text-muted-foreground block mb-2">
                  SHIPPING SPEED
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPriority("standard")}
                    className={`px-4 py-4 rounded-md text-sm transition-colors border-2 ${priority === "standard" ? "border-foreground bg-card" : "border-border text-muted-foreground"}`}
                  >
                    <span className="font-bold block">FREIGHT (STD)</span>
                    <span className="text-xs text-muted-foreground">14-DAY CYCLE</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPriority("urgent")}
                    className={`px-4 py-4 rounded-md text-sm transition-colors border-2 ${priority === "urgent" ? "border-primary bg-card" : "border-border text-muted-foreground"}`}
                  >
                    <span className="font-bold block text-primary">URGENT AIR</span>
                    <span className="text-xs text-muted-foreground">3-5 DAY EXPRESS</span>
                  </button>
                </div>
              </div>

              {/* Fields */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold tracking-widest text-muted-foreground block mb-1.5">
                    {formType === "links" ? "PRODUCT LINK / CATALOG REFERENCE *" : "WHAT ARE YOU LOOKING FOR? *"}
                  </label>
                  <textarea
                    name="content"
                    required
                    className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px] resize-y"
                    placeholder={formType === "links" ? "Paste the product URL here..." : "Describe the product — brand, model, specs, quantity..."}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold tracking-widest text-muted-foreground block mb-1.5">EST. VALUE</label>
                    <input name="estimated_value" className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="e.g. 2000 EUR" />
                  </div>
                  <div>
                    <label className="text-xs font-bold tracking-widest text-muted-foreground block mb-1.5">WEIGHT / SIZE</label>
                    <input name="weight_info" className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="e.g. 2 Pallets" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold tracking-widest text-muted-foreground block mb-1.5">COMPANY NAME *</label>
                    <input name="company_name" required className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="text-xs font-bold tracking-widest text-muted-foreground block mb-1.5">KENNITALA *</label>
                    <input name="kennitala" required className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold tracking-widest text-muted-foreground block mb-1.5">EMAIL *</label>
                  <input name="email" type="email" required className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="purchasing@yourcompany.is" />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-primary-foreground py-4 rounded-md font-bold text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {submitting ? "SUBMITTING..." : "SEND REQUEST"}
              </button>

              <p className="text-xs text-muted-foreground text-center">
                We'll respond within 24 hours with pricing, availability, and shipping options.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
