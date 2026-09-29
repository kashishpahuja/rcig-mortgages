// src/app/admin/components/BlockEditor.jsx
'use client';

import ImageUploader from './ImageUploader';

const BLOCK_TYPES = ['heading', 'paragraph', 'image', 'list', 'quote'];

function emptyBlock(type) {
  switch (type) {
    case 'heading':
      return { type: 'heading', level: 2, text: '' };
    case 'image':
      return { type: 'image', image: '', alt: '', caption: '' };
    case 'list':
      return { type: 'list', items: [''] };
    case 'quote':
      return { type: 'quote', text: '' };
    default:
      return { type: 'paragraph', text: '' };
  }
}

const field =
  'w-full bg-[#0C0C0C] border border-[#F4F1E8]/20 rounded-lg px-3 py-2 text-[#F4F1E8] text-sm focus:outline-none focus:border-[#C62828]';

export default function BlockEditor({ blocks, onChange }) {
  const update = (i, patch) => {
    const next = blocks.slice();
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };
  const remove = (i) => onChange(blocks.filter((_, idx) => idx !== i));
  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= blocks.length) return;
    const next = blocks.slice();
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const add = (type) => onChange([...blocks, emptyBlock(type)]);

  return (
    <div className="space-y-4">
      {blocks.length === 0 && (
        <p className="text-[#C7D2DF]/60 text-sm">No content blocks yet — add one below.</p>
      )}

      {blocks.map((block, i) => (
        <div key={i} className="bg-[#0C0C0C] border border-[#F4F1E8]/10 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C7D2DF]/60">
              {i + 1}. {block.type}
            </span>
            <div className="flex gap-1">
              <button type="button" onClick={() => move(i, -1)} className="text-xs px-2 py-1 bg-white/10 hover:bg-white/20 rounded cursor-pointer">↑</button>
              <button type="button" onClick={() => move(i, 1)} className="text-xs px-2 py-1 bg-white/10 hover:bg-white/20 rounded cursor-pointer">↓</button>
              <button type="button" onClick={() => remove(i)} className="text-xs px-2 py-1 bg-[#C62828] hover:bg-red-700 rounded cursor-pointer">Remove</button>
            </div>
          </div>

          {block.type === 'heading' && (
            <div className="flex gap-3">
              <select
                value={block.level}
                onChange={(e) => update(i, { level: Number(e.target.value) })}
                className={`${field} w-24`}
              >
                <option value={2}>H2</option>
                <option value={3}>H3</option>
              </select>
              <input className={field} value={block.text} onChange={(e) => update(i, { text: e.target.value })} placeholder="Heading text" />
            </div>
          )}

          {block.type === 'paragraph' && (
            <textarea rows={3} className={field} value={block.text} onChange={(e) => update(i, { text: e.target.value })} placeholder="Paragraph text" />
          )}

          {block.type === 'quote' && (
            <textarea rows={2} className={field} value={block.text} onChange={(e) => update(i, { text: e.target.value })} placeholder="Quote text" />
          )}

          {block.type === 'list' && (
            <textarea
              rows={4}
              className={field}
              value={block.items.join('\n')}
              onChange={(e) => update(i, { items: e.target.value.split('\n') })}
              placeholder="One list item per line"
            />
          )}

          {block.type === 'image' && (
            <div className="space-y-2">
              <ImageUploader value={block.image} onChange={(url) => update(i, { image: url })} />
              <input className={field} value={block.alt} onChange={(e) => update(i, { alt: e.target.value })} placeholder="Alt text (accessibility & SEO)" />
              <input className={field} value={block.caption} onChange={(e) => update(i, { caption: e.target.value })} placeholder="Caption (optional)" />
            </div>
          )}
        </div>
      ))}

      <div className="flex flex-wrap gap-2">
        {BLOCK_TYPES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => add(t)}
            className="text-xs font-bold uppercase tracking-widest text-[#F4F1E8] bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg cursor-pointer"
          >
            + {t}
          </button>
        ))}
      </div>
    </div>
  );
}
