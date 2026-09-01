// App.jsx (Main Page Component)
'use client';

import React from 'react';
import HeroSection from './components/portfolio/HeroSection';
import MarqueeSection from './components/portfolio/MarqueeSection';
import AboutSection from './components/portfolio/AboutSection';
import ServicesSection from './components/portfolio/ServicesSection';
import ProjectsSection from './components/portfolio/ProjectsSection';
import Footer from './components/portfolio/Footer';

export default function PortfolioPage() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300&display=swap');

        html, body, #root {
          background-color: #0C0C0C;
          color: #D7E2EA;
          font-family: 'Kanit', sans-serif;
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          overflow-x: clip;
        }

        .hero-heading {
          background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      <div className="w-full overflow-x-clip bg-[#0C0C0C]">
        <HeroSection />
        <AboutSection />
        <MarqueeSection />
        <ServicesSection />
        <ProjectsSection />
        <Footer/>
      </div>
    </>
  );
}