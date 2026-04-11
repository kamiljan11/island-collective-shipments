import { motion } from "framer-motion";
import { Package, TrendingDown, FileText } from "lucide-react";

const benefits = [
  { icon: Package, title: "Consolidate Orders", desc: "Order from 5 different European suppliers. We receive them at our Hub and combine them into a single pallet shipment." },
  { icon: TrendingDown, title: "Freight Savings", desc: "Significantly reduce your shipping costs. One pallet is up to 70% cheaper than shipping individual boxes from various factories." },
  { icon: FileText, title: "Accounting Efficiency", desc: "Stop chasing multiple foreign receipts. You receive one single Icelandic VAT Invoice for the entire consolidated order." },
];

export function ConsolidationSection() {
  return (
    <section id="consolidation" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-wider text-primary font-semibold">STRATEGIC B2B VALUE</span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-3">
            ONE VAT INVOICE.
            <br />
            <span className="text-primary">MULTIPLE SUPPLIERS.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-lg">
            Our specialized Hub in Poland acts as your European doorstep. We receive, sort, and consolidate cargo for Icelandic businesses.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-8 text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <b.icon size={28} className="text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
