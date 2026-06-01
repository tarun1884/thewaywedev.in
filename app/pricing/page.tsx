import type { Metadata } from "next";
import { PricingCalculator } from "@/components/sections/pricing-calculator";
import { FAQ } from "@/components/sections/faq";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent, fixed-scope pricing. Build your estimate in seconds.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <div className="pt-24">
      <PricingCalculator />
      <FAQ />
    </div>
  );
}
