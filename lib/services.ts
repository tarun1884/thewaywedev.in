import {
  Code2,
  Palette,
  Video,
  Sparkles,
  Type,
  Share2,
  Bot,
  LucideIcon,
} from "lucide-react";

export type Service = {
  id: string;
  slug: string;
  title: string;
  icon: LucideIcon;
  description: string;
  benefits: string[];
  startsAt: number; // USD
  accent: string; // tailwind gradient tail
};

export const services: Service[] = [
  {
    id: "web",
    slug: "web-development",
    title: "Web Development",
    icon: Code2,
    description:
      "Lightning-fast websites and web apps built with Next.js, React, and edge infrastructure.",
    benefits: ["95+ Lighthouse", "SEO-ready", "Headless CMS", "Edge rendered"],
    startsAt: 2500,
    accent: "from-violet-500 to-indigo-500",
  },
  {
    id: "design",
    slug: "ui-ux-design",
    title: "UI/UX Design",
    icon: Palette,
    description:
      "Research-driven product design — wireframes, prototypes, and pixel-perfect interfaces.",
    benefits: ["Figma systems", "Prototyping", "User testing", "Design tokens"],
    startsAt: 1800,
    accent: "from-fuchsia-500 to-pink-500",
  },
  {
    id: "video",
    slug: "video-editing",
    title: "Video Editing",
    icon: Video,
    description:
      "Cinematic edits for ads, brand films, and short-form content that captures attention.",
    benefits: ["Color grading", "Sound design", "Subtitles", "Multi-platform"],
    startsAt: 600,
    accent: "from-sky-500 to-cyan-500",
  },
  {
    id: "motion",
    slug: "motion-graphics",
    title: "Motion Graphics",
    icon: Sparkles,
    description:
      "Bespoke 2D & 3D motion graphics — explainers, product reveals, and brand bumpers.",
    benefits: ["After Effects", "Cinema 4D", "Logo animations", "Lottie ready"],
    startsAt: 900,
    accent: "from-amber-500 to-orange-500",
  },
  {
    id: "branding",
    slug: "branding",
    title: "Branding",
    icon: Type,
    description:
      "Identity systems with intent — naming, logos, typography, and brand guidelines.",
    benefits: ["Logo system", "Type & color", "Voice & tone", "Brand book"],
    startsAt: 1500,
    accent: "from-emerald-500 to-teal-500",
  },
  {
    id: "social",
    slug: "social-media",
    title: "Social Media Content",
    icon: Share2,
    description:
      "Scroll-stopping content engines for Instagram, TikTok, LinkedIn, and YouTube Shorts.",
    benefits: ["Strategy", "Creative", "Captions & SEO", "Performance"],
    startsAt: 1200,
    accent: "from-rose-500 to-red-500",
  },
  {
    id: "ai",
    slug: "ai-automation",
    title: "AI Automation",
    icon: Bot,
    description:
      "Custom AI agents, workflows, and integrations that compound your team's output.",
    benefits: ["Custom agents", "Workflow eng.", "RAG / search", "Anthropic + OpenAI"],
    startsAt: 3000,
    accent: "from-blue-500 to-violet-500",
  },
];
