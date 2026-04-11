import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Do you provide VAT-compliant invoices for Icelandic companies?", a: "Yes. Every order comes with a valid Icelandic VAT Invoice from Mountain All Service ehf. This simplifies your bookkeeping and VAT reclamation." },
  { q: "Why use you instead of buying direct?", a: "Most European suppliers won't export to Iceland, don't handle customs, or can't issue local invoices. We bridge all three gaps and consolidate shipments to save you freight costs." },
  { q: "Can we consolidate orders from multiple suppliers?", a: "Absolutely. Our Hub in Poland receives goods from multiple EU suppliers, repacks them, and ships everything as one consolidated pallet to Iceland." },
  { q: "What are your payment terms for businesses?", a: "We require payment before placing orders with suppliers. For recurring clients, we offer flexible payment arrangements. Contact us to discuss." },
  { q: "Do you offer Express Freight for urgent spare parts?", a: "Yes. We offer both standard freight (14-day cycle) and urgent air freight (3-5 day express) for time-critical parts." },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-black tracking-tight mb-12"
        >
          BUSINESS <span className="text-primary">FAQ.</span>
        </motion.h2>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/40"
            >
              <AccordionTrigger className="text-sm font-semibold hover:no-underline py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
