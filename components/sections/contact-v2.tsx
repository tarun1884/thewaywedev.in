"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

export function ContactV2() {
  const ref = React.useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "sending") return;
    setStatus("sending");
    // Replace with real API call to /api/inquiry once Resend is set up
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative z-10 overflow-hidden px-5 py-40 sm:px-8 sm:py-52"
    >
      {/* Soft gradient blob */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-[1]">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.07) 0%, rgba(56,189,248,0.05) 50%, transparent 70%)" }} />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#555] backdrop-blur-sm"
        >
          <span className="size-1.5 rounded-full bg-[#111]" />
          Contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl font-semibold tracking-[-0.04em] text-[#111] sm:text-6xl lg:text-7xl"
        >
          Let's build something<br />
          <span style={{
            background: "linear-gradient(135deg, #8B5CF6, #FB923C, #38BDF8)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            brilliant.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.14 }}
          className="mx-auto mt-7 max-w-md text-base leading-relaxed text-[#666]"
        >
          Drop your email and we'll reach out within one business day to schedule a
          free 20-minute strategy call.
        </motion.p>

        {/* Email form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.22 }}
          onSubmit={handleSubmit}
          className="mx-auto mt-12 flex w-full max-w-md flex-col items-stretch gap-3 sm:flex-row"
        >
          {status === "sent" ? (
            <div className="flex w-full items-center justify-center gap-3 rounded-full border border-emerald-200 bg-emerald-50 px-6 py-4 text-sm font-medium text-emerald-700">
              <CheckCircle2 className="size-4" />
              You're on the list — we'll be in touch soon.
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-hidden rounded-full border border-black/10 bg-white shadow-inner"
                   style={{ boxShadow: "inset 0 2px 6px rgba(0,0,0,0.05)" }}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  disabled={status === "sending"}
                  className="h-full w-full bg-transparent px-5 py-3.5 text-sm text-[#111] placeholder:text-[#aaa] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending" || !email}
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#111] px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-black hover:shadow-xl hover:shadow-black/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <>
                    Get in touch
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </>
          )}
        </motion.form>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-6 text-xs text-[#aaa]"
        >
          No spam. No sales decks. Just a real conversation.
        </motion.p>
      </div>
    </section>
  );
}
