const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["News", "Blog", "Events"],
    },
    excerpt: { type: String, required: true },
    content: { type: String, default: "" },
    date: { type: String, required: true },
    readTime: { type: String, default: "3 min" },
    featured: { type: Boolean, default: false },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
