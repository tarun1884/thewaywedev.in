"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const WORD_DELAY = 0.08;

export function HeroV2() {
  const words = ["CRAFTING", "DIGITAL", "EXPERIENCES."];

  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
      {/* Tag line */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#555] backdrop-blur-sm"
      >
        <span className="size-1.5 rounded-full bg-emerald-500" />
        Open for new projects · 2026
      </motion.p>

      {/* Main heading — each word swoops in */}
      <h1 className="font-display font-semibold tracking-[-0.045em] text-[#111] leading-[0.88]"
          style={{ fontSize: "clamp(3.5rem, 11vw, 9rem)" }}>
        {words.map((word, wi) => (
          <span key={word} className="block overflow-hidden">
            <motion.span
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.75,
                delay: wi * WORD_DELAY + 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h1>

      {/* Sub-copy */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-10 max-w-[520px] text-base leading-relaxed text-[#555] sm:text-lg"
      >
        We build scalable web architecture, seamless storefronts,
        and search-dominant platforms.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.65 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        <Link
          href="#contact"
          className="group inline-flex items-center gap-2 rounded-full bg-[#111] px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-black hover:shadow-xl hover:shadow-black/20"
        >
          Start a project
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>

        <Link
          href="#services"
          className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-7 py-3.5 text-sm font-medium text-[#111] backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/90 hover:shadow-lg hover:shadow-black/10"
        >
          Our services
        </Link>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-[#aaa]"
        >
          <span className="text-[9px] uppercase tracking-[0.25em]">Scroll</span>
          <ChevronDown className="size-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
