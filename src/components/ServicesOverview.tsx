import { motion } from "framer-motion";
import { Package, ShoppingCart, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const services = [
  {
    badge: "SERVICE 1",
    icon: Package,
    title: "SOURCING & SHIPPING",
    desc: "Tell us what you need from Europe. We source it, buy it, handle customs clearance, and deliver to your door in Iceland with a valid Icelandic VAT invoice.",
    features: ["Any product from any European supplier", "Full customs clearance", "Consolidated freight savings", "Icelandic VAT invoice"],
    cta: { label: "REQUEST A QUOTE", href: "#quote" },
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    badge: "SERVICE 2",
    icon: ShoppingCart,
    title: "GROUP ORDERS",
    desc: "We organize bulk container shipments for specific products. Join the interest list — when enough businesses sign up, we ship and everyone saves.",
    features: ["No upfront payment to join", "50% deposit only after confirmation", "Container-level freight savings", "Volume discounts on products"],
    cta: { label: "VIEW CAMPAIGNS", href: "/group-orders", isLink: true },
    color: "text-hub-green",
    bgColor: "bg-hub-green/10",
  },
];

export function ServicesOverview() {
  return (
    <section id="services" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-secondary text-secondary-foreground text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-sm mb-6">
            TWO WAYS TO SAVE
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.05]">
            OUR <span className="text-primary">SERVICES</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-base">
            Whether you need a specific product sourced or want to join a bulk deal — we've got you covered.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-card border border-border rounded-xl p-6 lg:p-8 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 rounded-lg ${s.bgColor} flex items-center justify-center`}>
                  <s.icon size={20} className={s.color} />
                </div>
                <span className={`text-[10px] font-bold tracking-widest ${s.color}`}>{s.badge}</span>
              </div>

              <h3 className="text-2xl font-black tracking-tight mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{s.desc}</p>

              <ul className="space-y-2 mb-8 flex-1">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <span className={`text-xs ${s.color}`}>✓</span>
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              {"isLink" in s.cta && s.cta.isLink ? (
                <Link
                  to="/group-orders"
                  className={`inline-flex items-center gap-2 font-bold text-sm tracking-widest uppercase hover:underline ${s.color}`}
                >
                  {s.cta.label} <ArrowRight size={16} />
                </Link>
              ) : (
                <a
                  href={s.cta.href}
                  className={`inline-flex items-center gap-2 font-bold text-sm tracking-widest uppercase hover:underline ${s.color}`}
                >
                  {s.cta.label} <ArrowRight size={16} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
