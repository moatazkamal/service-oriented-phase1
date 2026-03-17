const express = require("express");
const { getMyProfile, getWelcome } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", protect, getMyProfile);
router.get("/welcome", protect, getWelcome);

module.exports = router;