"use client";
// src/app/components/ShareLinks.jsx
import { useState } from "react";

export default function ShareLinks({ title }) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available; ignore */
    }
  }

  const url = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-[#5A6B64]">
      <span>Share</span>
      <a
        className="hover:text-[#2F6B4F] transition"
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Facebook
      </a>
      <a
        className="hover:text-[#2F6B4F] transition"
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        X
      </a>
      <button onClick={copyLink} className="hover:text-[#2F6B4F] transition cursor-pointer">
        {copied ? "Link copied" : "Copy link"}
      </button>
    </div>
  );
}
