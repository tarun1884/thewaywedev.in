"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";

/**
 * Floating action stack: WhatsApp + lightweight chat stub.
 * Phase 2 wires this to an AI backend (Anthropic Messages API, lead capture, etc.).
 */
export function FloatingActions() {
  const [open, setOpen] = React.useState(false);

  const whatsApp = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hi! I'd like to discuss a project."
  )}`;

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto w-[min(360px,92vw)] overflow-hidden rounded-2xl border border-border/60 bg-background/95 shadow-2xl backdrop-blur-xl"
            role="dialog"
            aria-label="Chat with us"
          >
            <div className="flex items-center gap-3 bg-gradient-to-br from-violet-500 to-fuchsia-500 px-4 py-3 text-white">
              <div className="grid size-9 place-items-center rounded-full bg-white/20">
                <MessageCircle className="size-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">thewaywedev Concierge</p>
                <p className="text-[11px] opacity-80">Typically replies in minutes</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="grid size-7 place-items-center rounded-full bg-white/15 hover:bg-white/25"
              >
                <X className="size-3.5" />
              </button>
            </div>

            <div className="space-y-3 p-4 text-sm">
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-secondary px-3.5 py-2.5">
                Hi 👋 What are you looking to build?
              </div>
              <div className="flex flex-wrap gap-2">
                {["Website", "Branding", "Video", "AI automation"].map((s) => (
                  <a
                    key={s}
                    href="/contact"
                    className="rounded-full border border-border/60 bg-secondary/60 px-3 py-1 text-xs hover:bg-secondary"
                  >
                    {s}
                  </a>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const data = new FormData(e.currentTarget);
                  const msg = String(data.get("msg") ?? "");
                  if (!msg) return;
                  window.location.href = `${whatsApp}&text=${encodeURIComponent(msg)}`;
                }}
                className="flex items-center gap-2 rounded-xl border border-border/60 bg-secondary/30 px-3 py-2"
              >
                <input
                  name="msg"
                  placeholder="Type a message…"
                  className="h-9 flex-1 bg-transparent text-sm outline-none"
                />
                <button
                  type="submit"
                  className="grid size-8 place-items-center rounded-full bg-foreground text-background"
                  aria-label="Send"
                >
                  <Send className="size-3.5" />
                </button>
              </form>
              <p className="text-[10px] text-muted-foreground">
                AI replies coming in Phase 2 — for now, messages go to WhatsApp.
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="pointer-events-auto flex flex-col items-end gap-2">
        <a
          href={whatsApp}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
          className="grid size-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-500/25 transition-transform hover:scale-105"
        >
          <Phone className="size-5" />
        </a>
        <button
          type="button"
          onClick={() => setOpen((s) => !s)}
          aria-label={open ? "Close chat" : "Open chat"}
          className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 text-white shadow-lg shadow-fuchsia-500/30 transition-transform hover:scale-105"
        >
          {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
        </button>
      </div>
    </div>
  );
}
