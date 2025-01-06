// routes/authRoutes.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
const { JWT_SECRET } = require("../config/config");

const router = express.Router();

// Utility function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "1h" });
};

// Signup Route
router.post("/signup", async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (email, password, username) VALUES (?, ?, ?)";
    db.query(sql, [email, hashedPassword, username], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ error: "Email already exists" });
        }
        return res.status(500).json({ error: "Database error" });
      }

      const token = generateToken(result.insertId);

      res.status(201).json({
        message: "User registered successfully",
        token,
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Error hashing password" });
  }
});
router.post("/login", (req, res) => {
  const { user_id, user_pass } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? OR username = ?";
  db.query(sql, [user_id,user_id], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid username/email or password" });
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(user_pass, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username/email or password" });
    }

    const token = generateToken(user.id);
    res.status(200).json({
      message: "Login successful",
      token,
      username: user.username,
      userId: user.user_id,
    });
  });
});
// Login Route (User)


// Admin Login Route
router.post("/admin/login", (req, res) => {
  const { user_id, password } = req.body;

  const sql = "SELECT * FROM admin WHERE admin_uname = ? OR admin_email = ?";
  db.query(sql, [user_id, user_id], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (result.length === 0) return res.status(401).json({ error: "Invalid credentials" });

    const adminUser = result[0];

    if (password !== adminUser.admin_pwd) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(adminUser.admin_id);
    res.status(200).json({
      message: "Login successful",
      token,
      username: adminUser.admin_uname,
    });
  });
});

module.exports = router;
