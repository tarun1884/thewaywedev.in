import Link from "next/link";
import { Sparkles, Github, Twitter, Linkedin, Instagram, Dribbble } from "lucide-react";
import { siteConfig } from "@/lib/site";

const cols = [
  {
    heading: "Services",
    links: [
      { label: "Web Development", href: "/services#web" },
      { label: "UI/UX Design", href: "/services#design" },
      { label: "Video Editing", href: "/services#video" },
      { label: "Motion Graphics", href: "/services#motion" },
      { label: "Branding", href: "/services#branding" },
      { label: "Social Media", href: "/services#social" },
      { label: "AI Automation", href: "/services#ai" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Work", href: "/portfolio" },
      { label: "Process", href: "/process" },
      { label: "Pricing", href: "/pricing" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Case studies", href: "/portfolio" },
      { label: "FAQ", href: "/pricing#faq" },
      { label: "Book a call", href: "/contact" },
    ],
  },
];

const socials = [
  { Icon: Twitter, href: siteConfig.social.twitter, label: "Twitter" },
  { Icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { Icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
  { Icon: Dribbble, href: siteConfig.social.dribbble, label: "Dribbble" },
  { Icon: Github, href: siteConfig.social.github, label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border/60 bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
      <div className="container-px relative mx-auto max-w-7xl py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2 font-display text-xl font-semibold">
              <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 text-white">
                <Sparkles className="size-4" />
              </span>
              {siteConfig.fullName}
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-full border border-border/60 bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {cols.map((col) => (
              <div key={col.heading}>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {col.heading}
                </h3>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.fullName}. Crafted with care since {siteConfig.since}.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms</Link>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-foreground">
              {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground">
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
