"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

/* ── Rotating words ────────────────────────────────────────── */
const WORDS = ["WEBSITES", "BRANDS", "EXPERIENCES", "FUTURES", "PRODUCTS", "EMPIRES"];

/* ── Character-by-character reveal ────────────────────────── */
function SplitReveal({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          initial={{ y: "115%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.65,
            delay: delay + i * 0.028,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
          style={{ whiteSpace: ch === " " ? "pre" : "normal" }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </span>
  );
}

export function HeroV3() {
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => setIdx((n) => (n + 1) % WORDS.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center select-none"
    >
      {/* ── Live badge ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-white/55 backdrop-blur-sm"
      >
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
        </span>
        Available for projects · 2026
      </motion.div>

      {/* ── Headline ─────────────────────────────────────────── */}
      <div
        className="overflow-hidden font-display font-black tracking-[-0.055em] leading-[0.88]"
        style={{ fontSize: "clamp(3.8rem, 11.5vw, 10rem)" }}
      >
        {/* LINE 1: WE BUILD — char reveal */}
        <div className="overflow-hidden">
          <SplitReveal text="WE BUILD" delay={0.15} className="text-white" />
        </div>

        {/* LINE 2: animated rotating word */}
        <div
          className="relative overflow-hidden"
          style={{ height: "clamp(3.8rem, 11.5vw, 10rem)" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={WORDS[idx]}
              initial={{ y: "105%", rotateX: -20, opacity: 0 }}
              animate={{ y: 0,       rotateX: 0,   opacity: 1 }}
              exit={{   y: "-105%",  rotateX: 20,  opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ perspective: "600px" }}
            >
              <span
                style={{
                  background:
                    "linear-gradient(90deg, #ff006e 0%, #e040fb 30%, #8b2fff 60%, #00f5ff 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "shine-text 3s linear infinite",
                  filter: "drop-shadow(0 0 28px rgba(255,0,110,0.45))",
                }}
              >
                {WORDS[idx]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* LINE 3: THAT WIN. — char reveal, slightly delayed */}
        <div className="overflow-hidden">
          <SplitReveal text="THAT WIN." delay={0.28} className="text-white" />
        </div>
      </div>

      {/* ── Sub copy ─────────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.75 }}
        className="mt-10 max-w-[480px] text-base font-light leading-relaxed text-white/45 sm:text-lg"
      >
        A premium digital studio. We craft high-performance websites, electric
        brands, and AI-powered systems for companies that refuse to be ordinary.
      </motion.p>

      {/* ── CTAs ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        <Link
          href="#contact"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:brightness-110"
          style={{
            background: "linear-gradient(135deg,#ff006e,#8b2fff,#00f5ff)",
            backgroundSize: "200% 200%",
            animation: "gradient-shift 4s ease infinite",
            boxShadow:
              "0 0 24px rgba(255,0,110,0.4), 0 0 60px rgba(139,47,255,0.2), inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
        >
          <span className="relative z-10 flex items-center gap-2">
            Start a project
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </Link>

        <Link
          href="#services"
          className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-8 py-3.5 text-sm font-medium text-white/75 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:text-white"
        >
          <Zap className="size-3.5" />
          See our work
        </Link>
      </motion.div>

      {/* ── Trust strip ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.7 }}
        className="mt-14 flex flex-wrap items-center justify-center gap-5"
      >
        {[
          { label: "Awwwards Nominee" },
          { label: "Clutch Top Rated" },
          { label: "120+ Projects" },
          { label: "4.9 ★ Rating" },
        ].map(({ label }, i) => (
          <React.Fragment key={label}>
            <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/22">
              {label}
            </span>
            {i < 3 && (
              <span className="size-1 rounded-full bg-white/12" aria-hidden />
            )}
          </React.Fragment>
        ))}
      </motion.div>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <div className="flex flex-col items-center gap-2">
          <div className="h-12 w-px overflow-hidden rounded-full bg-white/10">
            <motion.div
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
              className="h-1/2 w-full rounded-full"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, #ff006e, #8b2fff, transparent)",
              }}
            />
          </div>
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/18">
            Scroll
          </span>
        </div>
      </motion.div>

      {/* Keyframe for shine text */}
      <style jsx>{`
        @keyframes shine-text {
          0%   { background-position: 0%   center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </section>
  );
}
