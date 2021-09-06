const { body, validationResult } = require("express-validator");

const registerFieldsCheck = [
  //validate fields here
];

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

module.exports = {
  registerFieldsCheck,
  validateFields,
};
