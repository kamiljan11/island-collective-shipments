import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { WhyMASSection } from "@/components/WhyMASSection";
import { FAQSection } from "@/components/FAQSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MAS Logistics — Europe to Iceland, Simplified" },
      { name: "description", content: "We source, buy, and deliver products from Europe to Iceland. Bulk group orders or individual imports — with valid Icelandic VAT invoices." },
      { property: "og:title", content: "MAS Logistics — Europe to Iceland, Simplified" },
      { property: "og:description", content: "Bulk deals and personal imports from Europe to Iceland." },
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
          <p className="text-xs text-primary tracking-widest mb-6">EUROPE → ICELAND</p>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.15] mb-5">
            We buy and ship
            <br />
            anything from Europe.
          </h1>

          <p className="text-muted-foreground text-base max-w-md mx-auto mb-10 leading-relaxed">
            Join a bulk deal to save on freight, or send us a product link — we'll purchase, ship, and deliver it to Iceland with a VAT invoice.
          </p>

          {/* Service cards */}
          <div className="grid sm:grid-cols-2 gap-4 text-left">
            <Link
              to="/group-orders"
              className="group bg-card border border-border/60 hover:border-primary/40 rounded-xl p-6 transition-all"
            >
              <div className="text-2xl mb-3">📦</div>
              <h2 className="text-base font-semibold mb-2">Bulk Deals</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Group orders for popular products. We fill a container — everyone saves.
              </p>
              <span className="text-primary text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                View deals <ArrowRight size={14} />
              </span>
            </Link>

            <Link
              to="/import"
              className="group bg-card border border-border/60 hover:border-primary/40 rounded-xl p-6 transition-all"
            >
              <div className="text-2xl mb-3">🔗</div>
              <h2 className="text-base font-semibold mb-2">Import Service</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Send us a link from any EU store. We buy it and ship it to you.
              </p>
              <span className="text-primary text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="px-6 pb-16">
        <div className="max-w-[640px] mx-auto">
          <div className="bg-card border border-border/60 rounded-xl grid grid-cols-3 divide-x divide-border/50">
            {[
              { value: "40%", label: "Freight savings" },
              { value: "14d", label: "Container shipping" },
              { value: "VAT", label: "Invoice included" },
            ].map((stat) => (
              <div key={stat.label} className="py-6 text-center">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyMASSection />
      <FAQSection />
    </>
  );
}
