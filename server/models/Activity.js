const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: [
        "quest_completed",
        "habit_completed",
        "achievement_unlocked",
        "level_up",
        "xp_earned",
        "stat_increased",
      ],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    xpEarned: {
      type: Number,
      default: 0,
    },

    goldEarned: {
      type: Number,
      default: 0,
    },

    stat: {
      type: String,
      default: null,
    },

    statIncrease: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Activity", activitySchema);
