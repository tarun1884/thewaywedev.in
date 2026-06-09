"use client";

import { motion } from "framer-motion";
import { Code2, LayoutTemplate, ShoppingCart, Search } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const cards = [
  {
    icon: Code2,
    title: "Custom Web Development",
    desc: "Tailor-made websites designed for scalability, responsiveness, and high performance, ensuring a seamless user experience across all devices.",
    accent: "#8b5cf6",
    rgb: "139,92,246",
  },
  {
    icon: LayoutTemplate,
    title: "CMS-Based Websites",
    desc: "We specialize in WordPress, Shopify, and Webflow, empowering you with easy-to-manage, dynamic websites for businesses of all sizes.",
    accent: "#ec4899",
    rgb: "236,72,153",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Development",
    desc: "Build powerful online stores with Shopify, WooCommerce, and Magento, offering secure transactions, intuitive navigation, and optimized checkout experiences.",
    accent: "#06b6d4",
    rgb: "6,182,212",
  },
  {
    icon: Search,
    title: "SEO-Optimized Websites",
    desc: "Our websites are designed for speed, mobile-friendliness, and search engine rankings, helping you gain better visibility and higher conversions.",
    accent: "#f59e0b",
    rgb: "245,158,11",
  },
];

export function Development() {
  return (
    <section
      id="development"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Soft aurora glows to tie into the hero palette */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-1/4 size-96 rounded-full bg-violet-400/10 blur-3xl" />
        <div className="absolute right-[8%] bottom-1/4 size-96 rounded-full bg-pink-400/10 blur-3xl" />
      </div>

      <div className="container-px relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Website Design & Development"
          title={
            <>
              Development Tailored for{" "}
              <span
                style={{
                  background:
                    "linear-gradient(95deg, #7c3aed 0%, #d6339a 50%, #4f46e5 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                Your Business
              </span>
            </>
          }
          subtitle="We craft high-performance, user-friendly websites that align with your business goals. Whether you need a custom-built website, a CMS-powered platform, or an eCommerce store, our website design and development services ensure speed, scalability, and SEO optimization."
          align="center"
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="group relative flex flex-col rounded-3xl border border-white/60 p-7 backdrop-blur-xl transition-shadow duration-300 hover:shadow-xl hover:shadow-black/5"
                style={{ background: "rgba(255,255,255,0.6)" }}
              >
                {/* Icon chip */}
                <div
                  className="grid size-12 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `rgba(${card.rgb},0.14)`,
                    border: "1px solid rgba(255,255,255,0.7)",
                  }}
                >
                  <Icon
                    className="size-6"
                    style={{ color: card.accent }}
                    strokeWidth={2}
                  />
                </div>

                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-[#111]">
                  {card.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-black/55">
                  {card.desc}
                </p>

                {/* Bottom accent line on hover */}
                <div
                  className="mt-auto pt-5"
                  aria-hidden
                >
                  <div
                    className="h-0.5 w-10 rounded-full transition-all duration-300 group-hover:w-full"
                    style={{ background: card.accent, opacity: 0.7 }}
                  />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
