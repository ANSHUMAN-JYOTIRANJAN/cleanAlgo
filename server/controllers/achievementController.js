const Achievement = require("../models/Achievement");
const User = require("../models/User");
const Quest = require("../models/Quest");
const Habit = require("../models/Habit");

const defaultAchievements = [
  {
    title: "First Quest",
    description: "Complete your first quest.",
    requirementType: "questsCompleted",
    requirementValue: 1,
    icon: "⚔️",
  },
  {
    title: "Habit Builder",
    description: "Complete your first habit.",
    requirementType: "habitsCompleted",
    requirementValue: 1,
    icon: "🔁",
  },
  {
    title: "Level Up",
    description: "Reach level 2.",
    requirementType: "level",
    requirementValue: 2,
    icon: "✨",
  },
];

const ensureDefaultAchievements = async () => {
  await Promise.all(
    defaultAchievements.map((achievement) =>
      Achievement.updateOne(
        { title: achievement.title },
        { $setOnInsert: achievement },
        { upsert: true },
      ),
    ),
  );
};

const getAchievements = async (req, res) => {
  try {
    await ensureDefaultAchievements();
    const achievements = await Achievement.find().sort({ createdAt: 1 });

    res.status(200).json({
      achievements,
    });
  } catch (error) {
    console.error("Get achievements error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getUserAchievements = async (req, res) => {
  try {
    await ensureDefaultAchievements();
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const [allAchievements, questsCompleted, habitsCompleted] = await Promise.all([
      Achievement.find().sort({ createdAt: 1 }),
      Quest.countDocuments({ user: user._id, status: "completed" }),
      Habit.countDocuments({ user: user._id, completedDates: { $ne: [] } }),
    ]);

    const values = {
      level: user.level,
      totalXp: user.totalXp,
      questsCompleted,
      habitsCompleted,
      streak: user.currentStreak,
    };

    const newlyUnlocked = allAchievements
      .filter((achievement) => values[achievement.requirementType] >= achievement.requirementValue)
      .map((achievement) => achievement._id);

    if (newlyUnlocked.length) {
      user.achievements = [...new Set([
        ...(user.achievements || []).map((id) => id.toString()),
        ...newlyUnlocked.map((id) => id.toString()),
      ])];
      await user.save();
    }

    const achievements = await Achievement.find({
      _id: { $in: user.achievements || [] },
    });

    res.status(200).json({
      achievements,
    });
  } catch (error) {
    console.error("Get user achievements error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getAchievements,
  getUserAchievements,
};
