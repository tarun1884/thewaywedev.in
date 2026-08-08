"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Command } from "lucide-react";
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
        "fixed inset-x-0 top-0 z-40 border-b transition-all duration-300",
        scrolled
          ? "border-bp-line bg-bp-paper/95 backdrop-blur-md"
          : "border-transparent bg-bp-paper/70 backdrop-blur-sm"
      )}
    >
      <div className="container-px mx-auto max-w-7xl">
        <nav
          className={cn(
            "flex items-center justify-between transition-all duration-300",
            scrolled ? "py-2.5" : "py-4"
          )}
          aria-label="Primary"
        >
          <Link href="/" className="flex items-center" aria-label={siteConfig.fullName}>
            <Image
              src="/logo-nav.png"
              alt={siteConfig.fullName}
              width={900}
              height={349}
              priority
              className="h-9 w-auto sm:h-10"
            />
          </Link>

          <ul className="hidden items-center gap-7 md:flex">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-mono text-[11px] uppercase tracking-[0.14em] text-bp-muted transition-colors hover:text-bp-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("command-menu:open"))
              }
              className="hidden items-center gap-2 border border-bp-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-bp-muted hover:border-bp-ink hover:text-bp-ink md:inline-flex"
              aria-label="Open command menu"
            >
              <Command className="size-3" />
              <span>K</span>
            </button>
            <Link
              href="/contact"
              className="hidden bg-bp-ink px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-bp-paper transition-colors hover:bg-bp-accent sm:inline-flex"
            >
              Start a project
            </Link>
            <button
              type="button"
              className="grid size-9 place-items-center border border-bp-line text-bp-ink md:hidden"
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
          <div className="mb-3 border border-bp-line bg-bp-surface">
            <ul className="flex flex-col divide-y divide-bp-line">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 font-mono text-xs uppercase tracking-[0.14em] text-bp-ink hover:bg-bp-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="block bg-bp-ink px-4 py-3 text-center font-mono text-xs uppercase tracking-[0.14em] text-bp-paper"
                >
                  Start a project
                </Link>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
