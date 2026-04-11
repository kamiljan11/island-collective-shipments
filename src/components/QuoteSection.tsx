import { motion } from "framer-motion";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitQuoteRequest } from "@/utils/orders.functions";

export function QuoteSection() {
  const [formType, setFormType] = useState<"links" | "sourcing">("links");
  const [priority, setPriority] = useState<"standard" | "urgent">("standard");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const submitFn = useServerFn(submitQuoteRequest);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await submitFn({
        data: {
          form_type: formType,
          priority,
          content: formData.get("content") as string,
          estimated_value: (formData.get("estimated_value") as string) || undefined,
          weight_info: (formData.get("weight_info") as string) || undefined,
          company_name: formData.get("company_name") as string,
          kennitala: formData.get("kennitala") as string,
          email: formData.get("email") as string,
        },
      });
      setSubmitted(true);
    } catch (err) {
      setError("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="quote" className="py-24 px-4 bg-primary">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-xl p-12 shadow-2xl">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-2 text-primary-foreground">Quote Request Sent!</h2>
            <p className="text-muted-foreground">
              We'll respond within 24 business hours with a detailed quote.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="py-24 px-4 bg-primary">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-xl p-6 sm:p-10 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900">
                REQUEST QUOTE
              </h2>
              <p className="text-gray-500 mt-2">
                Our team will respond with a quote within 24 business hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Type toggle */}
              <div className="grid grid-cols-2 gap-0">
                <button
                  type="button"
                  onClick={() => setFormType("links")}
                  className={`py-3 text-sm font-bold tracking-wider transition-colors rounded-l-md ${formType === "links" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-500"}`}
                >
                  I HAVE LINKS
                </button>
                <button
                  type="button"
                  onClick={() => setFormType("sourcing")}
                  className={`py-3 text-sm font-bold tracking-wider transition-colors rounded-r-md ${formType === "sourcing" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-500"}`}
                >
                  SOURCING REQUEST
                </button>
              </div>

              {/* Priority */}
              <div>
                <label className="text-xs font-bold tracking-widest text-gray-500 block mb-2">
                  SHIPPING PRIORITY
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPriority("standard")}
                    className={`px-4 py-4 rounded-md text-sm transition-colors border-2 ${priority === "standard" ? "border-gray-900 bg-white text-gray-900" : "border-gray-200 text-gray-400"}`}
                  >
                    <span className="font-bold block">FREIGHT (STD)</span>
                    <span className="text-xs">14-DAY CYCLE</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPriority("urgent")}
                    className={`px-4 py-4 rounded-md text-sm transition-colors border-2 ${priority === "urgent" ? "border-primary bg-white" : "border-gray-200"}`}
                  >
                    <span className="font-bold block text-primary">URGENT AIR</span>
                    <span className="text-xs text-gray-400">3-5 DAY EXPRESS</span>
                  </button>
                </div>
              </div>

              {/* Fields */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold tracking-widest text-gray-500 block mb-1.5">
                    {formType === "links" ? "SUPPLIER LINK / CATALOG ITEM *" : "WHAT DO YOU NEED? *"}
                  </label>
                  <textarea
                    name="content"
                    required
                    className="w-full bg-gray-100 border-0 rounded-md px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px] resize-y"
                    placeholder={formType === "links" ? "https://..." : "Describe the items, brands, specifications..."}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold tracking-widest text-gray-500 block mb-1.5">EST. TOTAL VALUE</label>
                    <input name="estimated_value" className="w-full bg-gray-100 border-0 rounded-md px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="e.g. 2000 EUR" />
                  </div>
                  <div>
                    <label className="text-xs font-bold tracking-widest text-gray-500 block mb-1.5">WEIGHT/PALLETS</label>
                    <input name="weight_info" className="w-full bg-gray-100 border-0 rounded-md px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="e.g. 2 Pallets" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold tracking-widest text-gray-500 block mb-1.5">COMPANY NAME *</label>
                    <input name="company_name" required className="w-full bg-gray-100 border-0 rounded-md px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="text-xs font-bold tracking-widest text-gray-500 block mb-1.5">KENNITALA *</label>
                    <input name="kennitala" required className="w-full bg-gray-100 border-0 rounded-md px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold tracking-widest text-gray-500 block mb-1.5">EMAIL ADDRESS *</label>
                  <input name="email" type="email" required className="w-full bg-gray-100 border-0 rounded-md px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="purchasing@yourcompany.is" />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gray-900 text-white py-4 rounded-md font-bold text-sm tracking-widest uppercase hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {submitting ? "SUBMITTING..." : "SUBMIT QUOTE REQUEST"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
