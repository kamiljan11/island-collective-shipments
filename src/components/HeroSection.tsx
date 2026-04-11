import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center pt-32 pb-12 px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="max-w-4xl mx-auto w-full text-center">
        <div className="inline-flex items-center gap-2 bg-secondary/60 rounded-full px-4 py-1.5 mb-8 border border-border/50">
          <span className="text-hub-green text-xs">●</span>
          <span className="text-xs tracking-wider text-muted-foreground">
            EUROPE TO ICELAND • B2B BULK SHIPPING
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-black tracking-tight leading-[0.9] mb-6 uppercase">
          BULK DEALS
          <br />
          <span className="text-primary">FROM EUROPE.</span>
        </h1>

        <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          We organize <span className="text-foreground font-semibold">container shipments</span> of popular products from Europe to Iceland.
          Join a group order, split the freight, and save up to <span className="text-foreground font-semibold">40%</span> compared to local prices.
          Valid <span className="text-foreground font-semibold">Icelandic VAT invoice</span> included.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            to="/group-orders"
            className="border-2 border-primary bg-primary text-primary-foreground px-8 py-3 rounded-md font-semibold text-sm tracking-wider uppercase flex items-center gap-2 hover:bg-primary/90 transition-colors"
          >
            VIEW BULK DEALS <ArrowRight size={16} />
          </Link>
          <a
            href="#custom-order"
            className="border-2 border-border text-muted-foreground px-6 py-3 rounded-md font-semibold text-sm tracking-wider uppercase hover:border-foreground hover:text-foreground transition-colors"
          >
            NEED SOMETHING SPECIFIC?
          </a>
        </div>
      </div>
    </section>
  );
}
