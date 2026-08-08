import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { PageMasthead } from "@/components/blueprint/primitives";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected case studies — websites, brands, motion, video, and AI builds, with the numbers behind them.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <PageMasthead
        index="§ WORK"
        label="CASE-STUDY LEDGER"
        right={`${projects.length} ENTRIES`}
        title={
          <>
            The work, and the
            <br /> numbers behind it.
          </>
        }
        intro="A selection of engagements across web, commerce, brand, motion, and AI — each with the outcome it produced."
      />

      <div className="bg-bp-paper">
        <div className="container-px mx-auto max-w-7xl py-14 sm:py-16">
          {/* ledger column header */}
          <div className="hidden grid-cols-12 gap-4 border-b-2 border-bp-ink pb-3 lg:grid">
            <span className="bp-label col-span-1">REF</span>
            <span className="bp-label col-span-5">PROJECT</span>
            <span className="bp-label col-span-2">CATEGORY</span>
            <span className="bp-label col-span-2">YEAR</span>
            <span className="bp-label col-span-2 text-right">HEADLINE</span>
          </div>

          <div>
            {projects.map((p, i) => (
              <Link
                key={p.slug}
                href={`/portfolio/${p.slug}`}
                className="group grid grid-cols-1 items-center gap-3 border-b border-bp-line py-6 transition-colors hover:bg-bp-surface lg:grid-cols-12 lg:gap-4 lg:py-5"
              >
                <span className="font-mono text-xs text-bp-accent lg:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="lg:col-span-5">
                  <div className="bp-label mb-1 normal-case tracking-normal text-bp-muted lg:hidden">
                    {p.client}
                  </div>
                  <h2 className="font-display text-lg font-semibold leading-snug tracking-[-0.01em] text-bp-ink group-hover:text-bp-ink/70">
                    {p.title}
                  </h2>
                  <div className="mt-1 hidden font-mono text-[11px] text-bp-muted lg:block">
                    {p.client}
                  </div>
                </div>
                <span className="bp-label col-span-2 normal-case tracking-normal">
                  {p.category}
                </span>
                <span className="font-mono text-xs text-bp-muted lg:col-span-2">{p.year}</span>
                <div className="flex items-center justify-between gap-3 lg:col-span-2 lg:justify-end">
                  <span className="font-mono text-sm font-semibold text-bp-ink">
                    {p.metrics[0].value}
                    <span className="ml-1 text-[10px] font-normal text-bp-muted">
                      {p.metrics[0].label}
                    </span>
                  </span>
                  <ArrowUpRight className="size-4 text-bp-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-bp-ink" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
