const express = require("express");

const {
  getProfile,
  updateProfile,
  getStats,
  getActivity,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get profile
router.get("/profile", authMiddleware, getProfile);

// Update profile
router.put("/profile", authMiddleware, updateProfile);

// Get RPG stats
router.get("/stats", authMiddleware, getStats);

// Get activity history
router.get("/activity", authMiddleware, getActivity);

module.exports = router;
