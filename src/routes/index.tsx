import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { BrandMarquee } from "@/components/BrandMarquee";
import { LogicSection } from "@/components/LogicSection";
import { IndustriesSection } from "@/components/IndustriesSection";
import { ConsolidationSection } from "@/components/ConsolidationSection";
import { ProcessSection } from "@/components/ProcessSection";
import { FAQSection } from "@/components/FAQSection";
import { QuoteSection } from "@/components/QuoteSection";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MAS Logistics — Europe to Iceland B2B Bridge" },
      { name: "description", content: "We source, buy, and deliver from Europe to Iceland. Consolidated shipping with valid Icelandic VAT invoices." },
      { property: "og:title", content: "MAS Logistics — Europe to Iceland B2B Bridge" },
      { property: "og:description", content: "We source, buy, and deliver from Europe to Iceland." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <HeroSection />
      <BrandMarquee />
      <LogicSection />
      <IndustriesSection />
      <ConsolidationSection />
      <ProcessSection />
      <FAQSection />
      <QuoteSection />
    </>
  );
}
