const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    age: { type: Number },
    education: { type: String, trim: true },
    duration: {
      type: String,
      enum: ["3-month", "6-month"],
      required: true,
    },
    motivation: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "contacted", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enrollment", enrollmentSchema);
