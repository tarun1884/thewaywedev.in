import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { PageMasthead } from "@/components/blueprint/primitives";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent, fixed-scope pricing. Clear tiers, clear deliverables, no lock-in.",
  alternates: { canonical: "/pricing" },
};

const TIERS = [
  {
    id: "T1",
    name: "Launch Sprint",
    price: "₹5L",
    window: "21 days",
    for: "Seed / pre-launch teams needing a credible v1 fast.",
    includes: ["1–5 page marketing site", "Brand-aligned design system", "Next.js build + deploy", "Basic SEO + analytics", "1 revision round"],
    featured: false,
  },
  {
    id: "T2",
    name: "Growth Build",
    price: "₹12L+",
    window: "4–6 weeks",
    for: "Companies scaling their site into a real growth engine.",
    includes: ["Full site (8–15 pages)", "Custom component library", "CMS integration", "Core Web Vitals tuning", "Programmatic SEO setup", "30-day optimization sprint"],
    featured: true,
  },
  {
    id: "T3",
    name: "Custom Platform",
    price: "₹40L+",
    window: "6–12 weeks",
    for: "Bespoke commerce, apps, or AI systems built end-to-end.",
    includes: ["Custom architecture", "Commerce / app / AI build", "Type-safe APIs + DB", "Auth, roles, integrations", "CI perf budgets", "Ongoing retainer option"],
    featured: false,
  },
];

const FAQS = [
  { q: "How long does a typical project take?", a: "Most engagements ship in 4–8 weeks. Brand identities: 3–4 weeks. Marketing sites: 4–6 weeks. Custom platforms or AI builds: 6–12 weeks. We share a week-by-week plan before we start." },
  { q: "Who owns the code and design files?", a: "You do. 100%. Source files, design tokens, code, and content rights transfer to you on final invoice. We use your GitHub or set one up for you." },
  { q: "Do you work with early-stage startups?", a: "Yes — about 40% of our work is with seed to Series A teams. Our 21-day Launch Sprint is designed to ship a credible v1 fast." },
  { q: "What's included in post-launch support?", a: "30 days of analytics setup, performance monitoring, bug fixes, content updates, and a written optimization report with the next 3 highest-impact moves." },
  { q: "Do you offer ongoing retainers?", a: "Yes — monthly retainers start at ₹3,50,000/mo for design + dev, with dedicated hours for new features, experiments, and content production." },
];

export default function PricingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <PageMasthead
        index="§ PRICING"
        label="RATE CARD"
        right="FIXED SCOPE · NO LOCK-IN"
        title={
          <>
            Transparent pricing,
            <br /> clear deliverables.
          </>
        }
        intro="Every engagement is fixed-scope and milestone-billed. Pick the tier that fits, or talk to us for a custom quote."
      />

      <div className="bg-bp-paper">
        <div className="container-px mx-auto max-w-7xl py-16 sm:py-20">
          {/* tiers */}
          <div className="grid gap-px border border-bp-line bg-bp-line lg:grid-cols-3">
            {TIERS.map((t) => (
              <div
                key={t.id}
                className={`flex flex-col bg-bp-surface p-8 ${t.featured ? "border-t-2 border-bp-accent" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-bp-ink/55">{t.id}</span>
                  <span className="bp-label">{t.featured ? "MOST CHOSEN" : "TIER"}</span>
                </div>

                <h2 className="mt-5 font-display text-2xl font-semibold tracking-[-0.02em] text-bp-ink">
                  {t.name}
                </h2>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-semibold text-bp-ink">{t.price}</span>
                  <span className="font-mono text-[11px] text-bp-muted">/ {t.window}</span>
                </div>
                <p className="mt-3 font-text text-[13px] leading-relaxed text-bp-muted">
                  {t.for}
                </p>

                <ul className="mt-6 flex-1 space-y-2.5 border-t border-bp-line pt-5">
                  {t.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-2.5 font-text text-[13px] text-bp-ink">
                      <Check className="mt-0.5 size-4 shrink-0 text-bp-accent" />
                      {inc}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="mt-7 inline-flex items-center justify-center border border-bp-ink bg-bp-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-bp-paper transition-colors hover:bg-bp-paper hover:text-bp-ink"
                >
                  Start this tier →
                </Link>
              </div>
            ))}
          </div>

          {/* FAQ ledger */}
          <div id="faq" className="mt-20 scroll-mt-28 border-t-2 border-bp-ink pt-6">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-sm text-bp-accent">§</span>
              <span className="bp-label">FREQUENTLY ASKED</span>
            </div>
            <dl className="mt-8 grid gap-x-12 gap-y-8 lg:grid-cols-2">
              {FAQS.map((f, i) => (
                <div key={i} className="border-t border-bp-line pt-5">
                  <dt className="flex gap-3 font-display text-lg font-semibold text-bp-ink">
                    <span className="font-mono text-xs text-bp-accent">Q{i + 1}</span>
                    {f.q}
                  </dt>
                  <dd className="mt-2 pl-8 font-text text-[14px] leading-relaxed text-bp-muted">
                    {f.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
