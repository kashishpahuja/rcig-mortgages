'use client';

import React, { useEffect, useState } from 'react';

function useDraggable() {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragX, setDragX] = useState(0);

  const handlers = {
    onMouseDown: (e) => {
      setIsDragging(true);
      setStartX(e.pageX - dragX);
    },
    onMouseUp: () => setIsDragging(false),
    onMouseLeave: () => setIsDragging(false),
    onMouseMove: (e) => {
      if (!isDragging) return;
      e.preventDefault();
      setDragX(e.pageX - startX);
    },
    onTouchStart: (e) => {
      setIsDragging(true);
      setStartX(e.touches[0].pageX - dragX);
    },
    onTouchEnd: () => setIsDragging(false),
    onTouchMove: (e) => {
      if (!isDragging) return;
      setDragX(e.touches[0].pageX - startX);
    }
  };

  return { handlers, dragX, isDragging };
}

// Client-side utility to compress images into WebP under 100KB using an HTML canvas
const compressImageToWebp = (file, maxSizeKb = 100, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Scale down dimensions if the image is exceptionally massive
        const maxDimension = 1600;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        let currentQuality = quality;
        const attemptCompression = () => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Canvas blob generation failed'));
                return;
              }
              // If size is still above 100KB and quality can be reduced, try again
              if (blob.size > maxSizeKb * 1024 && currentQuality > 0.1) {
                currentQuality -= 0.15;
                attemptCompression();
              } else {
                const compressedFile = new File(
                  [blob],
                  file.name.replace(/\.[^/.]+$/, '') + '.webp',
                  { type: 'image/webp', lastModified: Date.now() }
                );
                resolve(compressedFile);
              }
            },
            'image/webp',
            currentQuality
          );
        };
        attemptCompression();
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

export default function AdminMarquee() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [offset, setOffset] = useState(0);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const row1Drag = useDraggable();
  const row2Drag = useDraggable();

  useEffect(() => {
    fetch('/api/marquee')
      .then(res => res.ok ? res.json() : {})
      .then(data => {
        if (data.data) {
          setImages(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('admin-marquee-section');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const currentOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(currentOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showMsg = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 4000);
  };

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setSaving(true);
    const uploadPromises = Array.from(files).map(async (file, index) => {
      try {
        const compressedFile = await compressImageToWebp(file, 100, 0.85);
        const formData = new FormData();
        formData.append('image', compressedFile);
        formData.append('order', images.length + index);

        const res = await fetch('/api/marquee', { method: 'POST', body: formData });
        const result = await res.json();
        return result.success ? result.data : null;
      } catch (err) {
        console.error("Compression or upload error:", err);
        return null;
      }
    });

    const results = await Promise.all(uploadPromises);
    const successfulUploads = results.filter(img => img !== null);

    if (successfulUploads.length > 0) {
      setImages(prev => [...prev, ...successfulUploads]);
      showMsg(`Successfully compressed & uploaded ${successfulUploads.length} images!`);
    } else {
      showMsg('Upload failed.', 'error');
    }
    setSaving(false);
    e.target.value = null;
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this image permanently from the database and server?')) return;
    
    setSaving(true);
    try {
      const res = await fetch(`/api/marquee?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setImages(images.filter(img => img._id !== id));
        showMsg('Image deleted successfully.');
      } else {
        showMsg('Failed to delete.', 'error');
      }
    } catch (err) {
      showMsg('Network error.', 'error');
    }
    setSaving(false);
  };

  const shiftOrder = (index, direction) => {
    if (direction === 'left' && index === 0) return;
    if (direction === 'right' && index === images.length - 1) return;

    const newImages = [...images];
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    
    [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
    
    setImages(newImages);
    setHasUnsavedChanges(true);
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    const orderedIds = images.map(img => img._id);
    
    try {
      const res = await fetch('/api/marquee', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderedIds })
      });
      
      if (res.ok) {
        showMsg('New image order saved to the live site!');
        setHasUnsavedChanges(false);
      } else {
        showMsg('Failed to save order.', 'error');
      }
    } catch (error) {
      showMsg('Network error while saving.', 'error');
    }
    setSaving(false);
  };

  if (loading) return <div className="py-20 text-center text-white bg-[#092b666c]">Loading Marquee Editor...</div>;

  const half = Math.ceil(images.length / 2);
  const row1Gifs = images.slice(0, half);
  const row2Gifs = images.slice(half);

  const row1Loop = [...row1Gifs, ...row1Gifs, ...row1Gifs];
  const row2Loop = [...row2Gifs, ...row2Gifs, ...row2Gifs];

  return (
    <section id="admin-marquee-section" className="relative pt-24 sm:pt-32 md:pt-40 bg-[#092b666c] pb-10 overflow-x-clip border-b-4 border-[#071B35]">
      
      <div className="absolute top-4 left-4 right-4 z-50 flex justify-between items-center bg-white/90 backdrop-blur px-6 py-3 rounded-full shadow-lg border border-[#D4AF37]/50">
        <span className="font-bold uppercase tracking-widest text-[#D4AF37] text-xs">
          Editing: Marquee (Database Mode - {images.length} items)
        </span>
        
        <div className="flex items-center gap-4">
          {message.text && <span className={`text-xs font-bold ${message.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>{message.text}</span>}
          
          {hasUnsavedChanges && (
            <button 
              onClick={handleSaveChanges} 
              disabled={saving}
              className="bg-[#C62828] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-800 transition animate-pulse shadow-lg disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          )}

          <label className="bg-[#071B35] text-[#D4AF37] border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#071B35] px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest cursor-pointer transition disabled:opacity-50">
            {saving ? 'Processing...' : '+ Upload Images'}
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} disabled={saving} />
          </label>
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#D4AF37]" />

      <div className="relative flex flex-col gap-3">

        {row1Gifs.length > 0 && (
          <div
            {...row1Drag.handlers}
            className={`flex gap-3 will-change-transform whitespace-nowrap select-none touch-pan-y ${row1Drag.isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{ transform: `translateX(calc(${offset - 200}px + ${row1Drag.dragX}px))` }}
          >
            {row1Loop.map((img, i) => {
              const actualIndex = i % row1Gifs.length;
              
              return (
                <div key={`row1-${i}`} className="relative w-[420px] h-[270px] shrink-0 rounded-2xl overflow-hidden border border-[#D4AF37]/20 bg-[#050608] shadow-[0_12px_35px_rgba(0,0,0,0.30)] group">
                  <img src={img.imageUrl} alt="Marquee visual" draggable={false} className="w-full h-full rounded-2xl object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  
                  <div className="absolute inset-0 bg-[#092B66]/60 transition-opacity duration-300 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
                    <button 
                      onPointerDown={(e) => { e.stopPropagation(); shiftOrder(actualIndex, 'left'); }} 
                      className="w-10 h-10 bg-white/20 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition font-bold"
                    >←</button>
                    <button 
                      onPointerDown={(e) => { e.stopPropagation(); handleDelete(img._id); }} 
                      className="w-12 h-12 bg-red-600 hover:bg-red-500 text-white rounded-full flex items-center justify-center font-bold transition shadow-lg"
                    >X</button>
                    <button 
                      onPointerDown={(e) => { e.stopPropagation(); shiftOrder(actualIndex, 'right'); }} 
                      className="w-10 h-10 bg-white/20 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition font-bold"
                    >→</button>
                  </div>

                  <div className="absolute top-0 left-0 w-12 h-[3px] bg-[#D4AF37] pointer-events-none" />
                </div>
              );
            })}
          </div>
        )}

        {row2Gifs.length > 0 && (
          <div
            {...row2Drag.handlers}
            className={`flex gap-3 will-change-transform whitespace-nowrap select-none touch-pan-y ${row2Drag.isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{ transform: `translateX(calc(-${offset - 200}px + ${row2Drag.dragX}px))` }}
          >
            {row2Loop.map((img, i) => {
              const actualIndex = half + (i % row2Gifs.length);
              
              return (
                <div key={`row2-${i}`} className="relative w-[420px] h-[270px] shrink-0 rounded-2xl overflow-hidden border border-[#D4AF37]/20 bg-[#071F4B] shadow-[0_12px_35px_rgba(0,0,0,0.30)] group">
                  <img src={img.imageUrl} alt="Marquee visual" draggable={false} className="w-full h-full rounded-2xl object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  
                  <div className="absolute inset-0 bg-[#092B66]/60 transition-opacity duration-300 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
                    <button 
                      onPointerDown={(e) => { e.stopPropagation(); shiftOrder(actualIndex, 'left'); }} 
                      className="w-10 h-10 bg-white/20 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition font-bold"
                    >←</button>
                    <button 
                      onPointerDown={(e) => { e.stopPropagation(); handleDelete(img._id); }} 
                      className="w-12 h-12 bg-red-600 hover:bg-red-500 text-white rounded-full flex items-center justify-center font-bold transition shadow-lg"
                    >X</button>
                    <button 
                      onPointerDown={(e) => { e.stopPropagation(); shiftOrder(actualIndex, 'right'); }} 
                      className="w-10 h-10 bg-white/20 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition font-bold"
                    >→</button>
                  </div>

                  <div className="absolute top-0 right-0 w-12 h-[3px] bg-[#D4AF37] pointer-events-none" />
                </div>
              );
            })}
          </div>
        )}

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]/60" />

    </section>
  );
}

// 'use client';

// import React, { useEffect, useState } from 'react';

// function useDraggable() {
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [dragX, setDragX] = useState(0);

//   const handlers = {
//     onMouseDown: (e) => {
//       setIsDragging(true);
//       setStartX(e.pageX - dragX);
//     },
//     onMouseUp: () => setIsDragging(false),
//     onMouseLeave: () => setIsDragging(false),
//     onMouseMove: (e) => {
//       if (!isDragging) return;
//       e.preventDefault();
//       setDragX(e.pageX - startX);
//     },
//     onTouchStart: (e) => {
//       setIsDragging(true);
//       setStartX(e.touches[0].pageX - dragX);
//     },
//     onTouchEnd: () => setIsDragging(false),
//     onTouchMove: (e) => {
//       if (!isDragging) return;
//       setDragX(e.touches[0].pageX - startX);
//     }
//   };

//   return { handlers, dragX, isDragging };
// }

// // Client-side utility to compress images into WebP under 100KB using an HTML canvas
// const compressImageToWebp = (file, maxSizeKb = 100, quality = 0.8) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = (event) => {
//       const img = new Image();
//       img.src = event.target.result;
//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         let width = img.width;
//         let height = img.height;

//         // Scale down dimensions if the image is exceptionally massive
//         const maxDimension = 1600;
//         if (width > maxDimension || height > maxDimension) {
//           if (width > height) {
//             height = Math.round((height * maxDimension) / width);
//             width = maxDimension;
//           } else {
//             width = Math.round((width * maxDimension) / height);
//             height = maxDimension;
//           }
//         }

//         canvas.width = width;
//         canvas.height = height;
//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(img, 0, 0, width, height);

//         let currentQuality = quality;
//         const attemptCompression = () => {
//           canvas.toBlob(
//             (blob) => {
//               if (!blob) {
//                 reject(new Error('Canvas blob generation failed'));
//                 return;
//               }
//               // If size is still above 100KB and quality can be reduced, try again
//               if (blob.size > maxSizeKb * 1024 && currentQuality > 0.1) {
//                 currentQuality -= 0.15;
//                 attemptCompression();
//               } else {
//                 const compressedFile = new File(
//                   [blob],
//                   file.name.replace(/\.[^/.]+$/, '') + '.webp',
//                   { type: 'image/webp', lastModified: Date.now() }
//                 );
//                 resolve(compressedFile);
//               }
//             },
//             'image/webp',
//             currentQuality
//           );
//         };
//         attemptCompression();
//       };
//       img.onerror = (error) => reject(error);
//     };
//     reader.onerror = (error) => reject(error);
//   });
// };

// export default function AdminMarquee() {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [message, setMessage] = useState({ text: '', type: '' });
//   const [offset, setOffset] = useState(0);
//   const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

//   const row1Drag = useDraggable();
//   const row2Drag = useDraggable();

//   useEffect(() => {
//     fetch('/api/marquee')
//       .then(res => res.ok ? res.json() : {})
//       .then(data => {
//         if (data.data) {
//           setImages(data.data);
//         }
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Fetch error:", err);
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       const section = document.getElementById('admin-marquee-section');
//       if (!section) return;
//       const rect = section.getBoundingClientRect();
//       const sectionTop = window.scrollY + rect.top;
//       const currentOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
//       setOffset(currentOffset);
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     handleScroll();
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const showMsg = (text, type = 'success') => {
//     setMessage({ text, type });
//     setTimeout(() => setMessage({ text: '', type: '' }), 4000);
//   };

//   const handleUpload = async (e) => {
//     const files = e.target.files;
//     if (!files || files.length === 0) return;

//     setSaving(true);
//     const uploadPromises = Array.from(files).map(async (file, index) => {
//       try {
//         const compressedFile = await compressImageToWebp(file, 100, 0.85);
//         const formData = new FormData();
//         formData.append('image', compressedFile);
//         formData.append('order', images.length + index);

//         const res = await fetch('/api/marquee', { method: 'POST', body: formData });
//         const result = await res.json();
//         return result.success ? result.data : null;
//       } catch (err) {
//         console.error("Compression or upload error:", err);
//         return null;
//       }
//     });

//     const results = await Promise.all(uploadPromises);
//     const successfulUploads = results.filter(img => img !== null);

//     if (successfulUploads.length > 0) {
//       setImages(prev => [...prev, ...successfulUploads]);
//       showMsg(`Successfully compressed & uploaded ${successfulUploads.length} images!`);
//     } else {
//       showMsg('Upload failed.', 'error');
//     }
//     setSaving(false);
//     e.target.value = null;
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('Delete this image permanently from the database and server?')) return;
    
//     setSaving(true);
//     try {
//       const res = await fetch(`/api/marquee?id=${id}`, { method: 'DELETE' });
//       if (res.ok) {
//         setImages(images.filter(img => img._id !== id));
//         showMsg('Image deleted successfully.');
//       } else {
//         showMsg('Failed to delete.', 'error');
//       }
//     } catch (err) {
//       showMsg('Network error.', 'error');
//     }
//     setSaving(false);
//   };

//   const shiftOrder = (index, direction) => {
//     if (direction === 'left' && index === 0) return;
//     if (direction === 'right' && index === images.length - 1) return;

//     const newImages = [...images];
//     const targetIndex = direction === 'left' ? index - 1 : index + 1;
    
//     [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
    
//     setImages(newImages);
//     setHasUnsavedChanges(true);
//   };

//   const handleSaveChanges = async () => {
//     setSaving(true);
//     const orderedIds = images.map(img => img._id);
    
//     try {
//       const res = await fetch('/api/marquee', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ orderedIds })
//       });
      
//       if (res.ok) {
//         showMsg('New image order saved to the live site!');
//         setHasUnsavedChanges(false);
//       } else {
//         showMsg('Failed to save order.', 'error');
//       }
//     } catch (error) {
//       showMsg('Network error while saving.', 'error');
//     }
//     setSaving(false);
//   };

//   if (loading) return <div className="py-20 text-center text-white bg-[#092b666c]">Loading Marquee Editor...</div>;

//   const half = Math.ceil(images.length / 2);
//   const row1Gifs = images.slice(0, half);
//   const row2Gifs = images.slice(half);

//   const row1Loop = [...row1Gifs, ...row1Gifs, ...row1Gifs];
//   const row2Loop = [...row2Gifs, ...row2Gifs, ...row2Gifs];

//   return (
//     <section id="admin-marquee-section" className="relative pt-24 sm:pt-32 md:pt-40 bg-[#092b666c] pb-10 overflow-x-clip border-b-4 border-[#071B35]">
      
//       <div className="absolute top-4 left-4 right-4 z-50 flex justify-between items-center bg-white/90 backdrop-blur px-6 py-3 rounded-full shadow-lg border border-[#D4AF37]/50">
//         <span className="font-bold uppercase tracking-widest text-[#D4AF37] text-xs">
//           Editing: Marquee (Database Mode - {images.length} items)
//         </span>
        
//         <div className="flex items-center gap-4">
//           {message.text && <span className={`text-xs font-bold ${message.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>{message.text}</span>}
          
//           {hasUnsavedChanges && (
//             <button 
//               onClick={handleSaveChanges} 
//               disabled={saving}
//               className="bg-[#C62828] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-800 transition animate-pulse shadow-lg disabled:opacity-50"
//             >
//               {saving ? 'Saving...' : 'Save Changes'}
//             </button>
//           )}

//           <label className="bg-[#071B35] text-[#D4AF37] border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#071B35] px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest cursor-pointer transition disabled:opacity-50">
//             {saving ? 'Processing...' : '+ Upload Images'}
//             <input type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} disabled={saving} />
//           </label>
//         </div>
//       </div>

//       <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#D4AF37]" />

//       <div className="relative flex flex-col gap-3">

//         {row1Gifs.length > 0 && (
//           <div
           
//             className={`flex gap-3 will-change-transform whitespace-nowrap select-none touch-pan-y ${row1Drag.isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
//             style={{ transform: `translateX(calc(${offset - 200}px + ${row1Drag.dragX}px))` }}
//           >
//             {row1Loop.map((img, i) => {
//               const actualIndex = i % row1Gifs.length;
              
//               return (
//                 <div key={`row1-${i}`} className="relative w-[420px] h-[270px] shrink-0 rounded-2xl overflow-hidden border border-[#D4AF37]/20 bg-[#050608] shadow-[0_12px_35px_rgba(0,0,0,0.30)] group">
//                   <img src={img.imageUrl} alt="Marquee visual" draggable={false} className="w-full h-full rounded-2xl object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  
//                   <div className="absolute inset-0 bg-[#092B66]/60 transition-opacity duration-300 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
//                     <button 
//                       onPointerDown={(e) => { e.stopPropagation(); shiftOrder(actualIndex, 'left'); }} 
//                       className="w-10 h-10 bg-white/20 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition font-bold"
//                     >←</button>
//                     <button 
//                       onPointerDown={(e) => { e.stopPropagation(); handleDelete(img._id); }} 
//                       className="w-12 h-12 bg-red-600 hover:bg-red-500 text-white rounded-full flex items-center justify-center font-bold transition shadow-lg"
//                     >X</button>
//                     <button 
//                       onPointerDown={(e) => { e.stopPropagation(); shiftOrder(actualIndex, 'right'); }} 
//                       className="w-10 h-10 bg-white/20 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition font-bold"
//                     >→</button>
//                   </div>

//                   <div className="absolute top-0 left-0 w-12 h-[3px] bg-[#D4AF37] pointer-events-none" />
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {row2Gifs.length > 0 && (
//           <div
         
//             className={`flex gap-3 will-change-transform whitespace-nowrap select-none touch-pan-y ${row2Drag.isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
//             style={{ transform: `translateX(calc(-${offset - 200}px + ${row2Drag.dragX}px))` }}
//           >
//             {row2Loop.map((img, i) => {
//               const actualIndex = half + (i % row2Gifs.length);
              
//               return (
//                 <div key={`row2-${i}`} className="relative w-[420px] h-[270px] shrink-0 rounded-2xl overflow-hidden border border-[#D4AF37]/20 bg-[#071F4B] shadow-[0_12px_35px_rgba(0,0,0,0.30)] group">
//                   <img src={img.imageUrl} alt="Marquee visual" draggable={false} className="w-full h-full rounded-2xl object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  
//                   <div className="absolute inset-0 bg-[#092B66]/60 transition-opacity duration-300 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
//                     <button 
//                       onPointerDown={(e) => { e.stopPropagation(); shiftOrder(actualIndex, 'left'); }} 
//                       className="w-10 h-10 bg-white/20 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition font-bold"
//                     >←</button>
//                     <button 
//                       onPointerDown={(e) => { e.stopPropagation(); handleDelete(img._id); }} 
//                       className="w-12 h-12 bg-red-600 hover:bg-red-500 text-white rounded-full flex items-center justify-center font-bold transition shadow-lg"
//                     >X</button>
//                     <button 
//                       onPointerDown={(e) => { e.stopPropagation(); shiftOrder(actualIndex, 'right'); }} 
//                       className="w-10 h-10 bg-white/20 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition font-bold"
//                     >→</button>
//                   </div>

//                   <div className="absolute top-0 right-0 w-12 h-[3px] bg-[#D4AF37] pointer-events-none" />
//                 </div>
//               );
//             })}
//           </div>
//         )}

//       </div>

//       <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]/60" />

//     </section>
//   );
// }

