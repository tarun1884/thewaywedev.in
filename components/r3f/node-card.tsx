"use client";

import { motion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import type { NodeService } from "@/lib/node-services";

interface Props {
  service: NodeService;
  onClose: () => void;
}

export function NodeCard({ service, onClose }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 flex items-center justify-center px-5"
      style={{
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.45, y: 50, rotateX: -15 }}
        animate={{ opacity: 1, scale: 1,    y: 0,  rotateX: 0  }}
        exit={{   opacity: 0, scale: 0.45, y: 50,  rotateX: -15 }}
        transition={{ type: "spring", damping: 22, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl"
        style={{
          background: "rgba(255,255,255,0.78)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.96)",
          boxShadow: [
            "0 24px 64px rgba(0,0,0,0.13)",
            "0 6px 20px rgba(0,0,0,0.07)",
            "inset 0 1px 0 rgba(255,255,255,0.95)",
          ].join(", "),
        }}
      >
        {/* Accent gradient top bar */}
        <div
          className="h-[3px] w-full"
          style={{
            background: `linear-gradient(90deg, ${service.accent} 0%, ${service.accent}55 65%, transparent 100%)`,
          }}
        />

        <div className="p-7 sm:p-9">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              {/* Emoji icon bubble */}
              <div
                className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl text-xl"
                style={{ background: `rgba(${service.rgb},0.12)` }}
              >
                {service.emoji}
              </div>
              <div>
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: service.accent }}
                >
                  Service
                </p>
                <h2 className="font-display text-xl font-bold leading-tight tracking-[-0.03em] text-[#111] sm:text-2xl">
                  {service.title}
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close"
              className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-black/10 bg-white/80 text-black/40 transition-all hover:border-black/20 hover:text-black/80"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Description */}
          <p className="mt-5 text-[15px] leading-relaxed text-black/60">
            {service.desc}
          </p>

          {/* Stat highlight */}
          <div
            className="mt-6 flex items-center gap-5 rounded-2xl p-4"
            style={{
              background: `rgba(${service.rgb},0.08)`,
              border: `1px solid rgba(${service.rgb},0.15)`,
            }}
          >
            <span
              className="font-display text-4xl font-black tracking-[-0.05em]"
              style={{ color: service.accent }}
            >
              {service.stat}
            </span>
            <span className="text-sm font-medium text-black/50">
              {service.statLabel}
            </span>
          </div>

          {/* Tech tags */}
          <div className="mt-6">
            <p className="mb-2.5 text-[9px] font-bold uppercase tracking-[0.25em] text-black/30">
              Technologies
            </p>
            <div className="flex flex-wrap gap-1.5">
              {service.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-black/8 bg-white/70 px-3 py-1 text-xs font-medium text-black/55"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-7 flex items-center gap-4">
            <a
              href="#contact"
              onClick={onClose}
              className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:brightness-110"
              style={{
                background: `linear-gradient(135deg, ${service.accent}, ${service.accent}bb)`,
                boxShadow: `0 4px 22px rgba(${service.rgb},0.38)`,
              }}
            >
              Start this project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <button
              onClick={onClose}
              className="text-sm text-black/30 transition-colors hover:text-black/65"
            >
              Back to overview ↩
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
