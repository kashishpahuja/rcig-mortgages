// src/app/admin/components/BlockEditor.jsx
'use client';

import ImageUploader from './ImageUploader';

const BLOCK_TYPES = [
  'heading',
  'paragraph',
  'image',
  'list',
  'quote',
];

function emptyBlock(type) {
  switch (type) {
    case 'heading':
      return {
        type: 'heading',
        level: 2,
        text: '',
      };

    case 'image':
      return {
        type: 'image',
        image: '',
        alt: '',
        caption: '',
      };

    case 'list':
      return {
        type: 'list',
        items: [''],
      };

    case 'quote':
      return {
        type: 'quote',
        text: '',
      };

    default:
      return {
        type: 'paragraph',
        text: '',
      };
  }
}

const field =
  'w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition';

const label =
  'block text-xs font-bold uppercase tracking-widest text-slate-600 mb-2';

export default function BlockEditor({
  blocks = [],
  onChange,
}) {
  const update = (index, patch) => {
    const next = blocks.slice();

    next[index] = {
      ...next[index],
      ...patch,
    };

    onChange(next);
  };

  const remove = (index) => {
    onChange(
      blocks.filter((_, idx) => idx !== index)
    );
  };

  const move = (index, direction) => {
    const target = index + direction;

    if (
      target < 0 ||
      target >= blocks.length
    ) {
      return;
    }

    const next = blocks.slice();

    [next[index], next[target]] = [
      next[target],
      next[index],
    ];

    onChange(next);
  };

  const add = (type) => {
    onChange([
      ...blocks,
      emptyBlock(type),
    ]);
  };

  return (
    <div className="space-y-4">
      {blocks.length === 0 && (
        <div className="border border-dashed border-slate-300 rounded-xl p-6 text-center">
          <p className="text-slate-400 text-sm">
            No content blocks yet.
          </p>

          <p className="text-slate-400 text-xs mt-1">
            Add a heading, paragraph, image, list or quote below.
          </p>
        </div>
      )}

      {blocks.map((block, i) => (
        <div
          key={i}
          className="bg-white border border-slate-200 rounded-xl p-4 space-y-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              {i + 1}. {block.type}
            </span>

            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className="text-xs px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-lg cursor-pointer"
              >
                ↑
              </button>

              <button
                type="button"
                onClick={() => move(i, 1)}
                disabled={i === blocks.length - 1}
                className="text-xs px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-lg cursor-pointer"
              >
                ↓
              </button>

              <button
                type="button"
                onClick={() => remove(i)}
                className="text-xs px-2.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>

          {/* Heading */}
          {block.type === 'heading' && (
            <div className="grid sm:grid-cols-[90px_1fr] gap-3">
              <select
                value={block.level}
                onChange={(e) =>
                  update(i, {
                    level: Number(e.target.value),
                  })
                }
                className={field}
              >
                <option value={2}>H2</option>
                <option value={3}>H3</option>
              </select>

              <input
                className={field}
                value={block.text}
                onChange={(e) =>
                  update(i, {
                    text: e.target.value,
                  })
                }
                placeholder="Heading text"
              />
            </div>
          )}

          {/* Paragraph */}
          {block.type === 'paragraph' && (
            <textarea
              rows={5}
              className={field}
              value={block.text}
              onChange={(e) =>
                update(i, {
                  text: e.target.value,
                })
              }
              placeholder="Write your paragraph..."
            />
          )}

          {/* Quote */}
          {block.type === 'quote' && (
            <textarea
              rows={3}
              className={field}
              value={block.text}
              onChange={(e) =>
                update(i, {
                  text: e.target.value,
                })
              }
              placeholder="Write the quote..."
            />
          )}

          {/* List */}
          {block.type === 'list' && (
            <div>
              <label className={label}>
                List items
              </label>

              <textarea
                rows={5}
                className={field}
                value={(block.items || []).join('\n')}
                onChange={(e) =>
                  update(i, {
                    items: e.target.value.split('\n'),
                  })
                }
                placeholder={`First item
Second item
Third item`}
              />

              <p className="text-xs text-slate-400 mt-2">
                Add one item per line.
              </p>
            </div>
          )}

          {/* Image */}
          {block.type === 'image' && (
            <div className="space-y-4">
              <ImageUploader
                label="Content Image"
                value={block.image}
                onChange={(url) =>
                  update(i, {
                    image: url,
                  })
                }
              />

              <div>
                <label className={label}>
                  Alt Text
                </label>

                <input
                  className={field}
                  value={block.alt}
                  onChange={(e) =>
                    update(i, {
                      alt: e.target.value,
                    })
                  }
                  placeholder="Describe the image for accessibility and SEO"
                />
              </div>

              <div>
                <label className={label}>
                  Caption
                </label>

                <input
                  className={field}
                  value={block.caption}
                  onChange={(e) =>
                    update(i, {
                      caption: e.target.value,
                    })
                  }
                  placeholder="Optional image caption"
                />
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Add block buttons */}
      <div className="border-t border-slate-200 pt-4">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
          Add content block
        </p>

        <div className="flex flex-wrap gap-2">
          {BLOCK_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => add(type)}
              className="text-xs font-bold uppercase tracking-widest text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-lg cursor-pointer transition"
            >
              + {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}