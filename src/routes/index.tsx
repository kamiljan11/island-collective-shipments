import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/HeroSection";
import { BrandMarquee } from "@/components/BrandMarquee";
import { ServicesOverview } from "@/components/ServicesOverview";
import { LogicSection } from "@/components/LogicSection";
import { IndustriesSection } from "@/components/IndustriesSection";
import { ConsolidationSection } from "@/components/ConsolidationSection";
import { ProcessSection } from "@/components/ProcessSection";
import { GroupOrdersPreview } from "@/components/GroupOrdersPreview";
import { FAQSection } from "@/components/FAQSection";
import { QuoteSection } from "@/components/QuoteSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MAS Logistics — Europe to Iceland B2B Bridge" },
      { name: "description", content: "We source, buy, and deliver from Europe to Iceland. Consolidated shipping, group orders, and valid Icelandic VAT invoices." },
      { property: "og:title", content: "MAS Logistics — Europe to Iceland B2B Bridge" },
      { property: "og:description", content: "We source, buy, and deliver from Europe to Iceland. Sourcing & group orders." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <HeroSection />
      <BrandMarquee />
      <ServicesOverview />
      <LogicSection />
      <IndustriesSection />
      <ConsolidationSection />
      <ProcessSection />
      <GroupOrdersPreview />
      <FAQSection />
      <QuoteSection />
    </>
  );
}
