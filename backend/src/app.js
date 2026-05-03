const express = require('express');
const cors = require("cors");

const app = express();
const authRoutes = require("./routes/authRoutes.routes");

// Middleware

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

// Auth Routes
app.use("/auth", authRoutes);

module.exports = app;