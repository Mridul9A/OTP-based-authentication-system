const jwt = require("jsonwebtoken");

const SECRET = "secret";

// Middleware to protect routes using JWT
module.exports = function (req, res, next) {
  const auth = req.headers.authorization;

  // Check if token is provided
  if (!auth) return res.status(401).json({ message: "No token" });

  // Extract token from "Bearer <token>"
  const token = auth.split(" ")[1];

  try {
    // Verify token and attach user data to request
    const decoded = jwt.verify(token, SECRET);

    req.user = decoded; 
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};