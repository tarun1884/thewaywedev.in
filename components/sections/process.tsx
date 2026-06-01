"use client";

import { motion } from "framer-motion";
import { Compass, PencilRuler, Hammer, Rocket } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  {
    icon: Compass,
    title: "Discover",
    summary: "Audit, interviews, and a sharp brief in one week.",
    detail: "We start with your business goals — not your wireframes. Stakeholder interviews, market scan, and a one-pager that aligns the team before a single pixel moves.",
  },
  {
    icon: PencilRuler,
    title: "Design",
    summary: "Strategy → identity → prototype, in tight loops.",
    detail: "Daily design Loom updates, weekly check-ins. We prototype in Figma at fidelity that matches the decision being made — no theatre.",
  },
  {
    icon: Hammer,
    title: "Build",
    summary: "Production-ready code, motion, and content.",
    detail: "Next.js, type-safe APIs, and CMS handoff. Performance budgets enforced in CI. You see staging on day one, not week eight.",
  },
  {
    icon: Rocket,
    title: "Launch",
    summary: "Ship, measure, iterate — together.",
    detail: "Launch playbook, analytics wired up, and a 30-day optimization sprint baked into every engagement. We stay until the numbers move.",
  },
];

export function Process() {
  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-1/4 size-80 rounded-full bg-violet-500/10 blur-3xl" />
      </div>
      <div className="container-px relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="How we work"
          title={<>A process built for clarity, not theatre.</>}
          subtitle="Four phases, four weeks per phase, zero scope-creep games. You always know what's next."
          align="center"
        />

        <div className="mt-16 grid gap-4 lg:grid-cols-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="relative rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur"
              >
                <div className="flex items-center justify-between">
                  <div className="grid size-10 place-items-center rounded-xl bg-secondary">
                    <Icon className="size-4" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">0{idx + 1}</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-foreground/80">{step.summary}</p>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {step.detail}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
