'use client';

import React, { useState, useEffect } from 'react';

export default function AdminAbout() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Fallback default data
  const [aboutData, setAboutData] = useState({
    slogan: "Experienced Leadership for a Growing Caledon",
    title: "About",
    candidateName: "Manjit Singh Bhondhi",
    biographyParagraphs: [
      "Manjit Singh Bhondhi is a Caledon resident, Canadian citizen, business leader and community volunteer with more than 30 years of leadership experience and over 25 years in mortgage and financial services.",
      "He established Royal Capital Investment Group in 2014 and previously owned and operated the Brampton Convention Centre.",
      "Manjit serves as a Public Member of the Council of the College of Medical Radiation and Imaging Technologists of Ontario, chairs its Registration Committee and contributes to several governance committees.",
      "He is also the Founder-President of the Rotary Club of Brampton Flower City Centennial and has supported hospital fundraising, business organizations and community initiatives.",
      "He is running for Mayor to bring financial discipline, responsible growth, transparent decision-making and experienced leadership to Caledon."
    ],
    visionTitle: "My Vision for the Future of Caledon",
    visionStatement: "Caledon is moving from a primarily rural municipality into one of Ontario’s most important urban-rural communities. We must welcome opportunity without losing the farmland, natural environment, villages and community character that make Caledon special."
  });

  // Fetch data from DB
  useEffect(() => {
    fetch('/api/about')
      .then(res => res.ok ? res.json() : {})
      .then(data => {
        if (data.data) setAboutData(prev => ({ ...prev, ...data.data }));
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  // Save to DB
  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/about', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aboutData)
      });

      if (res.ok) {
        setMessage({ text: 'About Section updated in Database!', type: 'success' });
      } else {
        setMessage({ text: 'Failed to save.', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Network Error.', type: 'error' });
    }
    setSaving(false);
    setTimeout(() => setMessage({ text: '', type: '' }), 4000);
  };

  // --- Dynamic Array Handlers ---
  const handleParagraphChange = (index, value) => {
    const updatedParagraphs = [...aboutData.biographyParagraphs];
    updatedParagraphs[index] = value;
    setAboutData({ ...aboutData, biographyParagraphs: updatedParagraphs });
  };

  const handleAddParagraph = () => {
    setAboutData(prev => ({
      ...prev,
      biographyParagraphs: [...prev.biographyParagraphs, ""] // Adds an empty paragraph at the end
    }));
  };

  const handleRemoveParagraph = (indexToRemove) => {
    if(!confirm("Are you sure you want to delete this paragraph?")) return;
    
    setAboutData(prev => ({
      ...prev,
      biographyParagraphs: prev.biographyParagraphs.filter((_, index) => index !== indexToRemove)
    }));
  };

  if (loading) return <div className="py-20 text-center text-white">Loading About Editor...</div>;

  // Transparent input styling to mimic regular text
  const inputClass = "bg-black/5 hover:bg-black/10 focus:bg-white/50 border border-transparent border-b-black/20 focus:border-b-[#C62828] outline-none transition-all w-full resize-none px-2 rounded-t-md";

  return (
    <section className="relative flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 lg:py-24 bg-[#F4F1E8] text-[#071B35] overflow-hidden border-b-4 border-[#071B35]">
      
      {/* Editor Controls Overlay */}
      <div className="absolute top-4 left-4 right-4 z-50 flex justify-between items-center bg-white/80 backdrop-blur px-6 py-3 rounded-full shadow-lg border border-[#071B35]/10">
        <span className="font-bold uppercase tracking-widest text-[#C62828] text-xs">Editing: About Section</span>
        <div className="flex items-center gap-4">
          {message.text && <span className={`text-xs font-bold ${message.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>{message.text}</span>}
          <button 
            onClick={handleSave} 
            disabled={saving}
            className="bg-[#071B35] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#123B72] transition disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Section'}
          </button>
        </div>
      </div>

      {/* Decorative Elements (Static) */}
      <div className="absolute top-4 left-4 z-0 pointer-events-none hidden sm:block">
        <div className="w-[160px] h-[160px] rounded-full border-[3px] border-[#071B35]/10 flex items-center justify-center">
          <div className="w-[65%] h-[65%] rounded-full border-[2px] border-[#C62828]/20" />
        </div>
      </div>

      {/* Main Content (Editable) */}
      <div className="relative z-10 flex flex-col items-center max-w-5xl w-full text-center mt-12">
        
        {/* Headings */}
        <div className="w-full flex flex-col items-center">
          <input
            value={aboutData.slogan}
            onChange={e => setAboutData({...aboutData, slogan: e.target.value})}
            className={`mb-4 text-[#C62828] font-bold uppercase tracking-[0.22em] text-xs sm:text-sm text-center ${inputClass}`}
          />
          <h2 className="font-black uppercase leading-[0.9] tracking-tight text-[#071B35] w-full" style={{ fontSize: 'clamp(2rem, 9vw, 80px)' }}>
            <input 
              value={aboutData.title} 
              onChange={e => setAboutData({...aboutData, title: e.target.value})}
              className={`text-center ${inputClass}`} 
            />
            <input 
              value={aboutData.candidateName} 
              onChange={e => setAboutData({...aboutData, candidateName: e.target.value})}
              className={`text-[#C62828] text-center mt-2 ${inputClass}`} 
            />
          </h2>
          <div className="flex justify-center items-center gap-2 mt-6 pointer-events-none">
            <div className="h-[5px] w-20 bg-[#071B35]" />
            <div className="h-[5px] w-6 bg-[#C62828]" />
          </div>
        </div>

        {/* Biography Paragraphs */}
        <div className="mt-12 flex flex-col items-center w-full">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 mb-7 border border-[#071B35]/10 bg-white/50 rounded-full pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-[#C62828]" />
            <span className="text-[#071B35] font-bold uppercase tracking-[0.12em] text-xs sm:text-sm">Candidate for Mayor of Caledon</span>
          </div>

          <div className="max-w-[850px] flex flex-col gap-6 w-full">
            {aboutData.biographyParagraphs.map((paragraph, index) => (
              <div key={index} className="relative group w-full">
                <textarea
                  value={paragraph}
                  onChange={e => handleParagraphChange(index, e.target.value)}
                  className={`
                    w-full text-center pr-10 ${inputClass}
                    ${index === 0 || index === aboutData.biographyParagraphs.length - 1 ? "text-[#071B35] font-semibold" : "text-[#344A6B] font-medium"}
                  `}
                  style={{ 
                    fontSize: index === 0 ? 'clamp(1.1rem, 2.2vw, 1.45rem)' : 'clamp(1rem, 1.8vw, 1.2rem)',
                    minHeight: '100px', fieldSizing: 'content'
                  }}
                  rows={3}
                  placeholder={`Paragraph ${index + 1}...`}
                />
                
                {/* Delete Paragraph Button */}
                <button 
                  onClick={() => handleRemoveParagraph(index)}
                  className="absolute right-2 top-2 bg-red-100 hover:bg-red-500 text-red-600 hover:text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm opacity-50 group-hover:opacity-100"
                  title="Remove Paragraph"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            ))}
            
            {/* Add Paragraph Button */}
            <button 
              onClick={handleAddParagraph}
              className="mt-2 border-2 border-dashed border-[#C62828]/40 text-[#C62828] font-bold uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-[#C62828]/5 transition-colors w-full"
            >
              + Add Another Biography Paragraph
            </button>
          </div>

          {/* Vision Block */}
          <div className="max-w-[900px] w-full mt-14 px-6 sm:px-10 py-10 border-l-4 border-[#C62828] bg-white/40 text-left">
            <input
              value={aboutData.visionTitle}
              onChange={e => setAboutData({...aboutData, visionTitle: e.target.value})}
              className={`mb-4 text-[#C62828] font-black uppercase tracking-[0.12em] text-sm sm:text-base ${inputClass}`}
            />
            <textarea
              value={aboutData.visionStatement}
              onChange={e => setAboutData({...aboutData, visionStatement: e.target.value})}
              className={`text-[#071B35] font-semibold italic w-full ${inputClass}`}
              style={{ fontSize: 'clamp(1.05rem, 2vw, 1.3rem)', minHeight: '120px' }}
              rows={4}
            />
          </div>
        </div>
      </div>
    </section>
  );
}