const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const checkPassword = async (password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash);
};

const validateToken = (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).json({
      errorMessage: "Token not found, request denied",
      success: false,
    });
  }
  const [, token] = authToken.split(" ");
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (!err) {
      req["user"] = {};
      req.user.id = decoded.id;
      req.user.email = decoded.email;
      return next();
    }
    return res
      .status(401)
      .json({ errorMessage: "Invalid token, request denied", success: false });
  });
};

module.exports = {
  checkPassword,
  validateToken,
};
