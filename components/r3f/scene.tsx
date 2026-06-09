"use client";

import * as React from "react";
import { Suspense, useState, useCallback, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { NodesGroup } from "./nodes-group";
import { NodeCard } from "./node-card";
import { NODE_SERVICES } from "@/lib/node-services";

export default function GlassConstellation() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleSelect = useCallback((id: number) => setActiveId(id), []);
  const handleClose = useCallback(() => setActiveId(null), []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "100dvh", background: "#FAFAFA" }}
    >
      {/* ── Z-0: Full-screen 3D Canvas ─────────────────────── */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 55 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: false }}
          scene={{ background: new THREE.Color("#FAFAFA") }}
        >
          {/*
            MANDATORY: Environment gives IBL cube map so MeshTransmissionMaterial
            has something to refract. Without this the glass looks flat/black.
          */}
          <Suspense fallback={null}>
            <Environment preset="city" />
          </Suspense>

          {/* Soft ambient fill so geometry isn't totally dark before lights load */}
          <ambientLight intensity={0.4} />

          <NodesGroup
            activeId={activeId}
            isMobile={isMobile}
            onSelect={handleSelect}
          />
        </Canvas>
      </div>

      {/* ── Z-10: Hero text (pointer-events-none so mouse hits Canvas) ── */}
      <AnimatePresence>
        {activeId === null && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.45 }}
            className="pointer-events-none absolute inset-x-0 z-10 flex flex-col items-center justify-center px-6 text-center"
            style={{ top: "50%", transform: "translateY(-50%)" }}
          >
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em]"
              style={{ color: "rgba(0,0,0,0.35)" }}
            >
              Digital Services Studio
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black tracking-[-0.05em]"
              style={{
                fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
                lineHeight: 0.9,
                color: "#111111",
              }}
            >
              Crafting Digital
              <br />
              Experiences.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="mt-5 max-w-xs text-sm leading-relaxed"
              style={{ color: "rgba(0,0,0,0.4)" }}
            >
              Click any floating node to explore our services.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Z-20: Expanded service card ───────────────────────── */}
      <AnimatePresence>
        {activeId !== null && (
          <div
            key={`card-${activeId}`}
            className="absolute inset-0"
            style={{ zIndex: 20 }}
          >
            <NodeCard service={NODE_SERVICES[activeId]} onClose={handleClose} />
          </div>
        )}
      </AnimatePresence>

      {/* ── Z-10: Service dot indicators (bottom) ─────────────── */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-wrap items-center justify-center gap-2 px-4">
        {NODE_SERVICES.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveId(s.id)}
            aria-label={`Open ${s.title}`}
            className="flex items-center gap-2 rounded-full border border-black/8 bg-white/70 px-3 py-1.5 text-[10px] font-semibold backdrop-blur-sm transition-all duration-200 hover:border-black/15 hover:bg-white/90"
            style={{ color: activeId === s.id ? s.accent : "rgba(0,0,0,0.45)" }}
          >
            <span
              className="size-1.5 rounded-full transition-colors"
              style={{
                background: activeId === s.id ? s.accent : "rgba(0,0,0,0.2)",
              }}
            />
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
