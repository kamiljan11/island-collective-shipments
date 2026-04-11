import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle } from "lucide-react";
import { FAQSection } from "@/components/FAQSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MAS Logistics — We Buy and Ship Anything from Europe to Iceland" },
      { name: "description", content: "Stop overpaying for European goods. We source, purchase, and deliver products from any EU store to Iceland — with full customs handling and a valid VAT invoice." },
      { property: "og:title", content: "MAS Logistics — Europe to Iceland, Done For You" },
      { property: "og:description", content: "We buy from any European store and deliver to Iceland. Customs, shipping, VAT invoice — all handled." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[70vh] flex items-center pt-28 pb-16 px-6">
        <div className="max-w-[640px] mx-auto w-full text-center">
          <p className="text-xs text-primary tracking-widest mb-6">FOR BUSINESSES & INDIVIDUALS IN ICELAND</p>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.15] mb-5">
            Stop chasing European
            <br />
            suppliers. We'll do it.
          </h1>

          <p className="text-muted-foreground text-base max-w-md mx-auto mb-10 leading-relaxed">
            You find the product. We buy it, clear customs, and deliver it to your door in Iceland — with a proper VAT invoice. That's it.
          </p>

          {/* Service cards */}
          <div className="grid sm:grid-cols-3 gap-4 text-left">
            <Link
              to="/group-orders"
              className="group bg-card border border-border/60 hover:border-primary/40 rounded-xl p-6 transition-all"
            >
              <p className="text-[11px] text-muted-foreground tracking-widest mb-3">SERVICE 1</p>
              <h2 className="text-base font-semibold mb-2">Bulk Deals</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                We organize container shipments for popular products. You join, split the freight cost, and save up to 40%.
              </p>
              <span className="text-primary text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                See current deals <ArrowRight size={14} />
              </span>
            </Link>

            <Link
              to="/import"
              className="group bg-card border border-border/60 hover:border-primary/40 rounded-xl p-6 transition-all"
            >
              <p className="text-[11px] text-muted-foreground tracking-widest mb-3">SERVICE 2</p>
              <h2 className="text-base font-semibold mb-2">Import Service</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Found something in a European store? Send us the link. We buy it and get it to Iceland for you.
              </p>
              <span className="text-primary text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Get a quote <ArrowRight size={14} />
              </span>
            </Link>

            <Link
              to="/shared-pallet"
              className="group bg-card border border-border/60 hover:border-primary/40 rounded-xl p-6 transition-all relative overflow-hidden"
            >
              <span className="absolute top-3 right-3 text-[10px] font-semibold tracking-wider bg-primary/15 text-primary px-2 py-0.5 rounded">COMING SOON</span>
              <p className="text-[11px] text-muted-foreground tracking-widest mb-3">SERVICE 3</p>
              <h2 className="text-base font-semibold mb-2">Shared Pallet</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Buy cube slots on a shared pallet. The more people join, the cheaper it gets for everyone.
              </p>
              <span className="text-primary text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why us — benefit-driven */}
      <section className="px-6 pb-20">
        <div className="max-w-[640px] mx-auto">
          <h2 className="text-2xl font-bold tracking-tight text-center mb-3">
            Why people use us
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-10 max-w-md mx-auto">
            Importing from Europe to Iceland is a hassle. We remove every painful step.
          </p>

          <div className="space-y-4">
            {[
              { title: "The store won't ship to Iceland", desc: "Most European retailers don't deliver here. We buy using our address in Poland and forward everything to you." },
              { title: "Customs and paperwork are confusing", desc: "We handle all customs clearance. You don't touch a single form." },
              { title: "You need a valid VAT invoice", desc: "Every order comes with an Icelandic VAT invoice from Mountain All Service ehf. Clean bookkeeping, easy reclamation." },
              { title: "Shipping one box is expensive", desc: "We consolidate multiple orders into container shipments. You pay a fraction of what individual shipping would cost." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 bg-card border border-border/60 rounded-xl p-5">
                <CheckCircle size={18} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 pb-16">
        <div className="max-w-[640px] mx-auto">
          <div className="bg-card border border-border/60 rounded-xl grid grid-cols-3 divide-x divide-border/50">
            {[
              { value: "40%", label: "Avg. freight savings" },
              { value: "14–30", label: "Working days by container" },
              { value: "100%", label: "VAT invoice included" },
            ].map((stat) => (
              <div key={stat.label} className="py-6 text-center">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />
    </>
  );
}
