export const siteConfig = {
  name: "Nova",
  fullName: "Nova Agency",
  tagline: "We build digital experiences that convert.",
  description:
    "A modern digital agency crafting websites, brands, motion, and AI-powered systems for ambitious companies.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nova.agency",
  email: "hello@nova.agency",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "911234567890",
  cal: process.env.NEXT_PUBLIC_CAL_LINK ?? "nova/consultation",
  social: {
    twitter: "https://twitter.com/nova",
    linkedin: "https://linkedin.com/company/nova",
    instagram: "https://instagram.com/nova",
    dribbble: "https://dribbble.com/nova",
    github: "https://github.com/nova",
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
