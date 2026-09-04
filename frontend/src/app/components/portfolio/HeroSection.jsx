// components/HeroSection.jsx
'use client';
import React from 'react';
import FadeIn from './FadeIn';
import Magnet from './Magnet';
import ContactButton from './ContactButton';

export default function HeroSection() {
  return (
    <section className="relative h-[60vh] md:h-[70vh] lg:h-screen w-full flex flex-col justify-between overflow-x-clip px-6 md:px-10 pt-6 md:pt-8 pb-7 sm:pb-8 md:pb-10 bg-[#092b6686] text-white">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: "url('/Images/bg.webp')" }}
      />
      {/* Subtle Campaign Background */}
      <div className="absolute inset-0 pointer-events-none">

        {/* Soft navy gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-[#071b3596] via-[#0b337494] to-[#071b357c]" />

        {/* Very subtle gold glow */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/5 blur-[120px]" />

      </div>


      {/* Top Gold Border */}
      <div className="absolute top-0 left-0 right-0 h-[5px] bg-[#D4AF37] z-30" />


      {/* Navbar */}
      <FadeIn
        delay={0}
        y={-20}
        as="nav"
        className="relative hidden lg:flex items-center justify-between z-20"
      >

    
      </FadeIn>


      {/* Candidate Portrait */}
      <div className="absolute left-1/2 -translate-x-1/4 md:-translate-1/2 z-10 top-auto -translate-y-0 md:translate-y-0 bottom-0 pointer-events-none">

        <FadeIn delay={0.6} y={30}>

        

            <div className="relative">

              {/* Subtle gold glow behind portrait */}
              <div className="absolute -inset-x-7.5 bottom-0 h-[85%] bg-[#D4AF37]/10 blur-[70px] rounded-full" />

      <div className=''>
      
              <img
                src="/Images/manjit1.webp"
                alt="Manjit Bhondhi"
                className="
                  relative
                 
                  w-[360px]
                  md:w-[440px]
                  lg:w-[620px]
                  object-cover
                  pointer-events-auto
                  drop-shadow-[0_15px_35px_rgba(0,0,0,0.45)]
                "
              />
</div>
            </div>



        </FadeIn>

      </div>


      {/* Main Content */}
      <div className="relative w-full z-20 flex flex-col justify-end">

        {/* Hero Heading */}
     <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          > <div className="overflow-hidden w-full ">

          <FadeIn delay={0.15} y={40}>

            <h1
              className="
                hero-heading
                font-black
                uppercase
                tracking-[-0.04em]
                leading-none
                whitespace-nowrap
                w-full
                text-[11vw]
                sm:text-[11vw]
                md:text-[11vw]
                lg:text-[10vw]
                mt-6
                sm:mt-4
                md:-mt-5
               text-left
                lg:text-center
                text-white
               
              "
            >
              Manjit Bhondhi
            </h1>

          </FadeIn>

        </div>

</Magnet>    

        {/* Red Campaign Accent */}
        <FadeIn delay={0.25} y={10}>

          <div className="w-full flex justify-center sm:justify-start mt-2">

            <div className="h-[4px] w-[100px] sm:w-[150px] md:w-[190px] bg-[#B31313] rounded-full" />

          </div>

        </FadeIn>


        {/* Bottom Bar */}
        <div className="md:flex justify-between items-end w-full mt-4">

          {/* Campaign Introduction */}
          <FadeIn delay={0.35} y={20}>

            <div className="max-w-[190px] sm:max-w-[260px] md:max-w-[320px]">

              <p
                className="
                  text-[#D4AF37]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  leading-snug
                "
                style={{
                  fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)',
                }}
              >
                Candidate for Mayor of Caledon
              </p>


              <div className="mt-3 h-[1px] w-16 bg-[#D4AF37]" />


              <p
                className="
                  mt-3
                  text-[#D7E2EA]
                  font-light
                  uppercase
                  tracking-wide
                  leading-snug
                "
                style={{
                  fontSize: 'clamp(0.65rem, 1vw, 1rem)',
                }}
              >
                Listening to residents. Supporting local businesses.
                Building a stronger future for Caledon.
              </p>

            </div>

          </FadeIn>


          {/* Contact Button */}
          <FadeIn delay={0.5} y={20}>

            <div className="campaign-contact mt-6 md:mt-0">

              <ContactButton />

            </div>

          </FadeIn>

        </div>

      </div>


      {/* Bottom Gold Border */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#D4AF37]/80 z-30" />

    </section>
  );
}