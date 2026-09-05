// components/portfolio/AboutSection.jsx
'use client';

import React from 'react';
import FadeIn from './FadeIn';
import AnimatedText from './AnimatedText';
import ContactButton from './ContactButton';

export default function AboutSection({ aboutData }) {
  // Destructure dynamic data with fallbacks to prevent crashes if DB is empty
  const {
    slogan = "Experienced Leadership for a Growing Caledon",
    title = "About",
    candidateName = "Manjit Singh Bhondhi",
    biographyParagraphs = [
      "Manjit Singh Bhondhi is a Caledon resident, Canadian citizen, business leader and community volunteer with more than 30 years of leadership experience and over 25 years in mortgage and financial services.",
      "He established Royal Capital Investment Group in 2014 and previously owned and operated the Brampton Convention Centre.",
      "Manjit serves as a Public Member of the Council of the College of Medical Radiation and Imaging Technologists of Ontario, chairs its Registration Committee and contributes to several governance committees.",
      "He is also the Founder-President of the Rotary Club of Brampton Flower City Centennial and has supported hospital fundraising, business organizations and community initiatives.",
      "He is running for Mayor to bring financial discipline, responsible growth, transparent decision-making and experienced leadership to Caledon."
    ],
    visionTitle = "My Vision for the Future of Caledon",
    visionStatement = "Caledon is moving from a primarily rural municipality into one of Ontario’s most important urban-rural communities. We must welcome opportunity without losing the farmland, natural environment, villages and community character that make Caledon special."
  } = aboutData || {};

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
        lg:py-24
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
            w-[120px] h-[120px]
            sm:w-[160px] sm:h-[160px]
            md:w-[210px] md:h-[210px]
            rounded-full
            border-[3px]
            border-[#071B35]/10
            flex items-center justify-center
          "
        >
          <div
            className="
              w-[65%] h-[65%]
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
              w-3 h-3
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
        className="hidden lg:block absolute top-4 right-1 sm:right-2 md:right-4 z-0 pointer-events-none"
      >
        <div
          className="
            w-[120px] h-[120px]
            sm:w-[160px] sm:h-[160px]
            md:w-[210px] md:h-[210px]
            rounded-full
            border-[10px]
            border-[#071B35]/5
            relative
          "
        >
          <div
            className="
              absolute inset-[18px]
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
              absolute right-0 bottom-4
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
              absolute right-0 bottom-2
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
              absolute right-0 bottom-0
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
          max-w-5xl
          w-full
          text-center
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
                tracking-[0.22em]
                text-xs
                sm:text-sm
              "
            >
              {slogan}
            </p>

            <h2
              className="
                hero-heading
                font-black
                uppercase
                leading-[0.9]
                tracking-tight
                text-[#071B35]
              "
              style={{
                fontSize: 'clamp(2rem, 9vw, 70px)',
              }}
            >
              {title}
              <br />
              <span className="text-[#C62828]">{candidateName}</span>
            </h2>

            {/* Banner Style Underline */}
            <div className="flex justify-center items-center gap-2 mt-6">
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

        {/* Biography Content */}
        <div
          className="
            mt-10
            sm:mt-12
            flex
            flex-col
            items-center
            w-full
          "
        >
          {/* Candidate Label */}
          <FadeIn delay={0.15} y={25}>
            <div
              className="
                inline-flex
                items-center
                gap-3
                px-5
                py-2.5
                mb-7
                border
                border-[#071B35]/10
                bg-white/50
                rounded-full
              "
            >
              <span className="w-2 h-2 rounded-full bg-[#C62828]" />
              <span
                className="
                  text-[#071B35]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-xs
                  sm:text-sm
                "
              >
                Candidate for Mayor of Caledon
              </span>
            </div>
          </FadeIn>

          {/* Dynamic Biography mapping */}
          <div
            className="
              max-w-[850px]
              flex
              flex-col
              gap-6
            "
          >
            {biographyParagraphs.map((paragraph, index) => (
              <AnimatedText
                key={index}
                text={paragraph}
                className={
                  index === 0 || index === biographyParagraphs.length - 1
                    ? "text-[#071B35] font-semibold leading-relaxed" 
                    : "text-[#344A6B] font-medium leading-relaxed" 
                }
                style={{
                  fontSize: index === 0 
                    ? 'clamp(1.1rem, 2.2vw, 1.45rem)' 
                    : 'clamp(1rem, 1.8vw, 1.2rem)',
                }}
              />
            ))}
          </div>

          {/* Vision Section */}
          {visionStatement && (
            <FadeIn delay={0.45} y={25}>
              <div
                className="
                  max-w-[900px]
                  mt-12
                  sm:mt-14
                  px-6
                  sm:px-10
                  py-8
                  sm:py-10
                  border-l-4
                  border-[#C62828]
                  bg-white/40
                  text-left
                "
              >
                <p
                  className="
                    mb-4
                    text-[#C62828]
                    font-black
                    uppercase
                    tracking-[0.12em]
                    text-sm
                    sm:text-base
                  "
                >
                  {visionTitle}
                </p>

                <p
                  className="
                    text-[#071B35]
                    font-semibold
                    leading-relaxed
                    italic
                  "
                  style={{
                    fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
                  }}
                >
                  “{visionStatement}”
                </p>
              </div>
            </FadeIn>
          )}

          {/* Closing Statement */}
          <FadeIn delay={0.6} y={20}>
            <div
              className="
                mt-10
                sm:mt-12
                flex
                flex-col
                items-center
              "
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 sm:w-12 h-[2px] bg-[#C62828]" />
                <span className="w-2 h-2 rounded-full bg-[#071B35]" />
                <span className="w-8 sm:w-12 h-[2px] bg-[#C62828]" />
              </div>

              <p
                className="
                  text-[#C62828]
                  font-black
                  uppercase
                  tracking-[0.08em]
                  text-sm
                  sm:text-base
                "
              >
                {slogan}
              </p>
            </div>
          </FadeIn>

          {/* Contact Button */}
          <FadeIn delay={0.7} y={20}>
            <div className="mt-8 sm:mt-10">
              <ContactButton />
            </div>
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


// // components/AboutSection.jsx
// 'use client';

// import React from 'react';
// import FadeIn from './FadeIn';
// import AnimatedText from './AnimatedText';
// import ContactButton from './ContactButton';

// export default function AboutSection() {
//   return (
//     <section
//       id="about"
//       className="
//         relative
//         min-h-screen
//         flex
//         flex-col
//         items-center
//         justify-center
//         px-5
//         sm:px-8
//         md:px-10
//         py-20
//         lg:py-24
//         bg-[#F4F1E8]
//         text-[#071B35]
//         overflow-hidden
//       "
//     >
//       {/* Top Left - Campaign Circle */}
//       <FadeIn
//         delay={0.1}
//         x={-80}
//         y={0}
//         duration={0.9}
//         className="absolute top-4 left-1 sm:left-2 md:left-4 z-0 pointer-events-none"
//       >
//         <div
//           className="
//             w-[120px] h-[120px]
//             sm:w-[160px] sm:h-[160px]
//             md:w-[210px] md:h-[210px]
//             rounded-full
//             border-[3px]
//             border-[#071B35]/10
//             flex items-center justify-center
//           "
//         >
//           <div
//             className="
//               w-[65%] h-[65%]
//               rounded-full
//               border-[2px]
//               border-[#C62828]/20
//             "
//           />
//         </div>
//       </FadeIn>

//       {/* Bottom Left - Red Campaign Line */}
//       <FadeIn
//         delay={0.25}
//         x={-80}
//         y={0}
//         duration={0.9}
//         className="absolute bottom-8 left-3 sm:left-6 md:left-10 z-0 pointer-events-none"
//       >
//         <div className="flex items-center gap-3">
//           <div
//             className="
//               w-[100px]
//               sm:w-[140px]
//               md:w-[180px]
//               h-[5px]
//               bg-[#C62828]
//             "
//           />

//           <div
//             className="
//               w-3 h-3
//               rounded-full
//               bg-[#071B35]
//             "
//           />
//         </div>
//       </FadeIn>

//       {/* Top Right - Campaign Rings */}
//       <FadeIn
//         delay={0.15}
//         x={80}
//         y={0}
//         duration={0.9}
//         className="hidden lg:block absolute top-4 right-1 sm:right-2 md:right-4 z-0 pointer-events-none"
//       >
//         <div
//           className="
//             w-[120px] h-[120px]
//             sm:w-[160px] sm:h-[160px]
//             md:w-[210px] md:h-[210px]
//             rounded-full
//             border-[10px]
//             border-[#071B35]/5
//             relative
//           "
//         >
//           <div
//             className="
//               absolute inset-[18px]
//               rounded-full
//               border-[2px]
//               border-[#C62828]/20
//             "
//           />
//         </div>
//       </FadeIn>

//       {/* Bottom Right - Campaign Accent */}
//       <FadeIn
//         delay={0.3}
//         x={80}
//         y={0}
//         duration={0.9}
//         className="absolute bottom-8 right-3 sm:right-6 md:right-10 z-0 pointer-events-none"
//       >
//         <div className="relative w-[130px] sm:w-[170px] md:w-[220px] h-[80px]">
//           <div
//             className="
//               absolute right-0 bottom-4
//               w-[120px]
//               sm:w-[160px]
//               md:w-[210px]
//               h-[5px]
//               bg-[#071B35]/10
//               rotate-[-6deg]
//             "
//           />

//           <div
//             className="
//               absolute right-0 bottom-2
//               w-[80px]
//               sm:w-[110px]
//               md:w-[140px]
//               h-[5px]
//               bg-[#071B35]
//               rotate-[-6deg]
//             "
//           />

//           <div
//             className="
//               absolute right-0 bottom-0
//               w-[45px]
//               sm:w-[65px]
//               md:w-[80px]
//               h-[5px]
//               bg-[#C62828]
//               rotate-[-6deg]
//             "
//           />
//         </div>
//       </FadeIn>

//       {/* Main Content */}
//       <div
//         className="
//           relative
//           z-10
//           flex
//           flex-col
//           items-center
//           max-w-5xl
//           w-full
//           text-center
//         "
//       >
//         {/* Heading */}
//         <FadeIn delay={0} y={40}>
//           <div>
//             <p
//               className="
//                 mb-4
//                 text-[#C62828]
//                 font-bold
//                 uppercase
//                 tracking-[0.22em]
//                 text-xs
//                 sm:text-sm
//               "
//             >
//               Experienced Leadership for a Growing Caledon
//             </p>

//             <h2
//               className="
//                 hero-heading
//                 font-black
//                 uppercase
//                 leading-[0.9]
//                 tracking-tight
//                 text-[#071B35]
//               "
//               style={{
//                 fontSize: 'clamp(2rem, 9vw, 80px)',
//               }}
//             >
//               About
//               <br />
//               <span className="text-[#C62828]">
//                 Manjit Singh Bhondhi
//               </span>
//             </h2>

//             {/* Banner Style Underline */}
//             <div className="flex justify-center items-center gap-2 mt-6">
//               <div
//                 className="
//                   h-[5px]
//                   w-16
//                   sm:w-20
//                   bg-[#071B35]
//                 "
//               />

//               <div
//                 className="
//                   h-[5px]
//                   w-4
//                   sm:w-6
//                   bg-[#C62828]
//                 "
//               />
//             </div>
//           </div>
//         </FadeIn>

//         {/* Biography Content */}
//         <div
//           className="
//             mt-10
//             sm:mt-12
//             flex
//             flex-col
//             items-center
//             w-full
//           "
//         >
//           {/* Candidate Label */}
//           <FadeIn delay={0.15} y={25}>
//             <div
//               className="
//                 inline-flex
//                 items-center
//                 gap-3
//                 px-5
//                 py-2.5
//                 mb-7
//                 border
//                 border-[#071B35]/10
//                 bg-white/50
//                 rounded-full
//               "
//             >
//               <span className="w-2 h-2 rounded-full bg-[#C62828]" />

//               <span
//                 className="
//                   text-[#071B35]
//                   font-bold
//                   uppercase
//                   tracking-[0.12em]
//                   text-xs
//                   sm:text-sm
//                 "
//               >
//                 Candidate for Mayor of Caledon
//               </span>
//             </div>
//           </FadeIn>

//           {/* Biography */}
//           <div
//             className="
//               max-w-[850px]
//               flex
//               flex-col
//               gap-6
//             "
//           >
//             <AnimatedText
//               text="Manjit Singh Bhondhi is a Caledon resident, Canadian citizen, business leader and community volunteer with more than 30 years of leadership experience and over 25 years in mortgage and financial services."
//               className="
//                 text-[#071B35]
//                 font-semibold
//                 leading-relaxed
//               "
//               style={{
//                 fontSize: 'clamp(1.1rem, 2.2vw, 1.45rem)',
//               }}
//             />

//             <AnimatedText
//               text="He established Royal Capital Investment Group in 2014 and previously owned and operated the Brampton Convention Centre."
//               className="
//                 text-[#344A6B]
//                 font-medium
//                 leading-relaxed
//               "
//               style={{
//                 fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
//               }}
//             />

//             <AnimatedText
//               text="Manjit serves as a Public Member of the Council of the College of Medical Radiation and Imaging Technologists of Ontario, chairs its Registration Committee and contributes to several governance committees."
//               className="
//                 text-[#344A6B]
//                 font-medium
//                 leading-relaxed
//               "
//               style={{
//                 fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
//               }}
//             />

//             <AnimatedText
//               text="He is also the Founder-President of the Rotary Club of Brampton Flower City Centennial and has supported hospital fundraising, business organizations and community initiatives."
//               className="
//                 text-[#344A6B]
//                 font-medium
//                 leading-relaxed
//               "
//               style={{
//                 fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
//               }}
//             />

//             <AnimatedText
//               text="He is running for Mayor to bring financial discipline, responsible growth, transparent decision-making and experienced leadership to Caledon."
//               className="
//                 text-[#071B35]
//                 font-semibold
//                 leading-relaxed
//               "
//               style={{
//                 fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
//               }}
//             />
//           </div>

//           {/* Vision Section */}
//           <FadeIn delay={0.45} y={25}>
//             <div
//               className="
//                 max-w-[900px]
//                 mt-12
//                 sm:mt-14
//                 px-6
//                 sm:px-10
//                 py-8
//                 sm:py-10
//                 border-l-4
//                 border-[#C62828]
//                 bg-white/40
//                 text-left
//               "
//             >
//               <p
//                 className="
//                   mb-4
//                   text-[#C62828]
//                   font-black
//                   uppercase
//                   tracking-[0.12em]
//                   text-sm
//                   sm:text-base
//                 "
//               >
//                 My Vision for the Future of Caledon
//               </p>

//               <p
//                 className="
//                   text-[#071B35]
//                   font-semibold
//                   leading-relaxed
//                   italic
//                 "
//                 style={{
//                   fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
//                 }}
//               >
//                 “Caledon is moving from a primarily rural municipality into
//                 one of Ontario’s most important urban-rural communities. We
//                 must welcome opportunity without losing the farmland, natural
//                 environment, villages and community character that make
//                 Caledon special.”
//               </p>
//             </div>
//           </FadeIn>

//           {/* Closing Statement */}
//           <FadeIn delay={0.6} y={20}>
//             <div
//               className="
//                 mt-10
//                 sm:mt-12
//                 flex
//                 flex-col
//                 items-center
//               "
//             >
//               <div className="flex items-center gap-3 mb-3">
//                 <span className="w-8 sm:w-12 h-[2px] bg-[#C62828]" />
//                 <span className="w-2 h-2 rounded-full bg-[#071B35]" />
//                 <span className="w-8 sm:w-12 h-[2px] bg-[#C62828]" />
//               </div>

//               <p
//                 className="
//                   text-[#C62828]
//                   font-black
//                   uppercase
//                   tracking-[0.08em]
//                   text-sm
//                   sm:text-base
//                 "
//               >
//                 Experienced Leadership for a Growing Caledon
//               </p>
//             </div>
//           </FadeIn>

//           {/* Contact Button */}
//           <FadeIn delay={0.7} y={20}>
//             <div className="mt-8 sm:mt-10">
//               <ContactButton />
//             </div>
//           </FadeIn>
//         </div>
//       </div>

//       {/* Bottom Campaign Line */}
//       <div
//         className="
//           absolute
//           bottom-0
//           left-0
//           right-0
//           h-[6px]
//           bg-[#071B35]
//         "
//       >
//         <div
//           className="
//             absolute
//             right-0
//             top-0
//             h-full
//             w-1/3
//             bg-[#C62828]
//           "
//         />

//         <div
//           className="
//             absolute
//             right-0
//             top-0
//             h-full
//             w-[8%]
//             bg-[#071B35]
//           "
//         />
//       </div>
//     </section>
//   );
// }

