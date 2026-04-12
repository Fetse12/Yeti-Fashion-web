require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const seed = require("./seed");

const authRoutes = require("./routes/auth");
const galleryRoutes = require("./routes/gallery");
const blogRoutes = require("./routes/blog");
const messageRoutes = require("./routes/messages");

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB & Seed
connectDB().then(() => {
  seed();
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/messages", messageRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Yeti API server running on http://localhost:${PORT}`);
});
