import Link from "next/link";
import { formatDate } from "../../lib/posts";

export default function PostCard({ post }) {
  if (!post) return null;

  const image = post.featuredImage;
  const imageAlt =
    post.featuredImageAlt || post.title || "Blog post";

  const date = post.publishedAt || post.updatedAt;

  return (
    <article className="group grid md:grid-cols-2 gap-0  bg-white border border-[#E3E8E4] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
      
      {/* Image */}
      <Link
        href={`/blog/${post.slug}`}
        className="block aspect-video bg-[#E3E8E4] overflow-hidden"
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#123A2E]/30 font-serif">
            Manjit Bhondhi
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <span className="text-[#071B35] text-xs font-semibold uppercase tracking-widest">
          {post.category || "Update"}
        </span>

        <h3 className="font-serif text-xl text-[#071B35] leading-snug">
          <Link
            href={`/blog/${post.slug}`}
            className="hover:text-[#071B35] transition-colors"
          >
            {post.title}
          </Link>
        </h3>

        {post.excerpt && (
          <p className="text-[#5A6B64] text-sm leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        )}

        {/* Tags */}
        {Array.isArray(post.tags) && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-full bg-[#F1F5F2] text-[#5A6B64] text-[10px] font-semibold uppercase tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-3 flex items-center justify-between gap-4 text-xs text-[#5A6B64]">
          <time dateTime={date || ""}>
            {date ? formatDate(date) : ""}
          </time>

          <Link
            href={`/blog/${post.slug}`}
            className="font-semibold text-[#071B35] hover:text-[#123A2E] whitespace-nowrap"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
}