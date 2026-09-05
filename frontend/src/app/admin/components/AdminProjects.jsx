'use client';

import React, { useState, useEffect } from 'react';

// Default data in case the database is completely empty
const defaultProjects = [
  {
    _id: 'default-1',
    number: '01',
    category: 'Highway 413',
    name: 'Connectivity With Accountability',
    description: 'Ensure Highway 413 delivers better connectivity and economic opportunity while protecting Caledon’s roads, environment, communities, and taxpayers.',
    image: '/Images/11.webp',
  },
  {
    _id: 'default-2',
    number: '02',
    category: 'Jobs & Prosperity',
    name: 'Local Jobs. Stronger Economy.',
    description: 'Support sustainable employment and investment through projects like Choice Caledon Business Park while ensuring growth brings meaningful benefits to the community.',
    image: '/Images/15.webp',
  },
  {
    _id: 'default-3',
    number: '03',
    category: 'Future Communities',
    name: 'Complete Communities, Not Congestion',
    description: "Plan Caledon's growing communities with the housing, roads, parks, services, and infrastructure needed to create connected neighbourhoods—not isolated subdivisions.",
    image: '/Images/14.webp'
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

        let quality = 0.9;
        const targetSize = 100 * 1024; // 100kb

        const tryCompress = (q) => {
          canvas.toBlob((blob) => {
            if (blob.size > targetSize && q > 0.1) {
              tryCompress(q - 0.1); 
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

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Fetch Data from DB (and Auto-Seed if empty)
  useEffect(() => {
    const fetchOrSeedData = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();

        if (data.data && data.data.length > 0) {
          setProjects(data.data);
          setLoading(false);
        } else {
          // DATABASE IS EMPTY: Auto-seed defaults automatically
          const seedPromises = defaultProjects.map(async (p) => {
            const payload = { ...p };
            delete payload._id; // Strip fake ID so Mongo makes a real one
            const postRes = await fetch('/api/projects', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });
            return postRes.json();
          });

          const results = await Promise.all(seedPromises);
          const seededProjects = results.map(r => r.data).filter(Boolean);
          
          setProjects(seededProjects.length > 0 ? seededProjects : defaultProjects);
          setLoading(false);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setProjects(defaultProjects);
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
    setProjects(prev => prev.map(p => p._id === id ? { ...p, [field]: value } : p));
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
      const { compressedFile, previewUrl } = await compressImageToWebP(file);
      setProjects(prev => prev.map(p => p._id === id ? { ...p, image: previewUrl } : p));

      const formData = new FormData();
      formData.append('image', compressedFile);
      formData.append('id', id);

      const res = await fetch('/api/projects', { method: 'PUT', body: formData });
      const result = await res.json();
      
      if (result.success && result.data) {
        setProjects(prev => prev.map(p => p._id === id ? { ...p, image: result.data.image } : p));
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
      const savePromises = projects.map(async (p) => {
        const payload = { ...p };
        
        if (payload._id && (payload._id.startsWith('default') || payload._id.startsWith('temp-'))) {
          delete payload._id; 
        }

        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        return res.json();
      });
      
      const results = await Promise.all(savePromises);
      
      const updatedProjects = results.map(r => r.data).filter(Boolean);
      if (updatedProjects.length > 0) {
        setProjects(updatedProjects);
      }
      
      showMsg('All projects saved to the live site!');
      setHasUnsavedChanges(false);
    } catch (err) {
      showMsg('Failed to save changes.', 'error');
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this project permanently?")) return;
    
    setProjects(prev => prev.filter(p => p._id !== id));
    
    if (id.startsWith('default') || id.startsWith('temp-')) return; 
    
    setSaving(true);
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showMsg('Project deleted from database.');
      } else {
        showMsg('Failed to delete from DB.', 'error');
      }
    } catch (err) {
      showMsg('Delete failed.', 'error');
    }
    setSaving(false);
  };

  const handleAddNew = () => {
    const newProject = {
      _id: `temp-${Date.now()}`,
      number: `0${projects.length + 1}`,
      category: 'New Category',
      name: 'New Project Title',
      description: 'Enter the description for this new project here.',
      image: '/Images/11.webp'
    };
    setProjects([...projects, newProject]);
    setHasUnsavedChanges(true);
  };

  if (loading) return <div className="py-20 text-center text-white bg-[#071B35]">Loading Projects Editor...</div>;

  const inputStyle = "bg-black/5 hover:bg-black/10 focus:bg-white border border-dashed border-[#071B35]/20 focus:border-[#C62828] outline-none transition-all w-full rounded px-2 py-1";

  return (
    <section className="bg-[#071B35] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] pt-32 pb-20 relative z-10 px-5 sm:px-8 md:px-10 text-[#F4F1E8]">
      
      {/* --- Admin Controls Overlay --- */}
      <div className="absolute top-4 left-4 right-4 z-50 flex justify-between items-center bg-white/90 backdrop-blur px-6 py-3 rounded-full shadow-lg border border-[#071B35]/20">
        <span className="font-bold uppercase tracking-widest text-[#D52B2B] text-xs">Editing: Projects & Policies</span>
        
        <div className="flex items-center gap-4">
          {message.text && <span className={`text-xs font-bold ${message.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>{message.text}</span>}
          
          <button 
            onClick={handleAddNew}
            className="text-[#071B35] font-bold uppercase tracking-widest text-xs hover:text-[#D52B2B] transition hidden sm:block"
          >
            + Add Project
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

      <div className="max-w-6xl mx-auto mt-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16 sm:mb-20 md:mb-24">
          <p className="text-[#C62828] font-bold uppercase tracking-[0.25em] mb-4" style={{ fontSize: 'clamp(0.7rem, 1vw, 1rem)' }}>
            A Policy for Caledon
          </p>
          <h2 className="hero-heading font-black uppercase text-[#F4F1E8] leading-[0.9]" style={{ fontSize: 'clamp(2rem, 10vw, 80px)' }}>
            Affordability
          </h2>
          <div className="flex justify-center items-center gap-2 mt-5">
            <div className="h-[5px] w-16 sm:w-20 bg-[#F4F1E8]" />
            <div className="h-[5px] w-5 sm:w-7 bg-[#C62828]" />
          </div>
          <p className="max-w-2xl mx-auto mt-6 text-center text-[#C7D2DF] font-light leading-relaxed" style={{ fontSize: 'clamp(1rem, 1.7vw, 1.2rem)' }}>
            Practical policies that support families, protect taxpayers, encourage investment and create a prosperous future for Caledon.
          </p>
        </div>

        {/* Dynamic Project Cards */}
        <div className="flex flex-col gap-10">
          {projects.map((project, i) => (
            <div
              key={project._id}
              className="w-full rounded-[32px] sm:rounded-[45px] md:rounded-[55px] border-2 border-[#F4F1E8]/20 bg-[#F4F1E8] p-5 sm:p-7 md:p-9 flex flex-col justify-between shadow-2xl text-[#071B35]"
            >
              
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-5">
                <div className="flex items-start gap-5 sm:gap-7 w-full">
                  
                  {/* Number Input */}
                  {/* <input
                    value={project.number}
                    onChange={(e) => handleTextChange(project._id, 'number', e.target.value)}
                    className={`font-black leading-none text-[#071B35]/15 w-[80px] sm:w-[120px] ${inputStyle}`}
                    style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
                  /> */}

                  {/* Category & Title */}
                  <div className="pt-1 sm:pt-2 flex-1">
                    <input
                      value={project.category}
                      onChange={(e) => handleTextChange(project._id, 'category', e.target.value)}
                      className={`text-[#C62828] text-xs uppercase tracking-[0.18em] font-bold ${inputStyle}`}
                    />
                    <textarea
                      value={project.name}
                      onChange={(e) => handleTextChange(project._id, 'name', e.target.value)}
                      className={`mt-1 font-black uppercase leading-tight text-[#071B35] resize-none overflow-hidden ${inputStyle}`}
                      style={{ fontSize: 'clamp(1.3rem, 3vw, 2.5rem)', fieldSizing: 'content' }}
                      rows={1}
                    />
                  </div>
                </div>
              </div>

              {/* Image + Description */}
              <div className="grid grid-cols-1 md:grid-cols-10 gap-6 md:gap-8 items-end flex-1 mt-6">
                
                {/* Image Uploader */}
                <div className="md:col-span-6 h-[38vh] md:h-[48vh] relative group rounded-[25px] sm:rounded-[35px] overflow-hidden border-2 border-dashed border-[#C62828]/20 hover:border-[#C62828]">
                  <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                  
                  <div className="absolute inset-0 bg-[#071B35]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <label className="bg-[#C62828] text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-widest cursor-pointer shadow-lg text-center">
                      Replace Image<br/>
                      <span className="text-[10px] opacity-80">(&lt; 100kb WebP)</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageReplace(project._id, e.target.files[0])} />
                    </label>
                  </div>
                </div>

                {/* Description */}
                <div className="md:col-span-4 flex flex-col justify-end pb-2 md:pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-[3px] bg-[#C62828]" />
                    <span className="text-[#071B35] text-xs uppercase tracking-[0.15em] font-bold">
                      Policy Priority
                    </span>
                  </div>

                  <textarea
                    value={project.description}
                    onChange={(e) => handleTextChange(project._id, 'description', e.target.value)}
                    className={`text-[#344A6B] font-medium leading-relaxed resize-none ${inputStyle}`}
                    style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)', minHeight: '120px', fieldSizing: 'content' }}
                  />

                  <div className="mt-4 flex justify-start">
                    <button 
                      onClick={() => handleDelete(project._id)}
                      className="text-red-600 hover:text-white bg-red-100 hover:bg-red-500 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg transition-colors"
                    >
                      Delete Project
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Accent */}
              <div className="flex items-center justify-between mt-5 py-4 border-t border-[#071B35]/10 pointer-events-none">
                <span className="text-[#071B35] font-bold uppercase tracking-[0.12em] text-[10px] sm:text-xs">Building a Better Caledon</span>
                <span className="w-3 h-3 rounded-full bg-[#C62828]" />
              </div>

            </div>
          ))}

          <button 
            onClick={handleAddNew}
            className="mt-4 border-2 border-dashed border-[#F4F1E8]/20 text-[#F4F1E8] font-bold uppercase tracking-widest text-sm py-8 rounded-[32px] hover:bg-[#F4F1E8]/5 transition-colors w-full"
          >
            + Add New Project / Policy
          </button>
        </div>
      </div>
    </section>
  );
}