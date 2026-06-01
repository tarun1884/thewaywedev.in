"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const ROTATING = ["websites", "brands", "videos", "experiences", "automations"];

export function Hero() {
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % ROTATING.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      {/* Background — grid + gradient orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-pattern" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute -top-32 left-1/2 size-[640px] -translate-x-1/2 rounded-full bg-gradient-to-br from-violet-500/40 via-fuchsia-500/30 to-transparent blur-3xl"
        />
        <motion.div
          initial={{ x: 0, y: 0 }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-24 -left-24 size-96 rounded-full bg-sky-500/20 blur-3xl"
        />
        <motion.div
          initial={{ x: 0, y: 0 }}
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[-6rem] top-1/3 size-80 rounded-full bg-pink-500/20 blur-3xl"
        />
      </div>

      <div className="container-px relative mx-auto max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium backdrop-blur"
        >
          <span className="grid size-4 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
            <Sparkles className="size-2.5" />
          </span>
          Now booking projects for Q3 — <span className="text-muted-foreground">2 slots left</span>
        </motion.div>

        <h1 className="font-display text-5xl font-semibold tracking-tight sm:text-7xl lg:text-[88px] lg:leading-[0.95]">
          <span className="text-gradient">We build</span>{" "}
          <span className="relative inline-block align-baseline">
            <AnimatePresence mode="wait">
              <motion.span
                key={ROTATING[i]}
                initial={{ y: 18, opacity: 0, filter: "blur(8px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -18, opacity: 0, filter: "blur(8px)" }}
                transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                className="text-gradient-accent"
              >
                {ROTATING[i]}
              </motion.span>
            </AnimatePresence>
          </span>
          <br />
          <span className="text-gradient">that actually convert.</span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-7 max-w-2xl text-base text-muted-foreground sm:text-lg"
        >
          A focused digital studio crafting high-performance websites, brands, motion, and
          AI-powered systems for ambitious teams. From first sketch to launch in weeks, not quarters.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Button asChild size="lg" variant="accent">
            <Link href="/#contact">
              Start a project <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/#work">See our work</Link>
          </Button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex flex-col items-center gap-5"
        >
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star key={idx} className="size-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span>4.9/5 from 120+ clients · Top Rated on Clutch</span>
          </div>
          <ClientLogos />
        </motion.div>
      </div>
    </section>
  );
}

function ClientLogos() {
  const logos = [
    "ACME", "Lumen", "Northwind", "Helio", "Quanta", "Vertex", "Aurora", "Pulse",
  ];
  return (
    <div className="relative w-full max-w-4xl overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />
      <div className="flex gap-12" style={{ animation: "marquee 30s linear infinite" }}>
        {[...logos, ...logos].map((name, idx) => (
          <span
            key={`${name}-${idx}`}
            className="shrink-0 font-display text-2xl font-semibold tracking-tight text-muted-foreground/60"
          >
            {name}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
