"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/lib/services";
import { formatPrice, cn } from "@/lib/utils";

type Size = "starter" | "growth" | "scale";
type Timeline = "rush" | "standard" | "flexible";

const sizeMultipliers: Record<Size, { factor: number; label: string; sub: string }> = {
  starter: { factor: 1, label: "Starter", sub: "1–5 pages / simple scope" },
  growth: { factor: 2.2, label: "Growth", sub: "6–20 pages / mid-complexity" },
  scale: { factor: 4.5, label: "Scale", sub: "Custom platform / many integrations" },
};

const timelineMultipliers: Record<Timeline, { factor: number; label: string; sub: string }> = {
  rush: { factor: 1.3, label: "Rush", sub: "≤ 3 weeks" },
  standard: { factor: 1, label: "Standard", sub: "4–8 weeks" },
  flexible: { factor: 0.9, label: "Flexible", sub: "8+ weeks" },
};

export function PricingCalculator() {
  const [selected, setSelected] = React.useState<string[]>(["web", "design"]);
  const [size, setSize] = React.useState<Size>("growth");
  const [timeline, setTimeline] = React.useState<Timeline>("standard");

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const { low, high } = React.useMemo(() => {
    const base = selected.reduce(
      (acc, id) => acc + (services.find((s) => s.id === id)?.startsAt ?? 0),
      0
    );
    const adjusted = base * sizeMultipliers[size].factor * timelineMultipliers[timeline].factor;
    return { low: adjusted, high: adjusted * 1.4 };
  }, [selected, size, timeline]);

  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Transparent pricing"
          title={<>Build your <span className="text-gradient-accent">estimate</span>.</>}
          subtitle="Pick services, scope, and timeline. Get a realistic range in seconds — no forms, no sales calls (unless you want one)."
          align="center"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {/* LEFT: configurator */}
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur sm:p-8">
              <h3 className="mb-4 font-display text-lg font-semibold">1. Services</h3>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {services.map((s) => {
                  const Icon = s.icon;
                  const isOn = selected.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggle(s.id)}
                      aria-pressed={isOn}
                      className={cn(
                        "group flex items-center justify-between rounded-xl border p-3 text-left transition-all",
                        isOn
                          ? "border-foreground/40 bg-foreground/5"
                          : "border-border/60 bg-background hover:border-border"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "grid size-9 place-items-center rounded-lg bg-gradient-to-br text-white transition-transform",
                            s.accent,
                            isOn ? "scale-100 opacity-100" : "opacity-60"
                          )}
                        >
                          <Icon className="size-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{s.title}</p>
                          <p className="text-[11px] text-muted-foreground">
                            from {formatPrice(s.startsAt)}
                          </p>
                        </div>
                      </div>
                      <span
                        className={cn(
                          "grid size-5 place-items-center rounded-full border transition-colors",
                          isOn
                            ? "border-foreground bg-foreground text-background"
                            : "border-border bg-transparent"
                        )}
                      >
                        {isOn ? <Check className="size-3" /> : null}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <SelectGroup
                title="2. Project size"
                items={Object.entries(sizeMultipliers).map(([k, v]) => ({ id: k, ...v }))}
                value={size}
                onChange={(v) => setSize(v as Size)}
              />
              <SelectGroup
                title="3. Timeline"
                items={Object.entries(timelineMultipliers).map(([k, v]) => ({ id: k, ...v }))}
                value={timeline}
                onChange={(v) => setTimeline(v as Timeline)}
              />
            </div>
          </div>

          {/* RIGHT: estimate */}
          <motion.aside
            layout
            className="sticky top-24 self-start rounded-3xl border border-border/60 bg-gradient-to-b from-card/80 to-card/40 p-6 backdrop-blur sm:p-8"
          >
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <Sparkles className="size-3.5" /> Live estimate
            </div>
            <div className="mt-4">
              {selected.length === 0 ? (
                <p className="font-display text-2xl font-semibold text-muted-foreground">
                  Pick at least one service.
                </p>
              ) : (
                <>
                  <p className="font-display text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
                    {formatPrice(low)}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    to <span className="font-medium text-foreground">{formatPrice(high)}</span>
                  </p>
                </>
              )}
            </div>

            <ul className="my-6 space-y-2 border-y border-border/60 py-5 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <Check className="size-3.5 text-emerald-500" />
                Fixed-scope contract, no surprises
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-3.5 text-emerald-500" />
                30-day post-launch optimization
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-3.5 text-emerald-500" />
                Weekly Loom updates + Slack channel
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-3.5 text-emerald-500" />
                You own all source files & code
              </li>
            </ul>

            <div className="space-y-2">
              <Button asChild variant="accent" className="w-full" size="lg">
                <Link href="/#contact">
                  Send inquiry <MessageCircle className="size-4" />
                </Link>
              </Button>
              <p className="text-center text-[11px] text-muted-foreground">
                Estimates are indicative. Final quote within 48h after a 20-min intro call.
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function SelectGroup<T extends string>({
  title,
  items,
  value,
  onChange,
}: {
  title: string;
  items: { id: T; label: string; sub: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur sm:p-8">
      <h3 className="mb-4 font-display text-lg font-semibold">{title}</h3>
      <div className="grid gap-2">
        {items.map((it) => {
          const isOn = it.id === value;
          return (
            <button
              key={it.id}
              type="button"
              onClick={() => onChange(it.id)}
              aria-pressed={isOn}
              className={cn(
                "flex items-center justify-between rounded-xl border p-3 text-left transition-all",
                isOn
                  ? "border-foreground/40 bg-foreground/5"
                  : "border-border/60 bg-background hover:border-border"
              )}
            >
              <div>
                <p className="text-sm font-medium">{it.label}</p>
                <p className="text-[11px] text-muted-foreground">{it.sub}</p>
              </div>
              <span
                className={cn(
                  "grid size-5 place-items-center rounded-full border transition-colors",
                  isOn
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-transparent"
                )}
              >
                {isOn ? <Check className="size-3" /> : null}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
