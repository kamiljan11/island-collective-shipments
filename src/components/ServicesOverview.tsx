import { motion } from "framer-motion";
import { Package, ShoppingCart, ArrowRight, TruckIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";

const steps = [
  { num: "01", title: "Browse deals", desc: "Check active group campaigns — tires, parts, equipment, and more." },
  { num: "02", title: "Reserve your spot", desc: "Sign up with your company info. No payment yet — just interest." },
  { num: "03", title: "We hit the target", desc: "Once enough businesses join, we confirm the order and request a small deposit." },
  { num: "04", title: "Delivery to Iceland", desc: "We buy, ship by container, clear customs, and deliver with a valid VAT invoice." },
];

export function ServicesOverview() {
  return (
    <section id="services" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-secondary text-secondary-foreground text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-sm mb-6">
            HOW IT WORKS
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.05]">
            JOIN A <span className="text-primary">GROUP ORDER</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-base">
            We pool demand from Icelandic businesses, fill a container, and everyone saves on freight and product cost.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 text-center"
            >
              <span className="text-3xl font-black text-primary/20 block mb-3">{s.num}</span>
              <h3 className="text-sm font-bold tracking-wider uppercase mb-2">{s.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            to="/group-orders"
            className="inline-flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase hover:underline"
          >
            SEE ACTIVE CAMPAIGNS <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
