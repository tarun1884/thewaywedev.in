# Nova — Agency Website

A premium, production-ready marketing site for a modern digital agency. Built with Next.js 15, React 19, TypeScript, Tailwind, and Framer Motion. Dark/light mode, animated hero, interactive pricing calculator, multi-step contact form, command palette (`⌘K`), full SEO, sitemap, robots, manifest, FAQ schema.

> **Scope note.** This repo is **Phase 1**: the conversion surface (marketing site + lead capture). Backend systems — CMS, admin dashboard, AI chat, booking, blog content engine, client dashboard — are scaffolded as stubs and tracked in the [Phase 2 roadmap](#phase-2-roadmap) below.

---

## Quick start

```bash
# 1. Install
npm install

# 2. Env
cp .env.example .env.local
# Fill in RESEND_API_KEY, CONTACT_TO_EMAIL, WhatsApp number, etc.

# 3. Dev
npm run dev          # http://localhost:3000

# 4. Build
npm run build && npm start
```

Deploy to Vercel: `vercel --prod`. Zero config needed — Next.js 15 app router, edge-friendly.

---

## What's in Phase 1

### Pages
- `/` — Hero, Services, Portfolio, Stats, Process, Pricing Calculator, Testimonials, FAQ, CTA, Contact
- `/services` — long-form service detail page (anchored sections per service)
- `/portfolio` + `/portfolio/[slug]` — case study index and detail pages (static-generated)
- `/pricing` — standalone pricing calculator + FAQ
- `/contact` — multi-step inquiry form
- `/blog` — stub list (Phase 2: hook up Sanity / Supabase)
- `/api/inquiry` — POST endpoint with Zod validation, IP rate limit, honeypot, Resend email

### Components
```
components/
├─ layout/
│  ├─ navbar.tsx              # sticky, scroll-aware, mobile drawer
│  ├─ footer.tsx
│  ├─ scroll-progress.tsx     # top progress bar
│  ├─ command-menu.tsx        # ⌘K palette
│  ├─ floating-actions.tsx    # WhatsApp + chat stub
│  └─ theme-toggle.tsx
├─ providers/
│  └─ theme-provider.tsx
├─ sections/
│  ├─ hero.tsx                # animated headline rotation, gradient orbs
│  ├─ services.tsx
│  ├─ portfolio.tsx           # filterable, AnimatePresence layout
│  ├─ stats.tsx               # animated counters
│  ├─ process.tsx
│  ├─ testimonials.tsx
│  ├─ pricing-calculator.tsx  # interactive estimate builder
│  ├─ faq.tsx                 # FAQ + JSON-LD schema
│  ├─ cta.tsx
│  └─ contact.tsx             # 3-step form with stepper
└─ ui/
   ├─ button.tsx
   ├─ badge.tsx
   ├─ slot.tsx
   └─ section-heading.tsx
```

### Performance / SEO
- App Router with RSC by default — every section is a client component only where interactivity demands it
- `next/font` for variable font loading (Inter + Space Grotesk + JetBrains Mono)
- `next/image` with AVIF/WebP, remote patterns whitelisted
- `optimizePackageImports` for `lucide-react` + `framer-motion`
- Compression, security headers (`X-Frame-Options`, `Referrer-Policy`, etc.) in `next.config.ts`
- Dynamic `sitemap.ts`, `robots.ts`, `manifest.ts` for PWA-ready install
- Organization + FAQPage JSON-LD
- `prefers-reduced-motion` respected globally

### Accessibility
- Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`)
- Skip-to-content link
- `:focus-visible` ring across all interactive elements
- ARIA on the command menu, mobile nav, floating chat
- Keyboard nav for `⌘K` palette

### Security
- Zod schema validation on `/api/inquiry`
- IP-based token-bucket rate limit (5/min burst)
- Hidden honeypot field — bots tripping it get a fake success
- Strict security headers
- No `dangerouslySetInnerHTML` outside JSON-LD blocks

---

## Phase 2 roadmap

These are **deliberately not built** in Phase 1 to keep the conversion surface tight. Pick them up in order of business value:

| # | System | Stack | Notes |
|---|--------|-------|-------|
| 1 | **CMS for blog & portfolio** | Sanity (free) or Supabase + Postgres | Replace static arrays in `lib/projects.ts` and the blog stub. |
| 2 | **AI chat assistant** | Anthropic Messages API (`claude-haiku-4-5`) | Wire into `FloatingActions` chat panel. Lead capture into DB. |
| 3 | **Booking** | Cal.com embed (free) | Add `/book` route with `cal.com/embed`. Already wired via `NEXT_PUBLIC_CAL_LINK`. |
| 4 | **Auth + Admin dashboard** | Supabase Auth + RLS | `/admin` with leads inbox, blog editor, project CRUD. |
| 5 | **Client dashboard** | Supabase + Prisma | `/dashboard` — project status, files, invoices. |
| 6 | **Invoice / proposal generator** | `@react-pdf/renderer` | Generate PDFs from form data. |
| 7 | **Analytics dashboard** | Plausible (paid) or self-hosted Umami | Free Vercel Analytics is wired automatically on deploy. |
| 8 | **Voice search / Cmd+K AI** | Web Speech API + Anthropic | Layer over existing command menu. |

The architecture is set up for these — `lib/` is where data fetchers go, `app/api/` for backend routes, and Tailwind + `cn()` patterns make new components consistent.

---

## Environment variables

| Var | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | ✅ | Canonical URL for metadata, sitemap, OG. |
| `NEXT_PUBLIC_SITE_NAME` | — | Override `siteConfig.name`. |
| `RESEND_API_KEY` | for prod | Email sending. Without it, `/api/inquiry` logs payloads instead. |
| `CONTACT_TO_EMAIL` | — | Where inquiries land. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | — | E.164 (no `+`). Used by WhatsApp CTAs. |
| `NEXT_PUBLIC_CAL_LINK` | — | Cal.com handle for booking embed (Phase 2). |

---

## Editing content

- **Services** — `lib/services.ts`
- **Projects / case studies** — `lib/projects.ts`
- **Site name, nav, socials** — `lib/site.ts`
- **Theme tokens** — `app/globals.css` (CSS vars) and `tailwind.config.ts`

---

## Scripts

```bash
npm run dev          # next dev
npm run build        # next build (static + RSC)
npm run start        # next start (after build)
npm run typecheck    # tsc --noEmit
npm run lint         # next lint
```

---

## Deploy

**Vercel** is the path of least resistance — supports App Router, edge functions, image optimization, and analytics on the free tier. Push to GitHub, connect repo, set env vars, done.

For **Cloudflare Pages**: use the `@cloudflare/next-on-pages` adapter and set the build command to `npx @cloudflare/next-on-pages@latest`.

---

Built with care. Open an issue if you spot something.
