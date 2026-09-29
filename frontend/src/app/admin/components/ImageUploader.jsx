// src/app/admin/components/ImageUploader.jsx
'use client';

import { useRef, useState } from 'react';

export default function ImageUploader({
  label,
  value,
  onChange,
  required = false,
}) {
  const inputRef = useRef(null);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleFile(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    setError('');

    // Basic frontend validation
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      e.target.value = '';
      return;
    }

    // 5MB limit
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be smaller than 5MB.');
      e.target.value = '';
      return;
    }

    setUploading(true);

    try {
      const fd = new FormData();
      fd.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: fd,
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'Image upload failed.');
      }

      if (!json.url) {
        throw new Error('Upload succeeded but no image URL was returned.');
      }

      onChange(json.url);
    } catch (err) {
      console.error('Image upload error:', err);
      setError(err.message || 'Image upload failed.');
    } finally {
      setUploading(false);

      // Allow selecting the same file again
      e.target.value = '';
    }
  }

  function removeImage() {
    onChange('');
    setError('');
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-bold uppercase tracking-widest text-slate-600 mb-2">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}

      <div className=" rounded-xl bg-white/10 p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          {/* Preview */}
          <div className="w-28 h-20 sm:w-32 sm:h-24  border border-slate-400 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
            {value ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={value}
                alt=""
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <span className="text-xs text-slate-400 text-center px-2">
                No image
              </span>
            )}
          </div>

          {/* Controls */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition cursor-pointer"
              >
                {uploading ? 'Uploading...' : value ? 'Change Image' : 'Upload Image'}
              </button>

              {value && (
                <button
                  type="button"
                  onClick={removeImage}
                  disabled={uploading}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition cursor-pointer"
                >
                  Remove
                </button>
              )}
            </div>

            <p className="text-xs text-slate-400 mt-2">
              JPG, JPEG, PNG, WEBP or GIF · Maximum 5MB
            </p>

            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
              onChange={handleFile}
              className="hidden"
              disabled={uploading}
            />
          </div>
        </div>

        {error && (
          <p className="text-red-600 text-xs mt-3">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}