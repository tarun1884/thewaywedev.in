export const siteConfig = {
  name: "thewaywedev",
  fullName: "thewaywedev",
  tagline: "We build digital experiences that convert.",
  description:
    "A modern digital agency crafting websites, brands, motion, and AI-powered systems for ambitious companies.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://thewaywedev.in",
  email: "hello@thewaywedev.in",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "911234567890",
  cal: process.env.NEXT_PUBLIC_CAL_LINK ?? "thewaywedev/consultation",
  social: {
    twitter: "https://twitter.com/thewaywedev",
    linkedin: "https://linkedin.com/company/thewaywedev",
    instagram: "https://instagram.com/thewaywedev",
    dribbble: "https://dribbble.com/thewaywedev",
    github: "https://github.com/thewaywedev",
  },
  nav: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/portfolio" },
    { label: "Process", href: "/process" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};

export type SiteConfig = typeof siteConfig;
