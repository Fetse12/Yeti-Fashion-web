const express = require("express");
const Blog = require("../models/Blog");
const auth = require("../middleware/auth");

const router = express.Router();

/**
 * GET /api/blog — public, list all posts
 */
router.get("/", async (req, res) => {
  try {
    const posts = await Blog.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * POST /api/blog — protected, create post
 */
router.post("/", auth, async (req, res) => {
  try {
    const { title, category, excerpt, content, date, readTime, featured } =
      req.body;

    const post = await Blog.create({
      title,
      category,
      excerpt,
      content: content || "",
      date,
      readTime: readTime || "3 min",
      featured: featured || false,
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * PUT /api/blog/:id — protected, update post
 */
router.put("/:id", auth, async (req, res) => {
  try {
    const post = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * DELETE /api/blog/:id — protected, delete post
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Blog.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
