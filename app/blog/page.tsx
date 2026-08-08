import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/posts";
import { PageMasthead } from "@/components/blueprint/primitives";

export const metadata: Metadata = {
  title: "Blog",
  description: "Field notes on design, code, motion, and AI from the thewaywedev team.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageMasthead
        index="§ FIELD NOTES"
        label="WRITING / LOG"
        right={`${posts.length} NOTES`}
        title="Field notes."
        intro="Working notes on design, code, motion, and AI from the studio — what we're learning as we ship."
      />

      <div className="bg-bp-paper">
        <div className="container-px mx-auto max-w-4xl py-14 sm:py-16">
          {posts.map((p, i) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group grid gap-3 border-b border-bp-line py-8 transition-colors hover:bg-bp-surface sm:grid-cols-12 sm:gap-6"
            >
              <div className="sm:col-span-3">
                <div className="font-mono text-[11px] text-bp-accent">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <time className="bp-label mt-2 block normal-case tracking-normal">
                  {new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </time>
                <span className="bp-label mt-1 block normal-case tracking-normal">
                  {p.readingMin} min read
                </span>
              </div>
              <div className="sm:col-span-9">
                <h2 className="font-display text-xl font-semibold tracking-[-0.01em] text-bp-ink group-hover:text-bp-ink/70 sm:text-2xl">
                  {p.title}
                </h2>
                <p className="mt-2 font-text text-[14px] leading-relaxed text-bp-muted">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
