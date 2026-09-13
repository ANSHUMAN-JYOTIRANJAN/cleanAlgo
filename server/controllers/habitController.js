const Habit = require("../models/Habit");
const User = require("../models/User");
const Activity = require("../models/Activity");

const createHabit = async (req, res) => {
  try {
    const { name, frequency, category } = req.body;

    if (!name || !frequency || !category) {
      return res.status(400).json({
        message: "Name, frequency and category are required",
      });
    }

    const habit = await Habit.create({
      user: req.user.userId,
      name,
      frequency,
      category,
    });

    res.status(201).json({
      message: "Habit created successfully",
      habit,
    });
  } catch (error) {
    console.error("Create habit error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      habits,
    });
  } catch (error) {
    console.error("Get habits error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

const updateHabit = async (req, res) => {
  try {
    const { name, frequency, category, isActive } = req.body;

    const habit = await Habit.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId,
      },
      {
        name,
        frequency,
        category,
        isActive,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }

    res.status(200).json({
      message: "Habit updated successfully",
      habit,
    });
  } catch (error) {
    console.error("Update habit error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }

    res.status(200).json({
      message: "Habit deleted successfully",
    });
  } catch (error) {
    console.error("Delete habit error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

const completeHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }

    if (!habit.isActive) {
      return res.status(400).json({
        message: "This habit is inactive",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const alreadyCompleted = habit.completedDates.some((date) => {
      const completedDate = new Date(date);
      completedDate.setHours(0, 0, 0, 0);

      return completedDate.getTime() === today.getTime();
    });

    if (alreadyCompleted) {
      return res.status(400).json({
        message: "Habit already completed today",
      });
    }

    habit.completedDates.push(today);
    habit.currentStreak += 1;
    habit.bestStreak = Math.max(habit.bestStreak, habit.currentStreak);
    habit.lastCompletedAt = today;

    await habit.save();

    // Reward habit completion
    const XP_REWARD = 15;
    const GOLD_REWARD = 5;

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.xp += XP_REWARD;
    user.totalXp += XP_REWARD;
    user.gold += GOLD_REWARD;

    // Attribute progression
    if (habit.category === "intelligence") {
      user.stats.intelligence += 1;
    } else if (habit.category === "strength") {
      user.stats.strength += 1;
    } else if (habit.category === "social") {
      user.stats.intelligence += 1;
    } else if (habit.category === "health") {
      user.stats.health += 1;
    } else if (habit.category === "discipline") {
      user.stats.discipline += 1;
    }

    await user.save();

    await Activity.create({
      user: req.user.userId,
      type: "habit_completed",
      description: `Completed habit: ${habit.name}`,
      xpEarned: XP_REWARD,
      goldEarned: GOLD_REWARD,
    });

    res.status(200).json({
      message: "Habit completed!",
      rewards: {
        xp: XP_REWARD,
        gold: GOLD_REWARD,
      },
      habit,
      user: {
        level: user.level,
        xp: user.xp,
        gold: user.gold,
        strength: user.strength,
        intelligence: user.intelligence,
        wisdom: user.wisdom,
        vitality: user.vitality,
        agility: user.agility,
        totalXp: user.totalXp,
        stats: user.stats,
      },
    });
  } catch (error) {
    console.error("Complete habit error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit,
  completeHabit,
};
