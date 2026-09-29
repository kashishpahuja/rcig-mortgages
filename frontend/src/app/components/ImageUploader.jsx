// src/app/admin/components/ImageUploader.jsx
'use client';

import { useState } from 'react';

export default function ImageUploader({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Upload failed.');
      onChange(json.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  return (
    <div>
      {label && <label className="block text-xs font-bold uppercase tracking-widest text-[#C7D2DF]/80 mb-2">{label}</label>}
      <div className="flex items-center gap-3">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="w-16 h-16 object-cover rounded-lg border border-[#F4F1E8]/20 shrink-0" />
        ) : (
          <div className="w-16 h-16 rounded-lg border border-dashed border-[#F4F1E8]/20 shrink-0" />
        )}
        <div className="flex-1 space-y-2 min-w-0">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/uploads/blog/photo.jpg or paste an image URL"
            className="w-full bg-[#0C0C0C] border border-[#F4F1E8]/20 rounded-lg px-3 py-2 text-[#F4F1E8] text-sm focus:outline-none focus:border-[#C62828]"
          />
          <label className="inline-block text-xs font-bold uppercase tracking-widest text-[#F4F1E8] bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg cursor-pointer">
            {uploading ? 'Uploading…' : 'Upload image'}
            <input type="file" accept="image/*" onChange={handleFile} className="hidden" disabled={uploading} />
          </label>
        </div>
      </div>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}
