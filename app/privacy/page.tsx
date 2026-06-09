import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.fullName} collects, uses, and protects your information.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 sm:pt-40">
      <div className="container-px mx-auto max-w-3xl pb-24">
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </p>

        <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground/90">
          <p>
            {siteConfig.fullName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This policy explains
            what information we collect and how we use it when you visit our website or contact us.
          </p>

          <h2 className="font-display text-2xl font-semibold tracking-tight">Information we collect</h2>
          <p>
            We only collect the information you choose to share with us — such as your name, email
            address, phone number, and project details — when you submit our contact form or reach
            out by email, phone, or WhatsApp.
          </p>

          <h2 className="font-display text-2xl font-semibold tracking-tight">How we use it</h2>
          <p>
            We use your information solely to respond to your inquiry, prepare proposals, and deliver
            the services you request. We never sell your data to third parties.
          </p>

          <h2 className="font-display text-2xl font-semibold tracking-tight">Contact</h2>
          <p>
            Questions about this policy? Email us at{" "}
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
