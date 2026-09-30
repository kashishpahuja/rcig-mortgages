// src/app/admin/components/AdminBlogs.jsx
'use client';

import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import ImageUploader from './ImageUploader';
import BlockEditor from './BlockEditor';

const emptyForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: [],
  featuredImage: '',
  featuredImageAlt: '',
  featuredImageCaption: '',

  seo: {
    metaTitle: '',
    metaDescription: '',
    focusKeyword: '',
    keywords: [],
    canonicalUrl: '',
  },

  category: 'Update',
  tags: [],

  author: {
    name: 'Manjit Bhondhi Saini',
    image: '',
  },

  status: 'draft',

  social: {
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: '',
  },

  featured: false,
  allowIndexing: true,
  allowFollowing: true,
};

const field =
  'w-full bg-[#0b2345] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/35 text-sm focus:outline-none focus:border-[#C62828] focus:ring-2 focus:ring-[#C62828]/20 transition';

const label =
  'block text-xs font-bold uppercase tracking-widest text-white/65 mb-2';

const TABS = [
  {
    id: 'basic',
    name: 'Basic',
  },
  {
    id: 'content',
    name: 'Content',
  },
  {
    id: 'seo',
    name: 'SEO',
  },
  {
    id: 'social',
    name: 'Social',
  },
  {
    id: 'publishing',
    name: 'Publishing',
  },
];

export default function AdminBlogs() {
  const [posts, setPosts] = useState([]);

  const [form, setForm] = useState(
    emptyForm
  );

  const [editingSlug, setEditingSlug] =
    useState(null);

  const [tab, setTab] =
    useState('basic');

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [msg, setMsg] = useState({
    type: '',
    text: '',
  });

  /*
   * Load all posts
   */
  const load = useCallback(async () => {
    setLoading(true);

    try {
      const res = await fetch(
        '/api/posts?drafts=1',
        {
          cache: 'no-store',
        }
      );

      const json = await res.json();

      if (!res.ok) {
        throw new Error(
          json.error ||
            'Could not load posts.'
        );
      }

      setPosts(json.posts || []);
    } catch (error) {
      console.error(error);

      setMsg({
        type: 'error',
        text:
          error.message ||
          'Could not load posts.',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  /*
   * Update nested form values
   */
  const set = (path, value) => {
    setForm((current) => {
      const next =
        structuredClone(current);

      const parts = path.split('.');

      let target = next;

      for (
        let i = 0;
        i < parts.length - 1;
        i++
      ) {
        target = target[parts[i]];
      }

      target[
        parts[parts.length - 1]
      ] = value;

      return next;
    });
  };

  /*
   * Reset form
   */
  const reset = () => {
    setForm(
      structuredClone(emptyForm)
    );

    setEditingSlug(null);
    setTab('basic');

    setMsg({
      type: '',
      text: '',
    });
  };

  /*
   * Edit existing post
   */
  const startEdit = (post) => {
    setForm({
      ...structuredClone(emptyForm),

      ...post,

      seo: {
        ...emptyForm.seo,
        ...(post.seo || {}),
      },

      author: {
        ...emptyForm.author,
        ...(post.author || {}),
      },

      social: {
        ...emptyForm.social,
        ...(post.social || {}),
      },

      content: post.content || [],
      tags: post.tags || [],
    });

    setEditingSlug(post.slug);

    setTab('basic');

    setMsg({
      type: '',
      text: '',
    });

    setTimeout(() => {
      document
        .getElementById('blog-form')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
    }, 50);
  };

  /*
   * Save / publish
   */
  async function handleSubmit(
    e,
    publish
  ) {
    e?.preventDefault();

    if (!form.title.trim()) {
      setMsg({
        type: 'error',
        text: 'Blog title is required.',
      });

      setTab('basic');
      return;
    }

    setSaving(true);

    setMsg({
      type: '',
      text: '',
    });

    const payload = {
      ...form,

      status: publish
        ? 'published'
        : 'draft',

      title: form.title.trim(),

      excerpt:
        form.excerpt.trim(),

      category:
        form.category.trim(),

      tags: form.tags
        .map((tag) =>
          String(tag).trim()
        )
        .filter(Boolean),

      seo: {
        ...form.seo,

        keywords:
          form.seo.keywords
            .map((keyword) =>
              String(keyword).trim()
            )
            .filter(Boolean),
      },
    };

    try {
      const url = editingSlug
        ? `/api/posts/${editingSlug}`
        : '/api/posts';

      const method = editingSlug
        ? 'PUT'
        : 'POST';

      const res = await fetch(url, {
        method,

        headers: {
          'Content-Type':
            'application/json',
        },

        body: JSON.stringify(
          payload
        ),
      });

      const json =
        await res.json();

      if (!res.ok) {
        throw new Error(
          json.error ||
            'Could not save the post.'
        );
      }

      setMsg({
        type: 'ok',
        text: publish
          ? 'Blog published successfully.'
          : 'Blog saved as draft.',
      });

      reset();

      await load();
    } catch (error) {
      console.error(error);

      setMsg({
        type: 'error',
        text:
          error.message ||
          'Could not save the post.',
      });
    } finally {
      setSaving(false);
    }
  }

  /*
   * Delete
   */
  async function handleDelete(slug) {
    const confirmed = window.confirm(
      'Delete this blog permanently?'
    );

    if (!confirmed) return;

    try {
      const res = await fetch(
        `/api/posts/${slug}`,
        {
          method: 'DELETE',
        }
      );

      const json =
        await res.json().catch(
          () => ({})
        );

      if (!res.ok) {
        throw new Error(
          json.error ||
            'Could not delete the post.'
        );
      }

      if (
        editingSlug === slug
      ) {
        reset();
      }

      await load();
    } catch (error) {
      setMsg({
        type: 'error',
        text:
          error.message ||
          'Could not delete the post.',
      });
    }
  }

  return (
    <section
      id="admin-blogs"
      className="w-full px-5 sm:px-8 py-14 bg-[#071B35] text-white border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <p className="text-[#C62828] text-xs font-bold uppercase tracking-[0.25em] mb-3">
            Content Management
          </p>

          <h2 className="text-white font-black uppercase tracking-widest text-2xl mb-2">
            Blog Posts
          </h2>

          <p className="text-white/55 text-sm">
            Create, edit, publish and manage
            your blog posts.
          </p>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)] gap-8">

          {/* =====================================================
              FORM
          ====================================================== */}
          <form
            id="blog-form"
            onSubmit={(e) =>
              handleSubmit(
                e,
                form.status ===
                  'published'
              )
            }
            className="bg-[#0b2345] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl"
          >
            {/* Form title */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div>
                <h3 className="text-white font-bold uppercase tracking-widest text-sm">
                  {editingSlug
                    ? `Edit: ${
                        form.title ||
                        editingSlug
                      }`
                    : 'Create New Blog'}
                </h3>

                {editingSlug && (
                  <p className="text-xs text-white/35 mt-1">
                    Editing existing post
                  </p>
                )}
              </div>

              {editingSlug && (
                <button
                  type="button"
                  onClick={reset}
                  className="text-xs font-bold uppercase tracking-widest text-white/55 hover:text-[#C62828] cursor-pointer transition"
                >
                  + New Blog
                </button>
              )}
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-1 mb-6 border-b border-white/10 pb-3">
              {TABS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setTab(item.id)
                  }
                  className={`text-xs font-bold uppercase tracking-widest px-3 py-2 rounded-lg cursor-pointer transition ${
                    tab === item.id
                      ? 'bg-[#C62828] text-white'
                      : 'text-white/50 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* =================================================
                BASIC
            ================================================== */}
            {tab === 'basic' && (
              <div className="space-y-5">

                {/* Title */}
                <div>
                  <label className={label}>
                    Blog Title *
                  </label>

                  <input
                    className={field}
                    value={form.title}
                    onChange={(e) =>
                      set(
                        'title',
                        e.target.value
                      )
                    }
                    placeholder="Enter blog title"
                    required
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className={label}>
                    Slug
                  </label>

                  <input
                    className={field}
                    value={form.slug}
                    onChange={(e) =>
                      set(
                        'slug',
                        e.target.value
                      )
                    }
                    placeholder="blog-url-slug"
                    disabled={
                      Boolean(
                        editingSlug
                      )
                    }
                  />

                  <p className="text-xs text-white/35 mt-1">
                    Leave empty to generate
                    automatically from title.
                  </p>
                </div>

                {/* Excerpt */}
                <div>
                  <label className={label}>
                    Short Excerpt
                  </label>

                  <textarea
                    rows={4}
                    className={field}
                    value={form.excerpt}
                    onChange={(e) =>
                      set(
                        'excerpt',
                        e.target.value
                      )
                    }
                    placeholder="Short summary shown on blog cards and search results..."
                  />
                </div>

                {/* Category + Tags */}
                <div className="grid sm:grid-cols-2 gap-5">

                  <div>
                    <label className={label}>
                      Category
                    </label>

                    <input
                      className={field}
                      value={
                        form.category
                      }
                      onChange={(e) =>
                        set(
                          'category',
                          e.target.value
                        )
                      }
                      placeholder="Update"
                    />
                  </div>

                  <div>
                    <label className={label}>
                      Tags
                    </label>

                    <input
                      className={field}
                      value={form.tags.join(
                        ', '
                      )}
                      onChange={(e) =>
                        set(
                          'tags',
                          e.target.value
                            .split(',')
                            .map((x) =>
                              x.trim()
                            )
                            .filter(Boolean)
                        )
                      }
                      placeholder="community, updates, news"
                    />

                    <p className="text-xs text-white/35 mt-1">
                      Separate tags with commas.
                    </p>
                  </div>

                </div>

                {/* Author */}
                <div className="border-t border-white/10 pt-5">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white/65 mb-4">
                    Author
                  </h4>

                  <div className="space-y-5">

                    <div>
                      <label className={label}>
                        Author Name
                      </label>

                      <input
                        className={field}
                        value={
                          form.author
                            .name
                        }
                        onChange={(e) =>
                          set(
                            'author.name',
                            e.target.value
                          )
                        }
                        placeholder="Author name"
                      />
                    </div>

                    <ImageUploader
                      label="Author Photo"
                      value={
                        form.author
                          .image
                      }
                      onChange={(url) =>
                        set(
                          'author.image',
                          url
                        )
                      }
                    />

                  </div>
                </div>

                {/* Featured image */}
                <div className="border-t border-white/10 pt-5">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white/65 mb-4">
                    Featured Image
                  </h4>

                  <ImageUploader
                    label="Main Blog Image"
                    value={
                      form.featuredImage
                    }
                    onChange={(url) =>
                      set(
                        'featuredImage',
                        url
                      )
                    }
                  />

                  <div className="grid sm:grid-cols-2 gap-5 mt-5">

                    <div>
                      <label className={label}>
                        Image Alt Text
                      </label>

                      <input
                        className={field}
                        value={
                          form.featuredImageAlt
                        }
                        onChange={(e) =>
                          set(
                            'featuredImageAlt',
                            e.target.value
                          )
                        }
                        placeholder="Describe the featured image"
                      />
                    </div>

                    <div>
                      <label className={label}>
                        Image Caption
                      </label>

                      <input
                        className={field}
                        value={
                          form.featuredImageCaption
                        }
                        onChange={(e) =>
                          set(
                            'featuredImageCaption',
                            e.target.value
                          )
                        }
                        placeholder="Optional caption"
                      />
                    </div>

                  </div>
                </div>

              </div>
            )}

            {/* =================================================
                CONTENT
            ================================================== */}
            {tab === 'content' && (
              <div>

                <div className="mb-5">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-white">
                    Blog Content
                  </h4>

                  <p className="text-xs text-white/50 mt-1">
                    Build your blog using
                    headings, paragraphs,
                    images, lists and quotes.
                  </p>
                </div>

                <BlockEditor
                  blocks={
                    form.content
                  }
                  onChange={(blocks) =>
                    set(
                      'content',
                      blocks
                    )
                  }
                />

              </div>
            )}

            {/* =================================================
                SEO
            ================================================== */}
            {tab === 'seo' && (
              <div className="space-y-5">

                <div className="bg-[#102F55] border border-blue-300/10 rounded-xl p-4">
                  <p className="text-xs text-blue-100/70">
                    SEO fields control how
                    your blog appears in
                    search engines. Leave
                    optional fields empty if
                    you want your site to use
                    the blog title/excerpt.
                  </p>
                </div>

                {/* Meta title */}
                <div>
                  <label className={label}>
                    Meta Title
                  </label>

                  <input
                    className={field}
                    value={
                      form.seo
                        .metaTitle
                    }
                    onChange={(e) =>
                      set(
                        'seo.metaTitle',
                        e.target.value
                      )
                    }
                    placeholder="SEO title"
                  />

                  <p className="text-xs text-white/35 mt-1">
                    Recommended: around
                    50–60 characters.
                  </p>
                </div>

                {/* Meta description */}
                <div>
                  <label className={label}>
                    Meta Description
                  </label>

                  <textarea
                    rows={4}
                    className={field}
                    value={
                      form.seo
                        .metaDescription
                    }
                    onChange={(e) =>
                      set(
                        'seo.metaDescription',
                        e.target.value
                      )
                    }
                    placeholder="SEO description for search engines..."
                  />

                  <p className="text-xs text-white/35 mt-1">
                    Recommended: around
                    150–160 characters.
                  </p>
                </div>

                {/* Focus keyword */}
                <div>
                  <label className={label}>
                    Focus Keyword
                  </label>

                  <input
                    className={field}
                    value={
                      form.seo
                        .focusKeyword
                    }
                    onChange={(e) =>
                      set(
                        'seo.focusKeyword',
                        e.target.value
                      )
                    }
                    placeholder="main keyword"
                  />
                </div>

                {/* Keywords */}
                <div>
                  <label className={label}>
                    SEO Keywords
                  </label>

                  <input
                    className={field}
                    value={form.seo.keywords.join(
                      ', '
                    )}
                    onChange={(e) =>
                      set(
                        'seo.keywords',
                        e.target.value
                          .split(',')
                          .map((x) =>
                            x.trim()
                          )
                          .filter(Boolean)
                      )
                    }
                    placeholder="keyword one, keyword two, keyword three"
                  />

                  <p className="text-xs text-white/35 mt-1">
                    Separate keywords with
                    commas.
                  </p>
                </div>

                {/* Canonical */}
                <div>
                  <label className={label}>
                    Canonical URL
                  </label>

                  <input
                    type="url"
                    className={field}
                    value={
                      form.seo
                        .canonicalUrl
                    }
                    onChange={(e) =>
                      set(
                        'seo.canonicalUrl',
                        e.target.value
                      )
                    }
                    placeholder="https://manjit4caledon.ca/blog/..."
                  />
                </div>

              </div>
            )}

            {/* =================================================
                SOCIAL
            ================================================== */}
            {tab === 'social' && (
              <div className="space-y-5">

                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-xs text-white/55">
                    These fields control the
                    appearance when the blog
                    is shared on Facebook,
                    LinkedIn and X/Twitter.
                  </p>
                </div>

                {/* OG */}
                <div className="border border-white/10 bg-[#0f2d50] rounded-xl p-4 space-y-5">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white/65">
                    Open Graph
                  </h4>

                  <div>
                    <label className={label}>
                      OG Title
                    </label>

                    <input
                      className={field}
                      value={
                        form.social
                          .ogTitle
                      }
                      onChange={(e) =>
                        set(
                          'social.ogTitle',
                          e.target.value
                        )
                      }
                      placeholder="Social sharing title"
                    />
                  </div>

                  <div>
                    <label className={label}>
                      OG Description
                    </label>

                    <textarea
                      rows={3}
                      className={field}
                      value={
                        form.social
                          .ogDescription
                      }
                      onChange={(e) =>
                        set(
                          'social.ogDescription',
                          e.target.value
                        )
                      }
                      placeholder="Social sharing description"
                    />
                  </div>

                  <ImageUploader
                    label="OG Image"
                    value={
                      form.social
                        .ogImage
                    }
                    onChange={(url) =>
                      set(
                        'social.ogImage',
                        url
                      )
                    }
                  />
                </div>

                {/* Twitter/X */}
                <div className="border border-white/10 bg-[#0f2d50] rounded-xl p-4 space-y-5">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white/65">
                    X / Twitter
                  </h4>

                  <div>
                    <label className={label}>
                      X / Twitter Title
                    </label>

                    <input
                      className={field}
                      value={
                        form.social
                          .twitterTitle
                      }
                      onChange={(e) =>
                        set(
                          'social.twitterTitle',
                          e.target.value
                        )
                      }
                      placeholder="X / Twitter title"
                    />
                  </div>

                  <div>
                    <label className={label}>
                      X / Twitter Description
                    </label>

                    <textarea
                      rows={3}
                      className={field}
                      value={
                        form.social
                          .twitterDescription
                      }
                      onChange={(e) =>
                        set(
                          'social.twitterDescription',
                          e.target.value
                        )
                      }
                      placeholder="X / Twitter description"
                    />
                  </div>

                  <ImageUploader
                    label="X / Twitter Image"
                    value={
                      form.social
                        .twitterImage
                    }
                    onChange={(url) =>
                      set(
                        'social.twitterImage',
                        url
                      )
                    }
                  />
                </div>

              </div>
            )}

            {/* =================================================
                PUBLISHING
            ================================================== */}
            {tab === 'publishing' && (
              <div className="space-y-5">

                <div className="border border-white/10 bg-[#0f2d50] rounded-xl p-5 space-y-5">

                  <h4 className="text-xs font-bold uppercase tracking-widest text-white/65">
                    Publishing Settings
                  </h4>

                  {/* Featured */}
                  {/* <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        form.featured
                      }
                      onChange={(e) =>
                        set(
                          'featured',
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 mt-0.5 accent-red-600"
                    />

                    <span>
                      <span className="block text-sm font-semibold text-white">
                        Featured Blog
                      </span>

                      <span className="block text-xs text-white/45 mt-1">
                        Show this blog as a
                        featured post.
                      </span>
                    </span>
                  </label> */}

                  {/* Indexing */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        form.allowIndexing
                      }
                      onChange={(e) =>
                        set(
                          'allowIndexing',
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 mt-0.5 accent-red-600"
                    />

                    <span>
                      <span className="block text-sm font-semibold text-white">
                        Allow Search Engine Indexing
                      </span>

                      <span className="block text-xs text-white/45 mt-1">
                        Allow search engines
                        to index this page.
                      </span>
                    </span>
                  </label>

                  {/* Following */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        form.allowFollowing
                      }
                      onChange={(e) =>
                        set(
                          'allowFollowing',
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 mt-0.5 accent-red-600"
                    />

                    <span>
                      <span className="block text-sm font-semibold text-white">
                        Allow Search Engine Following
                      </span>

                      <span className="block text-xs text-white/45 mt-1">
                        Allow search engines
                        to follow links on
                        this page.
                      </span>
                    </span>
                  </label>

                </div>

                {/* Current status */}
                <div>
                  <label className={label}>
                    Current Status
                  </label>

                  <select
                    className={field}
                    value={form.status}
                    onChange={(e) =>
                      set(
                        'status',
                        e.target.value
                      )
                    }
                  >
                    <option value="draft">
                      Draft
                    </option>

                    <option value="published">
                      Published
                    </option>
                  </select>
                </div>

              </div>
            )}

            {/* Message */}
            {msg.text && (
              <div
                className={`mt-6 rounded-xl px-4 py-3 text-sm ${
                  msg.type === 'error'
                    ? 'bg-red-500/10 text-red-200 border border-red-500/20'
                    : 'bg-green-500/10 text-green-200 border border-green-500/20'
                }`}
              >
                {msg.text}
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mt-6 pt-5 border-t border-white/10">

              <button
                type="button"
                disabled={saving}
                onClick={() =>
                  handleSubmit(
                    null,
                    true
                  )
                }
                className="bg-[#C62828] hover:bg-[#a91f1f] disabled:opacity-60 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition cursor-pointer"
              >
                {saving
                  ? 'Saving...'
                  : editingSlug
                    ? 'Update & Publish'
                    : 'Publish Blog'}
              </button>

              <button
                type="button"
                disabled={saving}
                onClick={() =>
                  handleSubmit(
                    null,
                    false
                  )
                }
                className="bg-white/10 hover:bg-white/15 disabled:opacity-60 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition border border-white/10 cursor-pointer"
              >
                Save Draft
              </button>

              {editingSlug && (
                <button
                  type="button"
                  onClick={reset}
                  disabled={saving}
                  className="text-white/45 hover:text-white px-4 py-3 font-bold uppercase tracking-widest text-xs transition cursor-pointer"
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

          {/* =====================================================
              POSTS LIST
          ====================================================== */}
          <div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[#C62828] text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
                  Content
                </p>

                <h3 className="text-white font-bold uppercase tracking-widest text-sm">
                  All Posts
                </h3>
              </div>

              <span className="text-xs bg-white/10 text-white/60 px-3 py-1.5 rounded-full font-bold border border-white/10">
                {posts.length}
              </span>
            </div>

            {loading ? (
              <div className="bg-[#0b2345] border border-white/10 rounded-xl p-6">
                <p className="text-white/50 text-sm">
                  Loading blogs...
                </p>
              </div>
            ) : posts.length === 0 ? (
              <div className="bg-[#0b2345] border border-dashed border-white/15 rounded-xl p-8 text-center">
                <p className="text-white/50 text-sm">
                  No blogs yet.
                </p>

                <p className="text-white/30 text-xs mt-1">
                  Create your first blog
                  using the form.
                </p>
              </div>
            ) : (
              <div className="space-y-3">

                {posts.map((post) => (
                  <div
                    key={post.slug}
                    className="bg-[#0b2345] border border-white/10 rounded-xl overflow-hidden shadow-lg"
                  >

                    {/* Image */}
                    {post.featuredImage && (
                      <div className="h-auto aspect-video w-full bg-[#06172d] overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={
                            post.featuredImage
                          }
                          alt={
                            post.featuredImageAlt ||
                            post.title
                          }
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    )}

                    <div className="p-4">

                      <div className="flex items-start justify-between gap-3">

                        <div className="min-w-0">

                          <h4 className="text-white font-bold text-sm leading-5">
                            {post.featured && (
                              <span className="text-amber-400 mr-1">
                                ★
                              </span>
                            )}

                            {post.title}
                          </h4>

                          <p className="text-xs text-white/35 mt-2 break-all">
                            {post.category}
                            {' · '}
                            /blog/
                            {post.slug}
                          </p>

                          <p className="text-xs mt-1">
                            <span
                              className={
                                post.status ===
                                'published'
                                  ? 'text-green-400'
                                  : 'text-amber-400'
                              }
                            >
                              {post.status ===
                              'published'
                                ? 'Published'
                                : 'Draft'}
                            </span>
                          </p>

                        </div>

                        <div className="flex gap-2 shrink-0">

                          <button
                            type="button"
                            onClick={() =>
                              startEdit(
                                post
                              )
                            }
                            className="text-xs font-bold uppercase tracking-widest text-white/75 bg-white/10 hover:bg-white/15 hover:text-white px-3 py-2 rounded-lg cursor-pointer transition border border-white/10"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                post.slug
                              )
                            }
                            className="text-xs font-bold uppercase tracking-widest text-white bg-[#C62828] hover:bg-[#a91f1f] px-3 py-2 rounded-lg cursor-pointer transition"
                          >
                            Delete
                          </button>

                        </div>

                      </div>

                    </div>
                  </div>
                ))}

              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}