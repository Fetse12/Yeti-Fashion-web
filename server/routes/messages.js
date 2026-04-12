const express = require("express");
const Message = require("../models/Message");
const auth = require("../middleware/auth");

const router = express.Router();

/**
 * POST /api/messages — public, send a message
 */
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const newMessage = await Message.create({ name, email, phone, message });
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * GET /api/messages — protected, list all messages
 */
router.get("/", auth, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET /api/messages/count — protected, get unread count
 */
router.get("/count", auth, async (req, res) => {
  try {
    const unreadCount = await Message.countDocuments({ status: "unread" });
    res.json({ count: unreadCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * PUT /api/messages/:id/read — protected, mark as read
 */
router.put("/:id/read", auth, async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { status: "read" },
      { new: true }
    );
    if (!message) return res.status(404).json({ message: "Message not found" });
    res.json(message);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * DELETE /api/messages/:id — protected, delete a message
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ message: "Message not found" });
    res.json({ message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
