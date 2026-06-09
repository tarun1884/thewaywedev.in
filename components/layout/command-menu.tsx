"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Home,
  Briefcase,
  Mail,
  FileText,
  Calculator,
  Sparkles,
  MessageCircle,
  Compass,
} from "lucide-react";

type Item = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  group: "Navigate" | "Actions";
  hint?: string;
};

const ITEMS: Item[] = [
  { label: "Home", href: "/", icon: Home, group: "Navigate" },
  { label: "Services", href: "/services", icon: Sparkles, group: "Navigate" },
  { label: "Work / Portfolio", href: "/portfolio", icon: Briefcase, group: "Navigate" },
  { label: "Process", href: "/process", icon: Compass, group: "Navigate" },
  { label: "Pricing", href: "/pricing", icon: Calculator, group: "Navigate" },
  { label: "Blog", href: "/blog", icon: FileText, group: "Navigate" },
  { label: "Contact", href: "/contact", icon: Mail, group: "Navigate" },
  { label: "Start a project", href: "/contact", icon: MessageCircle, group: "Actions", hint: "Open inquiry form" },
];

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((s) => !s);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("command-menu:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("command-menu:open", onOpen);
    };
  }, []);

  React.useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ITEMS;
    return ITEMS.filter((i) => i.label.toLowerCase().includes(q));
  }, [query]);

  const groups = React.useMemo(() => {
    const out: Record<string, Item[]> = {};
    for (const item of filtered) {
      (out[item.group] ||= []).push(item);
    }
    return out;
  }, [filtered]);

  const go = (item: Item) => {
    setOpen(false);
    router.push(item.href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filtered[active];
      if (item) go(item);
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[60] grid place-items-start justify-center p-4 pt-[14vh] backdrop-blur-md"
          onClick={() => setOpen(false)}
          aria-modal
          role="dialog"
        >
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-border/60 bg-background/90 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 border-b border-border/60 px-4">
              <Search className="size-4 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onKeyDown}
                placeholder="Search pages, services, actions…"
                className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <kbd className="hidden rounded-md border border-border/60 bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline-block">
                Esc
              </kbd>
            </div>
            <div className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p className="p-6 text-center text-sm text-muted-foreground">
                  No results.
                </p>
              ) : (
                Object.entries(groups).map(([group, items]) => (
                  <div key={group} className="mb-1">
                    <p className="px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      {group}
                    </p>
                    {items.map((item) => {
                      const idx = filtered.indexOf(item);
                      const isActive = idx === active;
                      const Icon = item.icon;
                      return (
                        <button
                          type="button"
                          key={item.label}
                          onMouseEnter={() => setActive(idx)}
                          onClick={() => go(item)}
                          className={
                            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors " +
                            (isActive ? "bg-secondary" : "hover:bg-secondary/60")
                          }
                        >
                          <Icon className="size-4 text-muted-foreground" />
                          <span className="flex-1">{item.label}</span>
                          {item.hint ? (
                            <span className="text-xs text-muted-foreground">
                              {item.hint}
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
            <div className="flex items-center justify-between border-t border-border/60 px-4 py-2 text-[11px] text-muted-foreground">
              <span>↑↓ navigate · ↵ select</span>
              <span>⌘K to toggle</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
