import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Request Quote", desc: "Send us links or a list of items you need from any European supplier." },
  { num: "02", title: "Secure Payment", desc: "We provide a total price. Once paid, we immediately place orders with suppliers." },
  { num: "03", title: "Consolidation", desc: "Goods arrive at our Hub, where we repack and prepare everything for export." },
  { num: "04", title: "Delivery & Invoice", desc: "Receive your goods in Iceland along with a clean local VAT Invoice." },
];

export function ProcessSection() {
  return (
    <section id="process" className="py-24 px-4 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-black tracking-tight mb-16"
        >
          HOW IT <span className="text-primary">WORKS.</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <span className="text-6xl font-black text-primary/15 absolute -top-2 -left-1">
                {step.num}
              </span>
              <div className="pt-12">
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
