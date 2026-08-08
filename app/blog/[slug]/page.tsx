import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { posts, getPost } from "@/lib/posts";
import { PageMasthead } from "@/components/blueprint/primitives";

type Params = { slug: string };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="bg-bp-paper">
      <PageMasthead
        back={{ href: "/blog", label: "Back to all articles" }}
        index="§ FIELD NOTE"
        label="WRITING / LOG"
        right={`${new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · ${post.readingMin} MIN`}
        title={post.title}
        intro={post.excerpt}
      />

      <div className="container-px mx-auto max-w-3xl py-14 pb-24">
        <div className="border-t-2 border-bp-ink pt-6">
          <span className="bp-label">FULL NOTE</span>
        </div>
        <div className="mt-6 space-y-6">
          {post.body.map((para, i) => (
            <p key={i} className="font-text text-[16px] leading-[1.75] text-bp-ink/90">
              {para}
            </p>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-5 border border-bp-line bg-bp-ink p-8 sm:flex-row sm:items-center">
          <p className="font-display text-2xl font-semibold text-bp-paper">
            Want results like these?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-bp-paper/30 px-6 py-3 font-mono text-xs uppercase tracking-[0.14em] text-bp-paper transition-colors hover:bg-bp-paper hover:text-bp-ink"
          >
            Start a project
          </Link>
        </div>
      </div>
    </article>
  );
}
