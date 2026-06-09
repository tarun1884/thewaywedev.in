import type { LucideIcon } from "lucide-react";
import { Layers, ShoppingBag, TrendingUp, LayoutDashboard } from "lucide-react";

export type NodeService = {
  id: number;
  label: string;   // Short — shown on floating node pill
  title: string;   // Full — shown in expanded card
  emoji: string;
  icon: LucideIcon; // Line icon rendered inside the glass node
  desc: string;
  tech: string[];
  stat: string;
  statLabel: string;
  pos: [number, number, number];
  accent: string;  // hex
  rgb: string;     // "r,g,b" for rgba()
};

export const NODE_SERVICES: NodeService[] = [
  {
    id: 0,
    label: "Next.js Architecture",
    title: "Next.js Architecture",
    emoji: "⚡",
    icon: Layers,
    desc: "Enterprise-grade apps built with Next.js 15, TypeScript, and edge infrastructure. We architect systems that handle millions of requests with sub-second response times.",
    tech: ["Next.js 15", "React 19", "TypeScript", "Prisma", "PostgreSQL", "Edge Runtime"],
    stat: "99",
    statLabel: "Avg Lighthouse Score",
    pos: [-2.2, 1.1, 0],
    accent: "#8b5cf6",
    rgb: "139,92,246",
  },
  {
    id: 1,
    label: "Shopify & E-Commerce",
    title: "Shopify & E-Commerce",
    emoji: "🛍",
    icon: ShoppingBag,
    desc: "Custom storefronts engineered for conversion. Every pixel of the user journey — from discovery to checkout — is optimised to maximise revenue.",
    tech: ["Shopify Hydrogen", "Next Commerce", "Stripe", "Custom Checkout", "Analytics"],
    stat: "+138%",
    statLabel: "Avg Conversion Lift",
    pos: [2.2, 0.7, 0],
    accent: "#ec4899",
    rgb: "236,72,153",
  },
  {
    id: 2,
    label: "Performance SEO",
    title: "Performance SEO",
    emoji: "🔍",
    icon: TrendingUp,
    desc: "Technical SEO that compounds. Core Web Vitals mastery, schema markup, and programmatic content strategy that makes dominating search inevitable.",
    tech: ["Core Web Vitals", "Schema Markup", "Programmatic SEO", "Content Ops", "Analytics"],
    stat: "4.2×",
    statLabel: "Avg Organic Traffic Lift",
    pos: [-1.8, -1.4, 0],
    accent: "#06b6d4",
    rgb: "6,182,212",
  },
  {
    id: 3,
    label: "UI/UX Systems",
    title: "UI/UX Systems",
    emoji: "🎨",
    icon: LayoutDashboard,
    desc: "Design systems that scale. Comprehensive component libraries, interaction patterns, and brand languages — keeping your product consistent from sprint one to launch.",
    tech: ["Figma Systems", "Framer", "Storybook", "Design Tokens", "Accessibility"],
    stat: "94%",
    statLabel: "Avg User Satisfaction",
    pos: [2.0, -1.3, 0],
    accent: "#f59e0b",
    rgb: "245,158,11",
  },
];
