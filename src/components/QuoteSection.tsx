import { motion } from "framer-motion";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitQuoteRequest } from "@/utils/orders.functions";
import { Link2, Search, ShoppingCart, MessageSquare, Package, FileCheck } from "lucide-react";

const steps = [
  { icon: Link2, title: "Send us a link or description", desc: "Paste a product URL from any European store — or just tell us what you need." },
  { icon: MessageSquare, title: "We quote you", desc: "Product cost + shipping + our service fee. No surprises, no hidden charges." },
  { icon: ShoppingCart, title: "We buy & ship", desc: "We purchase, consolidate at our Poland hub, and ship by container to Iceland." },
  { icon: FileCheck, title: "You receive it", desc: "Delivered to your door with a valid Icelandic VAT invoice for your bookkeeping." },
];

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
      <section id="custom-order" className="py-24 px-4 bg-secondary/30 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-card border border-border rounded-xl p-12">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-2">Request Sent!</h2>
            <p className="text-muted-foreground">
              We'll get back to you within 24 hours with a full quote — product price, shipping, and our fee.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="custom-order" className="py-24 px-4 bg-secondary/30 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block bg-secondary text-secondary-foreground text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-sm mb-6">
              NEED SOMETHING FROM EUROPE?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              SEND US A LINK. <span className="text-primary">WE HANDLE THE REST.</span>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
              Found a product in a European store that doesn't ship to Iceland? 
              Or need us to find something specific? We buy it, ship it, and deliver it to you with a valid VAT invoice.
            </p>
          </div>

          {/* How it works steps */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary mb-3">
                  <step.icon size={18} />
                </div>
                <h3 className="text-xs font-bold tracking-wider uppercase mb-1">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto">
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
                    <Link2 size={14} /> I HAVE A LINK
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormType("sourcing")}
                    className={`py-3 text-sm font-bold tracking-wider transition-colors rounded-r-md flex items-center justify-center gap-2 ${formType === "sourcing" ? "bg-foreground text-background" : "bg-secondary text-muted-foreground"}`}
                  >
                    <Search size={14} /> FIND IT FOR ME
                  </button>
                </div>

                {/* Main input */}
                <div>
                  <label className="text-xs font-bold tracking-widest text-muted-foreground block mb-1.5">
                    {formType === "links" ? "PRODUCT LINK *" : "WHAT DO YOU NEED? *"}
                  </label>
                  <textarea
                    name="content"
                    required
                    className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px] resize-y"
                    placeholder={formType === "links" ? "Paste the product URL here — e.g. amazon.de/dp/..." : "Describe the product — brand, model, specs, quantity..."}
                  />
                </div>

                {/* Shipping speed */}
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
                      <span className="font-bold block">CONTAINER</span>
                      <span className="text-xs text-muted-foreground">~14 DAYS</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPriority("urgent")}
                      className={`px-4 py-4 rounded-md text-sm transition-colors border-2 ${priority === "urgent" ? "border-primary bg-card" : "border-border text-muted-foreground"}`}
                    >
                      <span className="font-bold block text-primary">AIR FREIGHT</span>
                      <span className="text-xs text-muted-foreground">3-5 DAYS</span>
                    </button>
                  </div>
                </div>

                {/* Optional details */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold tracking-widest text-muted-foreground block mb-1.5">EST. VALUE</label>
                    <input name="estimated_value" className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="e.g. 2,000 EUR" />
                  </div>
                  <div>
                    <label className="text-xs font-bold tracking-widest text-muted-foreground block mb-1.5">WEIGHT / SIZE</label>
                    <input name="weight_info" className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="e.g. 2 pallets, 500 kg" />
                  </div>
                </div>

                {/* Company info */}
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

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary text-primary-foreground py-4 rounded-md font-bold text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {submitting ? "SENDING..." : "GET A QUOTE"}
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  We'll reply within 24 hours with a full breakdown: product cost + shipping + service fee.
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
