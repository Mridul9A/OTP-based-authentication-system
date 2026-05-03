const express = require('express');
const cors = require("cors");

const app = express();
const authRoutes = require("./routes/authRoutes.routes");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

module.exports = app;