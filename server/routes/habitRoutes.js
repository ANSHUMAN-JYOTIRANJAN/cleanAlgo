const express = require("express");

const {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit,
  completeHabit,
} = require("../controllers/habitController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// All habit routes require login
router.use(protect);

// Create a habit
router.post("/", createHabit);

// Get logged-in user's habits
router.get("/", getHabits);

// Update a habit
router.put("/:id", updateHabit);

// Delete a habit
router.delete("/:id", deleteHabit);

// Complete a habit
router.post("/:id/complete", completeHabit);

module.exports = router;
