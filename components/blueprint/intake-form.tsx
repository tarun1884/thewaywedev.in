"use client";

import * as React from "react";
import { Check, Loader2 } from "lucide-react";

const SERVICES = ["Web Development", "UI/UX Design", "E-commerce", "Performance SEO", "Branding", "AI Automation"];
const BUDGETS = ["<₹5L", "₹5-15L", "₹15-50L", "₹50L+", "Not sure"] as const;
const TIMELINES = ["ASAP", "1-3 months", "3-6 months", "Exploring"] as const;

type Status = "idle" | "sending" | "ok" | "error";

function Label({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <span className="font-mono text-[11px] text-bp-accent">{index}</span>
      <span className="bp-label">{children}</span>
    </div>
  );
}

const field =
  "w-full border border-bp-line bg-bp-paper px-3.5 py-2.5 font-text text-[14px] text-bp-ink outline-none transition-colors placeholder:text-bp-muted/60 focus:border-bp-ink";

export function IntakeForm() {
  const [services, setServices] = React.useState<string[]>([]);
  const [budget, setBudget] = React.useState<string>("");
  const [timeline, setTimeline] = React.useState<string>("");
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState<string | null>(null);

  const toggle = (s: string) =>
    setServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      company: String(fd.get("company") || ""),
      services,
      budget,
      timeline,
      message: String(fd.get("message") || ""),
      website: String(fd.get("website") || ""), // honeypot
    };

    if (services.length < 1) return setError("Pick at least one service.");
    if (!budget) return setError("Select a budget range.");
    if (!timeline) return setError("Select a timeline.");
    if (payload.message.trim().length < 10) return setError("A bit more detail helps us help you.");

    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("ok");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to send.");
    }
  }

  if (status === "ok") {
    return (
      <div className="bp-frame flex flex-col items-start gap-4 p-10">
        <div className="grid size-11 place-items-center bg-bp-ink text-bp-paper">
          <Check className="size-5" />
        </div>
        <h3 className="font-display text-2xl font-semibold text-bp-ink">Intake received.</h3>
        <p className="max-w-md font-text text-[14px] leading-relaxed text-bp-muted">
          Thanks — your brief is logged. We reply within one business day with next steps
          and a suggested build sequence.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bp-frame p-7 sm:p-9">
      <div className="mb-6 flex items-center justify-between border-b-2 border-bp-ink pb-3">
        <span className="bp-label text-bp-ink">PROJECT INTAKE — FORM 01</span>
        <span className="bp-label">ALL FIELDS REQUIRED</span>
      </div>

      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px]" aria-hidden />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label index="01">Name</Label>
          <input name="name" required minLength={2} className={field} placeholder="Your name" />
        </div>
        <div>
          <Label index="02">Email</Label>
          <input name="email" type="email" required className={field} placeholder="you@company.com" />
        </div>
      </div>

      <div className="mt-6">
        <Label index="03">Company (optional)</Label>
        <input name="company" className={field} placeholder="Company" />
      </div>

      <div className="mt-6">
        <Label index="04">Services</Label>
        <div className="grid grid-cols-2 gap-px border border-bp-line bg-bp-line sm:grid-cols-3">
          {SERVICES.map((s) => {
            const on = services.includes(s);
            return (
              <button
                type="button"
                key={s}
                onClick={() => toggle(s)}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-left font-text text-[13px] transition-colors ${
                  on ? "bg-bp-ink text-bp-paper" : "bg-bp-paper text-bp-ink hover:bg-bp-surface"
                }`}
              >
                <span className={`grid size-4 shrink-0 place-items-center border ${on ? "border-bp-paper" : "border-bp-rule"}`}>
                  {on ? <Check className="size-3" /> : null}
                </span>
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <Label index="05">Budget</Label>
          <div className="flex flex-wrap gap-px border border-bp-line bg-bp-line">
            {BUDGETS.map((b) => (
              <button
                type="button"
                key={b}
                onClick={() => setBudget(b)}
                className={`px-3 py-2 font-mono text-[11px] transition-colors ${
                  budget === b ? "bg-bp-ink text-bp-paper" : "bg-bp-paper text-bp-ink hover:bg-bp-surface"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
        <div>
          <Label index="06">Timeline</Label>
          <div className="flex flex-wrap gap-px border border-bp-line bg-bp-line">
            {TIMELINES.map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setTimeline(t)}
                className={`px-3 py-2 font-mono text-[11px] transition-colors ${
                  timeline === t ? "bg-bp-ink text-bp-paper" : "bg-bp-paper text-bp-ink hover:bg-bp-surface"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Label index="07">Project brief</Label>
        <textarea name="message" required minLength={10} rows={5} className={field} placeholder="What are you building, and what does success look like?" />
      </div>

      {error ? (
        <p className="mt-4 font-mono text-[12px] text-bp-accent-ink">! {error}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 border border-bp-ink bg-bp-ink px-6 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-bp-paper transition-colors hover:bg-bp-paper hover:text-bp-ink disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? <Loader2 className="size-4 animate-spin" /> : null}
        {status === "sending" ? "Submitting…" : "Submit intake →"}
      </button>
    </form>
  );
}
