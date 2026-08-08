import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin, Instagram, Dribbble } from "lucide-react";
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
    <footer className="relative mt-24 border-t-2 border-bp-ink bg-bp-paper">
      <div className="container-px relative mx-auto max-w-7xl py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center" aria-label={siteConfig.fullName}>
              <Image
                src="/logo.png"
                alt={siteConfig.fullName}
                width={900}
                height={415}
                className="h-16 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-sm font-text text-sm leading-relaxed text-bp-muted">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex items-center gap-0 border border-bp-line">
              {socials.map(({ Icon, href, label }, i) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className={`grid size-9 place-items-center text-bp-muted transition-colors hover:bg-bp-ink hover:text-bp-paper ${i !== 0 ? "border-l border-bp-line" : ""}`}
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {cols.map((col) => (
              <div key={col.heading}>
                <h3 className="bp-label mb-4 border-b border-bp-line pb-2">
                  {col.heading}
                </h3>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="font-text text-sm text-bp-muted transition-colors hover:text-bp-ink"
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

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-bp-line pt-6 sm:flex-row sm:items-center">
          <p className="bp-label normal-case tracking-normal">
            © {new Date().getFullYear()} {siteConfig.fullName}. Since {siteConfig.since}.
          </p>
          <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] text-bp-muted">
            <Link href="/privacy" className="hover:text-bp-ink">Privacy</Link>
            <Link href="/terms" className="hover:text-bp-ink">Terms</Link>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-bp-ink">
              {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="hover:text-bp-ink">
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
