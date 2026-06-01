"use client";

import * as React from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { TrendingUp, Zap, Eye, Search, Film, Heart } from "lucide-react";

const stats = [
  { icon: TrendingUp, value: 312, suffix: "%", label: "Avg. revenue growth", note: "across 24 e-commerce builds" },
  { icon: Zap, value: 96, suffix: "+", label: "Lighthouse performance", note: "median across last 30 sites" },
  { icon: Eye, value: 184, suffix: "K", label: "Avg. short-form views", note: "across creator partners" },
  { icon: Search, value: 4.2, suffix: "×", label: "Organic traffic lift", note: "6-month avg post-launch" },
  { icon: Film, value: 2.1, suffix: "M", label: "Views on launch films", note: "Quanta + Helio campaigns" },
  { icon: Heart, value: 4.9, suffix: "/5", label: "Client satisfaction", note: "120+ verified reviews" },
];

export function Stats() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Outcomes, not output
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            Numbers we've earned <span className="text-gradient-accent">for clients.</span>
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-3xl border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="relative bg-background p-8 transition-colors hover:bg-secondary/40"
              >
                <div className="flex items-start justify-between">
                  <div className="grid size-10 place-items-center rounded-xl bg-secondary text-foreground">
                    <Icon className="size-4" />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    0{idx + 1}
                  </span>
                </div>
                <div className="mt-8 font-display text-5xl font-semibold tracking-tight sm:text-6xl">
                  <Counter to={s.value} />
                  <span className="text-gradient-accent">{s.suffix}</span>
                </div>
                <p className="mt-2 text-sm font-medium">{s.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.note}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Counter({ to }: { to: number }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) =>
    Number.isInteger(to) ? Math.round(v).toString() : v.toFixed(1)
  );

  React.useEffect(() => {
    if (inView) {
      const controls = animate(mv, to, { duration: 1.4, ease: [0.2, 0.8, 0.2, 1] });
      return controls.stop;
    }
  }, [inView, mv, to]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{display}</motion.span>
    </span>
  );
}
