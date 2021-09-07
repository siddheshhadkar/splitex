const router = require("express").Router();
const {
  registerFieldsCheck,
  validateFields,
} = require("../../middlewares/user.middleware");
const {
  postUser,
  getUser,
  putBalance,
  getToken,
} = require("../../controllers/user.controller");
const { validateToken, getPasswordHash } = require("../../helpers");

router.post(
  "/",
  registerFieldsCheck,
  validateFields,
  getPasswordHash,
  postUser
);
router.get("/", validateToken, getUser);
router.put("/", validateToken, putBalance);
router.post("/login", registerFieldsCheck, validateFields, getToken);

module.exports = router;
