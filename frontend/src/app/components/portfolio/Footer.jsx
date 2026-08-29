// components/Footer.jsx
'use client';

import React from 'react';
import FadeIn from './FadeIn';

export default function Footer() {
  return (
    <footer
      className="
        relative
        bg-[#F4F1E8]
        text-[#071B35]
        overflow-hidden
        px-5
        sm:px-8
        md:px-10
        py-14
        sm:py-16
        md:py-20
      "
    >

      {/* Top Left Circle */}
      <div
        className="
          absolute
          top-[-60px]
          left-[-60px]
          sm:top-[-80px]
          sm:left-[-80px]
          w-[160px]
          h-[160px]
          sm:w-[220px]
          sm:h-[220px]
          rounded-full
          border-[3px]
          border-[#071B35]/10
          pointer-events-none
        "
      >
        <div
          className="
            absolute
            inset-[25%]
            rounded-full
            border-[2px]
            border-[#C62828]/20
          "
        />
      </div>


      {/* Top Right Circle */}
      <div
        className="
          absolute
          top-[-50px]
          right-[-50px]
          sm:top-[-70px]
          sm:right-[-70px]
          w-[140px]
          h-[140px]
          sm:w-[200px]
          sm:h-[200px]
          rounded-full
          border-[10px]
          border-[#071B35]/5
          pointer-events-none
        "
      >
        <div
          className="
            absolute
            inset-[18px]
            rounded-full
            border-[2px]
            border-[#C62828]/15
          "
        />
      </div>


      {/* Main Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">

        <FadeIn y={25}>

          {/* Small Heading */}
          <p
            className="
              text-[#C62828]
              font-bold
              uppercase
              tracking-[0.25em]
              text-xs
              sm:text-sm
              mb-3
            "
          >
            Candidate for Mayor
          </p>


          {/* Name */}
          <h2
            className="
              hero-heading
              font-black
              uppercase
              leading-[0.9]
              tracking-tight
            "
            style={{
              fontSize: 'clamp(2.8rem, 8vw, 80px)',
            }}
          >
            Saini Manjit
            <br />
            <span className="text-[#C62828]">
              Bhondhi
            </span>
          </h2>


          {/* Accent */}
          <div className="flex justify-center items-center gap-2 mt-5">

            <div className="h-[5px] w-16 sm:w-20 bg-[#071B35]" />

            <div className="h-[5px] w-5 sm:w-7 bg-[#C62828]" />

          </div>


          {/* Message */}
          <p
            className="
              mt-6
              text-[#344A6B]
              font-medium
              leading-relaxed
              max-w-xl
              mx-auto
            "
            style={{
              fontSize: 'clamp(0.95rem, 1.7vw, 1.15rem)',
            }}
          >
            Listening to our community, working together,
            and building a stronger future for Caledon.
          </p>


          {/* Contact */}
          <div
            className="
              mt-7
              flex
              flex-col
              sm:flex-row
              items-center
              justify-center
              gap-2
              sm:gap-5
              text-[#071B35]
              font-semibold
              text-sm
              sm:text-base
            "
          >

            <a
              href="mailto:manjitbhondhi@gmail.com"
              className="hover:text-[#C62828] transition-colors"
            >
              manjitbhondhi@gmail.com
            </a>

            <span className="hidden sm:block text-[#C62828]">
              •
            </span>

            <a
              href="tel:4169853771"
              className="hover:text-[#C62828] transition-colors"
            >
              416-985-3771
            </a>

          </div>


          {/* Election Date */}
          <div className="mt-6 flex items-center justify-center gap-3">

            <span className="w-8 sm:w-12 h-[2px] bg-[#C62828]" />

            <span
              className="
                text-[#071B35]
                font-bold
                uppercase
                tracking-[0.15em]
                text-xs
                sm:text-sm
              "
            >
              October 26, 2026
            </span>

            <span className="w-8 sm:w-12 h-[2px] bg-[#C62828]" />

          </div>

        </FadeIn>


        {/* Bottom */}
        <FadeIn y={15} delay={0.2}>
          <div
            className="
              mt-10
              pt-5
              border-t
              border-[#071B35]/10
            "
          >
            <p
              className="
                text-[#344A6B]/70
                text-[10px]
                sm:text-xs
                uppercase
                tracking-[0.12em]
              "
            >
              Saini Manjit Bhondhi • Candidate for Mayor of Caledon
            </p>
          </div>
        </FadeIn>

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

    </footer>
  );
}