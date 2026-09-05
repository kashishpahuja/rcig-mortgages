'use client';

import React, { useState, useEffect } from 'react';

// Default data in case the database is completely empty
const defaultPriorities = [
  {
    _id: 'default-1',
    number: '01',
    title: 'Growth Will Pay for Growth',
    description: 'New development must contribute fairly toward the roads, water, parks, fire services, and community facilities needed to support growth.',
    image: '/Images/01.webp',
  },
  {
    _id: 'default-2',
    number: '02',
    title: 'Infrastructure Before Congestion',
    description: 'Growth must be coordinated with roads, transit, schools, healthcare, and emergency services so infrastructure keeps pace with development.',
    image: '/Images/2.webp',
  },
  {
    _id: 'default-3',
    number: '03',
    title: 'Jobs Close to Home',
    description: 'Attract advanced manufacturing, technology, healthcare, tourism, professional services, and clean industry to create more local opportunities.',
    image: '/Images/02.webp',
  },
  {
    _id: 'default-4',
    number: '04',
    title: 'Housing for Every Stage of Life',
    description: 'Support starter homes, family housing, rentals, seniors’ housing, and appropriate additional residential units for a growing community.',
    image: '/Images/04.webp',
  },
  {
    _id: 'default-5',
    number: '05',
    title: 'Protect Rural Caledon',
    description: 'Protect farmland, water resources, the Greenbelt, heritage communities, and environmentally sensitive areas while managing responsible growth.',
    image: '/Images/03.webp',
  },
  {
    _id: 'default-6',
    number: '06',
    title: 'Transparent Municipal Government',
    description: 'Set measurable targets, report publicly on performance, and strengthen safeguards so residents know how decisions are made and how their tax dollars are used.',
    image: '/Images/5.webp',
  },
];

// Utility function to compress images to WebP < 100kb locally before upload
const compressImageToWebP = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Max width to keep resolution sharp but size low
        const MAX_WIDTH = 1200;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Recursive function to compress until < 100kb
        let quality = 0.9;
        const targetSize = 100 * 1024; // 100kb

        const tryCompress = (q) => {
          canvas.toBlob((blob) => {
            if (blob.size > targetSize && q > 0.1) {
              tryCompress(q - 0.1); // Reduce quality by 10% and try again
            } else {
              const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
              const newFile = new File([blob], newFileName, { type: 'image/webp' });
              const previewUrl = URL.createObjectURL(blob);
              resolve({ compressedFile: newFile, previewUrl });
            }
          }, 'image/webp', q);
        };
        tryCompress(quality);
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

export default function AdminServices() {
  const [priorities, setPriorities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Fetch Data from DB (and Auto-Seed if empty)
  useEffect(() => {
    const fetchOrSeedData = async () => {
      try {
        const res = await fetch('/api/priorities');
        const data = await res.json();

        if (data.data && data.data.length > 0) {
          setPriorities(data.data);
          setLoading(false);
        } else {
          // DATABASE IS EMPTY: Auto-seed defaults so we can upload images instantly
          const seedPromises = defaultPriorities.map(async (p) => {
            const payload = { ...p };
            delete payload._id; // Strip fake ID so Mongo makes a real one
            const postRes = await fetch('/api/priorities', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });
            return postRes.json();
          });

          const results = await Promise.all(seedPromises);
          const seededPriorities = results.map(r => r.data).filter(Boolean);
          
          setPriorities(seededPriorities.length > 0 ? seededPriorities : defaultPriorities);
          setLoading(false);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setPriorities(defaultPriorities);
        setLoading(false);
      }
    };

    fetchOrSeedData();
  }, []);

  const showMsg = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 4000);
  };

  // --- Handlers ---
  const handleTextChange = (id, field, value) => {
    setPriorities(prev => prev.map(p => p._id === id ? { ...p, [field]: value } : p));
    setHasUnsavedChanges(true);
  };

  const handleImageReplace = async (id, file) => {
    if (!file) return;
    
    if (!id || id.startsWith('default') || id.startsWith('temp-')) {
      return showMsg('Please click "Save Changes" first to add this to the database before uploading an image.', 'error');
    }

    setSaving(true);
    showMsg('Compressing image...', 'success');

    try {
      // 1. Compress Image to WebP locally
      const { compressedFile, previewUrl } = await compressImageToWebP(file);

      // 2. Instantly update the UI so the user sees the image right away
      setPriorities(prev => prev.map(p => p._id === id ? { ...p, image: previewUrl } : p));

      // 3. Upload to server
      const formData = new FormData();
      formData.append('image', compressedFile);
      formData.append('id', id);

      const res = await fetch('/api/priorities', { method: 'PUT', body: formData });
      const result = await res.json();
      
      if (result.success && result.data) {
        setPriorities(prev => prev.map(p => p._id === id ? { ...p, image: result.data.image } : p));
        showMsg('Image compressed to WebP and uploaded!');
      } else {
        showMsg(result.error || 'Failed to replace image.', 'error');
      }
    } catch (err) {
      console.error(err);
      showMsg('Upload error. Check console.', 'error');
    }
    setSaving(false);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const savePromises = priorities.map(async (p) => {
        const payload = { ...p };
        
        if (payload._id && (payload._id.startsWith('default') || payload._id.startsWith('temp-'))) {
          delete payload._id; 
        }

        const res = await fetch('/api/priorities', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        return res.json();
      });
      
      const results = await Promise.all(savePromises);
      
      const updatedPriorities = results.map(r => r.data).filter(Boolean);
      if (updatedPriorities.length > 0) {
        setPriorities(updatedPriorities);
      }
      
      showMsg('All priorities saved to the live site!');
      setHasUnsavedChanges(false);
    } catch (err) {
      showMsg('Failed to save changes.', 'error');
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this priority permanently?")) return;
    
    setPriorities(prev => prev.filter(p => p._id !== id));
    
    if (id.startsWith('default') || id.startsWith('temp-')) return; 
    
    setSaving(true);
    try {
      const res = await fetch(`/api/priorities?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showMsg('Priority deleted from database.');
      } else {
        showMsg('Failed to delete from DB.', 'error');
      }
    } catch (err) {
      showMsg('Delete failed.', 'error');
    }
    setSaving(false);
  };

  const handleAddNew = () => {
    const newPriority = {
      _id: `temp-${Date.now()}`,
      number: `0${priorities.length + 1}`,
      title: 'New Priority Title',
      description: 'Enter the description for this new priority here.',
      image: '/Images/01.webp'
    };
    setPriorities([...priorities, newPriority]);
    setHasUnsavedChanges(true);
  };

  if (loading) return <div className="py-20 text-center text-white bg-[#071B35]">Loading Priorities Editor...</div>;

  const inputStyle = "bg-white/5 hover:bg-white/10 focus:bg-[#0A264A] border border-dashed border-white/20 focus:border-[#D52B2B] outline-none transition-all w-full rounded px-2";

  return (
    <section className="bg-[#071B35] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10 text-[#F4F1E8] overflow-hidden px-4 md:px-12 lg:px-24 xl:px-72 border-b-4 border-[#0C0C0C]">
      
      {/* --- Admin Controls Overlay --- */}
      <div className="absolute top-4 left-4 right-4 z-50 flex justify-between items-center bg-white/90 backdrop-blur px-6 py-3 rounded-full shadow-lg border border-[#071B35]/20">
        <span className="font-bold uppercase tracking-widest text-[#D52B2B] text-xs">Editing: Priorities & Services</span>
        
        <div className="flex items-center gap-4">
          {message.text && <span className={`text-xs font-bold ${message.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>{message.text}</span>}
          
          <button 
            onClick={handleAddNew}
            className="text-[#071B35] font-bold uppercase tracking-widest text-xs hover:text-[#D52B2B] transition hidden sm:block"
          >
            + Add Priority
          </button>

          <button 
            onClick={handleSaveAll} 
            disabled={saving || !hasUnsavedChanges}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition shadow-lg disabled:opacity-50 ${
              hasUnsavedChanges ? 'bg-[#D52B2B] text-white animate-pulse' : 'bg-[#071B35] text-white'
            }`}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="mt-8">
        {/* Heading */}
        <div className="text-center mb-16 sm:mb-20 md:mb-24">
          <p className="text-[#D52B2B] font-bold uppercase tracking-[0.25em] mb-4" style={{ fontSize: 'clamp(0.7rem, 1vw, 1rem)' }}>
            Your Voice • Your Future
          </p>
          <h2 className="hero-heading font-black uppercase text-center text-[#F4F1E8] leading-[0.9]" style={{ fontSize: 'clamp(2rem, 11vw, 80px)' }}>
            Our Priorities
          </h2>
          <div className="flex justify-center items-center gap-2 mt-6">
            <div className="h-[5px] w-16 sm:w-20 bg-[#F4F1E8]" />
            <div className="h-[5px] w-5 sm:w-7 bg-[#D52B2B]" />
          </div>
        </div>

        {/* Priorities Mapping */}
        <div className="flex flex-col">
          {priorities.map((priority, i) => (
            <div
              key={priority._id}
              className="group relative flex flex-col md:flex-row items-start md:items-center justify-between py-8 sm:py-10 md:py-11 gap-6 md:gap-10"
              style={{ borderBottom: '1px solid rgba(244, 241, 232, 0.15)' }}
            >
              
              {/* Image & Replacement Uploader */}
              <div className="hidden md:block absolute right-[20px] top-1/2 -translate-y-1/2 opacity-30 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 z-30">
                <div className="relative w-[260px] lg:w-[320px] h-[180px] lg:h-[210px] overflow-hidden rounded-lg border-2 border-dashed border-[#D52B2B]/50 hover:border-[#D52B2B]">
                  <img src={priority.image} alt={priority.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-[#071B35]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* FIXED: &lt; instead of < to fix the JSX crash */}
                    <label className="bg-[#D52B2B] text-white px-4 py-2 rounded font-bold text-xs uppercase tracking-widest cursor-pointer shadow-lg text-center">
                      Replace Image<br/>
                      <span className="text-[10px] opacity-80">(&lt; 100kb WebP)</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageReplace(priority._id, e.target.files[0])} />
                    </label>
                  </div>
                </div>
              </div>

              {/* Number Input */}
              <div className="flex items-baseline gap-6 md:gap-10 w-full md:w-auto relative z-10 shrink-0">
                <input
                  value={priority.number}
                  onChange={(e) => handleTextChange(priority._id, 'number', e.target.value)}
                  className={`font-black text-[#f4f1e896] w-[120px] md:w-[150px] ${inputStyle}`}
                  style={{ fontSize: 'clamp(3rem, 10vw, 80px)' }}
                />
              </div>

              {/* Content Inputs */}
              <div className="flex flex-col gap-3 max-w-2xl relative z-10 md:pr-40 w-full">
                
                <div className="flex items-center gap-3 w-full">
                  <span className="hidden md:block w-2 h-2 rounded-full bg-[#D52B2B]" />
                  <input
                    value={priority.title}
                    onChange={(e) => handleTextChange(priority._id, 'title', e.target.value)}
                    className={`font-bold uppercase text-[#F4F1E8] ${inputStyle}`}
                    style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                  />
                </div>

                <textarea
                  value={priority.description}
                  onChange={(e) => handleTextChange(priority._id, 'description', e.target.value)}
                  className={`font-light leading-relaxed text-[#C7D2DF] resize-none ${inputStyle}`}
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.2rem)', minHeight: '80px', fieldSizing: 'content' }}
                />

                {/* Delete Priority Button */}
                <div className="mt-2 flex justify-start">
                  <button 
                    onClick={() => handleDelete(priority._id)}
                    className="text-red-400 hover:text-red-300 text-xs font-bold uppercase tracking-widest border border-red-400/30 px-3 py-1 rounded transition-colors"
                  >
                    Remove Priority
                  </button>
                </div>
              </div>

            </div>
          ))}
          
          <button 
            onClick={handleAddNew}
            className="mt-8 border-2 border-dashed border-[#D52B2B]/40 text-[#D52B2B] font-bold uppercase tracking-widest text-xs py-6 rounded-xl hover:bg-[#D52B2B]/10 transition-colors w-full sm:hidden"
          >
            + Add New Priority
          </button>
        </div>

      </div>

      {/* Bottom Campaign Stripe */}
      <div className="absolute bottom-0 left-0 right-0 h-[5px] bg-[#F4F1E8]">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-[#D52B2B]" />
        <div className="absolute right-0 top-0 h-full w-[8%] bg-[#123B72]" />
      </div>
    </section>
  );
}