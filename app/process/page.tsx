import type { Metadata } from "next";
import Link from "next/link";
import { PageMasthead } from "@/components/blueprint/primitives";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How we work — four phases, four weeks per phase, zero scope-creep games. Discover, design, build, launch.",
  alternates: { canonical: "/process" },
};

const PHASES = [
  {
    id: "P1",
    name: "Discover",
    window: "WEEK 1",
    summary: "Audit, interviews, and a sharp brief.",
    detail:
      "We start with your business goals — not wireframes. Stakeholder interviews, market scan, and a one-page brief that aligns the team before a single pixel moves.",
    outputs: ["Stakeholder interviews", "Technical audit", "One-page brief"],
  },
  {
    id: "P2",
    name: "Design",
    window: "WEEK 2–3",
    summary: "Strategy → identity → prototype, in tight loops.",
    detail:
      "Daily design Looms, weekly check-ins. We prototype in Figma at the fidelity that matches the decision being made — no theatre.",
    outputs: ["Figma system", "Interactive prototype", "Design tokens"],
  },
  {
    id: "P3",
    name: "Build",
    window: "WEEK 3–5",
    summary: "Production-ready code, motion, and content.",
    detail:
      "Next.js, type-safe APIs, CMS handoff. Performance budgets enforced in CI. You see staging on day one, not week eight.",
    outputs: ["Next.js build", "CI perf budgets", "Staging on day one"],
  },
  {
    id: "P4",
    name: "Launch",
    window: "WEEK 5–6",
    summary: "Ship, measure, iterate — together.",
    detail:
      "Launch playbook, analytics wired up, and a 30-day optimization sprint baked into every engagement. We stay until the numbers move.",
    outputs: ["Launch playbook", "Analytics wired", "30-day optimization"],
  },
];

export default function ProcessPage() {
  return (
    <>
      <PageMasthead
        index="§ PROCESS"
        label="ASSEMBLY SEQUENCE"
        right="4 PHASES · ~6 WEEKS"
        title={
          <>
            A process built for
            <br /> clarity, not theatre.
          </>
        }
        intro="Four phases, roughly a week or two each, zero scope-creep games. You always know exactly what's next and what you'll receive."
      />

      <div className="bg-bp-paper">
        <div className="container-px mx-auto max-w-7xl py-16 sm:py-20">
          <div className="relative">
            {/* spine */}
            <div className="absolute left-[15px] top-2 bottom-2 hidden w-px bg-bp-ink/25 sm:block" />

            <ol className="space-y-px">
              {PHASES.map((p) => (
                <li key={p.id} className="relative">
                  <div className="grid gap-6 border border-bp-line bg-bp-surface p-7 sm:grid-cols-12 sm:gap-8 sm:p-9 sm:pl-16">
                    {/* node */}
                    <span className="absolute left-[9px] top-9 hidden size-3.5 rounded-full border-2 border-bp-ink bg-bp-paper sm:block" />

                    <div className="sm:col-span-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm text-bp-accent">{p.id}</span>
                        <span className="bp-label">{p.window}</span>
                      </div>
                      <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] text-bp-ink">
                        {p.name}
                      </h2>
                      <p className="mt-2 font-text text-[14px] leading-relaxed text-bp-ink/80">
                        {p.summary}
                      </p>
                    </div>

                    <div className="sm:col-span-5">
                      <p className="font-text text-[14px] leading-relaxed text-bp-muted">
                        {p.detail}
                      </p>
                    </div>

                    <div className="sm:col-span-3">
                      <div className="bp-label border-b border-bp-line pb-2">DELIVERABLES</div>
                      <ul className="mt-3 space-y-2">
                        {p.outputs.map((o) => (
                          <li key={o} className="flex items-center gap-2 font-mono text-[11px] text-bp-ink">
                            <span className="inline-block h-1 w-1 bg-bp-accent" />
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-start justify-between gap-5 border border-bp-line bg-bp-ink p-8 sm:flex-row sm:items-center">
            <p className="font-display text-2xl font-semibold text-bp-paper">
              Ready to start Phase 1?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-bp-paper/30 px-6 py-3 font-mono text-xs uppercase tracking-[0.14em] text-bp-paper transition-colors hover:bg-bp-paper hover:text-bp-ink"
            >
              Book discovery →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
