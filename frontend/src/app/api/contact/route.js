import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name = "", email = "", message = "", website = "" } = body;

  // Honeypot: real visitors never fill this hidden field
  if (website) return NextResponse.json({ ok: true });

  if (name.trim().length < 2) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!isEmail(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (message.trim().length < 10) return NextResponse.json({ error: "Please write a longer message." }, { status: 400 });

  const to = process.env.CONTACT_TO || "manjit4caledon@gmail.com";

  if (!process.env.SMTP_HOST) {
    console.log("[contact] SMTP not configured. New message:", { name, email, message });
    return NextResponse.json({ ok: true });
  }

  try {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await transport.sendMail({
      from: process.env.SMTP_USER,
      to,
      replyTo: email,
      subject: `Website message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed", err);
    return NextResponse.json({ error: "Could not send your message. Please call or email directly." }, { status: 500 });
  }
}
