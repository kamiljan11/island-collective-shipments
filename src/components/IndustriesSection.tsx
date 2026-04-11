import { motion } from "framer-motion";
import { Car, HardHat, Factory, Monitor, Ship, Zap, ShoppingBag, Tractor } from "lucide-react";

const industries = [
  { icon: Car, title: "AUTOMOTIVE" },
  { icon: HardHat, title: "CONSTRUCTION" },
  { icon: Factory, title: "INDUSTRIAL" },
  { icon: Monitor, title: "IT & ELECTRONICS" },
  { icon: Ship, title: "MARINE" },
  { icon: Zap, title: "ENERGY" },
  { icon: ShoppingBag, title: "RETAIL" },
  { icon: Tractor, title: "AGRICULTURE" },
];

export function IndustriesSection() {
  return (
    <section id="industries" className="py-20 px-4 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
            WE SERVE <span className="text-primary">ALL SECTORS</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            From auto parts to industrial machinery — if it's in Europe, we'll get it to Iceland.
          </p>
        </motion.div>

        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary/40 transition-colors group"
            >
              <ind.icon size={22} className="text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-[10px] font-bold tracking-wider text-muted-foreground">{ind.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
