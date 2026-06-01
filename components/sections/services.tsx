"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/lib/services";
import { formatPrice } from "@/lib/utils";

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="What we do"
          title={<>Seven crafts. <br className="hidden sm:block" /> One studio.</>}
          subtitle="A vertically integrated team — strategy, design, motion, code, and AI — under one roof. No silos, no handoffs, no excuses."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, idx) => (
            <ServiceCard key={s.id} service={s} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const Icon = service.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur transition-colors hover:border-border"
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-gradient-to-br ${service.accent} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30`}
      />

      <div className="flex items-start justify-between">
        <div className={`grid size-11 place-items-center rounded-xl bg-gradient-to-br ${service.accent} text-white shadow-lg`}>
          <Icon className="size-5" />
        </div>
        <Link
          href={`/services#${service.id}`}
          aria-label={`Learn more about ${service.title}`}
          className="grid size-9 place-items-center rounded-full border border-border/60 text-muted-foreground transition-all group-hover:rotate-45 group-hover:border-foreground group-hover:text-foreground"
        >
          <ArrowUpRight className="size-4" />
        </Link>
      </div>

      <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">
        {service.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {service.description}
      </p>

      <ul className="mt-5 grid grid-cols-2 gap-1.5">
        {service.benefits.map((b) => (
          <li key={b} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Check className="size-3 text-emerald-500" />
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-end justify-between border-t border-border/50 pt-4">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Starts at</p>
          <p className="font-display text-xl font-semibold">
            {formatPrice(service.startsAt)}
          </p>
        </div>
        <Link
          href="/#contact"
          className="text-xs font-medium underline-offset-4 hover:underline"
        >
          Get a quote →
        </Link>
      </div>
    </motion.article>
  );
}
