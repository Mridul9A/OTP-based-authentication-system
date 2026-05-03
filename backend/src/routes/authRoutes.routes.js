const express = require("express");
const router = express.Router();

const {
  requestOtp,
  verifyOtp,
  getMe
} = require("../controllers/authController.controller");

const authMiddleware = require("../middleware/authMiddleware");

// Routes
router.post("/request-otp", requestOtp);
router.post("/verify-otp", verifyOtp);
router.get("/me", authMiddleware, getMe);

module.exports = router;