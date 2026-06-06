"use client";

import dynamic from "next/dynamic";
import { HeroV3 } from "@/components/sections/hero-v3";
import { ServicesV3 } from "@/components/sections/services-v3";
import { ContactV3 } from "@/components/sections/contact-v3";

const NeonScene = dynamic(
  () => import("@/components/three/neon-scene").then((m) => ({ default: m.NeonScene })),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0, background: "#04030f" }} />
    ),
  }
);

export default function HomePage() {
  return (
    <>
      <NeonScene />
      <HeroV3 />
      <ServicesV3 />
      <ContactV3 />
    </>
  );
}
