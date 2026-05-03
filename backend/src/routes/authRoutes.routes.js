const express = require("express");
const router = express.Router();

const {
  requestOtp,
  verifyOtp,
  getMe
} = require("../controllers/authController.controller");

const authMiddleware = require("../middleware/authMiddleware");

// Routes
router.post("/request-otp", requestOtp); // generate OTP
router.post("/verify-otp", verifyOtp);   // verify OTP and login

// Protected route
router.get("/me", authMiddleware, getMe);  // get user info

module.exports = router;