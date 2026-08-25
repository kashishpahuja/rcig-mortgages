// components/MarqueeSection.jsx
'use client';

import React, { useEffect, useState } from 'react';

const gifs = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif"
];

export default function MarqueeSection() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
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

    return () =>
      window.removeEventListener('scroll', handleScroll);
  }, []);

  const row1Gifs = [
    ...gifs.slice(0, 11),
    ...gifs.slice(0, 11),
    ...gifs.slice(0, 11)
  ];

  const row2Gifs = [
    ...gifs.slice(11),
    ...gifs.slice(11),
    ...gifs.slice(11)
  ];

  return (
    <section
      id="marquee-section"
      className="
        relative
        bg-[#092B66]
        pt-24
        sm:pt-32
        md:pt-40
        pb-10
        overflow-x-clip
      "
    >

      {/* Subtle campaign background */}
      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute inset-0 bg-gradient-to-b from-[#092B66] via-[#0A316F] to-[#061F4B]" />

        {/* Very subtle gold glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-[#D4AF37]/5 blur-[120px]" />

      </div>


      {/* Gold top accent */}
      <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#D4AF37]" />


      <div className="relative flex flex-col gap-3">

        {/* Row 1 - Moves Right */}
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

          {row1Gifs.map((src, i) => (

            <div
              key={i}
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
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-105
                "
              />

              {/* Navy overlay */}
              <div className="absolute inset-0 bg-[#092B66]/10 group-hover:bg-transparent transition-colors duration-500" />

              {/* Gold corner accent */}
              <div className="absolute top-0 left-0 w-12 h-[3px] bg-[#D4AF37]" />

            </div>

          ))}

        </div>


        {/* Row 2 - Moves Left */}
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

          {row2Gifs.map((src, i) => (

            <div
              key={i}
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
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-105
                "
              />

              {/* Navy overlay */}
              <div className="absolute inset-0 bg-[#092B66]/10 group-hover:bg-transparent transition-colors duration-500" />

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