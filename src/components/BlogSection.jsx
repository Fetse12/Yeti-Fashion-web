import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "";

/* ── Fallback data if API is unreachable ─────────────────────────── */
const fallbackPosts = [
  {
    _id: "fb1",
    category: "News",
    date: "Apr 10, 2026",
    title: "Yeti Academy Welcomes New Cohort of 40 Fashion Students",
    excerpt:
      "Our latest intake brings passionate designers from across Ethiopia, ready to master pattern-making, draping, and garment construction.",
    readTime: "3 min",
    featured: true,
  },
  {
    _id: "fb2",
    category: "Blog",
    date: "Apr 5, 2026",
    title: "The Art of Draping: Why Every Designer Should Master the Form",
    excerpt:
      "Draping is more than a technique—it's a conversation between fabric and the human body. We explore why this skill remains essential.",
    readTime: "5 min",
    featured: false,
  },
  {
    _id: "fb3",
    category: "News",
    date: "Mar 28, 2026",
    title: "Yeti Partners with Adama Textile Hub for Production Expansion",
    excerpt:
      "A new partnership will triple our production capacity, bringing more Ethiopian-made garments to international markets.",
    readTime: "4 min",
    featured: false,
  },
  {
    _id: "fb4",
    category: "Blog",
    date: "Mar 20, 2026",
    title: "Sustainable Fashion Manufacturing in East Africa",
    excerpt:
      "How Yeti Production is leading the charge in responsible garment manufacturing with minimal waste and ethical labor.",
    readTime: "6 min",
    featured: false,
  },
  {
    _id: "fb5",
    category: "Events",
    date: "Mar 15, 2026",
    title: "Annual Fashion Show: Celebrating Student Creativity",
    excerpt:
      "This year's showcase featured 25 student collections, with designs inspired by Ethiopian heritage and modern aesthetics.",
    readTime: "4 min",
    featured: false,
  },
  {
    _id: "fb6",
    category: "Blog",
    date: "Mar 8, 2026",
    title: "From Sketch to Garment: A Student's Journey at Yeti",
    excerpt:
      "Follow one student's transformation from beginner sketches to producing a full ready-to-wear collection in 12 months.",
    readTime: "7 min",
    featured: false,
  },
];

const blogCategories = ["All", "News", "Blog", "Events"];

function FeaturedPost({ post }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative mb-12 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-yeti-lime/10"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Left visual block */}
        <div className="relative flex min-h-[280px] flex-col justify-end bg-gradient-to-br from-neutral-900 via-neutral-800 to-emerald-950 p-8 lg:w-2/5 lg:min-h-0 lg:p-10">
          {/* Decorative */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            aria-hidden
            style={{
              backgroundImage: `
                linear-gradient(45deg, rgba(154,205,50,0.4) 1px, transparent 1px),
                linear-gradient(-45deg, rgba(154,205,50,0.4) 1px, transparent 1px)
              `,
              backgroundSize: "16px 16px",
            }}
          />
          <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-yeti-lime via-yeti-lime/60 to-transparent" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-yeti-lime/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-yeti-lime">
              <span className="h-1.5 w-1.5 rounded-full bg-yeti-lime animate-pulse" />
              Featured
            </span>
            <p className="mt-6 font-serif text-3xl font-semibold leading-tight text-white lg:text-4xl">
              {post.title}
            </p>
          </div>

          {/* Corner bracket */}
          <svg
            className="absolute bottom-4 right-4 h-12 w-12 text-yeti-lime/20"
            viewBox="0 0 48 48"
            fill="none"
          >
            <path d="M44 32V44H32" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Right content */}
        <div className="flex flex-1 flex-col justify-center p-8 lg:p-10">
          <div className="flex items-center gap-3 text-xs font-semibold text-neutral-500">
            <span className="rounded-full bg-yeti-lime/10 px-2.5 py-0.5 font-bold uppercase tracking-wider text-yeti-lime">
              {post.category}
            </span>
            <span>{post.date}</span>
            <span className="text-neutral-300">·</span>
            <span>{post.readTime} read</span>
          </div>
          <p className="mt-4 font-sans text-base leading-relaxed text-neutral-600">
            {post.excerpt}
          </p>
          <div className="mt-6">
            <span className="group/link inline-flex items-center gap-2 font-sans text-sm font-bold text-yeti-lime transition hover:gap-3">
              Read full article
              <svg
                className="h-4 w-4 transition-transform group-hover/link:translate-x-1"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function BlogCard({ post, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-yeti-lime/10"
    >
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-yeti-lime via-yeti-lime/60 to-yeti-lime/20" />

      <div className="flex flex-1 flex-col p-6">
        {/* Meta row */}
        <div className="flex items-center gap-3 text-[11px] font-semibold text-neutral-500">
          <span className="rounded-full bg-yeti-lime/10 px-2.5 py-0.5 font-bold uppercase tracking-wider text-yeti-lime">
            {post.category}
          </span>
          <span>{post.date}</span>
        </div>

        {/* Title */}
        <h3 className="mt-3 font-serif text-lg font-semibold leading-snug text-neutral-900 transition-colors group-hover:text-yeti-lime-dark">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="mt-2.5 flex-1 font-sans text-sm leading-relaxed text-neutral-500">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
          <span className="font-sans text-[11px] font-semibold text-neutral-400">
            {post.readTime} read
          </span>
          <span className="group/link inline-flex items-center gap-1.5 font-sans text-xs font-bold text-yeti-lime transition hover:gap-2.5">
            Read more
            <svg
              className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Hover glow */}
      <div
        className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-yeti-lime/0 transition-all duration-500 group-hover:bg-yeti-lime/5"
        aria-hidden
      />
    </motion.article>
  );
}

export default function BlogSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [blogPosts, setBlogPosts] = useState(fallbackPosts);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/blog`)
      .then((res) => {
        if (res.data.length > 0) setBlogPosts(res.data);
      })
      .catch(() => {
        /* keep fallback data */
      });
  }, []);

  const featured = blogPosts.find((p) => p.featured);
  const remaining =
    activeCategory === "All"
      ? blogPosts.filter((p) => !p.featured)
      : blogPosts.filter(
          (p) => !p.featured && p.category === activeCategory
        );

  return (
    <section
      id="blog"
      className="relative bg-neutral-50 py-16 sm:py-24"
      aria-labelledby="blog-title"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(154,205,50,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(154,205,50,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-yeti-lime/25 to-transparent" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-yeti-lime/20 to-transparent" />
      </div>

      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.3em] text-yeti-lime"
          >
            <span
              className="inline-block h-2 w-2 rotate-45 border border-yeti-lime bg-yeti-lime/30"
              aria-hidden
            />
            Blog & News
            <span
              className="inline-block h-2 w-2 rotate-45 border border-yeti-lime bg-yeti-lime/30"
              aria-hidden
            />
          </motion.p>
          <motion.h2
            id="blog-title"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 font-serif text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl"
          >
            Stories & Updates
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mx-auto mt-4 max-w-lg font-sans text-neutral-500"
          >
            The latest from Yeti Fashion Design—industry insights, student
            stories, and production milestones.
          </motion.p>
        </div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {blogCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-neutral-900 text-yeti-lime shadow-md"
                  : "border border-neutral-300 text-neutral-500 hover:border-yeti-lime/50 hover:text-yeti-lime"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Featured post */}
        {(activeCategory === "All" ||
          activeCategory === featured?.category) &&
          featured && <FeaturedPost post={featured} />}

        {/* Posts grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {remaining.map((post, i) => (
            <BlogCard key={post._id} post={post} index={i} />
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a
            href="#blog"
            className="inline-flex items-center gap-2 rounded-full border-2 border-neutral-900 px-8 py-3 font-sans text-sm font-bold text-neutral-900 transition-all hover:bg-neutral-900 hover:text-yeti-lime hover:shadow-lg"
          >
            View all articles
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
