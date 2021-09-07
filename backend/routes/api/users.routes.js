const router = require("express").Router();
const {
  registerFieldsCheck,
  validateFields,
} = require("../../middlewares/user.middleware");
const { validateToken } = require("./../../helpers/index");
const { getUsers } = require("../../controllers/users.controller");

// add validateToken in post route
router.get("/", validateFields, getUsers);

module.exports = router;
