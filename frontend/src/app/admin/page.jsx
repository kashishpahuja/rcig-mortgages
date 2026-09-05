// src/app/admin/page.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdminAbout from './components/AdminAbout';
import AdminMarquee from './components/AdminMarquee';
import AdminServices from './components/AdminServices';
import AdminProjects from './components/AdminProjects';
import AdminHero from './components/AdminHero';

export default function AdminDashboard() {
  const router = useRouter();

const handleLogout = async ()=>{
  try{
    const res = await fetch('api/auth/logout',{
      method:'POST'
    })
    if(res.ok){
      router.push('/admin/login');
      router.refresh();
    }
  }catch(error){
    console.error('Logout Failed: ',err)
  }
}

  return (
    <div className="w-full overflow-x-clip bg-[#0C0C0C] min-h-screen font-['Kanit']">
      
      {/* --- Fixed Admin Navbar --- */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#071B35] border-b-2 border-[#C62828] px-5 sm:px-8 py-4 flex justify-between items-center shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
          <div>
            <h1 className="text-[#F4F1E8] font-black uppercase tracking-widest text-sm md:text-lg leading-none">
              Visual Admin Mode
            </h1>
            <p className="text-[10px] text-[#C7D2DF]/70 tracking-widest mt-1">Live Database Editor</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Link 
            href="/" 
            target="_blank"
            className="hidden sm:inline-block bg-white/10 hover:bg-white/20 text-[#F4F1E8] px-4 py-2 rounded-xl font-bold uppercase tracking-widest text-xs transition border border-[#F4F1E8]/20"
          >
            Preview Site ↗
          </Link>

          <button
            onClick={handleLogout}
            className="bg-[#C62828] hover:bg-red-700 text-[#F4F1E8] px-4 sm:px-5 py-2 rounded-xl font-bold uppercase tracking-widest text-xs transition shadow-lg cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </nav>

      {/* Spacer so content doesn't hide under fixed navbar */}
      <div className="h-[76px] w-full bg-[#0C0C0C]" />

      {/* --- Stacked Sections (1 by 1 matching live layout) --- */}
      <main className="w-full flex flex-col">
        <AdminHero/>
        <AdminAbout />
        <AdminMarquee />
        <AdminServices />
        <AdminProjects />
      </main>
    </div>
  );
}