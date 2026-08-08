"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* Stage rows of the delivery-system schematic */
const STAGES = [
  { id: "01", name: "Architecture", note: "Next.js 15 · Edge", metric: "99", metricUnit: "Lighthouse" },
  { id: "02", name: "Commerce", note: "Shopify · Stripe", metric: "+138%", metricUnit: "avg CVR" },
  { id: "03", name: "Performance SEO", note: "Core Web Vitals", metric: "4.2×", metricUnit: "organic" },
  { id: "04", name: "UI/UX Systems", note: "Design tokens", metric: "94%", metricUnit: "CSAT" },
];

/* ── The annotated architecture diagram (signature motif) ────────── */
function DeliverySchematic() {
  const spineTop = 44;
  const rowY = [92, 176, 260, 344]; // node centers
  const spineX = 66;
  const boxX = 104;
  const boxW = 250;
  const boxH = 60;

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    show: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 0.7, delay: 0.15 + i * 0.12, ease: "easeInOut" }, opacity: { duration: 0.01, delay: 0.15 + i * 0.12 } },
    }),
  };

  return (
    <svg
      viewBox="0 0 560 400"
      className="h-auto w-full min-w-[460px]"
      role="img"
      aria-label="thewaywedev delivery system schematic: architecture, commerce, SEO and UI/UX systems"
    >
      {/* Figure label */}
      <text x="0" y="18" className="font-mono fill-bp-muted" fontSize="10.5" letterSpacing="2">
        FIG.01 — DELIVERY SYSTEM
      </text>
      <line x1="0" y1="28" x2="560" y2="28" stroke="#CBC6BA" strokeWidth="1" />

      {/* Spine */}
      <motion.line
        x1={spineX} y1={spineTop} x2={spineX} y2={rowY[3]}
        stroke="#102033" strokeWidth="1.5"
        variants={draw} custom={0} initial="hidden" whileInView="show" viewport={{ once: true }}
      />

      {/* Cross-link: architecture <-> performance are coupled (shared perf budget) */}
      <path
        d={`M${spineX} ${rowY[0]} C 22 ${rowY[0]}, 22 ${rowY[2]}, ${spineX} ${rowY[2]}`}
        fill="none" stroke="#A8B3BF" strokeWidth="1" strokeDasharray="3 3"
      />
      <text
        x="15" y={(rowY[0] + rowY[2]) / 2} className="font-mono fill-bp-muted" fontSize="8.5"
        letterSpacing="1.5" transform={`rotate(-90 15 ${(rowY[0] + rowY[2]) / 2})`} textAnchor="middle"
      >
        SHARED PERF BUDGET
      </text>

      {/* Build node at top of spine */}
      <rect x={spineX - 6} y={spineTop - 6} width="12" height="12" fill="#D96A3B" transform={`rotate(45 ${spineX} ${spineTop})`} />
      <text x={spineX + 16} y={spineTop + 4} className="font-mono fill-bp-ink" fontSize="10.5" letterSpacing="1.5">BUILD</text>

      {STAGES.map((s, i) => {
        const y = rowY[i];
        return (
          <g key={s.id}>
            {/* connector spine -> box */}
            <motion.line
              x1={spineX} y1={y} x2={boxX} y2={y}
              stroke="#102033" strokeWidth="1.25"
              variants={draw} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
            />
            {/* node dot */}
            <circle cx={spineX} cy={y} r="4" fill="#EAE6DC" stroke="#102033" strokeWidth="1.5" />

            {/* module box */}
            <rect x={boxX} y={y - boxH / 2} width={boxW} height={boxH} fill="#F7F4ED" stroke="#A8B3BF" strokeWidth="1" />
            {/* corner tick */}
            <path d={`M${boxX} ${y - boxH / 2 + 8} L${boxX} ${y - boxH / 2} L${boxX + 8} ${y - boxH / 2}`} fill="none" stroke="#102033" strokeWidth="1.25" />

            <text x={boxX + 14} y={y - 8} className="font-mono fill-bp-accent" fontSize="11">{s.id}</text>
            <text x={boxX + 40} y={y - 6} className="font-display fill-bp-ink" fontSize="16" fontWeight="600">{s.name}</text>
            <text x={boxX + 14} y={y + 16} className="font-mono fill-bp-muted" fontSize="10" letterSpacing="0.5">{s.note}</text>

            {/* leader line -> metric */}
            <line x1={boxX + boxW} y1={y} x2={boxX + boxW + 30} y2={y} stroke="#A8B3BF" strokeWidth="1" strokeDasharray="2 2" />
            <text x={boxX + boxW + 36} y={y - 2} className="font-mono fill-bp-ink" fontSize="15" fontWeight="600">{s.metric}</text>
            <text x={boxX + boxW + 36} y={y + 12} className="font-mono fill-bp-muted" fontSize="9.5" letterSpacing="1">{s.metricUnit}</text>
          </g>
        );
      })}

      {/* bottom rule + coordinate ticks */}
      <line x1="0" y1="378" x2="560" y2="378" stroke="#CBC6BA" strokeWidth="1" />
      <text x="0" y="394" className="font-mono fill-bp-muted" fontSize="9" letterSpacing="1.5">SCALE 1:1 · REV 2026.08</text>
    </svg>
  );
}

export function BlueprintHero() {
  return (
    <section className="bp-grid relative overflow-hidden border-b border-bp-line bg-bp-paper">
      <div className="container-px mx-auto max-w-7xl pt-28 pb-16 sm:pt-32 lg:pt-36">
        {/* top spec bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-y border-bp-ink/20 py-2.5">
          <span className="bp-label text-bp-ink">DESIGN · DEVELOP · DELIVER</span>
          <span className="bp-label">SOFTWARE &amp; WEB STUDIO — EST. 2024</span>
        </div>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* ── Left: statement ── */}
          <div className="lg:col-span-6">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bp-label mb-6 flex items-center gap-2"
            >
              <span className="inline-block h-2 w-2 bg-bp-accent" />
              DIGITAL PRODUCT STUDIO
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[3rem] font-semibold leading-[0.98] tracking-[-0.03em] text-bp-ink sm:text-[4rem] lg:text-[4.5rem]"
            >
              We engineer
              <br />
              websites like
              <br />
              <span className="relative">
                systems<span className="text-bp-accent">.</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mt-7 max-w-md font-text text-[15px] leading-relaxed text-bp-muted"
            >
              thewaywedev is a studio that treats a website as an engineered
              system — architecture, commerce, performance, and design working
              as one assembly. No templates. No guesswork.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-bp-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-bp-paper transition-colors hover:bg-bp-accent"
              >
                Start a build
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 border border-bp-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-bp-ink transition-colors hover:bg-bp-ink hover:text-bp-paper"
              >
                View the work
              </Link>
            </motion.div>
          </div>

          {/* ── Right: annotated schematic ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-6"
          >
            <div className="bp-frame overflow-x-auto p-5 sm:p-7">
              <DeliverySchematic />
            </div>
          </motion.div>
        </div>

        {/* capability strip */}
        <div className="mt-14 grid grid-cols-2 border border-bp-line sm:grid-cols-4">
          {[
            ["Next.js", "Architecture"],
            ["Shopify", "E-commerce"],
            ["SEO", "Performance"],
            ["UI/UX", "Systems"],
          ].map(([k, v], i) => (
            <div
              key={k}
              className={`flex flex-col gap-1 p-5 ${i !== 0 ? "border-l border-bp-line" : ""} ${i >= 2 ? "border-t sm:border-t-0" : ""} ${i === 2 ? "sm:border-l" : ""}`}
            >
              <span className="font-display text-lg font-semibold text-bp-ink">{k}</span>
              <span className="bp-label">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
