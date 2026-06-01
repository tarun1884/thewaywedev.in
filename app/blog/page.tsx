import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Blog",
  description: "Field notes on design, code, motion, and AI from the Nova team.",
  alternates: { canonical: "/blog" },
};

// Phase 2: replace with Sanity / Supabase CMS queries.
const posts: { slug: string; title: string; date: string; excerpt: string; readingMin: number }[] = [
  {
    slug: "how-we-ship-marketing-sites-in-28-days",
    title: "How we ship marketing sites in 28 days",
    date: "2026-04-12",
    excerpt: "A look inside our four-week production system — discovery, design, build, launch.",
    readingMin: 6,
  },
  {
    slug: "performance-budgets-that-stick",
    title: "Performance budgets that actually stick",
    date: "2026-03-18",
    excerpt: "Lighthouse 95+ isn't a one-time achievement — it's a CI gate.",
    readingMin: 8,
  },
  {
    slug: "the-case-for-ai-agents-inside-ops",
    title: "The case for AI agents inside ops",
    date: "2026-02-02",
    excerpt: "Why we're moving more internal tooling toward agentic workflows.",
    readingMin: 7,
  },
];

export default function BlogPage() {
  return (
    <div className="pt-32 sm:pt-40">
      <div className="container-px mx-auto max-w-4xl">
        <SectionHeading eyebrow="Field notes" title={<>Writing.</>} />

        <div className="mt-12 space-y-3 pb-24">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group flex items-start justify-between gap-6 rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur transition-colors hover:border-border hover:bg-card/70"
            >
              <div>
                <p className="text-xs text-muted-foreground">
                  {new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} ·{" "}
                  {p.readingMin} min read
                </p>
                <h2 className="mt-2 font-display text-xl font-semibold tracking-tight sm:text-2xl">
                  {p.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
              </div>
              <span className="hidden shrink-0 self-center text-xl text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground sm:block">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
