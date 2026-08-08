"use client";

import { SectionHeader, Assemble } from "./primitives";

const ENTRIES = [
  {
    ref: "LOG-014",
    quote:
      "They rebuilt our marketing site in six weeks. Demo bookings tripled and the site finally closes for us.",
    name: "Maya Chen",
    role: "VP Marketing, Lumen",
    metric: "3×",
    metricLabel: "demo bookings",
  },
  {
    ref: "LOG-021",
    quote:
      "The most thoughtful design partner we've worked with — they asked the question we should have asked ourselves.",
    name: "Rahul Verma",
    role: "Founder, Helio Labs",
    metric: "6 wk",
    metricLabel: "to launch",
  },
  {
    ref: "LOG-033",
    quote:
      "From kickoff to launch in 28 days, Lighthouse 99 on mobile. They ship exactly what was scoped.",
    name: "Priya Nair",
    role: "Head of Growth, Northwind",
    metric: "99",
    metricLabel: "Lighthouse",
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="border-b border-bp-line bg-bp-paper">
      <div className="container-px mx-auto max-w-7xl py-24 sm:py-32">
        <SectionHeader
          index="02"
          label="CLIENT LOG / VERIFIED"
          title="What our clients report."
          intro="120+ engagements. 94% renewal. Field notes from the teams we've shipped with."
        />

        <div className="mt-14 grid gap-px border border-bp-line bg-bp-line lg:grid-cols-3">
          {ENTRIES.map((e, i) => (
            <Assemble key={e.ref} delay={i * 0.07}>
              <figure className="flex h-full flex-col bg-bp-surface p-7 sm:p-8">
                <div className="flex items-center justify-between border-b border-bp-line pb-3">
                  <span className="bp-label text-bp-ink/70">{e.ref}</span>
                  <span className="bp-label">VERIFIED ✓</span>
                </div>

                <blockquote className="mt-5 flex-1 font-text text-[15px] leading-relaxed text-bp-ink">
                  {e.quote}
                </blockquote>

                <div className="mt-6 flex items-end justify-between gap-4 border-t border-bp-line pt-4">
                  <figcaption>
                    <div className="font-display text-sm font-semibold text-bp-ink">{e.name}</div>
                    <div className="bp-label mt-0.5 normal-case tracking-normal">{e.role}</div>
                  </figcaption>
                  <div className="text-right">
                    <div className="font-mono text-xl font-semibold text-bp-ink">{e.metric}</div>
                    <div className="bp-label">{e.metricLabel}</div>
                  </div>
                </div>
              </figure>
            </Assemble>
          ))}
        </div>

        {/* CTA ledger row */}
        <Assemble delay={0.1}>
          <div className="mt-px flex flex-col items-start justify-between gap-5 border border-bp-line bg-bp-ink p-8 sm:flex-row sm:items-center">
            <div>
              <p className="bp-label flex items-center gap-2 text-bp-paper/70">
                <span className="inline-block h-2 w-2 bg-bp-accent" />
                NEXT STEP
              </p>
              <p className="mt-3 font-display text-2xl font-semibold text-bp-paper">
                Have a system to build?
              </p>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 border border-bp-paper/30 px-6 py-3 font-mono text-xs uppercase tracking-[0.14em] text-bp-paper transition-colors hover:bg-bp-paper hover:text-bp-ink"
            >
              Open a project →
            </a>
          </div>
        </Assemble>
      </div>
    </section>
  );
}
