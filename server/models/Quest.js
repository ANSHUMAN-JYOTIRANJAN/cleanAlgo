const mongoose = require("mongoose");

const questSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      default: "",
      maxlength: 500,
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

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard", "epic"],
      default: "easy",
    },

    xpReward: {
      type: Number,
      required: true,
      min: 0,
    },

    goldReward: {
      type: Number,
      default: 0,
      min: 0,
    },

    statReward: {
      type: Number,
      default: 1,
      min: 0,
    },

    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },

    deadline: {
      type: Date,
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Quest", questSchema);
