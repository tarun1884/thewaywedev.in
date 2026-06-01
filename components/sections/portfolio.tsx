"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects, projectCategories } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function Portfolio() {
  const [active, setActive] = React.useState<(typeof projectCategories)[number]>("All");

  const filtered = React.useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="container-px mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title={<>Work we're proud to ship.</>}
            subtitle="A curated slice — case studies with measurable outcomes, not vanity metrics."
          />
          <div className="flex flex-wrap gap-1.5 rounded-full border border-border/60 bg-secondary/40 p-1 backdrop-blur">
            {projectCategories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                  active === c
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-12 grid gap-6 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, idx) => (
              <motion.article
                layout
                key={p.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, delay: idx * 0.03 }}
                className={cn(
                  "group relative overflow-hidden rounded-3xl border border-border/60 bg-card",
                  idx === 0 && "lg:col-span-2"
                )}
              >
                <Link href={`/portfolio/${p.slug}`} className="block">
                  <div className={cn("relative w-full overflow-hidden", idx === 0 ? "aspect-[21/9]" : "aspect-[16/10]")}>
                    <Image
                      src={p.cover}
                      alt={p.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
                    <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur">
                      {p.category}
                    </span>
                  </div>
                  <div className="relative -mt-14 px-6 pb-6">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">{p.client} · {p.year}</p>
                        <h3 className="mt-1 font-display text-xl font-semibold tracking-tight sm:text-2xl">
                          {p.title}
                        </h3>
                        <p className="mt-2 max-w-xl text-sm text-muted-foreground">{p.blurb}</p>
                      </div>
                      <div className="hidden shrink-0 sm:block">
                        <span className="grid size-11 place-items-center rounded-full border border-border/60 bg-background/80 backdrop-blur transition-all group-hover:rotate-45 group-hover:border-foreground">
                          <ArrowUpRight className="size-4" />
                        </span>
                      </div>
                    </div>
                    <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border/60 pt-4">
                      {p.metrics.map((m) => (
                        <div key={m.label}>
                          <p className="font-display text-base font-semibold sm:text-lg">{m.value}</p>
                          <p className="text-[11px] text-muted-foreground">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
