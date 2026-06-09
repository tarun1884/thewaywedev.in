import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";

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
    <article className="pt-32 sm:pt-40">
      <div className="container-px mx-auto max-w-5xl">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> Back to work
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full border border-border/60 bg-secondary/50 px-2.5 py-1 font-medium uppercase tracking-wider">
            {project.category}
          </span>
          <span>{project.client} · {project.year}</span>
        </div>

        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-6xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">{project.blurb}</p>

        <div className="mt-10 overflow-hidden rounded-3xl border border-border/60">
          <div className="relative aspect-[21/10] w-full">
            <Image src={project.cover} alt={project.title} fill priority sizes="100vw" className="object-cover" />
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {project.metrics.map((m) => (
            <div key={m.label} className="rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur">
              <p className="font-display text-3xl font-semibold tracking-tight">{m.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 prose prose-neutral dark:prose-invert max-w-none">
          <h2>The brief</h2>
          <p>
            {project.client} came to us with a goal: reposition for a new market and ship the supporting
            digital surfaces in a tight window. We led discovery, strategy, design, and delivery end-to-end.
          </p>
          <h2>Approach</h2>
          <ul>
            <li>Stakeholder interviews and competitive teardown in week one.</li>
            <li>Strategy doc & messaging house signed off before any design.</li>
            <li>High-fidelity prototype reviewed in three iterations.</li>
            <li>Production build with performance budgets enforced in CI.</li>
          </ul>
          <h2>Outcome</h2>
          <p>
            The launch shipped on time and exceeded every target metric within 30 days. The team adopted the
            new design system internally and we now run a small monthly retainer for ongoing experiments.
          </p>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border/60 bg-card/60 p-8 backdrop-blur">
          <p className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
            Have a project like this?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
          >
            Start a project <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
