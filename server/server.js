require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const seed = require("./seed");

const authRoutes = require("./routes/auth");
const galleryRoutes = require("./routes/gallery");
const blogRoutes = require("./routes/blog");
const messageRoutes = require("./routes/messages");
const enrollmentRoutes = require("./routes/enrollments");
const userRoutes = require("./routes/users");

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

// Removed local uploads static sync

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/users", userRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Only listen locally, Vercel will handle production routing
if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Yeti API server running on http://localhost:${PORT}`);
  });
}

// Export the Express API for Vercel Serverless Functions
module.exports = app;
