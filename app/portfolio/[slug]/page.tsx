import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { PageMasthead } from "@/components/blueprint/primitives";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Case study" };
  return {
    title: project.title,
    description: project.blurb,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.blurb,
      images: [{ url: project.cover, width: 1600, height: 900 }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <article className="bg-bp-paper">
      <PageMasthead
        back={{ href: "/portfolio", label: "Back to work" }}
        index={`${project.category.toUpperCase()}`}
        label="CASE-STUDY DOSSIER"
        right={`${project.client} — ${project.year}`}
        title={project.title}
        intro={project.blurb}
      />

      <div className="container-px mx-auto max-w-7xl py-14">
        <div className="bp-frame overflow-hidden">
          <div className="relative aspect-[21/10] w-full">
            <Image src={project.cover} alt={project.title} fill priority sizes="100vw" className="object-cover" />
          </div>
        </div>

        {/* metrics ledger */}
        <div className="mt-px grid border border-bp-line sm:grid-cols-3">
          {project.metrics.map((m, i) => (
            <div key={m.label} className={`bg-bp-surface p-6 ${i !== 0 ? "border-t border-bp-line sm:border-l sm:border-t-0" : ""}`}>
              <p className="font-mono text-3xl font-semibold tracking-tight text-bp-ink">{m.value}</p>
              <p className="bp-label mt-2">{m.label}</p>
            </div>
          ))}
        </div>

        {/* body */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {[
              {
                h: "The brief",
                b: `${project.client} came to us with a goal: reposition for a new market and ship the supporting digital surfaces in a tight window. We led discovery, strategy, design, and delivery end-to-end.`,
              },
              {
                h: "Outcome",
                b: "The launch shipped on time and exceeded every target metric within 30 days. The team adopted the new design system internally and we now run a small monthly retainer for ongoing experiments.",
              },
            ].map((s) => (
              <section key={s.h} className="mb-10 border-t-2 border-bp-ink pt-5">
                <h2 className="bp-label mb-3">{s.h}</h2>
                <p className="font-text text-[15px] leading-relaxed text-bp-ink/90">{s.b}</p>
              </section>
            ))}
          </div>

          <aside className="lg:col-span-4">
            <div className="border-t-2 border-bp-ink pt-5">
              <h2 className="bp-label mb-4">Approach</h2>
              <ol className="space-y-3">
                {[
                  "Stakeholder interviews & teardown, week one",
                  "Strategy & messaging signed off before design",
                  "High-fidelity prototype, three iterations",
                  "Production build, perf budgets in CI",
                ].map((step, i) => (
                  <li key={i} className="flex gap-3 font-text text-[13px] leading-snug text-bp-muted">
                    <span className="font-mono text-[11px] text-bp-accent">0{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-5 border border-bp-line bg-bp-ink p-8 sm:flex-row sm:items-center">
          <p className="font-display text-2xl font-semibold text-bp-paper">
            Have a project like this?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-bp-paper/30 px-6 py-3 font-mono text-xs uppercase tracking-[0.14em] text-bp-paper transition-colors hover:bg-bp-paper hover:text-bp-ink"
          >
            Start a project <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
