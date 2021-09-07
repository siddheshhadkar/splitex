const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

const registerFieldsCheck = [
  body("name", "Name needs to have 3 characters at minimum")
    .trim()
    .isLength({ min: 3 }),
  body("email", "Enter a valid email address")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "Password needs to have minimum 8 chars").isLength({
    min: 8,
    max: 72,
  }),
];

const loginFieldsCheck = [
  body("email", "Enter a valid email address")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "Password needs to have minimum 8 chars").isLength({
    min: 8,
    max: 72,
  }),
];

const balanceFieldCheck = [body("amount").isNumeric()];

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      success: false,
    });
  }
  return next();
};

const getPasswordHash = async (req, res, next) => {
  password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  req["passwordHash"] = await bcrypt.hash(password, salt);
  return next();
};

module.exports = {
  registerFieldsCheck,
  loginFieldsCheck,
  balanceFieldCheck,
  validateFields,
  getPasswordHash,
};
