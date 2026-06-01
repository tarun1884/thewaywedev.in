"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });

  return (
    <motion.div
      style={{ scaleX: x, transformOrigin: "0 0" }}
      className="fixed inset-x-0 top-0 z-50 h-0.5 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500"
      aria-hidden
    />
  );
}
