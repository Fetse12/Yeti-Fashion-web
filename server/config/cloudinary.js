const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "demo_cloud_name",
  api_key: process.env.CLOUDINARY_API_KEY || "demo_api_key",
  api_secret: process.env.CLOUDINARY_API_SECRET || "demo_api_secret",
});

// Configure Multer storage engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "yeti_fashion", // The folder in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 1000, crop: "limit" }], // Optional: auto compress/resize
  },
});

module.exports = { cloudinary, storage };
