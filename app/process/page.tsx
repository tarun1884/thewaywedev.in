import type { Metadata } from "next";
import { Process } from "@/components/sections/process";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How we work — four phases, four weeks per phase, zero scope-creep games. Discover, design, build, launch.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <div className="pt-24">
      <Process />
    </div>
  );
}
