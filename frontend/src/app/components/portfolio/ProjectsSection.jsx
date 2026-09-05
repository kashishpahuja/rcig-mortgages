// components/portfolio/ProjectsSection.jsx
'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';

export default function ProjectsSection({ projectsData = [] }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Fallback to default data if the database returns an empty array
  const displayProjects = projectsData.length > 0 ? projectsData : [
    {
      number: '01',
      category: 'Highway 413',
      name: 'Connectivity With Accountability',
      description: 'Ensure Highway 413 delivers better connectivity and economic opportunity while protecting Caledon’s roads, environment, communities, and taxpayers.',
      image: '/Images/11.webp',
    },
    {
      number: '02',
      category: 'Jobs & Prosperity',
      name: 'Local Jobs. Stronger Economy.',
      description: 'Support sustainable employment and investment through projects like Choice Caledon Business Park while ensuring growth brings meaningful benefits to the community.',
      image: '/Images/15.webp',
    },
    {
      number: '03',
      category: 'Future Communities',
      name: 'Complete Communities, Not Congestion',
      description: "Plan Caledon's growing communities with the housing, roads, parks, services, and infrastructure needed to create connected neighbourhoods—not isolated subdivisions.",
      image: '/Images/14.webp'
    },
  ];

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


        {/* Dynamic Policy Cards */}
        <div className="flex flex-col gap-10 sm:gap-12">
          {displayProjects.map((project, i) => {
            const targetScale = 1 - (displayProjects.length - 1 - i) * 0.035;

            const cardProgress = useTransform(
              scrollYProgress,
              [i / displayProjects.length, 1],
              [0, 1]
            );

            const scale = useTransform(
              cardProgress,
              [0, 1],
              [1, targetScale]
            );

            return (
              <div
                key={project._id || project.number}
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
                      {/* <span
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
                      </span> */}

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
                            fontSize: 'clamp(1.3rem, 3vw, 2.5rem)',
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
                          fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
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

// const projects = [
//   {
//     number: '01',
//     category: 'Highway 413',
//     name: 'Connectivity With Accountability',
//     description:
//       'Ensure Highway 413 delivers better connectivity and economic opportunity while protecting Caledon’s roads, environment, communities, and taxpayers.',
//     image: '/Images/11.webp',
//   },
//   {
//     number: '02',
//     category: 'Jobs & Prosperity',
//     name: 'Local Jobs. Stronger Economy.',
//     description:
//       'Support sustainable employment and investment through projects like Choice Caledon Business Park while ensuring growth brings meaningful benefits to the community.',
//     image: '/Images/15.webp',
//   },
//   {
//     number: '03',
//     category: 'Future Communities',
//     name: 'Complete Communities, Not Congestion',
//     description:"Plan Caledon's growing communities with the housing, roads, parks, services, and infrastructure needed to create connected neighbourhoods—not isolated subdivisions.",
//     image: '/Images/14.webp'
//   },
// ];

// export default function ProjectsSection() {
//   const containerRef = useRef(null);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ['start start', 'end end'],
//   });

//   return (
//     <section
//       id="projects"
//       ref={containerRef}
//       className="
//         bg-[#071B35]
//         rounded-t-[40px]
//         sm:rounded-t-[50px]
//         md:rounded-t-[60px]
//         -mt-10
//         sm:-mt-12
//         md:-mt-14
//         pt-20
//         sm:pt-24
//         md:pt-32
//         pb-20
//         relative
//         z-10
//         px-5
//         sm:px-8
//         md:px-10
//         text-[#F4F1E8]
//       "
//     >
//       <div className="max-w-6xl mx-auto">

//         {/* Section Heading */}
//         <FadeIn y={40}>
//           <div className="text-center mb-16 sm:mb-20 md:mb-24">

//             <p
//               className="
//                 text-[#C62828]
//                 font-bold
//                 uppercase
//                 tracking-[0.25em]
//                 mb-4
//               "
//               style={{
//                 fontSize: 'clamp(0.7rem, 1vw, 1rem)',
//               }}
//             >
//               A Policy for Caledon
//             </p>

//             <h2
//               className="
//                 hero-heading
//                 font-black
//                 uppercase
//                 text-[#F4F1E8]
//                 leading-[0.9]
//               "
//               style={{
//                 fontSize: 'clamp(2rem, 10vw, 80px)',
//               }}
//             >
//               Affordability
//             </h2>

//             {/* Accent */}
//             <div className="flex justify-center items-center gap-2 mt-5">
//               <div className="h-[5px] w-16 sm:w-20 bg-[#F4F1E8]" />
//               <div className="h-[5px] w-5 sm:w-7 bg-[#C62828]" />
//             </div>

//             <p
//               className="
//                 max-w-2xl
//                 mx-auto
//                 mt-6
//                 text-center
//                 text-[#C7D2DF]
//                 font-light
//                 leading-relaxed
//               "
//               style={{
//                 fontSize: 'clamp(1rem, 1.7vw, 1.2rem)',
//               }}
//             >
//               Practical policies that support families, protect taxpayers,
//               encourage investment and create a prosperous future for Caledon.
//             </p>

//           </div>
//         </FadeIn>


//         {/* Policy Cards */}
//         <div className="flex flex-col gap-10 sm:gap-12">

//           {projects.map((project, i) => {

//             const targetScale =
//               1 - (projects.length - 1 - i) * 0.035;

//             const cardProgress = useTransform(
//               scrollYProgress,
//               [i / projects.length, 1],
//               [0, 1]
//             );

//             const scale = useTransform(
//               cardProgress,
//               [0, 1],
//               [1, targetScale]
//             );

//             return (
//               <div
//                 key={project.number}
//                 className="
              
               
//                   sticky
//                   top-20
//                   md:top-28
//                   flex
//                   items-center
//                 "
//               >

//                 <motion.div
//                   style={{
//                     scale,
//                     top: `${i * 25}px`,
//                   }}
//                   className="
//                     w-full
//                     h-full
//                     rounded-[32px]
//                     sm:rounded-[45px]
//                     md:rounded-[55px]
//                     border-2
//                     border-[#F4F1E8]/20
//                     bg-[#F4F1E8]
//                     p-5
//                     sm:p-7
//                     md:p-9
//                     flex
//                     flex-col
//                     justify-between
//                     shadow-2xl
//                     text-[#071B35]
//                     overflow-hidden
//                   "
//                 >

//                   {/* Card Header */}
//                   <div
//                     className="
//                       flex
//                       flex-col
//                       sm:flex-row
//                       justify-between
//                       items-start
//                       gap-5
//                     "
//                   >

//                     <div className="flex items-start gap-5 sm:gap-7">

//                       {/* Number */}
//                       <span
//                         className="
//                           font-black
//                           leading-none
//                           text-[#071B35]/15
//                         "
//                         style={{
//                           fontSize: 'clamp(3rem, 7vw, 6rem)',
//                         }}
//                       >
//                         {project.number}
//                       </span>

//                       {/* Title */}
//                       <div className="pt-1 sm:pt-2">

//                         <span
//                           className="
//                             text-[#C62828]
//                             text-xs
//                             uppercase
//                             tracking-[0.18em]
//                             font-bold
//                           "
//                         >
//                           {project.category}
//                         </span>

//                         <h3
//                           className="
//                             mt-1
//                             font-black
//                             uppercase
//                             leading-tight
//                             text-[#071B35]
//                           "
//                           style={{
//                             fontSize:
//                               'clamp(1.3rem, 3vw, 2.5rem)',
//                           }}
//                         >
//                           {project.name}
//                         </h3>

//                       </div>

//                     </div>

//                   </div>


//                   {/* Image + Description */}
//                   <div
//                     className="
//                       grid
//                       grid-cols-1
//                       md:grid-cols-10
//                       gap-6
//                       md:gap-8
//                       items-end
//                       flex-1
//                       mt-6
//                     "
//                   >

//                     {/* Image */}
//                     <div
//                       className="
//                         md:col-span-6
//                         h-[38vh]
//                         md:h-[48vh]
//                       "
//                     >
//                       <img
//                         src={project.image}
//                         alt={project.name}
//                         className="
//                           w-full
//                           h-full
//                           object-cover
//                           rounded-[25px]
//                           sm:rounded-[35px]
//                         "
//                       />
//                     </div>


//                     {/* Description */}
//                     <div
//                       className="
//                         md:col-span-4
//                         flex
//                         flex-col
//                         justify-end
//                         pb-2
//                         md:pb-4
//                       "
//                     >

//                       <div className="flex items-center gap-3 mb-4">

//                         <span className="w-10 h-[3px] bg-[#C62828]" />

//                         <span
//                           className="
//                             text-[#071B35]
//                             text-xs
//                             uppercase
//                             tracking-[0.15em]
//                             font-bold
//                           "
//                         >
//                           Policy Priority
//                         </span>

//                       </div>

//                       <p
//                         className="
//                           text-[#344A6B]
//                           font-medium
//                           leading-relaxed
//                         "
//                         style={{
//                           fontSize:
//                             'clamp(0.95rem, 1.5vw, 1.15rem)',
//                         }}
//                       >
//                         {project.description}
//                       </p>

//                     </div>

//                   </div>


//                   {/* Bottom Accent */}
//                   <div
//                     className="
//                       flex
//                       items-center
//                       justify-between
//                       my-5
//                       py-4
//                       border-t
//                       border-[#071B35]/10
//                     "
//                   >

//                     <span
//                       className="
//                         text-[#071B35]
//                         font-bold
//                         uppercase
//                         tracking-[0.12em]
//                         text-[10px]
//                         sm:text-xs
//                       "
//                     >
//                       Building a Better Caledon
//                     </span>

//                     <span
//                       className="
//                         w-3
//                         h-3
//                         rounded-full
//                         bg-[#C62828]
//                       "
//                     />

//                   </div>

//                 </motion.div>

//               </div>
//             );
//           })}

//         </div>


//         {/* Closing Message */}
//         <FadeIn y={30}>
//           <div className="text-center pt-16 sm:pt-20">

//             <p
//               className="
//                 text-[#F4F1E8]
//                 font-black
//                 uppercase
//                 tracking-[0.08em]
//               "
//               style={{
//                 fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
//               }}
//             >
//               A Stronger. More Affordable. Prosperous Caledon.
//             </p>

//           </div>
//         </FadeIn>

//       </div>
//     </section>
//   );
// }

