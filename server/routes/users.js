const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// Middleware to check if user is superadmin
const requireSuperadmin = (req, res, next) => {
  if (req.user.role !== "superadmin") {
    return res.status(403).json({ message: "Access denied. Superadmin only." });
  }
  next();
};

/**
 * GET /api/users
 * Returns all users (superadmin only)
 */
router.get("/", auth, requireSuperadmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * POST /api/users
 * Create a new user (superadmin only)
 */
router.post("/", auth, requireSuperadmin, async (req, res) => {
  try {
    const { username, password, role, permissions } = req.body;
    
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const user = new User({
      username,
      password,
      role: role || "admin",
      permissions: permissions || [],
    });

    await user.save();
    
    // Create payload without password to return
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.status(201).json(userResponse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * PUT /api/users/:id/password
 * Change a user's password (superadmin can change any, admins only their own)
 */
router.put("/:id/password", auth, async (req, res) => {
  try {
    const { newPassword, currentPassword } = req.body;
    
    // Check authorization: must be superadmin or updating own password
    if (req.user.role !== "superadmin" && req.user.id !== req.params.id) {
      return res.status(403).json({ message: "You can only change your own password" });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Normal admins MUST provide currentPassword
    if (req.user.role !== "superadmin") {
      if (!currentPassword) {
         return res.status(400).json({ message: "Current password is required" });
      }
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect current password" });
      }
    }

    user.password = newPassword;
    await user.save();
    
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * PUT /api/users/:id/permissions
 * Change a user's permissions (superadmin only)
 */
router.put("/:id/permissions", auth, requireSuperadmin, async (req, res) => {
  try {
    const { permissions, role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "superadmin" && role !== "superadmin") {
       // Check if this is the last superadmin
       const superadmins = await User.countDocuments({ role: "superadmin" });
       if (superadmins <= 1) {
           return res.status(400).json({ message: "Cannot demote the last superadmin" });
       }
    }

    user.permissions = permissions;
    if (role) user.role = role;
    
    await user.save();
    
    const userResponse = user.toObject();
    delete userResponse.password;
    res.json(userResponse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * DELETE /api/users/:id
 * Delete a user (superadmin only)
 */
router.delete("/:id", auth, requireSuperadmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role === "superadmin") {
      return res.status(400).json({ message: "Cannot delete a superadmin. Demote to admin first." });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
