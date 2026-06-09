import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern your use of ${siteConfig.fullName}'s website and services.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="pt-32 sm:pt-40">
      <div className="container-px mx-auto max-w-3xl pb-24">
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </p>

        <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground/90">
          <p>
            By accessing this website and engaging {siteConfig.fullName} for services, you agree to
            the following terms.
          </p>

          <h2 className="font-display text-2xl font-semibold tracking-tight">Use of the site</h2>
          <p>
            Content on this site is provided for general information. You may not reproduce or
            redistribute it without permission.
          </p>

          <h2 className="font-display text-2xl font-semibold tracking-tight">Engagements</h2>
          <p>
            Each project is governed by a separate written proposal or statement of work that
            defines scope, timeline, deliverables, and fees. Those documents take precedence over
            anything stated here.
          </p>

          <h2 className="font-display text-2xl font-semibold tracking-tight">Liability</h2>
          <p>
            Our services are provided on a best-effort basis. To the fullest extent permitted by
            law, {siteConfig.fullName} is not liable for indirect or consequential damages.
          </p>

          <h2 className="font-display text-2xl font-semibold tracking-tight">Contact</h2>
          <p>
            Questions about these terms? Email us at{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-medium underline underline-offset-4">
              {siteConfig.email}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
