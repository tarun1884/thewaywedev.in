"use client";

import dynamic from "next/dynamic";
import { Development } from "@/components/sections/development";
import { Testimonials } from "@/components/sections/testimonials";

const GlassConstellation = dynamic(() => import("@/components/r3f/scene"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "100dvh",
        background:
          "radial-gradient(ellipse 50% 45% at 82% 12%, rgba(244,194,221,0.65), transparent 60%), radial-gradient(ellipse 55% 50% at 14% 22%, rgba(199,184,240,0.6), transparent 60%), radial-gradient(ellipse 50% 55% at 88% 78%, rgba(196,207,246,0.7), transparent 60%), linear-gradient(160deg, #efeafb 0%, #f5f1fc 45%, #ece8fa 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {(["#8b5cf6", "#ec4899", "#06b6d4", "#f59e0b"] as const).map(
          (c, i) => (
            <div
              key={c}
              style={{
                width: 11,
                height: 11,
                borderRadius: "50%",
                background: c,
                opacity: 0.55,
                animation: `pulse 1.5s ease-in-out ${i * 0.18}s infinite`,
              }}
            />
          )
        )}
      </div>
      <p
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "rgba(0,0,0,0.25)",
        }}
      >
        Initialising constellation…
      </p>
    </div>
  ),
});

export default function HomePage() {
  return (
    <>
      <GlassConstellation />
      <Development />
      <Testimonials />
    </>
  );
}
