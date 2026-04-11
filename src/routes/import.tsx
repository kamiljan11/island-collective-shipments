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
  { icon: Link2, title: "Send us a link or description", desc: "Paste a product URL from any European store — or just tell us what you need." },
  { icon: MessageSquare, title: "We quote you", desc: "Product cost + shipping + our service fee. No surprises, no hidden charges." },
  { icon: ShoppingCart, title: "We buy & ship", desc: "We purchase, receive at our Poland hub, and ship by container to Iceland." },
  { icon: FileCheck, title: "You receive it", desc: "Delivered to your door with a valid Icelandic VAT invoice for your bookkeeping." },
];

const faqs = [
  { q: "WHAT STORES CAN YOU BUY FROM?", a: "Any European online or physical store — Amazon.de, Zalando, specialist retailers, industrial suppliers, you name it. If they sell it in Europe, we can get it." },
  { q: "HOW MUCH DO YOU CHARGE?", a: "We quote each order individually: product cost + shipping + a transparent service fee. No hidden charges. You approve the full price before we buy anything." },
  { q: "HOW LONG DOES IT TAKE?", a: "Standard container shipping takes about 14 days. For urgent items, we offer air freight in 3-5 days." },
  { q: "DO I GET A VAT INVOICE?", a: "Yes — businesses receive a valid Icelandic VAT invoice from Mountain All Service ehf, simplifying your bookkeeping and VAT reclamation." },
  { q: "WHAT IF THE STORE DOESN'T SHIP TO ICELAND?", a: "That's exactly why we exist. We buy using our European address and handle all the forwarding, customs, and delivery to Iceland." },
];

function ImportPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-1.5 mb-6">
              <span className="text-primary text-xs">●</span>
              <span className="text-xs tracking-wider text-muted-foreground">
                PERSONAL IMPORT SERVICE
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
              SEND US A LINK.
              <br />
              <span className="text-primary">WE HANDLE THE REST.</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Found a product in a European store that doesn't ship to Iceland? 
              Or need us to find something specific? We buy it, ship it, and deliver it to you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                  <step.icon size={20} />
                </div>
                <h3 className="text-xs font-bold tracking-wider uppercase mb-1">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-20 px-4 bg-secondary/30 border-t border-border">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-black tracking-tight text-center mb-8">
              GET A <span className="text-primary">QUOTE</span>
            </h2>
            <ImportForm />
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-black tracking-tight mb-10 text-center"
          >
            IMPORT <span className="text-primary">FAQ</span>
          </motion.h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Cross-sell */}
      <section className="py-16 px-4 bg-secondary/30 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Package size={32} className="mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-black tracking-tight mb-2">
              WANT EVEN BIGGER SAVINGS?
            </h2>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto mb-6">
              Check our group bulk deals — we pool orders from multiple buyers, fill a container, 
              and everyone saves up to 40% on freight and product costs.
            </p>
            <Link
              to="/group-orders"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-bold text-sm tracking-wider hover:bg-primary/90 transition-colors"
            >
              VIEW BULK DEALS <ArrowRight size={16} />
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
    <div className="bg-card border border-border rounded-xl px-6 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-5 text-sm font-semibold tracking-wider flex items-center justify-between"
      >
        {q}
        <span className="text-muted-foreground text-lg">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <p className="text-sm text-muted-foreground pb-5">{a}</p>
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
      <div className="bg-card border border-border rounded-xl p-12 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-2xl font-bold mb-2">Request Sent!</h3>
        <p className="text-muted-foreground">
          We'll get back to you within 24 hours with a full quote — product price, shipping, and our fee.
        </p>
      </div>
    );
  }

  return (
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

        {/* Contact info */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold tracking-widest text-muted-foreground block mb-1.5">YOUR NAME / COMPANY *</label>
            <input name="company_name" required className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="text-xs font-bold tracking-widest text-muted-foreground block mb-1.5">KENNITALA <span className="text-muted-foreground/50">(for VAT invoice)</span></label>
            <input name="kennitala" className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Optional" />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold tracking-widest text-muted-foreground block mb-1.5">EMAIL *</label>
          <input name="email" type="email" required className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="your@email.is" />
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
  );
}
