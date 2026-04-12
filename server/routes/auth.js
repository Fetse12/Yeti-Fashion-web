const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

// Hash is generated on first server start and cached
let hashedPassword = null;

function getHashedPassword() {
  if (!hashedPassword) {
    hashedPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10);
  }
  return hashedPassword;
}

/**
 * POST /api/auth/login
 * Body: { username, password }
 * Returns: { token, user: { username } }
 */
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  if (username !== process.env.ADMIN_USERNAME) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const valid = bcrypt.compareSync(password, getHashedPassword());
  if (!valid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  res.json({ token, user: { username } });
});

module.exports = router;
