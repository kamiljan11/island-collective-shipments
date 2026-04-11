import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-28 pb-16 px-4 lg:px-8 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="max-w-7xl mx-auto text-center relative">
        <div className="inline-flex items-center gap-2 bg-secondary/60 rounded-full px-4 py-1.5 mb-6 border border-border/50">
          <span className="text-hub-green text-xs">●</span>
          <span className="text-xs tracking-wider text-muted-foreground">
            HUB ONLINE • ACCEPTING ORDERS
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] mb-5 uppercase">
          YOUR EUROPEAN
          <br />
          <span className="text-primary">SUPPLY HUB</span> IN ICELAND
        </h1>

        <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          Need something from Europe? We buy it, ship it, and handle customs.
          Join a <span className="text-foreground font-semibold">bulk deal</span> or request a <span className="text-foreground font-semibold">custom quote</span> — 
          both come with an Icelandic VAT invoice.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="#hub"
            className="bg-primary text-primary-foreground px-7 py-3 rounded-md font-semibold text-sm tracking-wider uppercase flex items-center gap-2 hover:bg-primary/90 transition-colors"
          >
            SEE WHAT'S ACTIVE <ArrowRight size={16} />
          </a>
          <a
            href="#how"
            className="border-2 border-border text-muted-foreground px-6 py-3 rounded-md font-semibold text-sm tracking-wider uppercase hover:border-foreground hover:text-foreground transition-colors"
          >
            HOW IT WORKS
          </a>
        </div>
      </div>
    </section>
  );
}
