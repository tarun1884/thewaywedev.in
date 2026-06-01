"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Sparkles, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div className="container-px mx-auto max-w-7xl">
        <nav
          className={cn(
            "flex items-center justify-between rounded-full border px-4 py-2 transition-all duration-300",
            scrolled
              ? "border-border/60 bg-background/70 backdrop-blur-xl shadow-sm"
              : "border-transparent bg-transparent"
          )}
          aria-label="Primary"
        >
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-lg font-semibold"
          >
            <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 text-white">
              <Sparkles className="size-4" />
            </span>
            {siteConfig.name}
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("command-menu:open"))
              }
              className="hidden items-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground hover:bg-secondary md:inline-flex"
              aria-label="Open command menu"
            >
              <Command className="size-3" />
              <span>K</span>
            </button>
            <ThemeToggle />
            <Button asChild size="sm" variant="accent" className="hidden sm:inline-flex">
              <Link href="/#contact">Start a project</Link>
            </Button>
            <button
              type="button"
              className="md:hidden grid size-9 place-items-center rounded-full border border-border/60"
              onClick={() => setOpen((s) => !s)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={
            open
              ? { height: "auto", opacity: 1, marginTop: 8 }
              : { height: 0, opacity: 0, marginTop: 0 }
          }
          transition={{ duration: 0.25 }}
          className="overflow-hidden md:hidden"
        >
          <div className="rounded-2xl border border-border/60 bg-background/80 p-3 backdrop-blur-xl">
            <ul className="flex flex-col">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-2.5 text-sm hover:bg-secondary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Button asChild variant="accent" className="w-full">
                  <Link href="/#contact" onClick={() => setOpen(false)}>
                    Start a project
                  </Link>
                </Button>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
