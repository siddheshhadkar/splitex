const { dbCreateUser } = require("../db/user.db");

const createUser = async (user) => {
  // modify user obj here(as required)
  try {
    return await dbCreateUser(user);
  } catch (e) {
    throw e;
  }
};

module.exports = {
  createUser,
};
