const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true
    })
);

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.json({
        message: "Life RPG API is running"
    });
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});