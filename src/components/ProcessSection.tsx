import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "REQUEST QUOTE", desc: "Send us links or a list of items you need from any European supplier." },
  { num: "02", title: "SECURE PAYMENT", desc: "We provide a total price. Once paid, we immediately place orders with suppliers." },
  { num: "03", title: "CONSOLIDATION", desc: "Goods arrive at our Hub, where we repack and prepare everything for export." },
  { num: "04", title: "DELIVERY & INVOICE", desc: "Receive your goods in Iceland along with a clean local VAT Invoice." },
];

export function ProcessSection() {
  return (
    <section id="process" className="py-24 px-4 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-black tracking-tight mb-16 text-center"
        >
          HOW IT WORKS.
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-full border-2 border-border bg-card flex items-center justify-center mx-auto mb-5">
                <span className="text-2xl font-black text-primary">{step.num}</span>
              </div>
              <h3 className="text-sm font-bold tracking-wider mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
