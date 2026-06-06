"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function ContactV3() {
  const ref = React.useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status !== "idle") return;
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1100));
    setStatus("sent");
  };

  const wa = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hi! I'd like to discuss a project.")}`;

  return (
    <section
      id="contact"
      ref={ref}
      className="relative z-10 overflow-hidden py-40 sm:py-52"
      style={{ background: "#04030f" }}
    >
      {/* Neon glow blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 size-96 rounded-full blur-[120px]"
             style={{ background: "rgba(255,0,110,0.08)" }} />
        <div className="absolute right-1/4 bottom-1/4 size-80 rounded-full blur-[100px]"
             style={{ background: "rgba(139,47,255,0.08)" }} />
        <div className="absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
             style={{ background: "rgba(0,245,255,0.05)" }} />
      </div>

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/30"
        >
          Start a project
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl font-black tracking-[-0.045em] text-white sm:text-6xl lg:text-8xl"
        >
          Ready to build<br />
          <span style={{
            background: "linear-gradient(90deg,#ff006e 0%,#8b2fff 40%,#00f5ff 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            something epic?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="mx-auto mt-7 max-w-md text-base leading-relaxed text-white/40"
        >
          Drop your email or ping us on WhatsApp. We reply within hours,
          not days.
        </motion.p>

        {/* Email form */}
        <motion.form
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.26 }}
          onSubmit={submit}
          className="mx-auto mt-12 flex w-full max-w-md flex-col gap-3 sm:flex-row"
        >
          {status === "sent" ? (
            <div className="flex w-full items-center justify-center gap-3 rounded-full border border-green-500/30 bg-green-500/10 px-6 py-4 text-sm font-medium text-green-400">
              <CheckCircle2 className="size-4" />
              Sent! We'll reach out within 24 h.
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-hidden rounded-full"
                   style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="h-full w-full bg-transparent px-5 py-4 text-sm text-white placeholder:text-white/25 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={!email || status === "sending"}
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 disabled:opacity-60"
                style={{
                  background: "linear-gradient(135deg,#ff006e,#8b2fff,#00f5ff)",
                  boxShadow: "0 0 25px rgba(255,0,110,0.3), 0 0 50px rgba(139,47,255,0.15)",
                }}
              >
                {status === "sending" ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <>
                    Let's talk
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </>
          )}
        </motion.form>

        {/* WhatsApp alternate */}
        <motion.a
          href={wa}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-5 inline-flex items-center gap-2 text-sm text-white/30 transition-colors hover:text-white/60"
        >
          <MessageCircle className="size-4" />
          Or message us on WhatsApp
        </motion.a>
      </div>
    </section>
  );
}
