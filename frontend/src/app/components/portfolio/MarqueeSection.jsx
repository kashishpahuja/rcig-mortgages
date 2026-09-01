// components/MarqueeSection.jsx
'use client';

import React, { useEffect, useState } from 'react';

const gifs = [
  "/Images/5.webp",
  "/Images/1.webp",
  "/Images/2.webp",
  "/Images/3.webp",
  "/Images/4.webp",
  "/Images/6.webp",
  "/Images/7.webp",
  "/Images/8.webp",
  "/Images/9.webp",
  "/Images/10.webp",
];

export default function MarqueeSection() {
  const [offset, setOffset] = useState(0);
  const [row1Gifs, setRow1Gifs] = useState([]);
  const [row2Gifs, setRow2Gifs] = useState([]);

  useEffect(() => {
    // Shuffle all 10 images
    const shuffled = [...gifs].sort(() => Math.random() - 0.5);

    // Split into two rows - 5 unique images each
    setRow1Gifs(shuffled.slice(0, 5));
    setRow2Gifs(shuffled.slice(5, 10));

    const handleScroll = () => {
      const section = document.getElementById('marquee-section');

      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;

      const currentOffset =
        (window.scrollY - sectionTop + window.innerHeight) * 0.3;

      setOffset(currentOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial position
    handleScroll();

    return () =>
      window.removeEventListener('scroll', handleScroll);
  }, []);

  // Duplicate each row for continuous marquee
  const row1Loop = [...row1Gifs, ...row1Gifs, ...row1Gifs];
  const row2Loop = [...row2Gifs, ...row2Gifs, ...row2Gifs];

  return (
    <section
      id="marquee-section"
      className="
        relative
        pt-24
        sm:pt-32
        md:pt-40
        bg-[#092b666c]
        pb-10
        overflow-x-clip
      "
    >

      {/* Gold top accent */}
      <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#D4AF37]" />

      <div className="relative flex flex-col gap-3">

        {/* ================= ROW 1 ================= */}
        <div
          className="
            flex
            gap-3
            will-change-transform
            whitespace-nowrap
          "
          style={{
            transform: `translateX(${offset - 200}px)`
          }}
        >
          {row1Loop.map((src, i) => (
            <div
              key={`row1-${i}`}
              className="
                relative
                w-[420px]
                h-[270px]
                shrink-0
                rounded-2xl
                overflow-hidden
                border
                border-[#D4AF37]/20
                bg-[#050608]
                shadow-[0_12px_35px_rgba(0,0,0,0.30)]
                group
              "
            >
              <img
                src={src}
                alt="Campaign visual"
                loading="lazy"
                className="
                  w-full
                  h-full
                  rounded-2xl
                  object-cover
                  object-top
                  transition-transform
                  duration-700
                  group-hover:scale-105
                "
              />

              {/* Navy overlay */}
              <div
                className="
                  absolute
                  inset-0
                  bg-[#092B66]/10
                  group-hover:bg-transparent
                  transition-colors
                  duration-500
                "
              />

              {/* Gold corner accent */}
              <div className="absolute top-0 left-0 w-12 h-[3px] bg-[#D4AF37]" />
            </div>
          ))}
        </div>


        {/* ================= ROW 2 ================= */}
        <div
          className="
            flex
            gap-3
            will-change-transform
            whitespace-nowrap
          "
          style={{
            transform: `translateX(-${offset - 200}px)`
          }}
        >
          {row2Loop.map((src, i) => (
            <div
              key={`row2-${i}`}
              className="
                relative
                w-[420px]
                h-[270px]
                shrink-0
                rounded-2xl
                overflow-hidden
                border
                border-[#D4AF37]/20
                bg-[#071F4B]
                shadow-[0_12px_35px_rgba(0,0,0,0.30)]
                group
              "
            >
              <img
                src={src}
                alt="Campaign visual"
                loading="lazy"
                className="
                  w-full
                  h-full
                  rounded-2xl
                  object-cover object-top 
                  transition-transform
                  duration-700
                  group-hover:scale-105
                "
              />

              {/* Navy overlay */}
              <div
                className="
                  absolute
                  inset-0
                  bg-[#092B66]/10
                  group-hover:bg-transparent
                  transition-colors
                  duration-500
                "
              />

              {/* Gold corner accent */}
              <div className="absolute top-0 right-0 w-12 h-[3px] bg-[#D4AF37]" />
            </div>
          ))}
        </div>

      </div>

      {/* Bottom gold accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]/60" />

    </section>
  );
}