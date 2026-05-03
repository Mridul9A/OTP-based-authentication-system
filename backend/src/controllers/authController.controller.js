const jwt = require("jsonwebtoken");
const { requestOTP, verifyOTP } = require("../services/otpService.service");

const SECRET = "secret";

// POST /auth/request-otp
exports.requestOtp = (req, res) => {
  try {
    const { identifier } = req.body;

    requestOTP(identifier);

    res.json({ message: "OTP sent" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// POST /auth/verify-otp
exports.verifyOtp = (req, res) => {
  try {
    const { identifier, otp } = req.body;

    verifyOTP(identifier, otp);

    // Generate JWT token
    const token = jwt.sign({ identifier }, SECRET, {
      expiresIn: "1h"
    });

    res.json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET /auth/me
exports.getMe = (req, res) => {
  res.json({
    user: {
      id: "123",
      identifier: req.user.identifier
    }
  });
};