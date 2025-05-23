const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "لطفاً برای دسترسی وارد شوید",
    });
  }

  try {
    const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = {userId:decodedTokenInfo.userId,email:decodedTokenInfo.email}

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'توکن منقضی شده است' });
    }
    res.status(401).json({ message: 'توکن نامعتبر است' });
  }
};

module.exports = authMiddleware;