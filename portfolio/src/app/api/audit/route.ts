import { NextResponse } from "next/server";

interface AuditBody {
  url?: string;
  email?: string;
}

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const isUrl = (s: string) => {
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};

export async function POST(request: Request) {
  let body: AuditBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const url = body.url?.trim() ?? "";
  const email = body.email?.trim() ?? "";

  if (!isUrl(url) || !isEmail(email)) {
    return NextResponse.json({ error: "Invalid url or email" }, { status: 422 });
  }

  // Notify — wire up Resend (or similar) via RESEND_API_KEY. Until configured,
  // log the lead so a submission is never silently dropped in development.
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.AUDIT_NOTIFY_EMAIL ?? "ghwalae1@gmail.com";

  if (apiKey) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio <onboarding@resend.dev>",
          to,
          subject: `New audit request: ${url}`,
          text: `URL: ${url}\nEmail: ${email}`,
        }),
      });
    } catch (err) {
      console.error("audit notify failed", err);
      // don't fail the user's submission on a notify hiccup
    }
  } else {
    console.info("[audit lead]", { url, email });
  }

  return NextResponse.json({ ok: true });
}
