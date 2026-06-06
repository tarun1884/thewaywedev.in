"use client";

import * as React from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { TrendingUp, Zap, Eye, Search, Film, Heart } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";

const stats = [
  { icon: TrendingUp, value: 312, suffix: "%", label: "Avg. revenue growth", note: "across 24 e-commerce builds", accent: "from-violet-500 to-indigo-500" },
  { icon: Zap, value: 96, suffix: "+", label: "Lighthouse performance", note: "median across last 30 sites", accent: "from-amber-500 to-orange-500" },
  { icon: Eye, value: 184, suffix: "K", label: "Avg. short-form views", note: "across creator partners", accent: "from-sky-500 to-cyan-500" },
  { icon: Search, value: 4.2, suffix: "×", label: "Organic traffic lift", note: "6-month avg post-launch", accent: "from-emerald-500 to-teal-500" },
  { icon: Film, value: 2.1, suffix: "M", label: "Views on launch films", note: "Quanta + Helio campaigns", accent: "from-pink-500 to-rose-500" },
  { icon: Heart, value: 4.9, suffix: "/5", label: "Client satisfaction", note: "120+ verified reviews", accent: "from-fuchsia-500 to-purple-500" },
];

export function Stats() {
  return (
    <section className="relative py-24 sm:py-32">
      {/* Background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-1/3 top-1/4 size-80 rounded-full bg-violet-500/8 blur-3xl" />
        <div className="absolute left-1/4 bottom-1/3 size-64 rounded-full bg-fuchsia-500/8 blur-3xl" />
      </div>

      <div className="container-px relative mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground"
          >
            Outcomes, not output
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-display text-3xl font-semibold tracking-tight sm:text-5xl"
          >
            Numbers we've earned{" "}
            <span className="text-gradient-accent">for clients.</span>
          </motion.h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
              >
                <TiltCard
                  intensity={9}
                  scale={1.025}
                  className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-7 backdrop-blur shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30"
                >
                  {/* Corner glow */}
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-gradient-to-br ${s.accent} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20`}
                  />

                  {/* Accent line */}
                  <div className={`mb-5 h-0.5 w-10 rounded-full bg-gradient-to-r ${s.accent}`} />

                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-display text-5xl font-semibold tracking-tight tabular-nums sm:text-6xl">
                        <Counter to={s.value} />
                        <span className="text-gradient-accent">{s.suffix}</span>
                      </div>
                      <p className="mt-2 text-sm font-medium">{s.label}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{s.note}</p>
                    </div>
                    <div className={`grid size-10 place-items-center rounded-xl bg-gradient-to-br ${s.accent} text-white shadow-md opacity-80`}>
                      <Icon className="size-4" />
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
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
      const controls = animate(mv, to, { duration: 1.6, ease: [0.2, 0.8, 0.2, 1] });
      return controls.stop;
    }
  }, [inView, mv, to]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{display}</motion.span>
    </span>
  );
}
