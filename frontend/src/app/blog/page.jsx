// src/app/blog/page.jsx
import { getAllPosts } from "../../lib/posts";
import BlogHero from "../components/BlogHero";
import FeaturedPost from "../components/FeaturedPost";
import PostCard from "../components/PostCard";
import ContactCard from "../components/ContactCard";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Blog",
  description: "News and updates from Manjit Bhondhi, candidate for Caledon Regional Council.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="w-full bg-[#F4F1E8]
        text-[#071B35] min-h-screen font-sans">
       <div className="w-full bg-[#071B35]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-14 ">

          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-widest text-white/60 hover:text-[#D9A12B] transition"
          >
            ← View Portfolio
          </Link>
        </div>
      </div>
      <BlogHero />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 -mt-10 pb-20">
        {posts.length === 0 ? (
          <div className="bg-white border border-[#E3E8E4] rounded-2xl p-12 text-center text-[#5A6B64]">
            No posts yet. Check back soon.
          </div>
        ) : (
          <>
            <div className="mb-12">
              <FeaturedPost post={featured} />
            </div>

            {rest.length > 0 && (
              <>
                <h2 className="font-serif text-2xl  text-[#071B35] mb-6">More updates</h2>
                <div className="flex flex-col gap-12">
                  {rest.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>

      <ContactCard />
    </div>
  );
}
