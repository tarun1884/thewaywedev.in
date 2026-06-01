import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/services";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, UI/UX, video, motion graphics, branding, social, and AI automation — done by one focused studio.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <div className="pt-32 sm:pt-40">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Services"
          title={<>Everything we do — <span className="text-gradient-accent">in detail.</span></>}
          subtitle="Each engagement is fixed-scope, milestone-billed, and fully transferable on completion."
        />
      </div>

      <div className="mx-auto mt-16 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-16 pb-24">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <article
                key={s.id}
                id={s.id}
                className="grid scroll-mt-32 gap-8 rounded-3xl border border-border/60 bg-card/50 p-8 backdrop-blur sm:grid-cols-5 sm:p-12"
              >
                <div className="sm:col-span-2">
                  <div className={`mb-4 grid size-12 place-items-center rounded-xl bg-gradient-to-br text-white ${s.accent}`}>
                    <Icon className="size-5" />
                  </div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    0{i + 1}
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">{s.title}</h2>
                  <p className="mt-3 text-sm text-muted-foreground">{s.description}</p>
                  <div className="mt-6 rounded-2xl border border-border/60 bg-background p-4">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Starts at</p>
                    <p className="font-display text-2xl font-semibold">{formatPrice(s.startsAt)}</p>
                  </div>
                  <Button asChild variant="accent" className="mt-5">
                    <Link href="/#contact">Start a {s.title.toLowerCase()} project</Link>
                  </Button>
                </div>
                <div className="sm:col-span-3">
                  <h3 className="text-sm font-semibold">What's included</h3>
                  <ul className="mt-4 grid gap-2">
                    {s.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-foreground/90">
                        <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                        <span>{b}</span>
                      </li>
                    ))}
                    <li className="flex items-start gap-2 text-sm text-foreground/90">
                      <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                      <span>Weekly Loom updates & shared Slack channel</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-foreground/90">
                      <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                      <span>Full source-file & asset transfer on completion</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-foreground/90">
                      <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                      <span>30-day post-delivery support included</span>
                    </li>
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
