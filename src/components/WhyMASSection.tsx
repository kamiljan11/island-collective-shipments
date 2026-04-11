import { motion } from "framer-motion";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";

const comparisonRows = [
  { factor: "VAT Invoice", standard: "Foreign receipts", mas: "Icelandic VAT Invoice" },
  { factor: "Customs", standard: "You handle it", mas: "Fully managed" },
  { factor: "Pricing", standard: "Unpredictable", mas: "Fixed upfront" },
  { factor: "Consolidation", standard: "Ship each box separately", mas: "Combined into one shipment" },
];

const steps = [
  { num: "1", title: "Tell us what you need", desc: "Send links or a description — any European product or supplier." },
  { num: "2", title: "We quote & you pay", desc: "One fixed price. We buy, collect at our Hub, and handle all paperwork." },
  { num: "3", title: "Receive in Iceland", desc: "Goods arrive at your door with a clean Icelandic VAT invoice." },
];

export function WhyMASSection() {
  return (
    <section id="solution" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            WHY <span className="text-primary">MAS?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            European suppliers often won't export to Iceland or handle customs. We bridge that gap — you get your goods with a local VAT invoice, zero paperwork.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left — 3-step process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xs font-bold tracking-widest text-muted-foreground mb-6">HOW IT WORKS</h3>
            <div className="space-y-6">
              {steps.map((step, i) => (
                <div key={step.num} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border-2 border-primary/30 bg-primary/5 flex items-center justify-center shrink-0">
                    <span className="text-lg font-black text-primary">{step.num}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <a
              href="#quote"
              className="inline-flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase mt-8 hover:underline"
            >
              GET A QUOTE <ArrowRight size={16} />
            </a>
          </motion.div>

          {/* Right — Comparison table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="bg-card border border-border rounded-xl overflow-hidden"
          >
            <div className="grid grid-cols-3 text-xs font-semibold tracking-wider border-b border-border">
              <div className="px-5 py-3"></div>
              <div className="px-5 py-3 text-muted-foreground">DIY IMPORT</div>
              <div className="px-5 py-3 text-primary">WITH MAS</div>
            </div>
            {comparisonRows.map((row) => (
              <div key={row.factor} className="grid grid-cols-3 border-b border-border last:border-0 text-sm">
                <div className="px-5 py-4 font-medium text-xs tracking-wider">{row.factor}</div>
                <div className="px-5 py-4 text-muted-foreground flex items-center gap-2 text-xs">
                  <XCircle size={14} className="text-destructive shrink-0" /> {row.standard}
                </div>
                <div className="px-5 py-4 flex items-center gap-2 text-xs">
                  <CheckCircle size={14} className="text-hub-green shrink-0" />
                  <span className="font-semibold">{row.mas}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
