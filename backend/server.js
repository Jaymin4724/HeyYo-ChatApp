// Package Imports
import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";

// File Imports
import ConnectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

// Variables
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON bodies (from incoming requests - JSON to JS objects)
app.use(cookieParser()); // Parse cookies (from incoming requests - string to JS objects)

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

ConnectDB();
