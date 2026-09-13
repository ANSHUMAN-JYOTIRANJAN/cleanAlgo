const express = require("express");

const {
  getAchievements,
  getUserAchievements,
} = require("../controllers/achievementController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.get("/", getAchievements);

router.get("/me", getUserAchievements);

module.exports = router;
