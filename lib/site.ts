export const siteConfig = {
  name: "thewaywedev",
  fullName: "thewaywedev",
  tagline: "We build digital experiences that convert.",
  description:
    "A modern digital agency crafting websites, brands, motion, and AI-powered systems for ambitious companies.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://thewaywedev.in",
  email: "thewaywedev@gmail.com",
  phone: "+91 72099 81884",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "917209981884",
  cal: process.env.NEXT_PUBLIC_CAL_LINK ?? "thewaywedev/consultation",
  since: 2024,
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
