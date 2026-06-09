import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Field notes on design, code, motion, and AI from the thewaywedev team.",
  alternates: { canonical: "/blog" },
};

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
