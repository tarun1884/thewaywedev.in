"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function CTA() {
  const whatsApp = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`;
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-px mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card p-10 sm:p-16">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -top-32 left-1/4 size-96 rounded-full bg-violet-500/30 blur-3xl" />
            <div className="absolute -bottom-24 right-1/4 size-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
            <div className="absolute inset-0 grid-pattern opacity-40" />
          </div>

          <div className="relative grid items-center gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
              >
                Let's build the thing your <span className="text-gradient-accent">competitors will copy.</span>
              </motion.h2>
              <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
                Book a free 20-minute strategy call. No pitch — just a tight conversation about your goals,
                constraints, and the highest-leverage move you can make this quarter.
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:col-span-2">
              <Button asChild variant="accent" size="lg" className="w-full">
                <Link href="/#contact">
                  <Calendar className="size-4" /> Book a free strategy call
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full">
                <a href={whatsApp} target="_blank" rel="noreferrer">
                  <MessageCircle className="size-4" /> WhatsApp us
                </a>
              </Button>
              <p className="mt-1 text-center text-xs text-muted-foreground">
                Typical reply time: under 2 hours, Mon–Fri.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
