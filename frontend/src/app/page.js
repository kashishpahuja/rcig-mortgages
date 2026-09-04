// src/app/page.js
import React from 'react';
import connectMongo from '@/lib/mongodb';
import About from '@/models/About';
import Marquee from '@/models/Marquee';
import Priority from '@/models/Priority';
import Project from '@/models/Project';

import HeroSection from './components/portfolio/HeroSection';
import MarqueeSection from './components/portfolio/MarqueeSection';
import AboutSection from './components/portfolio/AboutSection';
import ServicesSection from './components/portfolio/ServicesSection';
import ProjectsSection from './components/portfolio/ProjectsSection';
import Footer from './components/portfolio/Footer';

// Helper function to serialize MongoDB objects so they can be passed to Client Components safely
const sanitizeData = (data) => JSON.parse(JSON.stringify(data));

export default async function PortfolioPage() {
  // 1. Connect to the database directly
  await connectMongo();

  // 2. Fetch data using Mongoose (.lean() strips out heavy Mongoose methods, returning plain objects)
  const aboutDoc = await About.findOne().lean() || {};
  const marqueeDocs = await Marquee.find().sort({ order: 1, createdAt: -1 }).lean();
  const prioritiesDocs = await Priority.find().sort({ order: 1, createdAt: 1 }).lean();
  const projectsDocs = await Project.find().sort({ order: 1, createdAt: 1 }).lean();

  // 3. Sanitize the data (Next.js client components crash if you pass raw MongoDB ObjectIds or Dates)
  const aboutData = sanitizeData(aboutDoc);
  const marqueeData = sanitizeData(marqueeDocs);
  const prioritiesData = sanitizeData(prioritiesDocs);
  const projectsData = sanitizeData(projectsDocs);

  return (
    <div className="w-full overflow-x-clip bg-[#0C0C0C]">
      <HeroSection />
      
      {/* Pass the sanitized data down to your Client Components */}
      <AboutSection aboutData={aboutData} />
      <MarqueeSection marqueeData={marqueeData} />
      <ServicesSection prioritiesData={prioritiesData} />
      <ProjectsSection projectsData={projectsData} />
      
      <Footer />
    </div>
  );
}


// // App.jsx (Main Page Component)
// 'use client';

// import React from 'react';
// import HeroSection from './components/portfolio/HeroSection';
// import MarqueeSection from './components/portfolio/MarqueeSection';
// import AboutSection from './components/portfolio/AboutSection';
// import ServicesSection from './components/portfolio/ServicesSection';
// import ProjectsSection from './components/portfolio/ProjectsSection';
// import Footer from './components/portfolio/Footer';

// async function fetchSectionData(endpoint){
//   try{
//     const res = await fetch(`http://localhost:3000/api/${endpoint}`,{
//       cache:'no-store'
//     })
//     if(!res.ok) return null;
//     const json = await res.json();
//     return json.data;
//   }catch(error){
//     console.error(`Error Fetching ${endpoint}:`,error);
//     return null;
//   }
// }


// export default async function PortfolioPage() {
//   // Fetch all dynamic data in parallel on the server
//   const [aboutData, marqueeData, prioritiesData, projectsData] = await Promise.all([
//     fetchSectionData('about'),
//     fetchSectionData('marquee'),
//     fetchSectionData('priorities'),
//     fetchSectionData('projects')
//   ]);
  
//   return (
//     <>
//       <style jsx global>{`
//         @import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300&display=swap');

//         html, body, #root {
//           background-color: #0C0C0C;
//           color: #D7E2EA;
//           font-family: 'Kanit', sans-serif;
//           box-sizing: border-box;
//           margin: 0;
//           padding: 0;
//           overflow-x: clip;
//         }

//         .hero-heading {
//           background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }
//       `}</style>

//       <div className="w-full overflow-x-clip bg-[#0C0C0C]">
//         <HeroSection />
//        <AboutSection aboutData={aboutData} />
//         {/* <MarqueeSection marqueeData={marqueeData} />
//         <ServicesSection prioritiesData={prioritiesData} />
//         <ProjectsSection projectsData={projectsData} /> */}
//         {/* <AboutSection />*/}
//         <MarqueeSection />
//         <ServicesSection />
//         <ProjectsSection /> 
//         <Footer/>
//       </div>
//     </>
//   );
// }