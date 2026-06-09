"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";

const testimonials = [
  {
    quote: "Nova rebuilt our marketing site in six weeks. Demo bookings tripled and our sales team finally believes the website is their best closer.",
    name: "Maya Chen",
    role: "VP Marketing, Lumen",
    rating: 5,
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    quote: "Easily the most thoughtful design partner we've worked with. They asked the question we should have asked ourselves three quarters ago.",
    name: "Rahul Verma",
    role: "Founder, Helio Labs",
    rating: 5,
    accent: "from-sky-500 to-cyan-500",
  },
  {
    quote: "Their motion team turned a 14-slide pitch deck into a 60-second film our investors actually shared. We closed our round in two weeks.",
    name: "Sara Okafor",
    role: "CEO, Quanta AI",
    rating: 5,
    accent: "from-pink-500 to-rose-500",
  },
  {
    quote: "The AI agent they built saves our ops team 160+ hours per month. It's the only piece of software we've never had to babysit.",
    name: "Ben Kowalski",
    role: "COO, Vertex",
    rating: 5,
    accent: "from-amber-500 to-orange-500",
  },
  {
    quote: "From kickoff to launch in 28 days. Lighthouse 99 on mobile. They're the rare agency that ships exactly what was scoped.",
    name: "Priya Nair",
    role: "Head of Growth, Northwind",
    rating: 5,
    accent: "from-emerald-500 to-teal-500",
  },
  {
    quote: "Our short-form engine has been on autopilot for 9 months. 420K new followers. The numbers speak louder than I can.",
    name: "Diego Alvarez",
    role: "Creator, Pulse",
    rating: 5,
    accent: "from-blue-500 to-indigo-500",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Client Reviews"
          title={<>What our clients say.</>}
          subtitle="120+ engagements. 94% client renewal. The kind of partnerships that compound."
          align="center"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <TiltCard
                intensity={8}
                scale={1.02}
                className="flex h-full flex-col rounded-2xl border border-border/60 bg-card/60 shadow-sm backdrop-blur transition-shadow duration-300 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30"
              >
                {/* Top accent bar */}
                <div className={`h-0.5 w-full rounded-t-2xl bg-gradient-to-r ${t.accent}`} />

                <div className="relative flex flex-1 flex-col p-6">
                  {/* Ambient glow in corner */}
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -right-4 -top-4 size-24 rounded-full bg-gradient-to-br ${t.accent} opacity-10 blur-2xl`}
                  />

                  <Quote className="size-7 text-muted-foreground/30" />

                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                    "{t.quote}"
                  </blockquote>

                  <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar placeholder */}
                      <div className={`grid size-9 place-items-center rounded-full bg-gradient-to-br ${t.accent} text-[10px] font-bold text-white`}>
                        {t.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                    <div className="flex">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
