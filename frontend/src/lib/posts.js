// src/lib/posts.js
import { promises as fs } from "fs";
import path from "path";

const DIR = path.join(process.cwd(), "data");
const FILE = path.join(DIR, "posts.json");

async function readAll() {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8"));
  } catch (err) {
    if (err.code === "ENOENT") {
      await fs.mkdir(DIR, { recursive: true });
      await fs.writeFile(FILE, "[]", "utf8");
      return [];
    }
    console.error("[posts] could not read", FILE, err);
    return [];
  }
}

async function writeAll(posts) {
  await fs.mkdir(DIR, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(posts, null, 2), "utf8");
}

export function slugify(text = "") {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toArray(v) {
  if (Array.isArray(v)) return v.filter((x) => String(x).trim() !== "");
  if (typeof v === "string") return v.split(",").map((s) => s.trim()).filter(Boolean);
  return [];
}

function normalizeContent(content) {
  if (!Array.isArray(content)) return [];
  return content
    .map((block) => {
      if (!block || !block.type) return null;
      switch (block.type) {
        case "heading":
          return { type: "heading", level: Number(block.level) === 3 ? 3 : 2, text: String(block.text || "") };
        case "paragraph":
          return { type: "paragraph", text: String(block.text || "") };
        case "image":
          return {
            type: "image",
            image: String(block.image || ""),
            alt: String(block.alt || ""),
            caption: String(block.caption || ""),
          };
        case "list":
          return { type: "list", items: toArray(block.items) };
        case "quote":
          return { type: "quote", text: String(block.text || "") };
        default:
          return null;
      }
    })
    .filter(Boolean);
}

// Plain-text extraction, used for reading time and plain-text excerpts/search
export function extractText(content = []) {
  return content
    .map((b) => {
      if (b.type === "list") return b.items.join(" ");
      return b.text || "";
    })
    .join(" ");
}

export function computeReadingTime(content = []) {
  const words = extractText(content).trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function blankPost() {
  const now = new Date().toISOString();
  return {
    title: "",
    slug: "",
    excerpt: "",
    content: [],
    featuredImage: "",
    featuredImageAlt: "",
    featuredImageCaption: "",
    seo: { metaTitle: "", metaDescription: "", focusKeyword: "", keywords: [], canonicalUrl: "" },
    category: "Update",
    tags: [],
    author: { name: "Manjit Bhondhi Saini", image: "" },
    status: "draft",
    publishedAt: null,
    updatedAt: now,
    social: {
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
      twitterTitle: "",
      twitterDescription: "",
      twitterImage: "",
    },
    readingTime: "",
    featured: false,
    allowIndexing: true,
    allowFollowing: true,
  };
}

function normalize(input, existing = null) {
  const base = existing ? { ...blankPost(), ...existing } : blankPost();
  const merged = { ...base, ...input };
  const now = new Date().toISOString();

  const wasPublished = existing?.status === "published";
  const nowPublished = merged.status === "published";

  const content = normalizeContent(merged.content);

  const post = {
    ...base,
    title: String(merged.title || "").trim(),
    excerpt: String(merged.excerpt || "").trim(),
    content,
    featuredImage: String(merged.featuredImage || "").trim(),
    featuredImageAlt: String(merged.featuredImageAlt || "").trim(),
    featuredImageCaption: String(merged.featuredImageCaption || "").trim(),
    seo: {
      metaTitle: String(merged.seo?.metaTitle || "").trim(),
      metaDescription: String(merged.seo?.metaDescription || "").trim(),
      focusKeyword: String(merged.seo?.focusKeyword || "").trim(),
      keywords: toArray(merged.seo?.keywords),
      canonicalUrl: String(merged.seo?.canonicalUrl || "").trim(),
    },
    category: String(merged.category || "Update").trim(),
    tags: toArray(merged.tags),
    author: {
      name: String(merged.author?.name || "Manjit Bhondhi Saini").trim(),
      image: String(merged.author?.image || "").trim(),
    },
    status: merged.status === "published" ? "published" : "draft",
    publishedAt: nowPublished ? merged.publishedAt || existing?.publishedAt || now : wasPublished ? merged.publishedAt : null,
    updatedAt: now,
    social: {
      ogTitle: String(merged.social?.ogTitle || "").trim(),
      ogDescription: String(merged.social?.ogDescription || "").trim(),
      ogImage: String(merged.social?.ogImage || "").trim(),
      twitterTitle: String(merged.social?.twitterTitle || "").trim(),
      twitterDescription: String(merged.social?.twitterDescription || "").trim(),
      twitterImage: String(merged.social?.twitterImage || "").trim(),
    },
    readingTime: computeReadingTime(content),
    featured: Boolean(merged.featured),
    allowIndexing: merged.allowIndexing !== false,
    allowFollowing: merged.allowFollowing !== false,
  };

  return post;
}

export async function getAllPosts({ includeDrafts = false } = {}) {
  const posts = await readAll();
  return posts
    .filter((p) => includeDrafts || p.status === "published")
    .sort((a, b) =>{
 const dateA = new Date(a.updatedAt || a.publishedAt || 0);
      const dateB = new Date(b.updatedAt || b.publishedAt || 0);

      return dateB - dateA;
    //  new Date(b.publishedAt || b.updatedAt) - new Date(a.publishedAt || a.updatedAt));
     
    })
}

export async function getFeaturedPosts({ includeDrafts = false } = {}) {
  const posts = await getAllPosts({ includeDrafts });
  return posts.filter((p) => p.featured);
}

export async function getPost(slug, { includeDrafts = false } = {}) {
  const posts = await readAll();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;
  if (post.status !== "published" && !includeDrafts) return null;
  return post;
}

export async function getRelatedPosts(slug, limit = 3) {
  const posts = await getAllPosts();
  const current = posts.find((p) => p.slug === slug);
  const sameCategory = current ? posts.filter((p) => p.slug !== slug && p.category === current.category) : [];
  const rest = posts.filter((p) => p.slug !== slug && !sameCategory.includes(p));
  return [...sameCategory, ...rest].slice(0, limit);
}

export async function createPost(input) {
  const posts = await readAll();
  const slug = slugify(input.slug || input.title);
  if (!slug) throw new Error("A title or slug is required.");
  if (posts.some((p) => p.slug === slug)) throw new Error("A post with this slug already exists.");

  const post = normalize(input);
  post.slug = slug;
  if (!post.title) throw new Error("Title is required.");

  posts.push(post);
  await writeAll(posts);
  return post;
}

export async function updatePost(slug, changes) {
  const posts = await readAll();
  const i = posts.findIndex((p) => p.slug === slug);
  if (i === -1) return null;
  const { slug: _ignored, ...rest } = changes; // slug stays stable
  posts[i] = normalize(rest, posts[i]);
  await writeAll(posts);
  return posts[i];
}

export async function deletePost(slug) {
  const posts = await readAll();
  const next = posts.filter((p) => p.slug !== slug);
  if (next.length === posts.length) return false;
  await writeAll(next);
  return true;
}

export function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
}
