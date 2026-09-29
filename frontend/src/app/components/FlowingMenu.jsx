"use client";

/**
 * FlowingMenu — full-width link rows. On hover, a colored panel slides in
 * from the edge closest to the cursor, carrying a looping marquee of the
 * label and a preview image.
 *
 *   npm install gsap
 *
 * Usage:
 *   <div style={{ height: "600px", position: "relative" }}>
 *     <FlowingMenu items={[{ link: "#", text: "Label", image: "https://..." }]} />
 *   </div>
 */

import { useRef } from "react";
import { gsap } from "gsap";

function findClosestEdge(mouseX, mouseY, width, height) {
  const topDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
  const bottomDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
  return topDist < bottomDist ? "top" : "bottom";
}

function MenuItem({ link, text, image, index, isExternal }) {
  const itemRef = useRef(null);
  const marqueeRef = useRef(null);
  const marqueeInnerRef = useRef(null);

  const animationDefaults = { duration: 0.6, ease: "expo" };

  const handleEnter = (ev) => {
    const el = itemRef.current;
    if (!el || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = el.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" })
      .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" });
  };

  const handleLeave = (ev) => {
    const el = itemRef.current;
    if (!el || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = el.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" })
      .to(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, "<");
  };

  const repeated = Array.from({ length: 6 }).map((_, i) => (
    <span className="fm-marquee-set" key={i}>
      <span className="fm-marquee-text">{text}</span>
      <span className="fm-marquee-image" style={{ backgroundImage: `url(${image})` }} />
    </span>
  ));

  return (
    <div
      className="fm-item"
      ref={itemRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <a
        className="fm-link"
        href={link}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <span className="fm-index">{String(index + 1).padStart(2, "0")}</span>
        <span className="fm-text">{text}</span>
        <span className="fm-arrow" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </a>

      <div className="fm-marquee" ref={marqueeRef}>
        <div className="fm-marquee-inner" ref={marqueeInnerRef}>
          <div className="fm-marquee-track">{repeated}</div>
        </div>
      </div>
    </div>
  );
}

export default function FlowingMenu({ items = [] }) {
  return (
    <nav className="flowing-menu" aria-label="Links">
      {items.map((item, idx) => (
        <MenuItem key={item.text + idx} index={idx} isExternal={/^https?:/.test(item.link)} {...item} />
      ))}

      <style>{`
        .flowing-menu {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .fm-item {
          position: relative;
          flex: 1;
          overflow: hidden;
          border-top: 1px solid rgba(245, 241, 232, 0.14);
        }
        .fm-item:last-child { border-bottom: 1px solid rgba(245, 241, 232, 0.14); }

        .fm-link {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: clamp(14px, 2.5vw, 28px);
          height: 100%;
          width: 100%;
          padding: 0 clamp(20px, 5vw, 64px);
          color: #f5f1e8;
          text-decoration: none;
          font-family: var(--font-display, inherit);
          font-weight: 700;
          font-size: clamp(1.6rem, 5vw, 3.2rem);
          letter-spacing: -0.01em;
          transition: color .3s ease;
          cursor: pointer;
        }
        .fm-item:hover .fm-link { color: #0b0b0c; mix-blend-mode: difference; }

        .fm-index {
          font-family: var(--font-body, inherit);
          font-weight: 500;
          font-size: 0.9rem;
          color: #c9a227;
          flex: none;
        }
        .fm-text { flex: 1; min-width: 0; }
        .fm-arrow {
          flex: none;
          display: grid;
          place-items: center;
          opacity: 0;
          transform: translateX(-8px);
          transition: opacity .3s ease, transform .3s ease;
        }
        .fm-item:hover .fm-arrow { opacity: 1; transform: translateX(0); }

        .fm-marquee {
          position: absolute;
          inset: 0;
          transform: translateY(101%);
          background: #f5f1e8;
          overflow: hidden;
        }
        .fm-marquee-inner {
          height: 100%;
          width: 100%;
          transform: translateY(101%);
        }
        .fm-marquee-track {
          height: 100%;
          width: max-content;
          display: flex;
          align-items: center;
          animation: fm-scroll 16s linear infinite;
        }
        .fm-item:hover .fm-marquee-track { animation-play-state: running; }

        .fm-marquee-set {
          display: flex;
          align-items: center;
          gap: clamp(16px, 3vw, 40px);
          padding: 0 clamp(16px, 3vw, 40px);
        }
        .fm-marquee-text {
          font-family: var(--font-display, inherit);
          font-weight: 700;
          font-size: clamp(1.6rem, 5vw, 3.2rem);
          color: #0b0b0c;
          white-space: nowrap;
        }
        .fm-marquee-image {
          width: clamp(60px, 8vw, 110px);
          height: clamp(40px, 5.5vw, 74px);
          border-radius: 8px;
          background-size: cover;
          background-position: center;
          flex: none;
          filter: grayscale(0.15);
        }

        @keyframes fm-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .fm-marquee-track { animation: none; }
        }
      `}</style>
    </nav>
  );
}
