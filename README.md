# 🎮 Life RPG

> Turn your real life into an RPG — complete quests, build habits, earn XP, level up, and become a better version of yourself.

Life RPG is a full-stack gamification platform that transforms everyday goals, habits, learning, fitness, and personal development into an RPG-style experience.

Instead of simply tracking tasks, users build their own character by completing real-world quests and habits, earning experience points, improving stats, maintaining streaks, unlocking achievements, and progressing through levels.

---

## ✨ Features

### 🔐 Authentication

- User registration
- User login
- JWT-based authentication
- Protected routes
- Current user (`/me`) endpoint
- Secure password handling

### ⚔️ Quest System

Users can create real-life quests such as:

- Solve DSA problems
- Study for an exam
- Complete a project
- Go to the gym
- Read a book
- Learn a new technology

Each quest contains:

- Title
- Description
- Category
- Difficulty
- XP reward
- Stat reward
- Deadline
- Completion status

Quest operations:

- Create quest
- View all quests
- View individual quest
- Update quest
- Delete quest
- Complete quest

### ⭐ XP & Level System

Completing quests rewards the player with XP.

User
  ↓
Create Quest
  ↓
Complete Quest
  ↓
Earn XP
  ↓
Increase Stats
  ↓
Level Up
  ↓
Unlock Achievements
  ↓
Track Progress
