import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/HeroSection";

import { ServicesOverview } from "@/components/ServicesOverview";
import { GroupOrdersPreview } from "@/components/GroupOrdersPreview";
import { WhyMASSection } from "@/components/WhyMASSection";
import { FAQSection } from "@/components/FAQSection";
import { QuoteSection } from "@/components/QuoteSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MAS Logistics — Europe to Iceland B2B Bridge" },
      { name: "description", content: "We source, buy, and deliver from Europe to Iceland. Consolidated shipping, group orders, and valid Icelandic VAT invoices." },
      { property: "og:title", content: "MAS Logistics — Europe to Iceland B2B Bridge" },
      { property: "og:description", content: "Sourcing, shipping & group orders from Europe to Iceland." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <HeroSection />
      
      <ServicesOverview />
      <GroupOrdersPreview />
      <WhyMASSection />
      <FAQSection />
      <QuoteSection />
    </>
  );
}
