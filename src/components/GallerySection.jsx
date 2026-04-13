import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "";

/* ── Fallback data if API is unreachable ─────────────────────────── */
const fallbackItems = [
  {
    _id: "f1",
    title: "Draping Studio",
    category: "Academy",
    description: "Students mastering the art of fabric draping on dress forms.",
    gradient: "from-emerald-900 via-neutral-900 to-neutral-800",
    accent: "bg-emerald-400/20",
    image: "/images/gallery_draping.png",
  },
  {
    _id: "f2",
    title: "Pattern Making",
    category: "Production",
    description: "Precision CAD patterns graded for high-volume manufacturing.",
    gradient: "from-neutral-800 via-neutral-900 to-emerald-950",
    accent: "bg-yeti-lime/20",
    image: "/images/gallery_pattern.png",
  },
  {
    _id: "f3",
    title: "Sewing Line",
    category: "Production",
    description:
      "Industrial sewing operations producing quality garments at scale.",
    gradient: "from-neutral-900 via-emerald-950 to-neutral-800",
    accent: "bg-emerald-500/15",
    image: "/images/gallery_sewing.png",
  },
  {
    _id: "f4",
    title: "Student Collection",
    category: "Academy",
    description: "Final year showcase featuring original student designs.",
    gradient: "from-emerald-950 via-neutral-900 to-neutral-800",
    accent: "bg-yeti-lime/15",
    image: "/images/gallery_collection.png",
  },
  {
    _id: "f5",
    title: "Fabric Lab",
    category: "Lab",
    description: "Testing fabric behavior, shrinkage, and wash durability.",
    gradient: "from-neutral-800 via-emerald-950 to-neutral-900",
    accent: "bg-emerald-400/15",
    image: "/images/gallery_fabric_lab.png",
  },
  {
    _id: "f6",
    title: "Fashion Show",
    category: "Events",
    description:
      "Annual runway event celebrating Yeti talent and craftsmanship.",
    gradient: "from-neutral-900 via-neutral-800 to-emerald-950",
    accent: "bg-yeti-lime/20",
    image: "/images/gallery_fashion_show.png",
  },
];

const accentMap = {
  Academy: "bg-emerald-400/20",
  Production: "bg-yeti-lime/20",
  Lab: "bg-emerald-400/15",
  Events: "bg-yeti-lime/20",
};

const categories = ["All", "Academy", "Production", "Lab", "Events"];

function GalleryCard({ item, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const accent = item.accent || accentMap[item.category] || "bg-yeti-lime/15";
  const gradient =
    item.gradient || "from-neutral-900 via-neutral-800 to-emerald-950";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} shadow-md transition-all duration-500 group-hover:shadow-xl group-hover:shadow-yeti-lime/10`}
      >
        {/* Uploaded image background */}
        {item.image && (
          <img
            src={item.image.startsWith("http") ? item.image : `${API_URL}${item.image}`}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity duration-500 group-hover:opacity-95"
          />
        )}

        {/* Decorative pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(154, 205, 50, 0.3) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(154, 205, 50, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Glow effect on hover */}
        <motion.div
          className={`absolute inset-0 ${accent} rounded-2xl`}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Decorative sewing line */}
        <svg
          className="absolute right-4 top-4 h-20 w-20 text-yeti-lime/15 transition-all duration-500 group-hover:text-yeti-lime/35"
          viewBox="0 0 80 80"
          fill="none"
        >
          <path
            d="M10 70 C 25 55, 35 30, 40 10 C 45 30, 55 55, 70 70"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <circle cx="40" cy="10" r="3" stroke="currentColor" strokeWidth="1" />
          <circle cx="10" cy="70" r="2" fill="currentColor" />
          <circle cx="70" cy="70" r="2" fill="currentColor" />
        </svg>

        {/* Large number watermark */}
        <span className="absolute left-4 top-4 font-sans text-7xl font-black text-white/[0.04] transition-all duration-500 group-hover:text-yeti-lime/[0.08]">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Category badge */}
        <div className="absolute left-4 top-4 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-yeti-lime/30 bg-neutral-900/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-yeti-lime backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-yeti-lime animate-pulse" />
            {item.category}
          </span>
        </div>

        {/* Bottom content */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-5">
          <motion.div
            animate={{ y: isHovered ? 0 : 8, opacity: isHovered ? 1 : 0.9 }}
            transition={{ duration: 0.35 }}
          >
            <h3 className="font-serif text-xl font-semibold text-white">
              {item.title}
            </h3>
            <p className="mt-1.5 font-sans text-xs leading-relaxed text-neutral-300/90">
              {item.description}
            </p>
          </motion.div>

          {/* Animated underline */}
          <motion.div
            className="mt-3 h-0.5 bg-gradient-to-r from-yeti-lime to-yeti-lime/30"
            animate={{ width: isHovered ? "100%" : "30%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-neutral-900/90 via-neutral-900/40 to-transparent" />
      </div>
    </motion.div>
  );
}

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [galleryItems, setGalleryItems] = useState(fallbackItems);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/gallery`)
      .then((res) => {
        if (res.data.length > 0) setGalleryItems(res.data);
      })
      .catch(() => {
        /* keep fallback data */
      });
  }, []);

  const filtered =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section
      id="gallery"
      className="relative bg-neutral-900 py-16 sm:py-24"
      aria-labelledby="gallery-title"
    >
      {/* Background texture */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(154,205,50,0.5) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-yeti-lime/30 to-transparent" />
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
            Gallery
            <span
              className="inline-block h-2 w-2 rotate-45 border border-yeti-lime bg-yeti-lime/30"
              aria-hidden
            />
          </motion.p>
          <motion.h2
            id="gallery-title"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Our Work in Focus
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mx-auto mt-4 max-w-lg font-sans text-neutral-400"
          >
            From the academy floor to the production line—a visual journey
            through craft, design, and garment making.
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
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-yeti-lime text-neutral-900 shadow-md shadow-yeti-lime/25"
                  : "border border-neutral-700 text-neutral-400 hover:border-yeti-lime/40 hover:text-yeti-lime"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <GalleryCard key={item._id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
