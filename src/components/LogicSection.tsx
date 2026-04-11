import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

const comparisonRows = [
  { factor: "Document Type", standard: "Mixed Foreign Receipt", mas: "Local VAT Invoice" },
  { factor: "Handling", standard: "Internal Headache", mas: "Fully Outsourced" },
  { factor: "Landed Cost", standard: "Unpredictable", mas: "Fixed Upfront" },
  { factor: "Consolidation", standard: "No", mas: "Multi-Supplier" },
];

export function LogicSection() {
  return (
    <section id="solution" className="py-24 px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        {/* Left — Problem/Solution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-10">
            THE LOGIC.
          </h2>

          <div className="space-y-8">
            <div className="border-l-4 border-destructive pl-6">
              <h3 className="text-xl font-bold mb-2">THE PROBLEM.</h3>
              <p className="text-muted-foreground">
                Suppliers in Europe often refuse to export to Iceland or handle customs. Foreign receipts make VAT reclamation difficult for your local accounting.
              </p>
            </div>

            <div className="border-l-4 border-hub-green pl-6">
              <h3 className="text-xl font-bold mb-2">THE SOLUTION.</h3>
              <p className="text-muted-foreground">
                We buy locally in Europe, handle the export/import logistics, and resell to you in Iceland. You get your goods plus a clean{" "}
                <span className="text-foreground font-semibold">local VAT Invoice</span>.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right — Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl overflow-hidden"
        >
          <div className="grid grid-cols-3 text-xs font-semibold tracking-wider border-b border-border">
            <div className="px-5 py-3">BUSINESS FACTOR</div>
            <div className="px-5 py-3">STANDARD IMPORT</div>
            <div className="px-5 py-3 text-primary">MAS B2B</div>
          </div>
          {comparisonRows.map((row) => (
            <div key={row.factor} className="grid grid-cols-3 border-b border-border last:border-0 text-sm">
              <div className="px-5 py-4 font-medium">{row.factor}</div>
              <div className="px-5 py-4 text-muted-foreground flex items-center gap-2">
                <XCircle size={14} className="text-destructive shrink-0" /> {row.standard}
              </div>
              <div className="px-5 py-4 flex items-center gap-2">
                <CheckCircle size={14} className="text-hub-green shrink-0" />
                <span className="font-semibold">{row.mas}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
