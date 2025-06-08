// Package Imports
import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import path from "path";

// File Imports
import ConnectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { app, server } from "./socket/socket.js";

// Variables
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Middleware
app.use(express.json()); // Parse JSON bodies (from incoming requests - JSON to JS objects)
app.use(cookieParser()); // Parse cookies (from incoming requests - string to JS objects)

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

ConnectDB();
