import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Do you provide VAT-compliant invoices?", a: "Yes. Every order comes with a valid Icelandic VAT Invoice from Mountain All Service ehf. This simplifies your bookkeeping and VAT reclamation." },
  { q: "Why use you instead of buying direct?", a: "Most European suppliers won't export to Iceland, don't handle customs, or can't issue local invoices. We bridge all three gaps and consolidate shipments to save you freight costs." },
  { q: "Can you consolidate orders from multiple suppliers?", a: "Absolutely. Our hub in Poland receives goods from multiple EU suppliers, repacks them, and ships everything as one consolidated pallet to Iceland." },
  { q: "What are the payment terms?", a: "We require payment before placing orders with suppliers. For recurring clients, we offer flexible payment arrangements. Contact us to discuss." },
  { q: "Do you offer express freight?", a: "Yes. We offer both standard freight (14-day cycle) and urgent air freight (3-5 day express) for time-critical parts." },
];

export function FAQSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-[640px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold tracking-tight mb-10 text-center"
        >
          Frequently asked questions
        </motion.h2>

        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-card border border-border/60 rounded-xl px-5 data-[state=open]:border-primary/30"
            >
              <AccordionTrigger className="text-sm font-medium hover:no-underline py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
