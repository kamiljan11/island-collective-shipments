import { motion } from "framer-motion";
import { useState } from "react";

export function QuoteSection() {
  const [formType, setFormType] = useState<"links" | "sourcing">("links");
  const [priority, setPriority] = useState<"standard" | "urgent">("standard");

  return (
    <section id="quote" className="py-24 px-4 bg-secondary/20">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">
            REQUEST <span className="text-primary">QUOTE</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Our team will respond with a quote within 24 business hours.
          </p>

          <div className="bg-card border border-border rounded-xl p-6 sm:p-8 space-y-6">
            {/* Type toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setFormType("links")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${formType === "links" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
              >
                I have Links
              </button>
              <button
                onClick={() => setFormType("sourcing")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${formType === "sourcing" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
              >
                Sourcing Request
              </button>
            </div>

            {/* Priority */}
            <div>
              <label className="text-xs font-semibold tracking-wider text-muted-foreground block mb-2">
                SHIPPING PRIORITY
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setPriority("standard")}
                  className={`flex-1 px-4 py-3 rounded-md text-sm transition-colors border ${priority === "standard" ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground"}`}
                >
                  <span className="font-semibold block">Freight (STD)</span>
                  <span className="text-xs">14-Day Cycle</span>
                </button>
                <button
                  onClick={() => setPriority("urgent")}
                  className={`flex-1 px-4 py-3 rounded-md text-sm transition-colors border ${priority === "urgent" ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground"}`}
                >
                  <span className="font-semibold block">Urgent Air</span>
                  <span className="text-xs">3-5 Day Express</span>
                </button>
              </div>
            </div>

            {/* Fields */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold tracking-wider text-muted-foreground block mb-1.5">
                  {formType === "links" ? "SUPPLIER LINK / CATALOG ITEM *" : "WHAT DO YOU NEED? *"}
                </label>
                <textarea
                  className="w-full bg-input border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px] resize-y"
                  placeholder={formType === "links" ? "Paste links to products or describe what you need..." : "Describe the items, brands, specifications..."}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold tracking-wider text-muted-foreground block mb-1.5">EST. TOTAL VALUE</label>
                  <input className="w-full bg-input border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="€0" />
                </div>
                <div>
                  <label className="text-xs font-semibold tracking-wider text-muted-foreground block mb-1.5">WEIGHT/PALLETS</label>
                  <input className="w-full bg-input border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="e.g. 200kg / 1 pallet" />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold tracking-wider text-muted-foreground block mb-1.5">COMPANY NAME *</label>
                <input className="w-full bg-input border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold tracking-wider text-muted-foreground block mb-1.5">KENNITALA *</label>
                  <input className="w-full bg-input border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="text-xs font-semibold tracking-wider text-muted-foreground block mb-1.5">EMAIL ADDRESS *</label>
                  <input type="email" className="w-full bg-input border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>
            </div>

            <button className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors">
              Submit Quote Request
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
