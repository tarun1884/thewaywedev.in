export type Project = {
  slug: string;
  title: string;
  client: string;
  category: "Web" | "Brand" | "Motion" | "Video" | "AI";
  cover: string;
  blurb: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  year: number;
};

export const projects: Project[] = [
  {
    slug: "lumen-fintech",
    title: "Lumen — A fintech that ships in days, not quarters",
    client: "Lumen Capital",
    category: "Web",
    cover:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80",
    blurb: "Full rebrand and Next.js platform that lifted demo bookings 3.2×.",
    metrics: [
      { label: "Demo bookings", value: "+312%" },
      { label: "Lighthouse", value: "99" },
      { label: "LCP", value: "0.8s" },
    ],
    tags: ["Next.js", "Brand", "Motion"],
    year: 2025,
  },
  {
    slug: "northwind-dtc",
    title: "Northwind — DTC commerce that converts on mobile",
    client: "Northwind Outdoors",
    category: "Web",
    cover:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80",
    blurb: "Shopify Hydrogen build with 2.3× higher mobile checkout completion.",
    metrics: [
      { label: "Mobile conv.", value: "+138%" },
      { label: "Revenue", value: "+$2.4M" },
      { label: "CLS", value: "0.01" },
    ],
    tags: ["Hydrogen", "UX", "Performance"],
    year: 2025,
  },
  {
    slug: "helio-brand",
    title: "Helio — A brand system for ambient computing",
    client: "Helio Labs",
    category: "Brand",
    cover:
      "https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=1600&q=80",
    blurb: "Identity, typography, and motion language for a Series A launch.",
    metrics: [
      { label: "Press pickup", value: "47 outlets" },
      { label: "Sign-ups", value: "12,400" },
      { label: "Recall", value: "+64%" },
    ],
    tags: ["Identity", "Type", "Motion"],
    year: 2025,
  },
  {
    slug: "quanta-launch",
    title: "Quanta — Launch film & motion system",
    client: "Quanta AI",
    category: "Motion",
    cover:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=80",
    blurb: "60-second launch film + 12 product loops, in 3 weeks.",
    metrics: [
      { label: "Views", value: "2.1M" },
      { label: "Watch time", value: "78%" },
      { label: "CTR", value: "9.4%" },
    ],
    tags: ["C4D", "AE", "Sound"],
    year: 2024,
  },
  {
    slug: "pulse-shorts",
    title: "Pulse — Short-form engine for a creator economy",
    client: "Pulse Media",
    category: "Video",
    cover:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1600&q=80",
    blurb: "120+ shorts/month — script, edit, caption, ship. Performance-tuned.",
    metrics: [
      { label: "Followers", value: "+420K" },
      { label: "Avg views", value: "184K" },
      { label: "Saves", value: "+19%" },
    ],
    tags: ["Shorts", "Hooks", "Captions"],
    year: 2025,
  },
  {
    slug: "vertex-agent",
    title: "Vertex — Internal AI agent for sales ops",
    client: "Vertex Systems",
    category: "AI",
    cover:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80",
    blurb: "Custom Anthropic agent + Slack & CRM integrations. 12-hour saves/wk.",
    metrics: [
      { label: "Time saved", value: "640h/mo" },
      { label: "Deal velocity", value: "+22%" },
      { label: "Adoption", value: "94%" },
    ],
    tags: ["Anthropic", "Agents", "RAG"],
    year: 2025,
  },
];

export const projectCategories = ["All", "Web", "Brand", "Motion", "Video", "AI"] as const;
