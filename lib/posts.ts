export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readingMin: number;
  /** Body paragraphs (placeholder until CMS-backed) */
  body: string[];
};

// Phase 2: replace with Sanity / Supabase CMS queries.
export const posts: Post[] = [
  {
    slug: "how-we-ship-marketing-sites-in-28-days",
    title: "How we ship marketing sites in 28 days",
    date: "2026-04-12",
    excerpt:
      "A look inside our four-week production system — discovery, design, build, launch.",
    readingMin: 6,
    body: [
      "Shipping a marketing site in four weeks isn't about cutting corners — it's about removing ambiguity. Every engagement starts with a one-page brief that aligns the team before a single pixel moves.",
      "Week one is discovery. Week two is design in tight Figma loops. Week three is build on production infrastructure with performance budgets enforced in CI. Week four is launch, measure, and iterate.",
      "The result is a site that loads fast, ranks well, and converts — delivered on a predictable timeline.",
    ],
  },
  {
    slug: "performance-budgets-that-stick",
    title: "Performance budgets that actually stick",
    date: "2026-03-18",
    excerpt: "Lighthouse 95+ isn't a one-time achievement — it's a CI gate.",
    readingMin: 8,
    body: [
      "A great Lighthouse score on launch day means nothing if it quietly erodes over the next six months. The fix is to treat performance as a gate, not a milestone.",
      "We wire budgets into CI so any regression fails the build. Images, third-party scripts, and bundle size are all measured on every pull request.",
      "When performance is enforced automatically, it stops being a debate and becomes a default.",
    ],
  },
  {
    slug: "the-case-for-ai-agents-inside-ops",
    title: "The case for AI agents inside ops",
    date: "2026-02-02",
    excerpt: "Why we're moving more internal tooling toward agentic workflows.",
    readingMin: 7,
    body: [
      "The most valuable AI work we do isn't customer-facing — it's the agents quietly removing hours of repetitive ops work every week.",
      "We start by mapping the highest-friction internal workflow, then build a focused agent that owns it end to end, with humans in the loop where judgment matters.",
      "Done well, these agents compound: each one frees up time to build the next.",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
