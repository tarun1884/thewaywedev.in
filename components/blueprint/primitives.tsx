"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/* ── Mono spec-bar: a thin labeled status rule ───────────────────── */
export function SpecBar({
  left,
  right,
  className,
}: {
  left: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 border-y border-bp-line py-2",
        className
      )}
    >
      <span className="bp-label">{left}</span>
      {right ? <span className="bp-label text-bp-ink/70">{right}</span> : null}
    </div>
  );
}

/* ── Numbered section header (report-chapter style) ──────────────── */
export function SectionHeader({
  index,
  label,
  title,
  intro,
  className,
}: {
  index: string; // e.g. "01"
  label: string; // mono kicker
  title: React.ReactNode;
  intro?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border-t-2 border-bp-ink pt-5", className)}>
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-sm text-bp-accent">{index}</span>
        <span className="bp-label">{label}</span>
      </div>
      <div className="mt-5 grid gap-6 lg:grid-cols-12">
        <h2 className="font-display text-3xl font-semibold leading-[1.05] tracking-[-0.02em] text-bp-ink sm:text-4xl lg:col-span-7 lg:text-[2.75rem]">
          {title}
        </h2>
        {intro ? (
          <p className="font-text text-[15px] leading-relaxed text-bp-muted lg:col-span-5 lg:pt-1">
            {intro}
          </p>
        ) : null}
      </div>
    </div>
  );
}

/* ── Framed module with blueprint corner ticks ───────────────────── */
export function Framed({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("bp-frame", className)}>{children}</div>;
}

/* ── Reveal wrapper: subtle assembly slide-in ────────────────────── */
export function Assemble({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
