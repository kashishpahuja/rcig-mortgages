import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPost,
  getRelatedPosts,
  formatDate,
} from "../../../lib/posts";

import PostBody from "../../components/PostBody";
import PostCard from "../../components/PostCard";
import ShareLinks from "../../components/ShareLinks";
import ContactCard from "../../components/ContactCard";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  const title = post.seo?.metaTitle || post.title;
  const description =
    post.seo?.metaDescription || post.excerpt;

  const ogImage =
    post.social?.ogImage || post.featuredImage;

  const twitterImage =
    post.social?.twitterImage || ogImage;

  return {
    title,
    description,

    keywords:
      post.seo?.keywords?.length > 0
        ? post.seo.keywords
        : undefined,

    alternates: post.seo?.canonicalUrl
      ? {
          canonical: post.seo.canonicalUrl,
        }
      : undefined,

    robots: {
      index: post.allowIndexing !== false,
      follow: post.allowFollowing !== false,
    },

    openGraph: {
      title: post.social?.ogTitle || title,
      description:
        post.social?.ogDescription || description,
      images: ogImage ? [ogImage] : [],
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title:
        post.social?.twitterTitle || title,
      description:
        post.social?.twitterDescription ||
        description,
      images: twitterImage ? [twitterImage] : [],
    },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const related = await getRelatedPosts(slug, 3);

  const date =
    post.publishedAt || post.updatedAt;

  const authorName =
    post.author?.name || "Manjit Bhondhi Saini";

  const authorImage =
    post.author?.image || "";

  return (
    <div className="w-full         bg-[#F4F1E8]
        text-[#071B35] min-h-screen font-sans">

      {/* ================= COVER ================= */}
      <div className="w-full bg-[#071B35]">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-14 pb-10">

          <Link
            href="/blog"
            className="text-xs font-semibold uppercase tracking-widest text-white/60 hover:text-[#D9A12B] transition"
          >
            ← All posts
          </Link>

          {/* Category */}
          <p className="text-[#D9A12B] text-xs font-semibold uppercase tracking-widest mt-6 mb-3">
            {post.category || "Update"}
            {post.featured && " · Featured"}
          </p>

          {/* Title */}
          <h1 className="font-serif text-white text-3xl sm:text-5xl leading-tight mb-6">
            {post.title}
          </h1>

          {/* Author / Date / Reading time */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 text-sm text-white/70">

            <div className="flex items-center gap-2">

              {authorImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={authorImage}
                  alt={authorName}
                  className="w-8 h-8 rounded-full object-cover object-top border border-white/20"
                />
              )}

              <span>
                By {authorName}
              </span>
            </div>

            <span aria-hidden="true">·</span>

            {date && (
              <time dateTime={date}>
                {formatDate(date)}
              </time>
            )}

            {post.readingTime && (
              <>
                <span aria-hidden="true">·</span>
                <span>{post.readingTime}</span>
              </>
            )}
          </div>

          {/* Tags */}
          {Array.isArray(post.tags) &&
            post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-white/60 border border-white/20 rounded-full px-3 py-1"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
        </div>
      </div>

      {/* ================= FEATURED IMAGE ================= */}
      {post.featuredImage && (
        <figure className="max-w-4xl mx-auto px-5 sm:px-8 -mt-6 mb-10">

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.featuredImage}
            alt={
              post.featuredImageAlt ||
              post.title
            }
            className="w-full aspect-video object-cover object-top rounded-2xl shadow-lg"
          />

          {post.featuredImageCaption && (
            <figcaption className="text-sm text-[#5A6B64] mt-3 text-center">
              {post.featuredImageCaption}
            </figcaption>
          )}
        </figure>
      )}

      {/* ================= ARTICLE ================= */}
      <article className="max-w-3xl mx-auto px-5 sm:px-8 pb-16">

        {/* Excerpt */}
        {post.excerpt && (
          <p className="font-serif text-xl sm:text-2xl leading-relaxed text-[#071B35] mb-10">
            {post.excerpt}
          </p>
        )}

        {/* Dynamic backend blocks */}
        <PostBody content={post.content} />

        {/* Share */}
        <div className="mt-12 pt-8 border-t border-[#E3E8E4]">
          <ShareLinks title={post.title} />
        </div>
      </article>

      {/* ================= RELATED POSTS ================= */}
      {related.length > 0 && (
        <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-20">

          <h2 className="font-serif text-2xl text-[#071B35] mb-6">
            More from the campaign
          </h2>

          <div className="flex flex-col gap-12">
            {related.map((relatedPost) => (
              <PostCard
                key={relatedPost.slug}
                post={relatedPost}
              />
            ))}
          </div>
        </section>
      )}

      <ContactCard />
    </div>
  );
}