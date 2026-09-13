const Quest = require("../models/Quest");
const User = require("../models/User");
const Activity = require("../models/Activity");

// ========================================
// CREATE QUEST
// POST /api/quests
// ========================================

const createQuest = async (req, res, next) => {
  try {
    const {
      title,
      description,
      category,
      difficulty,
      xpReward,
      goldReward,
      statReward,
      deadline,
    } = req.body || {};

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Quest title is required",
      });
    }

    const quest = await Quest.create({
      user: req.user.userId,
      title,
      description,
      category,
      difficulty,
      xpReward,
      goldReward,
      statReward,
      deadline,
    });

    res.status(201).json({
      success: true,
      message: "Quest created successfully",
      quest,
    });
  } catch (error) {
    next(error);
  }
};

// ========================================
// GET ALL QUESTS
// GET /api/quests
// ========================================

const getQuests = async (req, res, next) => {
  try {
    const quests = await Quest.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: quests.length,
      quests,
    });
  } catch (error) {
    next(error);
  }
};

// ========================================
// GET SINGLE QUEST
// GET /api/quests/:id
// ========================================

const getQuest = async (req, res, next) => {
  try {
    const quest = await Quest.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!quest) {
      return res.status(404).json({
        success: false,
        message: "Quest not found",
      });
    }

    res.status(200).json({
      success: true,
      quest,
    });
  } catch (error) {
    next(error);
  }
};

// ========================================
// UPDATE QUEST
// PUT /api/quests/:id
// ========================================

const updateQuest = async (req, res, next) => {
  try {
    const quest = await Quest.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!quest) {
      return res.status(404).json({
        success: false,
        message: "Quest not found",
      });
    }

    // Don't allow editing completed quests
   if (quest.status !== "pending") {
    return res.status(400).json({
        success: false,
        message: `Quest cannot be completed because it is already ${quest.status}`
    });
}

    const {
      title,
      description,
      category,
      difficulty,
      xpReward,
      goldReward,
      statReward,
      deadline,
    } = req.body;

    if (title !== undefined) quest.title = title;
    if (description !== undefined) quest.description = description;
    if (category !== undefined) quest.category = category;
    if (difficulty !== undefined) quest.difficulty = difficulty;
    if (xpReward !== undefined) quest.xpReward = xpReward;
    if (goldReward !== undefined) quest.goldReward = goldReward;
    if (statReward !== undefined) quest.statReward = statReward;
    if (deadline !== undefined) quest.deadline = deadline;

    await quest.save();

    res.status(200).json({
      success: true,
      message: "Quest updated successfully",
      quest,
    });
  } catch (error) {
    next(error);
  }
};

// ========================================
// DELETE QUEST
// DELETE /api/quests/:id
// ========================================

const deleteQuest = async (req, res, next) => {
  try {
    const quest = await Quest.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!quest) {
      return res.status(404).json({
        success: false,
        message: "Quest not found",
      });
    }

    await quest.deleteOne();

    res.status(200).json({
      success: true,
      message: "Quest deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// ========================================
// COMPLETE QUEST
// POST /api/quests/:id/complete
// ========================================

const completeQuest = async (req, res, next) => {
  try {
    const quest = await Quest.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!quest) {
      return res.status(404).json({
        success: false,
        message: "Quest not found",
      });
    }

    // Prevent duplicate rewards
    if (quest.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Quest is already completed",
      });
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ==================================
    // MARK QUEST COMPLETED
    // ==================================

    quest.status = "completed";
    quest.completedAt = new Date();

    await quest.save();

    // ==================================
    // ADD XP
    // ==================================

    const xpReward = quest.xpReward || 0;
    const goldReward = quest.goldReward || 0;

    user.xp += xpReward;
    user.totalXp += xpReward;
    user.gold += goldReward;

    // ==================================
    // INCREASE STAT
    // ==================================

    const statReward = quest.statReward || 0;

    if (
      quest.category &&
      quest.category !== "general" &&
      user.stats[quest.category] !== undefined
    ) {
      user.stats[quest.category] += statReward;
    }

    // ==================================
    // LEVEL SYSTEM
    // ==================================

    let levelUps = 0;

    const xpRequired = (level) => {
      return level * 100;
    };

    while (user.xp >= xpRequired(user.level)) {
      user.xp -= xpRequired(user.level);

      user.level += 1;

      levelUps++;
    }

    await user.save();

    // ==================================
    // CREATE ACTIVITY
    // ==================================

    await Activity.create({
      user: user._id,
      type: "quest_completed",
      description: `Completed quest: ${quest.title}`,
      xpEarned: xpReward,
      goldEarned: goldReward,
      stat: quest.category !== "general" ? quest.category : null,
      statIncrease: statReward,
    });

    // ==================================
    // RESPONSE
    // ==================================

    res.status(200).json({
      success: true,
      message: "Quest completed successfully 🎉",

      reward: {
        xpEarned: xpReward,
        goldEarned: goldReward,
        stat: quest.category,
        statIncrease: statReward,
        levelUps,
      },

      user: {
        level: user.level,
        xp: user.xp,
        totalXp: user.totalXp,
        gold: user.gold,
        stats: user.stats,
      },

      quest,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createQuest,
  getQuests,
  getQuest,
  updateQuest,
  deleteQuest,
  completeQuest,
};
