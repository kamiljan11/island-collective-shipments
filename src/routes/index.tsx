import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Package, Link2, ShoppingCart, Truck } from "lucide-react";
import { WhyMASSection } from "@/components/WhyMASSection";
import { FAQSection } from "@/components/FAQSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MAS Logistics — Europe to Iceland, Simplified" },
      { name: "description", content: "We source, buy, and deliver products from Europe to Iceland. Bulk group orders or individual imports — with valid Icelandic VAT invoices." },
      { property: "og:title", content: "MAS Logistics — Europe to Iceland, Simplified" },
      { property: "og:description", content: "Bulk deals and personal imports from Europe to Iceland." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center pt-32 pb-16 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />

        <div className="max-w-4xl mx-auto w-full text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/60 rounded-full px-4 py-1.5 mb-8 border border-border/50">
            <span className="text-hub-green text-xs">●</span>
            <span className="text-xs tracking-wider text-muted-foreground">
              EUROPE → ICELAND • PURCHASING & FREIGHT
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-black tracking-tight leading-[0.9] mb-6 uppercase">
            ANYTHING FROM
            <br />
            <span className="text-primary">EUROPE.</span>
          </h1>

          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            We help Icelandic businesses and individuals buy products from Europe and ship them home. 
            Join a <span className="text-foreground font-semibold">bulk deal</span> to save on freight, 
            or send us a link and we'll <span className="text-foreground font-semibold">buy & ship it for you</span>. 
            Valid <span className="text-foreground font-semibold">Icelandic VAT invoice</span> included for businesses.
          </p>

          {/* Two service cards */}
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <Link
              to="/group-orders"
              className="group bg-card border-2 border-border hover:border-primary rounded-xl p-6 text-left transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Package size={20} className="text-primary" />
                </div>
                <h2 className="font-black text-lg tracking-tight">BULK DEALS</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Join group orders for popular products. We fill a container, split the freight — everyone saves up to 40%.
              </p>
              <span className="inline-flex items-center gap-2 text-primary font-bold text-sm tracking-wider group-hover:gap-3 transition-all">
                VIEW DEALS <ArrowRight size={16} />
              </span>
            </Link>

            <Link
              to="/import"
              className="group bg-card border-2 border-border hover:border-primary rounded-xl p-6 text-left transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Link2 size={20} className="text-primary" />
                </div>
                <h2 className="font-black text-lg tracking-tight">IMPORT SERVICE</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Send us a link from any European store. We buy it, ship it, clear customs, and deliver it to you.
              </p>
              <span className="inline-flex items-center gap-2 text-primary font-bold text-sm tracking-wider group-hover:gap-3 transition-all">
                LEARN MORE <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* How we work — brief */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              HOW IT <span className="text-primary">WORKS</span>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
              Whether you join a bulk deal or request a personal import — the process is simple.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShoppingCart, title: "You tell us what you need", desc: "Pick a bulk deal or send us a product link / description." },
              { icon: Package, title: "We source & buy", desc: "We purchase from European suppliers and receive at our Poland hub." },
              { icon: Truck, title: "We ship by container", desc: "Consolidated freight to Iceland. Air express available for urgent orders." },
              { icon: Link2, title: "You receive + invoice", desc: "Delivered to your door with a valid Icelandic VAT invoice." },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <step.icon size={20} />
                </div>
                <h3 className="text-sm font-bold tracking-wider uppercase mb-2">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WhyMASSection />
      <FAQSection />
    </>
  );
}
