'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function MarcusPortfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Webfont and Custom CSS */}
      <style jsx global>{`
        @import url('https://db.onlinewebfonts.com/c/95cecf452d3208890088a5b4c19c7ecf?family=Helvetica+Neue+ME');

        @font-face {
          font-family: 'Helvetica Neue ME';
          src: url('https://db.onlinewebfonts.com/c/95cecf452d3208890088a5b4c19c7ecf?family=Helvetica+Neue+ME') format('truetype');
        }

        .font-hn {
          font-family: 'Helvetica Neue ME', Helvetica, Arial, sans-serif;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes riseIn {
          from { opacity: 0; transform: translateY(4vh) scale(1.03); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .anim-fade-in {
          animation: fadeIn 1.2s ease-out both;
        }

        .anim-rise-in {
          animation: riseIn 1.4s cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: 300ms;
        }

        .anim-line {
          transform-origin: left;
          animation: lineGrow 1.1s cubic-bezier(0.76, 0, 0.24, 1) both;
          animation-delay: 1200ms;
        }

        .marquee-track {
          display: flex;
          width: max-content;
          white-space: nowrap;
          animation: marqueeScroll 30s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          *, ::before, ::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      {/* Root Section */}
      <main className="relative h-[100dvh] w-full overflow-hidden bg-black font-hn text-[#efeee9] select-none">
        
        {/* Layer 1: BG Image (Default Z) */}
        <img
          src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260729_022513_486985a2-ac8c-4278-91a8-071dcd9fcaff.png&w=1280&q=85"
          alt=""
          className="absolute inset-0 h-full w-full object-cover anim-fade-in"
        />

        {/* Layer 2: Marquee Name (z-10) */}
        <div 
          className="absolute inset-x-0 top-[16vh] sm:top-[14vh] z-10 overflow-hidden"
          style={{ animation: 'fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both', animationDelay: '500ms' }}
        >
          <div className="marquee-track font-hn text-[16vh] sm:text-[26vh] leading-none text-[#efeee9]">
            <span className="pr-[6vw]">Marcus &mdash; Bennet&nbsp;</span>
            <span className="pr-[6vw]">Marcus &mdash; Bennet&nbsp;</span>
          </div>
        </div>

        {/* Horizontal Cream Rule (z-10) */}
        <div 
          className="absolute inset-x-6 sm:inset-x-10 bottom-[5.5rem] sm:bottom-28 z-10 h-0.5 bg-[#efeee9] anim-line"
        />

        {/* Desktop Footer (sm:z-10) */}
        <footer className="absolute inset-x-0 bottom-0 hidden sm:flex items-end justify-between px-10 pb-8 text-sm leading-relaxed font-hn sm:z-10">
          <div 
            style={{ animation: 'fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both', animationDelay: '1400ms' }}
          >
            <p>Visuals Composer</p>
            <p>Digital Crafter</p>
            <p>Obsessed by The Office</p>
          </div>
          <div 
            className="text-right"
            style={{ animation: 'fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both', animationDelay: '1550ms' }}
          >
            <p>A homage to</p>
            <p>Marcus Holloway</p>
          </div>
        </footer>

        {/* Layer 3: Front Portrait (z-20) */}
        <img
          src="/Images/manjit.webp"
          alt="Portrait"
          className="absolute inset-0 h-full w-full object-contain object-bottom pointer-events-none z-20 anim-rise-in"
        />

        {/* Layer 4: Header + Mobile Footer (z-30) */}
        <header className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-6 pt-6 sm:px-10 sm:pt-8">
          {/* Brand Logo */}
          <a 
            href="#" 
            className="font-hn text-lg tracking-wide text-[#efeee9]"
            style={{ animation: 'fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both', animationDelay: '800ms' }}
          >
            Marcus
          </a>

          {/* Desktop Right Cluster */}
          <div 
            className="hidden sm:flex items-start gap-16 lg:gap-24"
            style={{ animation: 'fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both', animationDelay: '900ms' }}
          >
            {/* Year */}
            <span className="text-sm text-[#efeee9]">2025</span>

            {/* Nav Column */}
            <nav className="flex flex-col gap-0.5 text-sm text-[#efeee9]">
              {['Story', 'Jobs', 'Message'].map((item, i) => (
                <a 
                  key={item} 
                  href="#" 
                  className="transition-opacity duration-300 hover:opacity-60"
                  style={{ 
                    animation: `fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both`,
                    animationDelay: `${1000 + i * 80}ms`
                  }}
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Social Column */}
            <div className="flex flex-col gap-0.5 text-sm text-[#efeee9]">
              {['Instagram', 'TikTok', 'YouTube'].map((item, i) => (
                <a 
                  key={item} 
                  href="#" 
                  className="transition-opacity duration-300 hover:opacity-60"
                  style={{ 
                    animation: `fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both`,
                    animationDelay: `${1150 + i * 80}ms`
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="sm:hidden relative flex h-10 w-10 flex-col items-center justify-center focus:outline-none z-50"
            aria-label="Open menu"
            style={{ animation: 'fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both', animationDelay: '900ms' }}
          >
            <div className={`absolute h-[2px] w-6 bg-[#efeee9] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${mobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'}`} />
            <div className={`absolute h-[2px] w-6 bg-[#efeee9] transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <div className={`absolute h-[2px] w-6 bg-[#efeee9] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${mobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'}`} />
          </button>
        </header>

        {/* Mobile-only bottom footer text */}
        <div 
          className="absolute inset-x-0 bottom-0 flex sm:hidden items-end justify-between px-6 pb-5 text-xs leading-relaxed font-hn z-30 pointer-events-none"
          style={{ animation: 'fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both', animationDelay: '1400ms' }}
        >
          <div>
            <p>Visuals Composer</p>
            <p>Digital Crafter</p>
            <p>Obsessed by The Office</p>
          </div>
          <div className="text-right">
            <p>A homage to</p>
            <p>Marcus Holloway</p>
          </div>
        </div>

        {/* Layer 5: Mobile Drawer (z-40) */}
        <div 
          className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-500 sm:hidden ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setMobileMenuOpen(false)}
        />

        <div className={`fixed inset-y-0 right-0 z-40 w-[80%] max-w-sm bg-[#141414] px-8 py-10 flex flex-col justify-between transition-transform duration-600 ease-[cubic-bezier(0.76,0,0.24,1)] sm:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          
          {/* Close Icon inside Drawer */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className={`absolute right-6 top-6 text-[#efeee9] transition-all duration-500 ${mobileMenuOpen ? 'rotate-0 opacity-150 delay-300' : 'rotate-90 opacity-0'}`}
            aria-label="Close menu"
          >
            <X size={26} strokeWidth={1.5} />
          </button>

          {/* Drawer Content */}
          <div className="flex flex-col gap-10 mt-12">
            {/* Site Index */}
            <div className={`flex flex-col gap-3 transition-all duration-700 ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`} style={{ transitionDelay: '250ms' }}>
              <p className="text-xs uppercase tracking-[0.2em] text-[#efeee9]/50">Site Index</p>
              <div className="flex flex-col gap-2">
                {['Story', 'Jobs', 'Message'].map((item, i) => (
                  <a 
                    key={item} 
                    href="#" 
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-4xl text-[#efeee9] transition-all duration-500 ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                    style={{ transitionDelay: `${300 + i * 80}ms` }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Find Me */}
            <div className={`flex flex-col gap-3 transition-all duration-700 ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '500ms' }}>
              <p className="text-xs uppercase tracking-[0.2em] text-[#efeee9]/50">Find Me</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#efeee9]">
                {['Instagram', 'TikTok', 'YouTube'].map((item, i) => (
                  <a 
                    key={item} 
                    href="#" 
                    onClick={() => setMobileMenuOpen(false)}
                    className={`transition-all duration-500 ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                    style={{ transitionDelay: `${550 + i * 60}ms` }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
    
          <div className="text-xs text-[#efeee9]/40">
            &copy; 2025 Marcus Bennet
          </div>
        </div>

      </main>
    </>
  );
}