const { dbCreateUser, dbGetUser, dbAddBalance } = require("../db/user.db");

const createUser = async (user) => {
  // modify user obj here(as required)
  try {
    return await dbCreateUser(user);
  } catch (e) {
    throw e;
  }
};

const findUser = async (user) => {
  // modify user obj here(as required)
  try {
    return await dbGetUser(user);
  } catch (e) {
    throw e;
  }
};

const addBalance = async (user, amount) => {
  // modify user obj here(as required)
  try {
    return await dbAddBalance(user, amount);
  } catch (e) {
    throw e;
  }
};

module.exports = {
  createUser,
  findUser,
  addBalance,
};
