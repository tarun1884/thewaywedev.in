"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { Code2, ShoppingCart, TrendingUp, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: "web",
    title: "Full-Stack Web Development",
    desc: "React, Next.js, and immersive frontends built for performance and scale. From design system to deployment in weeks.",
    detail: ["Next.js App Router", "TypeScript & APIs", "Edge rendering", "95+ Lighthouse"],
    icon: Code2,
    color: "#8B5CF6",     // violet
    bg: "from-violet-50 to-purple-50/60",
    border: "border-violet-100",
    iconBg: "bg-violet-100 text-violet-600",
    cta: "/services#web",
    span: "lg:col-span-2",
  },
  {
    id: "ecom",
    title: "E-commerce Solutions",
    desc: "High-conversion storefronts and deep integrations that turn traffic into revenue.",
    detail: ["Shopify Hydrogen", "Custom checkout", "Payment flows", "+138% conv. avg"],
    icon: ShoppingCart,
    color: "#FB923C",     // peach
    bg: "from-orange-50 to-amber-50/60",
    border: "border-orange-100",
    iconBg: "bg-orange-100 text-orange-600",
    cta: "/services#ecom",
    span: "",
  },
  {
    id: "seo",
    title: "SEO & Growth",
    desc: "Technical ranking strategies and search visibility at enterprise scale.",
    detail: ["Core Web Vitals", "Schema markup", "Programmatic SEO", "+4.2× traffic avg"],
    icon: TrendingUp,
    color: "#38BDF8",     // sky
    bg: "from-sky-50 to-cyan-50/60",
    border: "border-sky-100",
    iconBg: "bg-sky-100 text-sky-600",
    cta: "/services#seo",
    span: "",
  },
];

export function ServicesV2() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      ref={ref}
      className="relative z-10 py-32 sm:py-40"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#555] backdrop-blur-sm"
        >
          <span className="size-1.5 rounded-full bg-[#111]" />
          What we do
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.06 }}
          className="mb-14 font-display text-5xl font-semibold tracking-[-0.03em] text-[#111] sm:text-6xl lg:text-7xl"
        >
          Three crafts,<br className="hidden sm:block" /> infinite outcomes.
        </motion.h2>

        {/* Bento grid */}
        <div className="grid gap-4 lg:grid-cols-3">
          {services.map((s, idx) => (
            <ServiceCard key={s.id} service={s} index={idx} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
  inView,
}: {
  service: (typeof services)[number];
  index: number;
  inView: boolean;
}) {
  const Icon = service.icon;

  const dispatch = (type: "card-hover" | "card-leave") =>
    window.dispatchEvent(
      new CustomEvent(type, type === "card-hover" ? { detail: { color: service.color } } : undefined)
    );

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 + 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => dispatch("card-hover")}
      onMouseLeave={() => dispatch("card-leave")}
      className={`group relative overflow-hidden rounded-3xl border ${service.border} bg-gradient-to-br ${service.bg} p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/8 sm:p-8 ${service.span}`}
      style={{
        background: `linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.6) 100%)`,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `1px solid rgba(255,255,255,0.9)`,
        boxShadow: "0 4px 24px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      {/* Accent glow on hover */}
      <div
        className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-30"
        style={{ background: service.color }}
        aria-hidden
      />

      {/* Icon */}
      <div className={`mb-6 inline-flex size-12 items-center justify-center rounded-2xl ${service.iconBg}`}>
        <Icon className="size-5" />
      </div>

      <h3 className="font-display text-2xl font-semibold tracking-tight text-[#111] sm:text-3xl">
        {service.title}
      </h3>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#555]">{service.desc}</p>

      {/* Detail pills */}
      <ul className="mt-6 flex flex-wrap gap-2">
        {service.detail.map((d) => (
          <li
            key={d}
            className="rounded-full border border-black/8 bg-white/70 px-3 py-1 text-xs font-medium text-[#555]"
          >
            {d}
          </li>
        ))}
      </ul>

      {/* CTA link */}
      <Link
        href={service.cta}
        className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-[#111] underline-offset-4 hover:underline"
      >
        Learn more
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </motion.article>
  );
}
