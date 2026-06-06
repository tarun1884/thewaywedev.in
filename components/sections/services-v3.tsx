"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2, Palette, Video, Sparkles,
  Type, Share2, Bot, ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    id: "web",
    icon: Code2,
    title: "Web Development",
    desc: "Next.js, React, edge infra. Sites that score 99 on Lighthouse and convert.",
    tags: ["Next.js 15", "TypeScript", "Edge"],
    color: "#8b2fff",
    glow: "139,47,255",
  },
  {
    id: "design",
    icon: Palette,
    title: "UI/UX Design",
    desc: "Figma systems, prototypes, and pixel-perfect interfaces that actually convert.",
    tags: ["Figma", "Prototyping", "Design System"],
    color: "#ff006e",
    glow: "255,0,110",
  },
  {
    id: "video",
    icon: Video,
    title: "Video Editing",
    desc: "Cinematic edits for brand films, ads, and scroll-stopping short-form content.",
    tags: ["Premiere", "Color grade", "Sound"],
    color: "#00f5ff",
    glow: "0,245,255",
  },
  {
    id: "motion",
    icon: Sparkles,
    title: "Motion Graphics",
    desc: "2D/3D motion, product reveals, logo animations and Lottie-ready exports.",
    tags: ["After Effects", "Cinema 4D", "Lottie"],
    color: "#ffd60a",
    glow: "255,214,10",
  },
  {
    id: "brand",
    icon: Type,
    title: "Branding",
    desc: "Logo systems, typography, colour and voice — brand identity with real intent.",
    tags: ["Logo", "Typography", "Brand Book"],
    color: "#ff4d6d",
    glow: "255,77,109",
  },
  {
    id: "social",
    icon: Share2,
    title: "Social Media",
    desc: "Scroll-stopping content engines for Instagram, TikTok and LinkedIn.",
    tags: ["Strategy", "Creative", "Analytics"],
    color: "#00e5ff",
    glow: "0,229,255",
  },
  {
    id: "ai",
    icon: Bot,
    title: "AI Automation",
    desc: "Custom agents, RAG pipelines and workflows that multiply your team's output.",
    tags: ["Anthropic", "Agents", "RAG"],
    color: "#a855f7",
    glow: "168,85,247",
  },
];

export function ServicesV3() {
  const ref    = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    /* ── Solid background covers the fixed 3D canvas ─── */
    <section
      id="services"
      ref={ref}
      className="relative z-10 py-32 sm:py-44"
      style={{ background: "#04030f" }}
    >
      {/* Subtle top edge gradient so it blends with hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32"
        style={{ background: "linear-gradient(to bottom, transparent, #04030f)" }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">

        {/* ── Section header ───────────────────────────── */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/30"
          >
            What we craft
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl font-black tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl"
          >
            Seven crafts.{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#ff006e,#8b2fff,#00f5ff)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Infinite outcomes.
            </span>
          </motion.h2>
        </div>

        {/* ── Service grid ─────────────────────────────── */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} s={s} i={i} inView={inView} />
          ))}

          {/* CTA tile */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: SERVICES.length * 0.06 + 0.12 }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <Link
              href="#contact"
              className="group flex h-full flex-col items-start justify-between rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "linear-gradient(135deg,rgba(255,0,110,0.12),rgba(139,47,255,0.12),rgba(0,245,255,0.08))",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <div>
                <p className="font-display text-xl font-bold text-white">Ready to start?</p>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  Book a free 20-min strategy call. No pitch, no commitment.
                </p>
              </div>
              <span
                className="mt-8 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 group-hover:gap-3"
                style={{ background: "linear-gradient(135deg,#ff006e,#8b2fff)" }}
              >
                Get in touch <ArrowUpRight className="size-4" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Individual card ─────────────────────────────────── */
function ServiceCard({
  s,
  i,
  inView,
}: {
  s: (typeof SERVICES)[number];
  i: number;
  inView: boolean;
}) {
  const Icon = s.icon;
  const [hov, setHov] = React.useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.06 + 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="group relative flex flex-col overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1.5"
      style={{
        background: hov
          ? `linear-gradient(135deg, rgba(${s.glow},0.12) 0%, rgba(255,255,255,0.04) 100%)`
          : "rgba(255,255,255,0.05)",
        border: hov
          ? `1px solid rgba(${s.glow},0.5)`
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow: hov
          ? `0 0 25px rgba(${s.glow},0.2), 0 0 60px rgba(${s.glow},0.06), inset 0 0 20px rgba(${s.glow},0.05)`
          : "none",
        transition: "all 0.3s ease",
      }}
    >
      {/* Corner glow */}
      <div
        className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full blur-2xl transition-opacity duration-500"
        style={{
          background: `rgba(${s.glow},0.35)`,
          opacity: hov ? 1 : 0,
        }}
        aria-hidden
      />

      {/* Icon */}
      <div
        className="mb-5 grid size-12 place-items-center rounded-xl transition-all duration-300"
        style={{
          background: hov ? `rgba(${s.glow},0.2)` : "rgba(255,255,255,0.08)",
          border: hov ? `1px solid rgba(${s.glow},0.4)` : "1px solid rgba(255,255,255,0.06)",
          boxShadow: hov ? `0 0 16px rgba(${s.glow},0.3)` : "none",
          color: hov ? s.color : "rgba(255,255,255,0.6)",
        }}
      >
        <Icon className="size-5" />
      </div>

      {/* Text */}
      <h3
        className="font-display text-[15px] font-bold leading-snug transition-colors duration-300"
        style={{ color: hov ? s.color : "rgba(255,255,255,0.92)" }}
      >
        {s.title}
      </h3>
      <p className="mt-2 flex-1 text-xs leading-relaxed text-white/45">{s.desc}</p>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {s.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full px-2.5 py-0.5 text-[10px] font-medium transition-all duration-300"
            style={{
              background: hov ? `rgba(${s.glow},0.15)` : "rgba(255,255,255,0.06)",
              color: hov ? s.color : "rgba(255,255,255,0.35)",
              border: `1px solid ${hov ? `rgba(${s.glow},0.3)` : "rgba(255,255,255,0.06)"}`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Arrow */}
      <ArrowUpRight
        className="absolute right-4 top-4 size-4 opacity-0 transition-all duration-300 group-hover:opacity-100"
        style={{ color: s.color }}
      />
    </motion.article>
  );
}
