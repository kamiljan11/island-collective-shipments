import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const manifestItems = [
  { icon: "📦", name: "OEM Brake Discs", from: "Inter Cars SA", to: "Mosfellsbær Garage" },
  { icon: "📦", name: "Industrial HVAC Unit", from: "Viessmann", to: "Kópavogur Warehouse" },
  { icon: "📦", name: "VW Transporter Parts", from: "Auto Partner SA", to: "Akureyri Workshop" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 px-4 overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-1.5 mb-8">
            <span className="text-hub-green text-xs">●</span>
            <span className="text-xs tracking-wider text-muted-foreground">
              EUROPE TO ICELAND • YOUR B2B BRIDGE
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] mb-6">
            WE CONNECT YOU
            <br />
            <span className="text-gradient-primary">TO EUROPE.</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl mb-8">
            Need anything from Europe?{" "}
            <span className="text-foreground font-semibold">
              We source, buy, and deliver.
            </span>{" "}
            We handle everything from the factory to your door. Delivered with a valid{" "}
            <span className="text-foreground font-semibold">
              Icelandic VAT Invoice
            </span>
            .
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#quote"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold flex items-center gap-2 hover:bg-primary/90 transition-colors"
            >
              Start Purchasing <ArrowRight size={18} />
            </a>
            <a
              href="#process"
              className="bg-secondary text-secondary-foreground px-6 py-3 rounded-md font-semibold hover:bg-secondary/80 transition-colors"
            >
              How It Works
            </a>
          </div>
        </motion.div>

        {/* Right — Hub Activity card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-border">
              <span className="text-xs tracking-wider text-muted-foreground">Hub Activity</span>
            </div>

            <div className="px-5 py-4 space-y-3 border-b border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Hub (Poland)</span>
                <span className="text-hub-green flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-hub-green" /> Receiving Cargo
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Next Departure</span>
                <span className="font-mono text-xs text-foreground">FRIDAY, 24 APR 14:00</span>
              </div>
            </div>

            <div className="px-5 py-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold tracking-wider">INBOUND MANIFEST</span>
                <span className="text-xs text-primary font-mono">4M AGO</span>
              </div>
              <div className="space-y-3">
                {manifestItems.map((item) => (
                  <div key={item.name} className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">{item.icon}</span>
                    <div>
                      <p className="text-sm font-medium font-mono">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        From: {item.from} → <span className="text-primary">{item.to}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
