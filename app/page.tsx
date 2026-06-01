import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Portfolio } from "@/components/sections/portfolio";
import { Stats } from "@/components/sections/stats";
import { Process } from "@/components/sections/process";
import { PricingCalculator } from "@/components/sections/pricing-calculator";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <Stats />
      <Process />
      <PricingCalculator />
      <Testimonials />
      <FAQ />
      <CTA />
      <Contact />
    </>
  );
}
