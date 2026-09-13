const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      enum: [
        "health",
        "intelligence",
        "discipline",
        "strength",
        "social",
        "general",
      ],
      default: "general",
    },

    frequency: {
      type: String,
      enum: ["daily", "weekly"],
      default: "daily",
    },

    xpReward: {
      type: Number,
      default: 10,
      min: 0,
    },

    currentStreak: {
      type: Number,
      default: 0,
    },

    bestStreak: {
      type: Number,
      default: 0,
    },

    lastCompletedAt: {
      type: Date,
      default: null,
    },

    completedDates: [
      {
        type: Date,
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Habit", habitSchema);
