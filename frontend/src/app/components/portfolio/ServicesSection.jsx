// components/ServicesSection.jsx
'use client';

import React from 'react';
import FadeIn from './FadeIn';

const priorities = [
  {
    number: '01',
    title: 'Responsible Growth',
    description:
      'Advocating for responsible and properly planned growth that keeps infrastructure, neighbourhoods, services, and the long-term needs of Caledon at the centre of every decision.',
    image: '/Images/bg.webp',
  },
  {
    number: '02',
    title: 'Better Infrastructure',
    description:
      'Working for better roads, infrastructure, transportation, and community services that keep pace with Caledon’s growth and protect our quality of life.',
    image: '/Images/bg.webp',
  },
  {
    number: '03',
    title: 'Safer Communities',
    description:
      'Building safer, stronger, and more connected communities where residents feel supported, heard, and proud to call Caledon home.',
    image: '/Images/bg.webp',
  },
  {
    number: '04',
    title: 'Local Businesses',
    description:
      'Supporting local businesses, entrepreneurs, employers, and employment opportunities while creating a strong environment for Caledon’s local economy to thrive.',
    image: '/Images/bg.webp',
  },
  {
    number: '05',
    title: 'Protect Our Environment',
    description:
      'Protecting Caledon’s farmland, natural environment, and unique character while balancing responsible development with long-term environmental stewardship.',
    image: '/Images/bg.webp',
  },
  {
    number: '06',
    title: 'Accountable Government',
    description:
      'Promoting financial accountability, transparency, and accessible local government so residents can have confidence in how decisions are made and how every tax dollar is used.',
    image: '/Images/bg.webp',
  },
  {
    number: '07',
    title: 'Stronger Caledon',
    description:
      'Working collaboratively with residents, community organizations, and local leaders to create a more connected, prosperous, and vibrant future for everyone.',
    image: '/Images/bg.webp',
  },
];

export default function ServicesSection() {
  return (
    <section
      id="price"
      className="
        bg-[#071B35]
        rounded-t-[40px]
        sm:rounded-t-[50px]
        md:rounded-t-[60px]
        px-5
        sm:px-8
        md:px-10
        py-20
        sm:py-24
        md:py-32
        relative
        z-10
        text-[#F4F1E8]
        overflow-hidden  px-4 md:px-12 lg:px-24 xl:px-72
      "
    >

      <div className="">

        {/* Heading */}
        <FadeIn y={40}>
          <div className="text-center mb-16 sm:mb-20 md:mb-24">

            <p
              className="
                text-[#D52B2B]
                font-bold
                uppercase
                tracking-[0.25em]
                mb-4
              "
              style={{
                fontSize: 'clamp(0.7rem, 1vw, 1rem)',
              }}
            >
              Your Voice • Your Future
            </p>

            <h2
              className="
                hero-heading
                font-black
                uppercase
                text-center
                text-[#F4F1E8]
                leading-[0.9]
              "
              style={{
                fontSize: 'clamp(2rem, 11vw, 80px)',
              }}
            >
              Our Priorities
            </h2>

            {/* Campaign Accent */}
            <div className="flex justify-center items-center gap-2 mt-6">
              <div className="h-[5px] w-16 sm:w-20 bg-[#F4F1E8]" />

              <div className="h-[5px] w-5 sm:w-7 bg-[#D52B2B]" />
            </div>

            <p
              className="
                max-w-2xl
                mx-auto
                mt-7
                text-[#C7D2DF]
                font-light
                leading-relaxed
              "
              style={{
                fontSize: 'clamp(1rem, 1.7vw, 1.2rem)',
              }}
            >
              Listening to residents, understanding our community's needs,
              and working together toward a stronger Caledon.
            </p>

          </div>
        </FadeIn>


        {/* Priorities */}
        <div className="flex flex-col ">

          {priorities.map((priority, i) => (

            <FadeIn
              key={priority.number}
              delay={i * 0.08}
              y={30}
            >

              <div
                className="
                  group
                  relative
                  flex
                  flex-col
                  md:flex-row
                  items-start
                  md:items-center
                  justify-between
                  py-8
                  sm:py-10
                  md:py-11
                  gap-6
                  md:gap-10
                  cursor-pointer
                "
                style={{
                  borderBottom:
                    '1px solid rgba(244, 241, 232, 0.15)',
                }}
              >

                {/* Hover Image */}
                <div
                  className="
                    hidden
                    md:block
                    absolute
                    right-[-20px]
                    top-1/2
                    -translate-y-1/2
                    translate-x-8
                    opacity-0
                    scale-90
                    group-hover:opacity-100
                    group-hover:scale-100
                    group-hover:translate-x-0
                    transition-all
                    duration-500
                    ease-out
                    pointer-events-none
                    z-30
                  "
                >

                  <div
                    className="
                      relative
                      w-[260px]
                      lg:w-[320px]
                      h-[180px]
                      lg:h-[210px]
                      overflow-hidden
                      rounded-sm
                    "
                  >

                    <img
                      src={priority.image}
                      alt={priority.title}
                      className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-105
                      "
                    />

                    {/* Image Overlay */}
                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-[#071B35]/80
                        via-transparent
                        to-transparent
                      "
                    />

                    {/* Image Label */}
                    <div
                      className="
                        absolute
                        bottom-4
                        left-4
                        right-4
                        flex
                        items-center
                        gap-2
                      "
                    >

                      <span
                        className="
                          w-2
                          h-2
                          rounded-full
                          bg-[#D52B2B]
                        "
                      />

                      <span
                        className="
                          text-[#F4F1E8]
                          text-xs
                          uppercase
                          tracking-[0.2em]
                          font-bold
                        "
                      >
                        {priority.title}
                      </span>

                    </div>

                  </div>

                </div>


                {/* Number + Mobile Title */}
                <div
                  className="
                    flex
                    items-baseline
                    gap-6
                    md:gap-10
                    w-full
                    md:w-auto
                    relative
                    z-10
                  "
                >

                  <span
                    className="
                      font-black
                      text-[#F4F1E8]
                      transition-colors
                      duration-300
                      group-hover:text-[#D52B2B]/50
                    "
                    style={{
                      fontSize: 'clamp(3rem, 10vw, 100px)',
                    }}
                  >
                    {priority.number}
                  </span>

                  <h3
                    className="
                      font-bold
                      uppercase
                      md:hidden
                      text-[#F4F1E8]
                    "
                    style={{
                      fontSize: 'clamp(1rem, 2.2vw, 2.1rem)',
                    }}
                  >
                    {priority.title}
                  </h3>

                </div>


                {/* Content */}
                <div
                  className="
                    flex
                    flex-col
                    gap-3
                    max-w-2xl
                    relative
                    z-10
                    md:pr-20
                  "
                >

                  <div className="flex items-center gap-3">

                    <span
                      className="
                        hidden
                        md:block
                        w-2
                        h-2
                        rounded-full
                        bg-[#D52B2B]
                        transition-transform
                        duration-300
                        group-hover:scale-150
                      "
                    />

                    <h3
                      className="
                        font-bold
                        uppercase
                        hidden
                        md:block
                        text-[#F4F1E8]
                      "
                      style={{
                        fontSize: 'clamp(1rem, 2.2vw, 2.1rem)',
                      }}
                    >
                      {priority.title}
                    </h3>

                  </div>

                  <p
                    className="
                      font-light
                      leading-relaxed
                      text-[#C7D2DF]
                      transition-colors
                      duration-300
                      group-hover:text-[#E4E8ED]
                    "
                    style={{
                      fontSize:
                        'clamp(0.85rem, 1.6vw, 1.2rem)',
                    }}
                  >
                    {priority.description}
                  </p>

                </div>

              </div>

            </FadeIn>

          ))}

        </div>


        {/* Closing Campaign Statement */}
        <FadeIn y={25} delay={0.2}>
          <div
            className="
              text-center
              pt-14
              sm:pt-16
              md:pt-20
            "
          >

            <div className="flex justify-center items-center gap-3 mb-5">

              <div className="w-10 sm:w-16 h-[2px] bg-[#D52B2B]" />

              <div className="w-2 h-2 rounded-full bg-[#F4F1E8]" />

              <div className="w-10 sm:w-16 h-[2px] bg-[#D52B2B]" />

            </div>

            <p
              className="
                text-[#F4F1E8]
                font-black
                uppercase
                tracking-[0.08em]
              "
              style={{
                fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
              }}
            >
              Listening. Leading. Building Together.
            </p>

            <p
              className="
                mt-3
                text-[#C7D2DF]
                font-light
                max-w-xl
                mx-auto
                leading-relaxed
              "
              style={{
                fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
              }}
            >
              Together, we can build a stronger, more connected and
              prosperous Caledon.
            </p>

          </div>
        </FadeIn>

      </div>


      {/* Bottom Campaign Stripe */}
      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-[5px]
          bg-[#F4F1E8]
        "
      >

        <div
          className="
            absolute
            right-0
            top-0
            h-full
            w-1/3
            bg-[#D52B2B]
          "
        />

        <div
          className="
            absolute
            right-0
            top-0
            h-full
            w-[8%]
            bg-[#123B72]
          "
        />

      </div>

    </section>
  );
}