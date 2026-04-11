import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

const comparisonRows = [
  { factor: "VAT Invoice", standard: "Foreign receipts", mas: "Icelandic VAT Invoice" },
  { factor: "Customs", standard: "You handle it", mas: "Fully managed" },
  { factor: "Pricing", standard: "Unpredictable", mas: "Fixed upfront" },
  { factor: "Consolidation", standard: "Ship each box", mas: "Combined shipment" },
];

export function WhyMASSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-[640px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Why <span className="text-primary">MAS?</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            European suppliers often won't export to Iceland or handle customs. We bridge that gap.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border/60 rounded-xl overflow-hidden"
        >
          <div className="grid grid-cols-3 text-xs font-medium border-b border-border/50">
            <div className="px-5 py-3"></div>
            <div className="px-5 py-3 text-muted-foreground">DIY Import</div>
            <div className="px-5 py-3 text-primary">With MAS</div>
          </div>
          {comparisonRows.map((row) => (
            <div key={row.factor} className="grid grid-cols-3 border-b border-border/30 last:border-0 text-sm">
              <div className="px-5 py-4 font-medium text-xs">{row.factor}</div>
              <div className="px-5 py-4 text-muted-foreground flex items-center gap-2 text-xs">
                <XCircle size={14} className="text-destructive shrink-0" /> {row.standard}
              </div>
              <div className="px-5 py-4 flex items-center gap-2 text-xs">
                <CheckCircle size={14} className="text-hub-green shrink-0" />
                <span className="font-medium">{row.mas}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
