const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // Get the token from Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(400).json({code:400, message: "Access token missing" });
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({code:403, message: "Invalid or expired token" });
    }

    req.user = user; 
    next();
  });
};

module.exports = authenticateToken;
