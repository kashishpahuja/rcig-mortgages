import Link from "next/link";
import { formatDate } from "../../lib/posts";

export default function FeaturedPost({ post }) {
  if (!post) return null;

  const image = post.featuredImage;
  const imageAlt =
    post.featuredImageAlt || post.title || "Featured blog post";

  const authorName =
    typeof post.author === "object"
      ? post.author?.name
      : post.author;

  const date = post.publishedAt || post.updatedAt;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid md:grid-cols-2 gap-0 bg-white border border-[#E3E8E4] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
    >
      {/* Image */}
      <div className="aspect-[16/10] md:aspect-auto bg-[#E3E8E4] overflow-hidden">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full min-h-[280px] flex items-center justify-center text-[#123A2E]/30 font-serif text-xl">
            Manjit Bhondhi
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-8 sm:p-10 flex flex-col justify-center">
        <span className="text-[#2F6B4F] text-xs font-semibold uppercase tracking-widest mb-3">
          {post.category || "Update"} · Featured
        </span>

        <h2 className="font-serif text-2xl sm:text-3xl text-[#071B35] leading-snug mb-3 group-hover:text-[#2F6B4F] transition-colors">
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="text-[#5A6B64] leading-relaxed mb-5 line-clamp-3">
            {post.excerpt}
          </p>
        )}

        <div className="text-xs font-semibold uppercase tracking-widest text-[#5A6B64]">
          {authorName || "Manjit Bhondhi Saini"}
          {date && <> · {formatDate(date)}</>}
        </div>
      </div>
    </Link>
  );
}