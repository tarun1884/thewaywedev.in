import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { posts, getPost } from "@/lib/posts";

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
    <article className="pt-32 sm:pt-40">
      <div className="container-px mx-auto max-w-3xl pb-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Back to all articles
        </Link>

        <p className="mt-8 text-xs text-muted-foreground">
          {new Date(post.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}{" "}
          · {post.readingMin} min read
        </p>

        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {post.title}
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>

        <div className="mt-10 space-y-6">
          {post.body.map((para, i) => (
            <p key={i} className="text-base leading-relaxed text-foreground/90">
              {para}
            </p>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-4 rounded-3xl border border-border/60 bg-card/60 p-8 backdrop-blur">
          <p className="font-display text-xl font-semibold tracking-tight">
            Want results like these?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
          >
            Start a project
          </Link>
        </div>
      </div>
    </article>
  );
}
