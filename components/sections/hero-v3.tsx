"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

const WORDS = ["WEBSITES", "BRANDS", "EXPERIENCES", "FUTURES", "PRODUCTS", "EMPIRES"];

export function HeroV3() {
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => setIdx((n) => (n + 1) % WORDS.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center select-none">

      {/* ── Status badge ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-white/60 backdrop-blur-sm"
      >
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-green-400" />
        </span>
        Available for projects · 2026
      </motion.div>

      {/* ── Main headline ─────────────────────────────────── */}
      <div className="overflow-visible">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-black tracking-[-0.055em] text-white leading-[0.85]"
          style={{ fontSize: "clamp(4.5rem, 13vw, 10.5rem)" }}
        >
          WE BUILD
        </motion.p>

        {/* Animated rotating word */}
        <div
          className="relative overflow-hidden leading-[0.85]"
          style={{ height: "clamp(4.5rem, 13vw, 10.5rem)" }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={WORDS[idx]}
              initial={{ y: "110%", skewX: -6 }}
              animate={{ y: 0, skewX: 0 }}
              exit={{ y: "-110%", skewX: 6 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 font-display font-black tracking-[-0.055em]"
              style={{
                fontSize: "clamp(4.5rem, 13vw, 10.5rem)",
                background: "linear-gradient(90deg, #ff006e 0%, #ff4499 25%, #c050ff 55%, #00f5ff 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {WORDS[idx]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-black tracking-[-0.055em] text-white leading-[0.85]"
          style={{ fontSize: "clamp(4.5rem, 13vw, 10.5rem)" }}
        >
          THAT WIN.
        </motion.p>
      </div>

      {/* ── Sub copy ──────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.38 }}
        className="mt-10 max-w-lg text-base font-light leading-relaxed text-white/50 sm:text-lg"
      >
        A premium digital studio. We craft high-performance websites, electric
        brands, and AI-powered systems for companies that refuse to be ordinary.
      </motion.p>

      {/* ── CTAs ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.52 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        {/* Primary gradient CTA */}
        <Link
          href="#contact"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #ff006e, #8b2fff, #00f5ff)",
            backgroundSize: "200% 200%",
            animation: "gradient-shift 4s ease infinite",
            boxShadow: "0 0 30px rgba(255,0,110,0.35), 0 0 60px rgba(139,47,255,0.15)",
          }}
        >
          Start a project
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>

        {/* Ghost CTA */}
        <Link
          href="#services"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
        >
          <Zap className="size-3.5" />
          See our work
        </Link>
      </motion.div>

      {/* ── Trust strip ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85, duration: 0.6 }}
        className="mt-14 flex flex-wrap items-center justify-center gap-6 text-[11px] uppercase tracking-[0.18em] text-white/25"
      >
        {["Awwwards Nominee", "Clutch Top Rated", "120+ Projects", "4.9★ Rating"].map((t) => (
          <span key={t}>{t}</span>
        ))}
      </motion.div>

      {/* ── Scroll pulse ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <div className="h-10 w-[1px] overflow-hidden rounded-full bg-white/10">
            <motion.div
              animate={{ y: [-40, 40] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="h-full w-full"
              style={{ background: "linear-gradient(to bottom, transparent, #ff006e, transparent)" }}
            />
          </div>
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/20">Scroll</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
