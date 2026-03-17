const express = require("express");
const { register, login } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// protected route for any logged-in user
router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected profile route accessed successfully",
    user: req.user,
  });
});

// protected route for admin only
router.get("/admin-only", protect, isAdmin, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Admin",
    user: req.user,
  });
});

module.exports = router;