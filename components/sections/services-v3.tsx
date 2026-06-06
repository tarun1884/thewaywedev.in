"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Palette, Video, Sparkles, Type, Share2, Bot, ArrowUpRight } from "lucide-react";

const services = [
  { id: "web",     icon: Code2,     title: "Web Development",      desc: "Next.js, React, edge infrastructure. Sites that score 99 on Lighthouse.", color: "#8b2fff", glow: "rgba(139,47,255,0.3)"  },
  { id: "design",  icon: Palette,   title: "UI/UX Design",         desc: "Figma systems, prototypes, and pixel-perfect interfaces that convert.",    color: "#ff006e", glow: "rgba(255,0,110,0.3)"  },
  { id: "video",   icon: Video,     title: "Video Editing",         desc: "Cinematic edits for ads, brand films, and short-form viral content.",       color: "#00f5ff", glow: "rgba(0,245,255,0.3)"  },
  { id: "motion",  icon: Sparkles,  title: "Motion Graphics",       desc: "2D/3D motion, explainer films, brand bumpers and Lottie animations.",       color: "#ffd60a", glow: "rgba(255,214,10,0.3)" },
  { id: "brand",   icon: Type,      title: "Branding",              desc: "Logo systems, type, colour, voice — brand identities with intent.",         color: "#ff4d6d", glow: "rgba(255,77,109,0.3)" },
  { id: "social",  icon: Share2,    title: "Social Media",          desc: "Scroll-stopping content engines for Instagram, TikTok and LinkedIn.",       color: "#00e5ff", glow: "rgba(0,229,255,0.3)"  },
  { id: "ai",      icon: Bot,       title: "AI Automation",         desc: "Custom agents, RAG systems and workflows that multiply your team's output.", color: "#a855f7", glow: "rgba(168,85,247,0.3)" },
];

export function ServicesV3() {
  const ref  = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" ref={ref} className="relative z-10 py-32 sm:py-44">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Header */}
        <div className="mb-16 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4 }}
              className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/30"
            >
              What we craft
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl font-black tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl"
            >
              Seven crafts.<br />
              <span style={{
                background: "linear-gradient(90deg,#ff006e,#8b2fff,#00f5ff)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Infinite outcomes.
              </span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-xs text-sm leading-relaxed text-white/35"
          >
            One vertically-integrated studio. No handoffs, no agency bloat — just
            focused execution from brief to launch.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((s, i) => (
            <ServiceCard key={s.id} s={s} i={i} inView={inView} />
          ))}

          {/* CTA card */}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: services.length * 0.06 + 0.12 }}
            className="group relative flex flex-col items-start justify-between overflow-hidden rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 sm:col-span-2 lg:col-span-1"
            style={{
              background: "linear-gradient(135deg,#ff006e15,#8b2fff15,#00f5ff15)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <p className="font-display text-xl font-bold text-white">
              Ready to start?
            </p>
            <p className="mt-2 text-sm text-white/40">
              Book a free 20-min strategy call. No pitch, no commitment.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 group-hover:gap-3"
              style={{ background: "linear-gradient(135deg,#ff006e,#8b2fff)" }}>
              Get in touch <ArrowUpRight className="size-4" />
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ s, i, inView }: { s: (typeof services)[number]; i: number; inView: boolean }) {
  const Icon = s.icon;
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.06 + 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
      style={{
        background: hovered
          ? `linear-gradient(135deg, ${s.glow.replace("0.3","0.08")} 0%, rgba(255,255,255,0.03) 100%)`
          : "rgba(255,255,255,0.03)",
        border: hovered ? `1px solid ${s.color}44` : "1px solid rgba(255,255,255,0.06)",
        boxShadow: hovered ? `0 0 30px ${s.glow}, 0 0 60px ${s.glow.replace("0.3","0.08")}` : "none",
        transition: "all 0.35s ease",
      }}
    >
      {/* Icon */}
      <div
        className="mb-5 grid size-11 place-items-center rounded-xl transition-all duration-300"
        style={{
          background: hovered ? `${s.color}25` : "rgba(255,255,255,0.06)",
          color: hovered ? s.color : "rgba(255,255,255,0.5)",
          boxShadow: hovered ? `0 0 20px ${s.glow}` : "none",
        }}
      >
        <Icon className="size-5" />
      </div>

      <h3 className="font-display text-base font-bold text-white transition-all duration-300"
          style={{ color: hovered ? s.color : "white" }}>
        {s.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-white/35">{s.desc}</p>

      <ArrowUpRight
        className="absolute right-5 top-5 size-4 opacity-0 transition-all duration-300 group-hover:opacity-100"
        style={{ color: s.color }}
      />
    </motion.article>
  );
}
