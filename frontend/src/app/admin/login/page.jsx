// src/app/admin/login/page.jsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error || 'Authentication failed');
        setLoading(false);
      }
    } catch (err) {
      setError('Network connection error.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row font-['Kanit'] bg-[#071B35] overflow-hidden">
      
      {/* Left Column: Image & Campaign Branding */}
      <div className="relative lg:w-1/2 min-h-[40vh] lg:min-h-screen flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
        
        {/* Background Image & Overlays */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105"
          style={{ backgroundImage: "url('/Images/bg.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#071B35] via-[#071B35]/80 to-[#C62828]/20" />
        <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#D4AF37] z-20" />

        {/* Top Brand Tag */}
        <div className="relative z-10">
          <span className="text-[#D4AF37] font-bold uppercase tracking-[0.25em] text-xs px-3 py-1.5 rounded-full bg-white/5 border border-[#D4AF37]/30">
            Official Campaign Portal
          </span>
        </div>

        {/* Center/Bottom Highlight Text */}
        <div className="relative z-10 my-auto py-10">
          <h2 className="text-white text-3xl sm:text-5xl font-black uppercase tracking-tight leading-[1.05]">
            Manjit Singh <br />
            <span className="text-[#D4AF37]">Bhondhi</span>
          </h2>
          <p className="text-[#C7D2DF] font-light text-sm sm:text-base uppercase tracking-widest mt-4 max-w-md">
            Candidate for Mayor of Caledon • Securing a Prosperous Future Together
          </p>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-white/50 text-xs uppercase tracking-widest">
          Secure Administrative Access Only
        </div>
      </div>

      {/* Right Column: Clean White Background Form */}
      <div className="lg:w-1/2 min-h-[60vh] lg:min-h-screen flex items-center justify-center p-8 sm:p-12 lg:p-20 bg-[#F4F1E8] text-[#071B35]">
        
        <div className="w-full max-w-md">
          
          {/* Form Header */}
          <div className="mb-10">
            <div className="w-14 h-14 bg-[#C62828] rounded-2xl flex items-center justify-center mb-5 shadow-[0_10px_20px_rgba(198,40,40,0.3)]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F4F1E8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-[#071B35]">
              Welcome Back
            </h1>
            <p className="text-[#071B35]/60 text-xs font-bold uppercase tracking-widest mt-2">
              Please enter your credentials to manage live content.
            </p>
          </div>

          {/* Form Inputs */}
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {error && (
              <div className="bg-red-500/10 border-l-4 border-[#C62828] text-red-700 text-xs font-bold uppercase tracking-wider p-4 rounded-r-xl">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-[#071B35]/80 font-bold">Username</label>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
                className="w-full bg-white text-[#071B35] border border-[#071B35]/20 focus:border-[#C62828] outline-none px-5 py-4 rounded-2xl text-sm transition-all shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-[#071B35]/80 font-bold">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="w-full bg-white text-[#071B35] border border-[#071B35]/20 focus:border-[#C62828] outline-none px-5 py-4 rounded-2xl text-sm transition-all shadow-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full bg-[#C62828] hover:bg-red-700 text-white font-bold uppercase tracking-[0.2em] text-sm py-4 rounded-2xl transition-all shadow-[0_10px_25px_rgba(198,40,40,0.3)] disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="text-center mt-10 pt-6 border-t border-[#071B35]/10">
            <p className="text-[11px] uppercase tracking-widest text-[#071B35]/40 font-semibold">
              Secured Database Management System
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}