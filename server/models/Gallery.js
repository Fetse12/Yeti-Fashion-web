const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["Academy", "Production", "Lab", "Events"],
    },
    description: { type: String, required: true },
    image: { type: String, default: "" },
    gradient: {
      type: String,
      default: "from-neutral-900 via-neutral-800 to-emerald-950",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", gallerySchema);
