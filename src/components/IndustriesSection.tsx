import { motion } from "framer-motion";
import { Car, HardHat, Factory, Monitor, Ship, Zap, ShoppingBag, Tractor } from "lucide-react";

const industries = [
  { icon: Car, title: "AUTOMOTIVE & FLEET", desc: "OEM/Aftermarket parts, tires, and heavy garage equipment from EU distributors." },
  { icon: HardHat, title: "CONSTRUCTION", desc: "Specialized building materials, power tools, safety gear, and hardware." },
  { icon: Factory, title: "INDUSTRIAL & FACTORY", desc: "Factory automation, HVAC units, sensors, and heavy machinery spares." },
  { icon: Monitor, title: "CORPORATE IT", desc: "Servers, networking switches, office furniture, and specialized electronics." },
  { icon: Ship, title: "MARINE & FISHERIES", desc: "Boat engine parts, maritime electronics, refrigeration, and fleet supplies." },
  { icon: Zap, title: "ENERGY & ELECTRICAL", desc: "EV charging stations, switchgear, solar components, and high-voltage cabling." },
  { icon: ShoppingBag, title: "RETAIL & HOSPITALITY", desc: "Bulk inventory, shop fittings, hotel furniture, and commercial kitchens." },
  { icon: Tractor, title: "HEAVY EQUIPMENT", desc: "Tractor parts, agricultural attachments, and specialized greenhouse tech." },
];

export function IndustriesSection() {
  return (
    <section id="industries" className="py-24 px-4 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            HARD-TO-IMPORT? <span className="text-primary">SOLVED.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg">
            European suppliers often refuse to handle Icelandic customs or export paperwork. We bridge that gap across all major B2B sectors, delivering the specialized items you need with a clean local VAT invoice.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-colors group border-t-2 border-t-primary/30"
            >
              <ind.icon size={24} className="text-primary mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-sm tracking-wider mb-1">{ind.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{ind.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
