import type { Metadata } from "next";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { PageMasthead } from "@/components/blueprint/primitives";
import { IntakeForm } from "@/components/blueprint/intake-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project, ask a question, or just say hi. We reply within one business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const wa = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`;
  const channels = [
    { Icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { Icon: Phone, label: "Call", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
    { Icon: MessageCircle, label: "WhatsApp", value: siteConfig.phone, href: wa },
  ];

  return (
    <>
      <PageMasthead
        index="§ CONTACT"
        label="OPEN A PROJECT"
        right="REPLY < 1 BUSINESS DAY"
        title={
          <>
            Tell us what
            <br /> you&apos;re building.
          </>
        }
        intro="Fill out the intake below and we'll come back with next steps and a suggested build sequence — usually within a business day."
      />

      <div className="bg-bp-paper">
        <div className="container-px mx-auto max-w-7xl py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            {/* form */}
            <div className="lg:col-span-8">
              <IntakeForm />
            </div>

            {/* channels */}
            <aside className="lg:col-span-4">
              <div className="border-t-2 border-bp-ink pt-5">
                <span className="bp-label">DIRECT CHANNELS</span>
              </div>
              <div className="mt-5 border border-bp-line">
                {channels.map(({ Icon, label, value, href }, i) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    className={`flex items-center gap-4 bg-bp-surface p-5 transition-colors hover:bg-[#FBF9F3] ${i !== 0 ? "border-t border-bp-line" : ""}`}
                  >
                    <div className="grid size-10 shrink-0 place-items-center border border-bp-ink text-bp-ink">
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <div className="bp-label">{label}</div>
                      <div className="font-text text-[14px] text-bp-ink">{value}</div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-5 bp-frame p-5">
                <p className="bp-label mb-2">STUDIO</p>
                <p className="font-text text-[13px] leading-relaxed text-bp-muted">
                  {siteConfig.fullName} — a software &amp; web studio. Design · Develop · Deliver, since {siteConfig.since}.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
