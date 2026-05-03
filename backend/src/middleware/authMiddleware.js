const jwt = require("jsonwebtoken");

const SECRET = "secret";


module.exports = function (req, res, next) {
  const auth = req.headers.authorization;

  if (!auth) return res.status(401).json({ message: "No token" });

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);

    req.user = decoded; 
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};