const store = require("../store/memoryStore");
const generateOTP = require("../utils/generateOtp");

// Generate and store OTP
function requestOTP(identifier) {
  const user = store[identifier];

  // Check if user is currently blocked
  if (user && user.blockedUntil > Date.now()) {
    throw new Error("User is blocked. Try later.");
  }

  const otp = generateOTP();

  // Store OTP with expiry and reset attempts
  store[identifier] = {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000,  // 5 minutes expiry
    attempts: 0,
    blockedUntil: null
  };

  // Mock sending OTP (console)
  console.log(`OTP for ${identifier}: ${otp}`);

  return true;
}


// Verify OTP and handle attempts/blocking
function verifyOTP(identifier, otp) {
  const user = store[identifier];

  if (!user) throw new Error("No OTP requested");

  // Check if user is blocked
  if (user.blockedUntil && user.blockedUntil > Date.now()) {
    throw new Error("User blocked. Try later.");
  }

  // Check OTP expiry
  if (Date.now() > user.expiresAt) {
    throw new Error("OTP expired");
  }

   // Invalid OTP → increment attempts
  if (user.otp !== otp) {
    user.attempts++;

    // Block user after 3 failed attempts
    if (user.attempts >= 3) {
      user.blockedUntil = Date.now() + 10 * 60 * 1000;
    }

    throw new Error("Invalid OTP");
  }

   // Success → remove OTP
  delete store[identifier];

  return true;
}

module.exports = { requestOTP, verifyOTP };