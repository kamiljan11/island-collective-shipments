import { motion } from "framer-motion";
import { Package, TrendingDown, FileText, ArrowRight } from "lucide-react";

const benefits = [
  { icon: Package, title: "CONSOLIDATE ORDERS", desc: "Order from 5 different European suppliers. We receive them at our Hub and combine them into a single pallet shipment." },
  { icon: TrendingDown, title: "FREIGHT SAVINGS", desc: "Significantly reduce your shipping costs. One pallet is up to 70% cheaper than shipping individual boxes from various factories." },
  { icon: FileText, title: "ACCOUNTING EFFICIENCY", desc: "Stop chasing multiple foreign receipts. You receive one single Icelandic VAT Invoice for the entire consolidated order." },
];

export function ConsolidationSection() {
  return (
    <section id="consolidation" className="py-24 px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        {/* Left — Benefits list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block bg-primary text-primary-foreground text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-sm mb-8">
            STRATEGIC B2B VALUE
          </span>

          <div className="bg-card border border-border rounded-xl p-6 space-y-6">
            {benefits.map((b) => (
              <div key={b.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <b.icon size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wider mb-1">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="lg:pt-12"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">
            ONE VAT INVOICE.
            <br />
            <span className="text-primary">MULTIPLE SUPPLIERS.</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mt-6 text-lg leading-relaxed">
            Our specialized Hub in Poland acts as your European doorstep. We receive, sort, and consolidate cargo for Icelandic businesses, turning complex international logistics into a simple local purchase.
          </p>
          <a
            href="#quote"
            className="inline-flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase mt-8 hover:underline"
          >
            EXPLORE CONSOLIDATION <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
