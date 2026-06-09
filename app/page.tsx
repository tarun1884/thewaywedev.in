"use client";

import dynamic from "next/dynamic";

const GlassConstellation = dynamic(() => import("@/components/r3f/scene"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "100dvh",
        background: "#FAFAFA",
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
  return <GlassConstellation />;
}
