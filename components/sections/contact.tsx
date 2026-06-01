"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type Step = 0 | 1 | 2 | 3;
type FormState = {
  services: string[];
  budget: string;
  timeline: string;
  name: string;
  email: string;
  company: string;
  message: string;
  website: string; // honeypot
};

const initial: FormState = {
  services: [],
  budget: "",
  timeline: "",
  name: "",
  email: "",
  company: "",
  message: "",
  website: "",
};

const budgets = ["<5k", "5-15k", "15-50k", "50k+", "Not sure"];
const timelines = ["ASAP", "1-3 months", "3-6 months", "Exploring"];

export function Contact() {
  const [step, setStep] = React.useState<Step>(0);
  const [form, setForm] = React.useState<FormState>(initial);
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((s) => ({ ...s, [k]: v }));

  const toggleService = (id: string) =>
    set("services", form.services.includes(id)
      ? form.services.filter((x) => x !== id)
      : [...form.services, id]);

  const canNext =
    (step === 0 && form.services.length > 0) ||
    (step === 1 && form.budget && form.timeline) ||
    (step === 2 && form.name.trim().length >= 2 && /\S+@\S+\.\S+/.test(form.email));

  const next = () => setStep((s) => Math.min(3, s + 1) as Step);
  const back = () => setStep((s) => Math.max(0, s - 1) as Step);

  const submit = async () => {
    setStatus("submitting");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Failed");
      setStatus("success");
      setStep(3);
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Something went wrong");
    }
  };

  const whatsApp = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`;

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="container-px mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading
              eyebrow="Let's talk"
              title={<>Tell us what you're <span className="text-gradient-accent">building</span>.</>}
              subtitle="Three quick steps. We'll reply within one business day."
            />
            <div className="mt-8 space-y-3 text-sm">
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur transition-colors hover:bg-card">
                <div className="grid size-9 place-items-center rounded-xl bg-secondary"><Mail className="size-4" /></div>
                <div>
                  <p className="font-medium">Email us</p>
                  <p className="text-xs text-muted-foreground">{siteConfig.email}</p>
                </div>
              </a>
              <a href={whatsApp} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur transition-colors hover:bg-card">
                <div className="grid size-9 place-items-center rounded-xl bg-emerald-500/15 text-emerald-500"><MessageCircle className="size-4" /></div>
                <div>
                  <p className="font-medium">WhatsApp</p>
                  <p className="text-xs text-muted-foreground">+{siteConfig.whatsapp}</p>
                </div>
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur sm:p-8">
              <Stepper step={step} />

              {/* Honeypot — must stay visually hidden, off-screen, and unfocusable */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => set("website", e.target.value)}
                className="absolute -left-[10000px] size-0 opacity-0"
                aria-hidden
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                >
                  {step === 0 ? (
                    <StepServices form={form} toggleService={toggleService} />
                  ) : step === 1 ? (
                    <StepScope form={form} set={set} />
                  ) : step === 2 ? (
                    <StepDetails form={form} set={set} />
                  ) : (
                    <StepDone name={form.name} />
                  )}
                </motion.div>
              </AnimatePresence>

              {step < 3 ? (
                <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                  {step > 0 ? (
                    <Button variant="ghost" onClick={back} className="sm:w-auto">
                      <ArrowLeft className="size-4" /> Back
                    </Button>
                  ) : <div />}

                  {step < 2 ? (
                    <Button variant="accent" onClick={next} disabled={!canNext} className="sm:w-auto">
                      Continue <ArrowRight className="size-4" />
                    </Button>
                  ) : (
                    <Button variant="accent" onClick={submit} disabled={!canNext || status === "submitting"} className="sm:w-auto">
                      {status === "submitting" ? (
                        <><Loader2 className="size-4 animate-spin" /> Sending…</>
                      ) : (
                        <>Send inquiry <ArrowRight className="size-4" /></>
                      )}
                    </Button>
                  )}
                </div>
              ) : null}

              {errorMsg ? (
                <p className="mt-4 text-sm text-red-500" role="alert">{errorMsg}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stepper({ step }: { step: number }) {
  const labels = ["Services", "Scope", "Details", "Done"];
  return (
    <div className="mb-8 flex items-center gap-2">
      {labels.map((l, i) => (
        <React.Fragment key={l}>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "grid size-6 place-items-center rounded-full border text-[11px] font-semibold transition-colors",
                i < step
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : i === step
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground"
              )}
            >
              {i < step ? <Check className="size-3" /> : i + 1}
            </span>
            <span className={cn("hidden text-xs sm:inline", i === step ? "text-foreground" : "text-muted-foreground")}>
              {l}
            </span>
          </div>
          {i < labels.length - 1 ? (
            <span className={cn("h-px flex-1 transition-colors", i < step ? "bg-emerald-500" : "bg-border")} />
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
}

function StepServices({ form, toggleService }: { form: FormState; toggleService: (id: string) => void }) {
  return (
    <div>
      <h3 className="font-display text-xl font-semibold tracking-tight">What do you need?</h3>
      <p className="mt-1 text-sm text-muted-foreground">Pick everything that applies — we'll bundle smartly.</p>
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {services.map((s) => {
          const on = form.services.includes(s.id);
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => toggleService(s.id)}
              aria-pressed={on}
              className={cn(
                "flex items-center justify-between rounded-xl border p-3 text-left transition-colors",
                on ? "border-foreground/40 bg-foreground/5" : "border-border/60 bg-background hover:border-border"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn("grid size-9 place-items-center rounded-lg bg-gradient-to-br text-white", s.accent)}>
                  <Icon className="size-4" />
                </div>
                <span className="text-sm font-medium">{s.title}</span>
              </div>
              <span className={cn(
                "grid size-5 place-items-center rounded-full border",
                on ? "border-foreground bg-foreground text-background" : "border-border"
              )}>
                {on ? <Check className="size-3" /> : null}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepScope({ form, set }: { form: FormState; set: <K extends keyof FormState>(k: K, v: FormState[K]) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-xl font-semibold tracking-tight">Budget range</h3>
        <p className="mt-1 text-sm text-muted-foreground">Approximate is fine.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {budgets.map((b) => (
            <Chip key={b} active={form.budget === b} onClick={() => set("budget", b)}>{b === "Not sure" ? b : `$${b}`}</Chip>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-display text-xl font-semibold tracking-tight">Timeline</h3>
        <p className="mt-1 text-sm text-muted-foreground">When would you like to launch?</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {timelines.map((t) => (
            <Chip key={t} active={form.timeline === t} onClick={() => set("timeline", t)}>{t}</Chip>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepDetails({ form, set }: { form: FormState; set: <K extends keyof FormState>(k: K, v: FormState[K]) => void }) {
  return (
    <div className="space-y-4">
      <h3 className="font-display text-xl font-semibold tracking-tight">A few details</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" required>
          <input
            className="form-input"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            autoComplete="name"
            required
          />
        </Field>
        <Field label="Email" required>
          <input
            type="email"
            className="form-input"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            autoComplete="email"
            required
          />
        </Field>
      </div>
      <Field label="Company (optional)">
        <input
          className="form-input"
          value={form.company}
          onChange={(e) => set("company", e.target.value)}
          autoComplete="organization"
        />
      </Field>
      <Field label="Tell us about your project">
        <textarea
          rows={5}
          className="form-input resize-none"
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Goals, constraints, links, anything relevant…"
        />
      </Field>
      <style jsx>{`
        :global(.form-input) {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--background));
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        :global(.form-input:focus) {
          border-color: hsl(var(--ring));
          box-shadow: 0 0 0 2px hsl(var(--ring) / 0.25);
        }
      `}</style>
    </div>
  );
}

function StepDone({ name }: { name: string }) {
  return (
    <div className="py-6 text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-500/15 text-emerald-500"
      >
        <Check className="size-6" />
      </motion.div>
      <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">
        Thanks{name ? `, ${name.split(" ")[0]}` : ""} — got it.
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        We'll review and get back to you within one business day. Want to fast-track?
      </p>
      <Button asChild variant="outline" className="mt-5">
        <a href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">
          <MessageCircle className="size-4" /> Continue on WhatsApp
        </a>
      </Button>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        active ? "border-foreground bg-foreground text-background" : "border-border/60 bg-background hover:border-border"
      )}
    >
      {children}
    </button>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">
        {label}{required ? <span className="text-red-500"> *</span> : null}
      </span>
      {children}
    </label>
  );
}
