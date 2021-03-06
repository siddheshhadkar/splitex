const { body, validationResult } = require("express-validator");

const addTransactionFieldsCheck = [
  body("description", "Description must contain at least 3 characters")
    .trim()
    .isLength({
      min: 3,
    }),
  body("totalAmount").isNumeric(),
  body("owner.amount").isNumeric(),
  body("friends.*.userId").trim().notEmpty(),
  body("friends.*.amount").isNumeric(),
];

const settleTransactionFieldsCheck = [body("transactionId").trim().notEmpty()];

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
  addTransactionFieldsCheck,
  settleTransactionFieldsCheck,
  validateFields,
};
