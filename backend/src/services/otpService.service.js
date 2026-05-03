const store = require("../store/memoryStore");
const generateOTP = require("../utils/generateOtp");

function requestOTP(identifier) {
  const user = store[identifier];


  if (user && user.blockedUntil > Date.now()) {
    throw new Error("User is blocked. Try later.");
  }

  const otp = generateOTP();

  store[identifier] = {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000, 
    attempts: 0,
    blockedUntil: null
  };

  console.log(`OTP for ${identifier}: ${otp}`);

  return true;
}

function verifyOTP(identifier, otp) {
  const user = store[identifier];

  if (!user) throw new Error("No OTP requested");

  if (user.blockedUntil && user.blockedUntil > Date.now()) {
    throw new Error("User blocked. Try later.");
  }

  if (Date.now() > user.expiresAt) {
    throw new Error("OTP expired");
  }

  if (user.otp !== otp) {
    user.attempts++;

    if (user.attempts >= 3) {
      user.blockedUntil = Date.now() + 10 * 60 * 1000;
    }

    throw new Error("Invalid OTP");
  }

  delete store[identifier];

  return true;
}

module.exports = { requestOTP, verifyOTP };