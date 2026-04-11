import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Do I get a proper VAT invoice?", a: "Yes. Every order includes a valid Icelandic VAT invoice from Mountain All Service ehf. Clean bookkeeping and easy VAT reclamation — whether you're a business or an individual." },
  { q: "Why not just buy direct from Europe?", a: "Most European stores won't ship to Iceland, can't handle customs, and don't issue local invoices. We solve all three — and save you money by consolidating shipments." },
  { q: "Can you combine orders from different stores?", a: "Absolutely. We receive goods from multiple EU suppliers at our hub in Poland, repack everything, and ship it as one consolidated shipment to Iceland." },
  { q: "What are the payment terms?", a: "We require payment before purchasing from suppliers. For returning customers, we're happy to discuss flexible arrangements." },
  { q: "How fast can you deliver?", a: "Standard container shipping takes 14–30 working days depending on the route. For urgent items, we offer air freight in 5–7 working days." },
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
          Common questions
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
              <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
