/**
 * Seed script — run once to populate initial data.
 * Usage: node seed.js
 */
require("dotenv").config();
const mongoose = require("mongoose");
const Gallery = require("./models/Gallery");
const Blog = require("./models/Blog");
const User = require("./models/User");

const galleryItems = [
  {
    title: "Draping Studio",
    category: "Academy",
    description: "Students mastering the art of fabric draping on dress forms.",
    gradient: "from-emerald-900 via-neutral-900 to-neutral-800",
    image: "/images/gallery_draping.png",
  },
  {
    title: "Pattern Making",
    category: "Production",
    description: "Precision CAD patterns graded for high-volume manufacturing.",
    gradient: "from-neutral-800 via-neutral-900 to-emerald-950",
    image: "/images/gallery_pattern.png",
  },
  {
    title: "Sewing Line",
    category: "Production",
    description: "Industrial sewing operations producing quality garments at scale.",
    gradient: "from-neutral-900 via-emerald-950 to-neutral-800",
    image: "/images/gallery_sewing.png",
  },
  {
    title: "Student Collection",
    category: "Academy",
    description: "Final year showcase featuring original student designs.",
    gradient: "from-emerald-950 via-neutral-900 to-neutral-800",
    image: "/images/gallery_collection.png",
  },
  {
    title: "Fabric Lab",
    category: "Lab",
    description: "Testing fabric behavior, shrinkage, and wash durability.",
    gradient: "from-neutral-800 via-emerald-950 to-neutral-900",
    image: "/images/gallery_fabric_lab.png",
  },
  {
    title: "Fashion Show",
    category: "Events",
    description: "Annual runway event celebrating Yeti talent and craftsmanship.",
    gradient: "from-neutral-900 via-neutral-800 to-emerald-950",
    image: "/images/gallery_fashion_show.png",
  },
];

const blogPosts = [
  {
    title: "Yeti Academy Welcomes New Cohort of 40 Fashion Students",
    category: "News",
    date: "Apr 10, 2026",
    excerpt:
      "Our latest intake brings passionate designers from across Ethiopia, ready to master pattern-making, draping, and garment construction.",
    readTime: "3 min",
    featured: true,
  },
  {
    title: "The Art of Draping: Why Every Designer Should Master the Form",
    category: "Blog",
    date: "Apr 5, 2026",
    excerpt:
      "Draping is more than a technique—it's a conversation between fabric and the human body. We explore why this skill remains essential.",
    readTime: "5 min",
    featured: false,
  },
  {
    title: "Yeti Partners with Adama Textile Hub for Production Expansion",
    category: "News",
    date: "Mar 28, 2026",
    excerpt:
      "A new partnership will triple our production capacity, bringing more Ethiopian-made garments to international markets.",
    readTime: "4 min",
    featured: false,
  },
  {
    title: "Sustainable Fashion Manufacturing in East Africa",
    category: "Blog",
    date: "Mar 20, 2026",
    excerpt:
      "How Yeti Production is leading the charge in responsible garment manufacturing with minimal waste and ethical labor.",
    readTime: "6 min",
    featured: false,
  },
  {
    title: "Annual Fashion Show: Celebrating Student Creativity",
    category: "Events",
    date: "Mar 15, 2026",
    excerpt:
      "This year's showcase featured 25 student collections, with designs inspired by Ethiopian heritage and modern aesthetics.",
    readTime: "4 min",
    featured: false,
  },
  {
    title: "From Sketch to Garment: A Student's Journey at Yeti",
    category: "Blog",
    date: "Mar 8, 2026",
    excerpt:
      "Follow one student's transformation from beginner sketches to producing a full ready-to-wear collection in 12 months.",
    readTime: "7 min",
    featured: false,
  },
];

async function seed() {
  try {
    const galleryCount = await Gallery.countDocuments();
    const blogCount = await Blog.countDocuments();
    const userCount = await User.countDocuments();

    if (userCount === 0) {
      console.log("Seeding default superadmin...");
      await User.create({
        username: process.env.ADMIN_USERNAME || "admin",
        password: process.env.ADMIN_PASSWORD || "admin123",
        role: "superadmin",
        permissions: ["gallery", "blog", "messages", "enrollments"],
      });
      console.log("✅ Seeded default superadmin");
    }

    if (galleryCount === 0 && blogCount === 0) {
      console.log("Seeding initial data...");
      await Gallery.insertMany(galleryItems);
      console.log(`✅ Seeded ${galleryItems.length} gallery items`);

      await Blog.insertMany(blogPosts);
      console.log(`✅ Seeded ${blogPosts.length} blog posts`);
    } else {
      console.log("Database already contains data. Skipping seed.");
    }
  } catch (err) {
    console.error("Seed error:", err.message);
  }
}

module.exports = seed;
