"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max tilt angle in degrees (default 14) */
  intensity?: number;
  /** Subtle glare highlight (default true) */
  glare?: boolean;
  /** Scale on hover (default 1.025) */
  scale?: number;
  /** Disable on touch devices (default true) */
  disableTouch?: boolean;
}

/**
 * Drop-in wrapper that gives any child a smooth mouse-tracking 3D tilt.
 * Uses CSS perspective transforms only — no JS animation loop.
 */
export function TiltCard({
  children,
  className,
  intensity = 14,
  glare = true,
  scale = 1.025,
  disableTouch = true,
  ...props
}: TiltCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const glareRef = React.useRef<HTMLDivElement>(null);
  const raf = React.useRef<number>(0);

  const update = React.useCallback(
    (x: number, y: number) => {
      const el = ref.current;
      if (!el) return;
      el.style.transform = `perspective(800px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) scale3d(${scale},${scale},${scale})`;
      if (glareRef.current) {
        const angle = Math.atan2(y, x) * (180 / Math.PI);
        glareRef.current.style.opacity = "1";
        glareRef.current.style.background = `linear-gradient(${angle + 90}deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 70%)`;
      }
    },
    [intensity, scale]
  );

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      update(x, y);
    });
  };

  const onMouseLeave = () => {
    cancelAnimationFrame(raf.current);
    const el = ref.current;
    if (!el) return;
    el.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
    if (glareRef.current) glareRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn("relative", className)}
      style={{ transformStyle: "preserve-3d", transition: "transform 0.12s ease-out, box-shadow 0.12s ease-out", willChange: "transform" }}
      {...props}
    >
      {/* Glare overlay */}
      {glare && (
        <div
          ref={glareRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-200"
        />
      )}
      {/* Depth layer — "lifts" content off the surface */}
      <div style={{ transform: "translateZ(12px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </div>
  );
}
