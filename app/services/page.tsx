import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { services } from "@/lib/services";
import { formatPrice } from "@/lib/utils";
import { PageMasthead } from "@/components/blueprint/primitives";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, UI/UX, video, motion graphics, branding, social, and AI automation — engineered by one focused studio.",
  alternates: { canonical: "/services" },
};

const EXTRA = [
  "Weekly Loom updates & shared Slack channel",
  "Full source-file & asset transfer on completion",
  "30-day post-delivery support included",
];

export default function ServicesPage() {
  return (
    <>
      <PageMasthead
        index="§ SERVICES"
        label="CAPABILITY INDEX"
        right={`${services.length} MODULES`}
        title={
          <>
            Everything we do,
            <br /> specified.
          </>
        }
        intro="Each engagement is fixed-scope, milestone-billed, and fully transferable on completion. No retainers required, no lock-in."
      />

      <div className="bg-bp-paper">
        <div className="container-px mx-auto max-w-7xl">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <article
                key={s.id}
                id={s.id}
                className="grid scroll-mt-28 gap-8 border-b border-bp-line py-14 lg:grid-cols-12 lg:gap-10"
              >
                {/* left rail */}
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm text-bp-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="bp-label">SERVICE MODULE</span>
                  </div>

                  <div className="mt-5 flex items-start gap-4">
                    <div className="grid size-11 shrink-0 place-items-center border border-bp-ink text-bp-ink">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-bp-ink sm:text-3xl">
                        {s.title}
                      </h2>
                      <p className="mt-2 max-w-md font-text text-[14px] leading-relaxed text-bp-muted">
                        {s.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-6">
                    <div className="bp-frame px-5 py-3">
                      <div className="bp-label">STARTS AT</div>
                      <div className="font-display text-xl font-semibold text-bp-ink">
                        {formatPrice(s.startsAt)}
                      </div>
                    </div>
                    <Link
                      href="/contact"
                      className="group inline-flex items-center gap-2 border border-bp-ink bg-bp-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-bp-paper transition-colors hover:bg-bp-paper hover:text-bp-ink"
                    >
                      Start this
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>

                {/* right: spec list */}
                <div className="lg:col-span-7">
                  <div className="border-t-2 border-bp-ink pt-4">
                    <span className="bp-label">BUILD SPEC — WHAT&apos;S INCLUDED</span>
                  </div>
                  <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {[...s.benefits, ...EXTRA].map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 border-b border-bp-line/70 pb-3 font-text text-[14px] text-bp-ink"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-bp-accent" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}
