// src/app/admin/page.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import AdminAbout from './components/AdminAbout';
// Uncomment these as you build them:
// import AdminMarquee from './components/AdminMarquee';
// import AdminProjects from './components/AdminProjects';

export default function AdminDashboard() {
  return (
    <div className="w-full overflow-x-clip bg-[#0C0C0C] min-h-screen font-['Kanit']">
      
      {/* --- Fixed Admin Navbar --- */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#071B35] border-b border-[#C62828] px-5 sm:px-8 py-4 flex justify-between items-center shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <div>
            <h1 className="text-white font-black uppercase tracking-widest text-sm md:text-lg leading-none">
              Visual Admin Mode
            </h1>
            <p className="text-[10px] text-white/60 tracking-widest mt-1">Live Database Editor</p>
          </div>
        </div>
        
        <Link 
          href="/" 
          className="bg-[#C62828] hover:bg-red-700 text-white px-5 py-2 rounded-full font-bold uppercase tracking-widest text-xs sm:text-sm transition shadow-lg"
        >
          Exit to Live Site
        </Link>
      </nav>

      {/* Spacer so content doesn't hide under fixed navbar */}
      <div className="h-[72px] w-full bg-[#0C0C0C]" />

      {/* --- Stacked Sections (1 by 1 like the normal page) --- */}
      <main className="w-full flex flex-col">
        
        {/* Visual Editor block for About */}
        <AdminAbout />
        
        {/* Stack the rest here once created */}
        {/* <AdminMarquee /> */}
        {/* <AdminProjects /> */}
        
      </main>
    </div>
  );
}