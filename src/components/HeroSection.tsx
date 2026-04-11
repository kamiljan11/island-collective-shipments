import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const manifestItems = [
  { icon: "📦", name: "OEM Brake Discs", from: "Inter Cars SA", to: "Mosfellsbær Garage" },
  { icon: "📦", name: "Industrial HVAC Unit", from: "Viessmann", to: "Kópavogur Warehouse" },
  { icon: "📦", name: "VW Transporter Parts", from: "Auto Partner SA", to: "Akureyri Workshop" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-12 px-6 lg:px-8 overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 bg-secondary/60 rounded-full px-4 py-1.5 mb-8 border border-border/50">
            <span className="text-hub-green text-xs">●</span>
            <span className="text-xs tracking-wider text-muted-foreground">
              EUROPE TO ICELAND • YOUR B2B BRIDGE
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-black tracking-tight leading-[0.9] mb-6 uppercase">
            WE CONNECT YOU
            <br />
            TO EUROPE.
          </h1>

          <p className="text-base lg:text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
            Need anything from Europe?{" "}
            <span className="text-foreground font-semibold">
              We source, buy, and deliver.
            </span>{" "}
            We handle everything — purchasing, customs clearance, and shipping to your door. Delivered with a valid{" "}
            <span className="text-foreground font-semibold">
              Icelandic VAT Invoice
            </span>
            .
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#quote"
              className="border-2 border-foreground text-foreground px-6 py-3 rounded-md font-semibold text-sm tracking-wider uppercase flex items-center gap-2 hover:bg-foreground hover:text-background transition-colors"
            >
              START PURCHASING <ArrowRight size={16} />
            </a>
            <a
              href="#process"
              className="border-2 border-border text-muted-foreground px-6 py-3 rounded-md font-semibold text-sm tracking-wider uppercase hover:border-foreground hover:text-foreground transition-colors"
            >
              HOW IT WORKS
            </a>
          </div>
        </div>

        {/* Right — Hub Activity card */}
        <div
          className="relative"
        >
          {/* HUB ACTIVITY badge */}
          <div className="absolute -top-3 right-4 z-10 bg-card border border-border rounded-md px-3 py-1">
            <span className="text-[10px] font-semibold tracking-widest text-muted-foreground">HUB ACTIVITY</span>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-5 py-4 space-y-3 border-b border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Hub (Poland)</span>
                <span className="text-hub-green flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-hub-green" /> Receiving Cargo
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Next Departure</span>
                <span className="font-mono text-xs text-foreground tracking-wider">FRIDAY, 24 APR 14:00</span>
              </div>
            </div>

            <div className="px-5 py-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold tracking-widest">INBOUND MANIFEST</span>
                <span className="text-xs text-primary font-mono tracking-wider">4M AGO</span>
              </div>
              <div className="space-y-4">
                {manifestItems.map((item) => (
                  <div key={item.name} className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">{item.icon}</span>
                    <div>
                      <p className="text-sm font-medium font-mono tracking-wide">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        From: {item.from} → <span className="text-primary">{item.to}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
