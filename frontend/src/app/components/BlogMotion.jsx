"use client";

import { motion, useReducedMotion } from "motion/react";
import FeaturedPost from "./FeaturedPost";
import PostCard from "./PostCard";

export default function BlogMotion({ featured, rest }) {
  const reduce = useReducedMotion();

  const reveal = {
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 45,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cardReveal = {
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 35,
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        delay: reduce ? 0 : index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <div className="relative">
      {/* Featured Story */}
      <motion.section
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mb-24"
      >
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-[#C62828] text-xs sm:text-sm font-bold uppercase tracking-[0.25em] mb-3">
              Featured Update
            </p>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[0.95] text-[#071B35]">
              From Caledon
            </h2>
          </div>

          <div className="hidden sm:block text-right">
            <span className="text-xs uppercase tracking-[0.2em] text-[#071B35]/45">
              01 / Featured
            </span>
          </div>
        </div>

        <motion.div
          whileHover={
            reduce
              ? undefined
              : {
                  y: -6,
                  transition: {
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }
          }
        >
          <FeaturedPost post={featured} />
        </motion.div>
      </motion.section>

      {/* More Updates */}
      {rest.length > 0 && (
        <section>
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="flex items-end justify-between gap-6 mb-10"
          >
            <div>
              <p className="text-[#C62828] text-xs sm:text-sm font-bold uppercase tracking-[0.25em] mb-3">
                Latest
              </p>

              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[0.95] text-[#071B35]">
                More Updates
              </h2>
            </div>

            <div className="hidden sm:block text-right">
              <span className="text-xs uppercase tracking-[0.2em] text-[#071B35]/45">
                02 / Latest
              </span>
            </div>
          </motion.div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, index) => (
              <motion.div
                key={post.slug}
                custom={index}
                variants={cardReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.12,
                }}
                whileHover={
                  reduce
                    ? undefined
                    : {
                        y: -8,
                        transition: {
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      }
                }
                className="h-full"
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}