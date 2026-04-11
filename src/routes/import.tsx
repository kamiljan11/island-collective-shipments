import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Link2, MessageSquare, ShoppingCart, FileCheck, Search, Package } from "lucide-react";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitQuoteRequest } from "@/utils/orders.functions";

export const Route = createFileRoute("/import")({
  head: () => ({
    meta: [
      { title: "Import Service — MAS Logistics" },
      { name: "description", content: "Send us a link from any European store. We buy, ship, and deliver to Iceland with customs clearance and VAT invoice." },
      { property: "og:title", content: "Import Service — Buy Anything from Europe" },
      { property: "og:description", content: "We buy products from European stores and ship them to Iceland for you." },
    ],
  }),
  component: ImportPage,
});

const steps = [
  { icon: Link2, title: "Send us a link", desc: "Paste a product URL from any European store — or describe what you need." },
  { icon: MessageSquare, title: "We quote you", desc: "Product cost + shipping + service fee. No hidden charges." },
  { icon: ShoppingCart, title: "We buy & ship", desc: "We purchase, receive at our hub, and ship to Iceland." },
  { icon: FileCheck, title: "You receive it", desc: "Delivered with a valid Icelandic VAT invoice." },
];

const faqs = [
  { q: "What stores can you buy from?", a: "Any European online or physical store — Amazon.de, Zalando, specialist retailers, industrial suppliers. If they sell it in Europe, we can get it." },
  { q: "How much do you charge?", a: "We quote each order individually: product cost + shipping + a transparent service fee. No hidden charges. You approve the full price before we buy." },
  { q: "How long does it take?", a: "Standard container shipping takes about 14 days. For urgent items, we offer air freight in 3-5 days." },
  { q: "Do I get a VAT invoice?", a: "Yes — businesses receive a valid Icelandic VAT invoice from Mountain All Service ehf, simplifying your bookkeeping and VAT reclamation." },
  { q: "What if the store doesn't ship to Iceland?", a: "That's exactly why we exist. We buy using our European address and handle all the forwarding, customs, and delivery." },
];

function ImportPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-28 pb-12 px-6">
        <div className="max-w-[640px] mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs text-primary tracking-widest mb-4">IMPORT SERVICE</p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Send us a link.
              <br />
              <span className="text-primary">We handle the rest.</span>
            </h1>
            <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
              Found a product in a European store that doesn't ship to Iceland? 
              We buy it, ship it, and deliver it to you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="pb-16 px-6">
        <div className="max-w-[640px] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary mb-3">
                  <step.icon size={18} />
                </div>
                <h3 className="text-xs font-semibold mb-1">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-16 px-6 border-t border-border/30">
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-bold tracking-tight text-center mb-8">
              Get a <span className="text-primary">quote</span>
            </h2>
            <ImportForm />
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6">
        <div className="max-w-lg mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-bold tracking-tight mb-8 text-center"
          >
            Import <span className="text-primary">FAQ</span>
          </motion.h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Cross-sell */}
      <section className="py-16 px-6 border-t border-border/30">
        <div className="max-w-lg mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-lg font-bold mb-2">Want even bigger savings?</h2>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-5">
              Check our bulk deals — we pool orders, fill a container, and everyone saves up to 40%.
            </p>
            <Link
              to="/group-orders"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              View Bulk Deals <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-card border border-border/60 rounded-xl px-5 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-4 text-sm font-medium flex items-center justify-between"
      >
        {q}
        <span className="text-muted-foreground text-lg ml-4">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <p className="text-sm text-muted-foreground pb-4">{a}</p>
      )}
    </div>
  );
}

function ImportForm() {
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
          kennitala: (formData.get("kennitala") as string) || "",
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
      <div className="bg-card border border-border/60 rounded-xl p-10 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-lg font-semibold mb-2">Request sent!</h3>
        <p className="text-sm text-muted-foreground">
          We'll get back to you within 24 hours with a full quote.
        </p>
      </div>
    );
  }

  const inputClasses = "w-full bg-secondary/50 border border-border/60 rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-colors";

  return (
    <div className="bg-card border border-border/60 rounded-xl p-6 sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Type toggle */}
        <div className="grid grid-cols-2 gap-0">
          <button
            type="button"
            onClick={() => setFormType("links")}
            className={`py-2.5 text-sm font-medium transition-colors rounded-l-lg flex items-center justify-center gap-2 ${formType === "links" ? "bg-foreground text-background" : "bg-secondary/50 text-muted-foreground"}`}
          >
            <Link2 size={14} /> I have a link
          </button>
          <button
            type="button"
            onClick={() => setFormType("sourcing")}
            className={`py-2.5 text-sm font-medium transition-colors rounded-r-lg flex items-center justify-center gap-2 ${formType === "sourcing" ? "bg-foreground text-background" : "bg-secondary/50 text-muted-foreground"}`}
          >
            <Search size={14} /> Find it for me
          </button>
        </div>

        {/* Main input */}
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">
            {formType === "links" ? "Product link *" : "What do you need? *"}
          </label>
          <textarea
            name="content"
            required
            className={`${inputClasses} min-h-[100px] resize-y`}
            placeholder={formType === "links" ? "Paste the product URL here..." : "Describe the product — brand, model, specs, quantity..."}
          />
        </div>

        {/* Shipping speed */}
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-2">Shipping speed</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPriority("standard")}
              className={`px-4 py-3 rounded-lg text-sm transition-colors border ${priority === "standard" ? "border-foreground/30 bg-card" : "border-border/60 text-muted-foreground"}`}
            >
              <span className="font-medium block">Container</span>
              <span className="text-xs text-muted-foreground">~14 days</span>
            </button>
            <button
              type="button"
              onClick={() => setPriority("urgent")}
              className={`px-4 py-3 rounded-lg text-sm transition-colors border ${priority === "urgent" ? "border-primary/40 bg-card" : "border-border/60 text-muted-foreground"}`}
            >
              <span className="font-medium block text-primary">Air freight</span>
              <span className="text-xs text-muted-foreground">3-5 days</span>
            </button>
          </div>
        </div>

        {/* Optional details */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Est. value</label>
            <input name="estimated_value" className={inputClasses} placeholder="e.g. 2,000 EUR" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Weight / size</label>
            <input name="weight_info" className={inputClasses} placeholder="e.g. 500 kg" />
          </div>
        </div>

        {/* Contact info */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Name / company *</label>
            <input name="company_name" required className={inputClasses} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Kennitala <span className="text-muted-foreground/50">(optional)</span></label>
            <input name="kennitala" className={inputClasses} placeholder="For VAT invoice" />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Email *</label>
          <input name="email" type="email" required className={inputClasses} placeholder="your@email.is" />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {submitting ? "Sending..." : "Get a Quote"}
        </button>

        <p className="text-xs text-muted-foreground text-center">
          We'll reply within 24 hours with a full breakdown.
        </p>
      </form>
    </div>
  );
}
