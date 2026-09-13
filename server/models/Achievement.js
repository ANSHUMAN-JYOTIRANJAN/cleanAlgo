const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    icon: {
      type: String,
      default: "🏆",
    },

    requirementType: {
      type: String,
      enum: [
        "level",
        "totalXp",
        "questsCompleted",
        "habitsCompleted",
        "streak",
      ],
      required: true,
    },

    requirementValue: {
      type: Number,
      required: true,
    },

    xpReward: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Achievement", achievementSchema);
