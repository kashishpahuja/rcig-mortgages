// src/app/admin/components/AdminHero.jsx
'use client';

import React, { useState, useEffect } from 'react';

export default function AdminHero() {
  const [heroData, setHeroData] = useState({
    candidateName: "Manjit Bhondhi",
    subtitle: "Candidate for Mayor of Caledon",
    description: "Listening to residents. Supporting local businesses. Building a stronger future for Caledon.",
    contactNumber: "Contact Campaign"
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetch('/api/hero')
      .then(res => res.ok ? res.json() : {})
      .then(data => {
        if (data.data) setHeroData(prev => ({ ...prev, ...data.data }));
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  const showMsg = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 4000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(heroData)
      });
      if (res.ok) {
        showMsg('Hero Banner updated successfully!');
      } else {
        showMsg('Failed to save.', 'error');
      }
    } catch (err) {
      showMsg('Network error.', 'error');
    }
    setSaving(false);
  };

  if (loading) return <div className="py-20 text-center text-white bg-[#092b66]">Loading Hero Editor...</div>;

  const inputClass = "bg-white/10 hover:bg-white/20 focus:bg-white/30 border border-dashed border-white/30 focus:border-[#D4AF37] outline-none transition-all w-full rounded px-3 py-2 text-white";

  return (
    <section className="relative h-auto min-h-[70vh] w-full flex flex-col justify-between px-6 md:px-10 py-16 bg-[#092b66] text-white border-b-4 border-[#071B35]">
      
      {/* Admin Floating Controls */}
      <div className="absolute top-4 left-4 right-4 z-50 flex justify-between items-center bg-[#071B35]/90 backdrop-blur px-6 py-3 rounded-full shadow-2xl border border-[#D4AF37]/40">
        <span className="font-bold uppercase tracking-widest text-[#D4AF37] text-xs">Editing: Hero Banner Section</span>
        <div className="flex items-center gap-4">
          {message.text && <span className={`text-xs font-bold ${message.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>{message.text}</span>}
          <button 
            onClick={handleSave} 
            disabled={saving}
            className="bg-[#D4AF37] text-[#071B35] px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition disabled:opacity-50 cursor-pointer shadow-lg"
          >
            {saving ? 'Saving...' : 'Save Hero Section'}
          </button>
        </div>
      </div>

      {/* Main Content Layout mirroring HeroSection */}
      <div className="relative z-20 flex flex-col justify-end max-w-6xl mx-auto w-full mt-16">
        
        {/* Candidate Name Input */}
        <div className="w-full mb-6">
          <label className="text-[10px] text-[#D4AF37] uppercase tracking-widest block mb-1">Candidate Name (Main Heading)</label>
          <input 
            value={heroData.candidateName}
            onChange={e => setHeroData({ ...heroData, candidateName: e.target.value })}
            className={`font-black uppercase tracking-[-0.04em] text-4xl sm:text-6xl lg:text-7xl ${inputClass}`}
          />
        </div>

        {/* Red Campaign Accent Bar */}
        <div className="h-[4px] w-[150px] bg-[#B31313] rounded-full mb-8" />

        {/* Bottom Bar Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end w-full">
          
          {/* Subtitle & Description */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-[10px] text-[#D4AF37] uppercase tracking-widest block mb-1">Subtitle / Role</label>
              <input 
                value={heroData.subtitle}
                onChange={e => setHeroData({ ...heroData, subtitle: e.target.value })}
                className={`text-[#D4AF37] font-semibold uppercase tracking-[0.12em] text-sm sm:text-base ${inputClass}`}
              />
            </div>

            <div className="h-[1px] w-16 bg-[#D4AF37]" />

            <div>
              <label className="text-[10px] text-[#D4AF37] uppercase tracking-widest block mb-1">Campaign Introduction Statement</label>
              <textarea 
                value={heroData.description}
                onChange={e => setHeroData({ ...heroData, description: e.target.value })}
                className={`text-[#D7E2EA] font-light uppercase tracking-wide text-xs sm:text-sm resize-none ${inputClass}`}
                rows={3}
              />
            </div>
          </div>

          {/* Contact Button Label/Number Settings */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-[#D4AF37] uppercase tracking-widest block mb-1">Contact Button Text / Number</label>
            <input 
              value={heroData.contactNumber}
              onChange={e => setHeroData({ ...heroData, contactNumber: e.target.value })}
              className={`max-w-xs font-bold text-sm ${inputClass}`}
            />
          </div>

        </div>
      </div>
    </section>
  );
}