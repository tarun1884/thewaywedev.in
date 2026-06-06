import dynamic from "next/dynamic";
import { HeroV2 } from "@/components/sections/hero-v2";
import { ServicesV2 } from "@/components/sections/services-v2";
import { ContactV2 } from "@/components/sections/contact-v2";

/* Lazy-load the Three.js canvas — never runs on server */
const GlassScene = dynamic(
  () => import("@/components/three/glass-scene").then((m) => ({ default: m.GlassScene })),
  {
    ssr: false,
    loading: () => (
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background: "#FAFAFA",
          animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
        }}
      />
    ),
  }
);

export default function HomePage() {
  return (
    <>
      {/* 3D glass canvas — fixed background layer */}
      <GlassScene />

      {/* Content layers — scroll naturally over the fixed canvas */}
      <HeroV2 />
      <ServicesV2 />
      <ContactV2 />
    </>
  );
}
