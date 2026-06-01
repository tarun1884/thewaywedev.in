"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const testimonials = [
  {
    quote:
      "Nova rebuilt our marketing site in six weeks. Demo bookings tripled and our sales team finally believes the website is their best closer.",
    name: "Maya Chen",
    role: "VP Marketing, Lumen",
    rating: 5,
  },
  {
    quote:
      "Easily the most thoughtful design partner we've worked with. They asked the question we should have asked ourselves three quarters ago.",
    name: "Rahul Verma",
    role: "Founder, Helio Labs",
    rating: 5,
  },
  {
    quote:
      "Their motion team turned a 14-slide pitch deck into a 60-second film our investors actually shared. We closed our round in two weeks.",
    name: "Sara Okafor",
    role: "CEO, Quanta AI",
    rating: 5,
  },
  {
    quote:
      "The AI agent they built saves our ops team 160+ hours per month. It's the only piece of software we've never had to babysit.",
    name: "Ben Kowalski",
    role: "COO, Vertex",
    rating: 5,
  },
  {
    quote:
      "From kickoff to launch in 28 days. Lighthouse 99 on mobile. They're the rare agency that ships exactly what was scoped.",
    name: "Priya Nair",
    role: "Head of Growth, Northwind",
    rating: 5,
  },
  {
    quote:
      "Our short-form engine has been on autopilot for 9 months. 420K new followers. The numbers speak louder than I can.",
    name: "Diego Alvarez",
    role: "Creator, Pulse",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Why teams stay"
          title={<>Clients we've grown with.</>}
          subtitle="120+ engagements. 94% client renewal. The kind of partnerships that compound."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              className="group relative flex h-full flex-col rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur transition-colors hover:border-border"
            >
              <Quote className="size-6 text-muted-foreground/40" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                "{t.quote}"
              </blockquote>
              <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4">
                <figcaption>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </figcaption>
                <div className="flex">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
