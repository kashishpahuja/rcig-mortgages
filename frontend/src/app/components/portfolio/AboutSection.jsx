// components/AboutSection.jsx
'use client';

import React from 'react';
import FadeIn from './FadeIn';
import AnimatedText from './AnimatedText';
import ContactButton from './ContactButton';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="
        relative
        min-h-screen
        flex
        flex-col
        items-center
        justify-center
        px-5
        sm:px-8
        md:px-10
        py-20
        bg-[#F4F1E8]
        text-[#071B35]
        overflow-hidden
      "
    >

      {/* Top Left - Campaign Circle */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-4 left-1 sm:left-2 md:left-4 z-0 pointer-events-none"
      >
        <div
          className="
            w-[120px]
            h-[120px]
            sm:w-[160px]
            sm:h-[160px]
            md:w-[210px]
            md:h-[210px]
            rounded-full
            border-[3px]
            border-[#071B35]/10
            flex
            items-center
            justify-center
          "
        >
          <div
            className="
              w-[65%]
              h-[65%]
              rounded-full
              border-[2px]
              border-[#C62828]/20
            "
          />
        </div>
      </FadeIn>


      {/* Bottom Left - Red Campaign Line */}
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-8 left-3 sm:left-6 md:left-10 z-0 pointer-events-none"
      >
        <div className="flex items-center gap-3">

          <div
            className="
              w-[100px]
              sm:w-[140px]
              md:w-[180px]
              h-[5px]
              bg-[#C62828]
            "
          />

          <div
            className="
              w-3
              h-3
              rounded-full
              bg-[#071B35]
            "
          />

        </div>
      </FadeIn>


      {/* Top Right - Campaign Rings */}
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-4 right-1 sm:right-2 md:right-4 z-0 pointer-events-none"
      >
        <div
          className="
            w-[120px]
            h-[120px]
            sm:w-[160px]
            sm:h-[160px]
            md:w-[210px]
            md:h-[210px]
            rounded-full
            border-[10px]
            border-[#071B35]/5
            relative
          "
        >

          <div
            className="
              absolute
              inset-[18px]
              rounded-full
              border-[2px]
              border-[#C62828]/20
            "
          />

        </div>
      </FadeIn>


      {/* Bottom Right - Campaign Accent */}
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-8 right-3 sm:right-6 md:right-10 z-0 pointer-events-none"
      >
        <div className="relative w-[130px] sm:w-[170px] md:w-[220px] h-[80px]">

          <div
            className="
              absolute
              right-0
              bottom-4
              w-[120px]
              sm:w-[160px]
              md:w-[210px]
              h-[5px]
              bg-[#071B35]/10
              rotate-[-6deg]
            "
          />

          <div
            className="
              absolute
              right-0
              bottom-2
              w-[80px]
              sm:w-[110px]
              md:w-[140px]
              h-[5px]
              bg-[#071B35]
              rotate-[-6deg]
            "
          />

          <div
            className="
              absolute
              right-0
              bottom-0
              w-[45px]
              sm:w-[65px]
              md:w-[80px]
              h-[5px]
              bg-[#C62828]
              rotate-[-6deg]
            "
          />

        </div>
      </FadeIn>


      {/* Main Content */}
      <div
        className="
          relative
          z-10
          flex
          flex-col
          items-center
          max-w-4xl
          w-full
          text-center
          gap-10
          sm:gap-14
          md:gap-16
        "
      >

        {/* Heading */}
        <FadeIn delay={0} y={40}>

          <div>

            <p
              className="
                mb-4
                text-[#C62828]
                font-bold
                uppercase
                tracking-[0.25em]
                text-xs
                sm:text-sm
              "
            >
              About The Candidate
            </p>


            <h2
              className="
                hero-heading
                font-black
                uppercase
                leading-none
                tracking-tight
                text-[#071B35]
              "
              style={{
                fontSize: 'clamp(3rem, 12vw, 160px)',
              }}
            >
              About Me
            </h2>


            {/* Banner Style Underline */}
            <div className="flex justify-center items-center gap-2 mt-5">

              <div
                className="
                  h-[5px]
                  w-16
                  sm:w-20
                  bg-[#071B35]
                "
              />

              <div
                className="
                  h-[5px]
                  w-4
                  sm:w-6
                  bg-[#C62828]
                "
              />

            </div>

          </div>

        </FadeIn>


        {/* Description + Button */}
        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">

          <AnimatedText
            text="Manjit Bhondhi is committed to listening to the people of Caledon, understanding the needs of our communities, supporting local businesses, and working toward a stronger and more prosperous future for everyone."
            className="
              text-[#344A6B]
              font-medium
              leading-relaxed
              max-w-[560px]
            "
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.35rem)',
            }}
          />

          <FadeIn delay={0.4} y={20}>
            <ContactButton />
          </FadeIn>

        </div>

      </div>


      {/* Bottom Campaign Line */}
      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-[6px]
          bg-[#071B35]
        "
      >

        <div
          className="
            absolute
            right-0
            top-0
            h-full
            w-1/3
            bg-[#C62828]
          "
        />

        <div
          className="
            absolute
            right-0
            top-0
            h-full
            w-[8%]
            bg-[#071B35]
          "
        />

      </div>

    </section>
  );
}