// components/ProjectsSection.jsx
'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';

const projects = [
  {
    number: '01',
    category: 'Housing Affordability',
    name: 'Making Housing More Affordable',
    description:
      'I will work with Council to reduce development charges and encourage policies that create a more attainable path to homeownership for families in Caledon.',
    image: '/Images/10.webp',
  },
  {
    number: '02',
    category: 'Responsible Growth',
    name: 'Smart Growth. Stronger Caledon.',
    description:
      'Caledon needs development policies that protect taxpayers while supporting responsible growth, attracting investment and preparing our community for the future.',
    image: '/Images/8.webp',
  },
  {
    number: '03',
    category: 'Jobs & Prosperity',
    name: 'A Community That Thrives',
    description:
      'We can create an environment where families can live, people can work, businesses can thrive and investors are welcomed — strengthening Caledon’s economic future.',
    image: '/Images/5.webp',
  },
];

export default function ProjectsSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="
        bg-[#071B35]
        rounded-t-[40px]
        sm:rounded-t-[50px]
        md:rounded-t-[60px]
        -mt-10
        sm:-mt-12
        md:-mt-14
        pt-20
        sm:pt-24
        md:pt-32
        pb-20
        relative
        z-10
        px-5
        sm:px-8
        md:px-10
        text-[#F4F1E8]
      "
    >
      <div className="max-w-6xl mx-auto">

        {/* Section Heading */}
        <FadeIn y={40}>
          <div className="text-center mb-16 sm:mb-20 md:mb-24">

            <p
              className="
                text-[#C62828]
                font-bold
                uppercase
                tracking-[0.25em]
                mb-4
              "
              style={{
                fontSize: 'clamp(0.7rem, 1vw, 1rem)',
              }}
            >
              A Policy for Caledon
            </p>

            <h2
              className="
                hero-heading
                font-black
                uppercase
                text-[#F4F1E8]
                leading-[0.9]
              "
              style={{
                fontSize: 'clamp(2rem, 10vw, 80px)',
              }}
            >
              Affordability
            </h2>

            {/* Accent */}
            <div className="flex justify-center items-center gap-2 mt-5">
              <div className="h-[5px] w-16 sm:w-20 bg-[#F4F1E8]" />
              <div className="h-[5px] w-5 sm:w-7 bg-[#C62828]" />
            </div>

            <p
              className="
                max-w-2xl
                mx-auto
                mt-6
                text-center
                text-[#C7D2DF]
                font-light
                leading-relaxed
              "
              style={{
                fontSize: 'clamp(1rem, 1.7vw, 1.2rem)',
              }}
            >
              Practical policies that support families, protect taxpayers,
              encourage investment and create a prosperous future for Caledon.
            </p>

          </div>
        </FadeIn>


        {/* Policy Cards */}
        <div className="flex flex-col gap-10 sm:gap-12">

          {projects.map((project, i) => {

            const targetScale =
              1 - (projects.length - 1 - i) * 0.035;

            const cardProgress = useTransform(
              scrollYProgress,
              [i / projects.length, 1],
              [0, 1]
            );

            const scale = useTransform(
              cardProgress,
              [0, 1],
              [1, targetScale]
            );

            return (
              <div
                key={project.number}
                className="
              
               
                  sticky
                  top-20
                  md:top-28
                  flex
                  items-center
                "
              >

                <motion.div
                  style={{
                    scale,
                    top: `${i * 25}px`,
                  }}
                  className="
                    w-full
                    h-full
                    rounded-[32px]
                    sm:rounded-[45px]
                    md:rounded-[55px]
                    border-2
                    border-[#F4F1E8]/20
                    bg-[#F4F1E8]
                    p-5
                    sm:p-7
                    md:p-9
                    flex
                    flex-col
                    justify-between
                    shadow-2xl
                    text-[#071B35]
                    overflow-hidden
                  "
                >

                  {/* Card Header */}
                  <div
                    className="
                      flex
                      flex-col
                      sm:flex-row
                      justify-between
                      items-start
                      gap-5
                    "
                  >

                    <div className="flex items-start gap-5 sm:gap-7">

                      {/* Number */}
                      <span
                        className="
                          font-black
                          leading-none
                          text-[#071B35]/15
                        "
                        style={{
                          fontSize: 'clamp(3rem, 7vw, 6rem)',
                        }}
                      >
                        {project.number}
                      </span>

                      {/* Title */}
                      <div className="pt-1 sm:pt-2">

                        <span
                          className="
                            text-[#C62828]
                            text-xs
                            uppercase
                            tracking-[0.18em]
                            font-bold
                          "
                        >
                          {project.category}
                        </span>

                        <h3
                          className="
                            mt-1
                            font-black
                            uppercase
                            leading-tight
                            text-[#071B35]
                          "
                          style={{
                            fontSize:
                              'clamp(1.3rem, 3vw, 2.5rem)',
                          }}
                        >
                          {project.name}
                        </h3>

                      </div>

                    </div>

                  </div>


                  {/* Image + Description */}
                  <div
                    className="
                      grid
                      grid-cols-1
                      md:grid-cols-10
                      gap-6
                      md:gap-8
                      items-end
                      flex-1
                      mt-6
                    "
                  >

                    {/* Image */}
                    <div
                      className="
                        md:col-span-6
                        h-[38vh]
                        md:h-[48vh]
                      "
                    >
                      <img
                        src={project.image}
                        alt={project.name}
                        className="
                          w-full
                          h-full
                          object-cover
                          rounded-[25px]
                          sm:rounded-[35px]
                        "
                      />
                    </div>


                    {/* Description */}
                    <div
                      className="
                        md:col-span-4
                        flex
                        flex-col
                        justify-end
                        pb-2
                        md:pb-4
                      "
                    >

                      <div className="flex items-center gap-3 mb-4">

                        <span className="w-10 h-[3px] bg-[#C62828]" />

                        <span
                          className="
                            text-[#071B35]
                            text-xs
                            uppercase
                            tracking-[0.15em]
                            font-bold
                          "
                        >
                          Policy Priority
                        </span>

                      </div>

                      <p
                        className="
                          text-[#344A6B]
                          font-medium
                          leading-relaxed
                        "
                        style={{
                          fontSize:
                            'clamp(0.95rem, 1.5vw, 1.15rem)',
                        }}
                      >
                        {project.description}
                      </p>

                    </div>

                  </div>


                  {/* Bottom Accent */}
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      my-5
                      py-4
                      border-t
                      border-[#071B35]/10
                    "
                  >

                    <span
                      className="
                        text-[#071B35]
                        font-bold
                        uppercase
                        tracking-[0.12em]
                        text-[10px]
                        sm:text-xs
                      "
                    >
                      Building a Better Caledon
                    </span>

                    <span
                      className="
                        w-3
                        h-3
                        rounded-full
                        bg-[#C62828]
                      "
                    />

                  </div>

                </motion.div>

              </div>
            );
          })}

        </div>


        {/* Closing Message */}
        <FadeIn y={30}>
          <div className="text-center pt-16 sm:pt-20">

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
              A Stronger. More Affordable. Prosperous Caledon.
            </p>

          </div>
        </FadeIn>

      </div>
    </section>
  );
}

// // components/ProjectsSection.jsx
// 'use client';

// import React, { useRef } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import FadeIn from './FadeIn';
// import LiveProjectButton from './LiveProjectButton';

// const projects = [
//   {
//     number: "01",
//     category: "Client",
//     name: "Nextlevel Studio",
//     images: {
//       col1Img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
//       col1Img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
//       col2Img: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85"
//     }
//   },
//   {
//     number: "02",
//     category: "Personal",
//     name: "Aura Brand Identity",
//     images: {
//       col1Img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
//       col1Img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
//       col2Img: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85"
//     }
//   },
//   {
//     number: "03",
//     category: "Client",
//     name: "Solaris Digital",
//     images: {
//       col1Img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
//       col1Img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
//       col2Img: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85"
//     }
//   }
// ];

// export default function ProjectsSection() {
//   const containerRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ['start start', 'end end']
//   });

//   return (
//     <section id="projects" ref={containerRef} className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-20 sm:pt-24 md:pt-32 pb-20 relative z-10 px-5 sm:px-8 md:px-10 text-[#D7E2EA]">
//       <div className="max-w-6xl mx-auto">
//         <FadeIn y={40}>
//           <h2 className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-28" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
//             Project
//           </h2>
//         </FadeIn>

//         <div className="flex flex-col gap-12">
//           {projects.map((project, i) => {
//             const targetScale = 1 - (projects.length - 1 - i) * 0.03;
//             const cardProgress = useTransform(scrollYProgress, [i / projects.length, 1], [0, 1]);
//             const scale = useTransform(cardProgress, [0, 1], [1, targetScale]);

//             return (
//               <div key={project.number} className="h-[85vh] sticky top-24 md:top-32 flex items-center">
//                 <motion.div
//                   style={{ scale, top: `${i * 28}px` }}
//                   className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-2xl"
//                 >
//                   {/* Top row */}
//                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//                     <div className="flex items-center gap-6">
//                       <span className="font-black text-[#D7E2EA]" style={{ fontSize: 'clamp(2.5rem, 6vw, 80px)' }}>
//                         {project.number}
//                       </span>
//                       <div className="flex flex-col">
//                         <span className="text-xs uppercase tracking-widest opacity-60">{project.category}</span>
//                         <h3 className="font-bold uppercase text-lg sm:text-2xl">{project.name}</h3>
//                       </div>
//                     </div>
//                     <LiveProjectButton />
//                   </div>

//                   {/* Bottom row: Image Grid */}
//                   <div className="grid grid-cols-1 md:grid-cols-10 gap-4 h-full">
//                     {/* Left Column (40%) */}
//                     <div className="md:col-span-4 flex flex-col gap-4">
//                       <img
//                         src={project.images.col1Img1}
//                         alt={`${project.name} preview 1`}
//                         className="w-full rounded-[30px] sm:rounded-[40px] object-cover"
//                         style={{ height: 'clamp(130px, 16vw, 230px)' }}
//                       />
//                       <img
//                         src={project.images.col1Img2}
//                         alt={`${project.name} preview 2`}
//                         className="w-full rounded-[30px] sm:rounded-[40px] object-cover"
//                         style={{ height: 'clamp(160px, 22vw, 340px)' }}
//                       />
//                     </div>

//                     {/* Right Column (60%) */}
//                     <div className="md:col-span-6 flex">
//                       <img
//                         src={project.images.col2Img}
//                         alt={`${project.name} main preview`}
//                         className="w-full rounded-[30px] sm:rounded-[40px] object-cover h-full min-h-[250px] sm:min-h-[350px]"
//                       />
//                     </div>
//                   </div>
//                 </motion.div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }