const express = require("express");

const {
  createQuest,
  getQuests,
  getQuest,
  updateQuest,
  deleteQuest,
  completeQuest,
} = require("../controllers/questController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create quest
router.post("/", authMiddleware, createQuest);

// Get all quests
router.get("/", authMiddleware, getQuests);

// Get single quest
router.get("/:id", authMiddleware, getQuest);

// Update quest
router.put("/:id", authMiddleware, updateQuest);

// Delete quest
router.delete("/:id", authMiddleware, deleteQuest);

// Complete quest
router.post("/:id/complete", authMiddleware, completeQuest);

module.exports = router;
