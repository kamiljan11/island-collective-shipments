import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center pt-32 pb-12 px-6 lg:px-8 overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="max-w-4xl mx-auto w-full text-center">
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

        <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          <span className="text-foreground font-semibold">Sourcing & shipping</span> for any product, or{" "}
          <span className="text-foreground font-semibold">group orders</span> for bulk deals.
          We handle purchasing, customs clearance, and delivery — with a valid{" "}
          <span className="text-foreground font-semibold">Icelandic VAT Invoice</span>.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="#quote"
            className="border-2 border-foreground text-foreground px-6 py-3 rounded-md font-semibold text-sm tracking-wider uppercase flex items-center gap-2 hover:bg-foreground hover:text-background transition-colors"
          >
            REQUEST A QUOTE <ArrowRight size={16} />
          </a>
          <a
            href="#group-orders"
            className="border-2 border-primary text-primary px-6 py-3 rounded-md font-semibold text-sm tracking-wider uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            GROUP ORDERS
          </a>
          <a
            href="#services"
            className="border-2 border-border text-muted-foreground px-6 py-3 rounded-md font-semibold text-sm tracking-wider uppercase hover:border-foreground hover:text-foreground transition-colors"
          >
            OUR SERVICES
          </a>
        </div>
      </div>
    </section>
  );
}