"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Most engagements ship in 4–8 weeks. Brand identities: 3–4 weeks. Marketing sites: 4–6 weeks. Custom platforms or AI builds: 6–12 weeks. We share a week-by-week plan before we start.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Yes — about 40% of our work is with seed to Series A teams. We offer a focused 'Launch Sprint' package designed to ship a credible v1 in 21 days.",
  },
  {
    q: "Who owns the code and design files?",
    a: "You do. 100%. Source files, design tokens, code, and content rights transfer to you on final invoice. We use your GitHub or set one up for you.",
  },
  {
    q: "What's included in the 30-day post-launch support?",
    a: "Analytics setup, performance monitoring, bug fixes, content updates, and a written optimization report at day 30 with the next 3 highest-impact moves.",
  },
  {
    q: "Can you work with our existing dev / design team?",
    a: "Absolutely. We frequently embed alongside in-house teams as a senior strategy + execution partner. We can lead, follow, or augment.",
  },
  {
    q: "Do you offer ongoing retainers?",
    a: "Yes — monthly retainers start at ₹3,50,000/mo for design + dev, with dedicated hours for new features, experiments, and content production.",
  },
];

export function FAQ() {
  const [open, setOpen] = React.useState<number | null>(0);

  // FAQ schema for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="container-px mx-auto max-w-4xl">
        <SectionHeading eyebrow="FAQ" title={<>Questions, answered.</>} align="center" />

        <div className="mt-12 divide-y divide-border/60 rounded-3xl border border-border/60 bg-card/40 backdrop-blur">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base font-semibold sm:text-lg">{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="grid size-8 shrink-0 place-items-center rounded-full border border-border/60 bg-secondary/40"
                  >
                    <Plus className="size-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}
