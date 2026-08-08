"use client";

import { SectionHeader, Assemble } from "./primitives";

const MODULES = [
  {
    id: "A1",
    title: "Custom Web Development",
    desc: "Tailor-made sites engineered for scalability, responsiveness, and high performance — a seamless experience across every device.",
    specs: ["Next.js 15", "TypeScript", "Edge runtime"],
  },
  {
    id: "A2",
    title: "CMS-Based Websites",
    desc: "WordPress, Shopify, and Webflow builds that hand you easy-to-manage, dynamic content — for teams of any size.",
    specs: ["WordPress", "Shopify", "Webflow"],
  },
  {
    id: "A3",
    title: "E-commerce Development",
    desc: "Powerful online stores on Shopify, WooCommerce, and Magento — secure transactions, intuitive navigation, optimized checkout.",
    specs: ["Shopify", "WooCommerce", "Stripe"],
  },
  {
    id: "A4",
    title: "SEO-Optimized Websites",
    desc: "Built for speed, mobile-friendliness, and search rankings — better visibility that compounds into higher conversions.",
    specs: ["Core Web Vitals", "Schema", "Content ops"],
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="border-b border-bp-line bg-bp-paper">
      <div className="container-px mx-auto max-w-7xl py-20 sm:py-24">
        <SectionHeader
          index="01"
          label="CAPABILITIES / BUILD SPEC"
          title={
            <>
              Development tailored for
              <br className="hidden sm:block" /> your business.
            </>
          }
          intro="We craft high-performance, user-friendly websites aligned with your goals — custom build, CMS platform, or storefront — engineered for speed, scalability, and search."
        />

        <div className="mt-14 grid gap-px border border-bp-line bg-bp-line lg:grid-cols-12">
          {MODULES.map((m, i) => {
            const span = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"][i];
            return (
              <Assemble key={m.id} delay={i * 0.06} className={span}>
                <article className="flex h-full flex-col bg-bp-surface p-7 sm:p-8">
                  {/* header row over a structural rule */}
                  <div className="flex items-center justify-between border-b-2 border-bp-ink/85 pb-3">
                    <span className="font-mono text-xs text-bp-ink/55">{m.id}</span>
                    <span className="bp-label">MODULE — 0{i + 1}/04</span>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-semibold tracking-[-0.01em] text-bp-ink">
                    {m.title}
                  </h3>
                  <p className="mt-3 max-w-xl flex-1 font-text text-[14px] leading-relaxed text-bp-muted">
                    {m.desc}
                  </p>

                  {/* spec footer */}
                  <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-bp-line pt-4">
                    {m.specs.map((s) => (
                      <span key={s} className="bp-label flex items-center gap-1.5 text-bp-ink/70">
                        <span className="inline-block h-1 w-1 bg-bp-muted" />
                        {s}
                      </span>
                    ))}
                  </div>
                </article>
              </Assemble>
            );
          })}
        </div>
      </div>
    </section>
  );
}
