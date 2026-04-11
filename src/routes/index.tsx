import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/HeroSection";
import { BrandMarquee } from "@/components/BrandMarquee";
import { HubSection } from "@/components/HubSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { WhyMASSection } from "@/components/WhyMASSection";
import { FAQSection } from "@/components/FAQSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MAS Logistics — Your European Supply Hub in Iceland" },
      { name: "description", content: "We source, buy, and deliver from Europe to Iceland. Join bulk deals or request a custom quote — with valid Icelandic VAT invoices." },
      { property: "og:title", content: "MAS Logistics — Your European Supply Hub in Iceland" },
      { property: "og:description", content: "Bulk deals & custom sourcing from Europe to Iceland." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <HeroSection />
      <BrandMarquee />
      <HubSection />
      <HowItWorksSection />
      <WhyMASSection />
      <FAQSection />
    </>
  );
}
