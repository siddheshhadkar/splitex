const router = require("express").Router();
const {
  registerFieldsCheck,
  validateFields,
} = require("../../middlewares/user.middleware");
const { postUser } = require("../../controllers/user.controller");

router.post("/", registerFieldsCheck, validateFields, postUser);

module.exports = router;
