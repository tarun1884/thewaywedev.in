import type { Metadata } from "next";
import { Portfolio } from "@/components/sections/portfolio";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected case studies — websites, brands, motion, video, and AI builds.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <div className="pt-24">
      <Portfolio />
    </div>
  );
}
