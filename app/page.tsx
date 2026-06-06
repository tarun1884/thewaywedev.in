"use client";

import dynamic from "next/dynamic";

/* Lazy-load the heavy Three.js scene — never runs on server */
const MagneticNodes = dynamic(
  () =>
    import("@/components/three/magnetic-nodes").then((m) => ({
      default: m.MagneticNodes,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex h-screen w-full items-center justify-center"
        style={{ background: "#fafafa" }}
      >
        <div className="flex flex-col items-center gap-4">
          {/* Pulsing glass orbs loader */}
          <div className="flex items-center gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-full"
                style={{
                  width: 12,
                  height: 12,
                  background: ["#8b5cf6", "#ec4899", "#06b6d4", "#f59e0b"][i],
                  opacity: 0.5,
                  animation: `pulse 1.4s ease-in-out ${i * 0.15}s infinite`,
                }}
              />
            ))}
          </div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(0,0,0,0.25)",
            }}
          >
            Loading constellation…
          </p>
        </div>
      </div>
    ),
  }
);

export default function HomePage() {
  return <MagneticNodes />;
}
