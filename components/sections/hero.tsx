"use client";

import * as React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Star, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

/* Lazy-load Three.js canvas — never runs on server */
const HeroCanvas = dynamic(
  () => import("@/components/three/hero-canvas").then((m) => ({ default: m.HeroCanvas })),
  { ssr: false, loading: () => null }
);

const ROTATING = ["websites", "brands", "videos", "experiences", "automations"];

export function Hero() {
  const [i, setI] = React.useState(0);
  const [videoOpen, setVideoOpen] = React.useState(false);

  React.useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % ROTATING.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative isolate min-h-screen overflow-hidden pt-28 pb-20 sm:pt-36">

      {/* ── 3D Canvas (fills entire section) ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <HeroCanvas />
      </div>

      {/* ── Dark vignette so text stays readable over the 3D scene ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]">
        {/* Center blur to push objects to sides */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/20 to-background/70" />
        {/* Strong left edge for text readability */}
        <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-background/95 via-background/60 to-transparent" />
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background/80 to-transparent" />
        {/* Grid pattern subtle overlay */}
        <div className="absolute inset-0 grid-pattern opacity-20" />
      </div>

      {/* ── Main content ── */}
      <div className="container-px relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-0">

        {/* LEFT — text */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-medium backdrop-blur-sm"
          >
            <span className="grid size-4 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
              <Sparkles className="size-2.5" />
            </span>
            Now booking Q3 — <span className="text-muted-foreground">2 slots left</span>
          </motion.div>

          <h1 className="font-display font-semibold tracking-tight">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="block text-5xl text-gradient sm:text-6xl lg:text-7xl xl:text-[80px] xl:leading-[0.95]"
            >
              We build
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="relative block h-[1.1em] overflow-hidden text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] xl:leading-[0.95]"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={ROTATING[i]}
                  initial={{ y: 60, opacity: 0, filter: "blur(12px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -60, opacity: 0, filter: "blur(12px)" }}
                  transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                  className="absolute text-gradient-accent"
                >
                  {ROTATING[i]}
                </motion.span>
              </AnimatePresence>
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.19 }}
              className="block text-4xl text-gradient sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              that convert.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="mt-7 max-w-xl text-base text-muted-foreground sm:text-lg leading-relaxed"
          >
            A focused studio crafting high-performance websites, brands, motion graphics,
            and AI-powered systems — from first sketch to launch in weeks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.36 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button asChild size="lg" variant="accent">
              <Link href="/contact">
                Start a project <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-border/60 bg-background/60 backdrop-blur-sm"
              onClick={() => setVideoOpen(true)}
            >
              <span className="grid size-6 place-items-center rounded-full bg-foreground/90 text-background">
                <Play className="size-3 translate-x-px" />
              </span>
              Watch our reel
            </Button>
          </motion.div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="size-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">4.9 from 120+ clients</span>
            </div>
            <span className="hidden h-4 w-px bg-border sm:block" />
            <span className="text-xs text-muted-foreground">Top Rated · Clutch 2025</span>
            <span className="hidden h-4 w-px bg-border sm:block" />
            <span className="text-xs text-muted-foreground">Awwwards nominee</span>
          </motion.div>
        </div>

        {/* RIGHT — spacer so 3D canvas shows through on desktop */}
        <div className="hidden lg:block" aria-hidden />
      </div>

      {/* ── Client logo marquee ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.65 }}
        className="container-px relative z-10 mx-auto mt-20 max-w-7xl"
      >
        <p className="mb-5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60">
          Trusted by ambitious teams
        </p>
        <ClientLogos />
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-hidden
      >
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50">scroll</span>
          <div className="h-10 w-px overflow-hidden rounded-full bg-border/40">
            <motion.div
              animate={{ y: [-40, 40] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="h-full w-full bg-gradient-to-b from-transparent via-foreground/60 to-transparent"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ── Logo marquee ── */
function ClientLogos() {
  const logos = ["ACME", "Lumen", "Northwind", "Helio", "Quanta", "Vertex", "Aurora", "Pulse", "Orbit", "Nexus"];
  return (
    <div className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
      <div className="flex gap-12" style={{ animation: "marquee 28s linear infinite" }}>
        {[...logos, ...logos].map((name, idx) => (
          <span
            key={`${name}-${idx}`}
            className="shrink-0 font-display text-xl font-semibold tracking-tight text-muted-foreground/40"
          >
            {name}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
