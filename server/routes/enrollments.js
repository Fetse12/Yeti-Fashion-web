const express = require("express");
const Enrollment = require("../models/Enrollment");
const auth = require("../middleware/auth");

const router = express.Router();

/**
 * POST /api/enrollments — public, submit an enrollment application
 */
router.post("/", async (req, res) => {
  try {
    const { fullName, email, phone, age, education, duration, motivation } = req.body;
    const enrollment = await Enrollment.create({
      fullName,
      email,
      phone,
      age,
      education,
      duration,
      motivation,
    });
    res.status(201).json(enrollment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * GET /api/enrollments — protected, list all enrollments
 */
router.get("/", auth, async (req, res) => {
  try {
    const enrollments = await Enrollment.find().sort({ createdAt: -1 });
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET /api/enrollments/count — protected, get pending count
 */
router.get("/count", auth, async (req, res) => {
  try {
    const pendingCount = await Enrollment.countDocuments({ status: "pending" });
    res.json({ count: pendingCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * PUT /api/enrollments/:id/status — protected, update status
 */
router.put("/:id/status", auth, async (req, res) => {
  try {
    const { status } = req.body;
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: "after" }
    );
    if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });
    res.json(enrollment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * DELETE /api/enrollments/:id — protected, delete an enrollment
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
    if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });
    res.json({ message: "Enrollment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
