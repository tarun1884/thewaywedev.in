import { BlueprintHero } from "@/components/blueprint/hero";
import { Capabilities } from "@/components/blueprint/capabilities";
import { Reviews } from "@/components/blueprint/reviews";
import { SpecBar } from "@/components/blueprint/primitives";

export default function HomePage() {
  return (
    <>
      <BlueprintHero />
      <Capabilities />

      {/* assembly-sequence divider */}
      <div className="border-b border-bp-line bg-bp-paper">
        <div className="container-px mx-auto max-w-7xl">
          <SpecBar
            className="border-y-0"
            left="ASSEMBLY SEQUENCE — 02 / 03"
            right="CLIENT LOG ↓"
          />
        </div>
      </div>

      <Reviews />
    </>
  );
}
