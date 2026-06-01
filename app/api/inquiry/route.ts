import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

export async function POST(req: Request) {
  // Rate limit by IP (Vercel sets x-forwarded-for; local fallback)
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "anonymous";

  const rl = rateLimit(`inquiry:${ip}`);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Try again shortly." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)) } }
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  // Honeypot tripped — pretend it succeeded so bots get no signal
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;

  // If Resend isn't configured, log and accept (dev-friendly)
  if (!apiKey) {
    console.log("[inquiry] (no RESEND_API_KEY) payload:", parsed.data);
    return NextResponse.json({ ok: true, dev: true });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { name, email, company, services, budget, timeline, message } = parsed.data;
    const subject = `New inquiry — ${name}${company ? ` (${company})` : ""}`;

    await resend.emails.send({
      from: `${siteConfig.name} <noreply@${new URL(siteConfig.url).hostname}>`,
      to,
      replyTo: email,
      subject,
      html: render({ name, email, company, services, budget, timeline, message }),
    });

    // Auto-responder to the user
    await resend.emails.send({
      from: `${siteConfig.fullName} <hello@${new URL(siteConfig.url).hostname}>`,
      to: email,
      subject: `We got your message — ${siteConfig.fullName}`,
      html: `<p>Hi ${escapeHtml(name)},</p><p>Thanks for reaching out. We've received your note and a human will reply within one business day — usually faster.</p><p>— Team ${siteConfig.fullName}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[inquiry] send failed:", err);
    return NextResponse.json({ ok: false, error: "Failed to send. Please email us directly." }, { status: 500 });
  }
}

function render(data: {
  name: string;
  email: string;
  company?: string;
  services: string[];
  budget: string;
  timeline: string;
  message: string;
}) {
  const row = (k: string, v: string) =>
    `<tr><td style="padding:8px 12px;color:#666;font:13px/1.4 -apple-system,Inter,sans-serif">${k}</td><td style="padding:8px 12px;font:13px/1.4 -apple-system,Inter,sans-serif">${escapeHtml(v)}</td></tr>`;

  return `
    <div style="font:14px/1.5 -apple-system,Inter,sans-serif;color:#111">
      <h2 style="margin:0 0 16px">New inquiry</h2>
      <table style="border-collapse:collapse;border:1px solid #eee;border-radius:8px;overflow:hidden">
        ${row("Name", data.name)}
        ${row("Email", data.email)}
        ${data.company ? row("Company", data.company) : ""}
        ${row("Services", data.services.join(", "))}
        ${row("Budget", data.budget)}
        ${row("Timeline", data.timeline)}
      </table>
      <h3 style="margin:20px 0 6px">Message</h3>
      <p style="white-space:pre-wrap;background:#fafafa;border:1px solid #eee;border-radius:8px;padding:12px">${escapeHtml(data.message)}</p>
    </div>
  `;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
