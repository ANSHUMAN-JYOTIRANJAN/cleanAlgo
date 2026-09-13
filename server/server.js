const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// ========================================
// LOAD ENVIRONMENT VARIABLES
// ========================================

dotenv.config();

// ========================================
// DATABASE
// ========================================

const connectDB = require("./config/db");

// ========================================
// ROUTES
// ========================================

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const questRoutes = require("./routes/questRoutes");
const habitRoutes = require("./routes/habitRoutes");
const achievementRoutes = require("./routes/achievementRoutes");
const shopRoutes = require("./routes/shopRoutes");

// ========================================
// ERROR MIDDLEWARE
// ========================================

const {
    errorMiddleware,
    notFound
} = require("./middleware/errorMiddleware");

// ========================================
// APP
// ========================================

const app = express();

// ========================================
// DATABASE CONNECTION
// ========================================

connectDB();

// ========================================
// MIDDLEWARE
// ========================================

app.use(
    cors({
        origin: (origin, callback) => {
            const allowedOrigins = [
                process.env.CLIENT_URL,
                "http://localhost:5173",
                "http://localhost:5174",
                "http://127.0.0.1:5173",
                "http://127.0.0.1:5174"
            ].filter(Boolean);

            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
                return;
            }

            callback(new Error("Origin is not allowed by CORS"));
        },
        credentials: true
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========================================
// ROOT ROUTE
// ========================================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Life RPG API is running 🎮"
    });
});

// ========================================
// HEALTH CHECK
// ========================================

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy",
        timestamp: new Date()
    });
});

// ========================================
// API ROUTES
// ========================================

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/quests", questRoutes);

app.use("/api/habits", habitRoutes);

app.use("/api/achievements", achievementRoutes);

app.use("/api/shop", shopRoutes);

// ========================================
// ERROR HANDLING
// ========================================

app.use(notFound);

app.use(errorMiddleware);

// ========================================
// SERVER
// ========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Life RPG server running on port ${PORT}`);
    console.log(`🌐 http://localhost:${PORT}`);
});