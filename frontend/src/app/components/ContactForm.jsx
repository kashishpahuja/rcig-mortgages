"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState({ state: "idle", message: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus({ state: "sending", message: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      form.reset();
      setStatus({ state: "sent", message: "Thanks. Your message has been sent." });
    } catch (err) {
      setStatus({ state: "error", message: err.message });
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <label>
        Your name
        <input name="name" type="text" autoComplete="name" required />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        Message
        <textarea name="message" rows={5} required />
      </label>
      {/* honeypot */}
      <input name="website" type="text" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      <button type="submit" disabled={status.state === "sending"}>
        {status.state === "sending" ? "Sending…" : "Send message"}
      </button>
      {status.message && (
        <p role="status" className={status.state === "error" ? "form-error" : "form-ok"}>
          {status.message}
        </p>
      )}
    </form>
  );
}
