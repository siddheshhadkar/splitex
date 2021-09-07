const {
  addTransactionFieldsCheck,
  settleTransactionFieldsCheck,
  validateFields,
} = require("../../middlewares/transaction.middleware");
const {
  postTransaction,
  putTransaction,
  getAllTransactions,
} = require("../../controllers/transaction.controller");
const { validateToken } = require("../../helpers");

const router = require("express").Router();

router.post(
  "/",
  addTransactionFieldsCheck,
  validateFields,
  validateToken,
  postTransaction
);

router.put(
  "/",
  settleTransactionFieldsCheck,
  validateFields,
  validateToken,
  putTransaction
);

router.get("/all", validateFields, validateToken, getAllTransactions);

module.exports = router;
