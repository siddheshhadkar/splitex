const router = require("express").Router();
const {
  registerFieldsCheck,
  loginFieldsCheck,
  balanceFieldCheck,
  validateFields,
  getPasswordHash,
} = require("../../middlewares/user.middleware");
const {
  postUser,
  getUser,
  putBalance,
  getToken,
} = require("../../controllers/user.controller");
const { validateToken } = require("../../helpers");

router.post("/login", loginFieldsCheck, validateFields, getToken);

router.post(
  "/",
  registerFieldsCheck,
  validateFields,
  getPasswordHash,
  postUser
);

router.get("/", validateToken, getUser);

router.put("/", balanceFieldCheck, validateFields, validateToken, putBalance);

module.exports = router;
