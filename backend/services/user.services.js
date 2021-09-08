const { dbCreateUser, dbGetUser, dbAddBalance, dbFetchAllUsers } = require("../db/user.db");

const createUser = async (user) => {
  try {
    return await dbCreateUser(user);
  } catch (e) {
    throw e;
  }
};

const findUser = async (email) => {
  try {
    return await dbGetUser(email);
  } catch (e) {
    throw e;
  }
};

const addBalance = async (email, amount) => {
  try {
    return await dbAddBalance(email, amount);
  } catch (e) {
    throw e;
  }
};

const fetchAllUsers = async () => {
  try {
    return await dbFetchAllUsers();
  } catch (e) {
    throw e;
  }
};

module.exports = {
  createUser,
  findUser,
  addBalance,
  fetchAllUsers,
};
