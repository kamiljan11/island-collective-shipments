import { motion } from "framer-motion";
import { Package, Truck, FileText, Shield } from "lucide-react";

const steps = [
  {
    icon: Package,
    title: "You Tell Us What You Need",
    desc: "Send product links, or join an active bulk deal — either way, we take it from there.",
  },
  {
    icon: Truck,
    title: "We Buy, Consolidate & Ship",
    desc: "We purchase from European suppliers, consolidate at our Polish hub, and ship to Iceland.",
  },
  {
    icon: FileText,
    title: "You Get Goods + VAT Invoice",
    desc: "Delivered to your door with full customs clearance and a valid Icelandic VAT invoice.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            HOW IT <span className="text-primary">WORKS</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Whether it's a custom quote or a group order — the process is the same.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative text-center"
            >
              <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <step.icon size={24} className="text-primary" />
              </div>
              <span className="absolute top-0 right-1/4 text-5xl font-black text-primary/10">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-bold text-sm mb-2">{step.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 flex flex-wrap justify-center gap-6 text-xs text-muted-foreground"
        >
          <span className="flex items-center gap-1.5">
            <Shield size={14} className="text-hub-green" /> Registered Icelandic Company
          </span>
          <span className="flex items-center gap-1.5">
            <FileText size={14} className="text-primary" /> Valid ISK VAT Invoices
          </span>
          <span className="flex items-center gap-1.5">
            <Truck size={14} className="text-hub-amber" /> Poland Hub → Iceland
          </span>
        </motion.div>
      </div>
    </section>
  );
}
