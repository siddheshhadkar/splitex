const { dbGetAllUsers } = require("../db/users.db");

const getAllUsers = async () => {
  try {
    return await dbGetAllUsers();
  } catch (e) {
    throw e;
  }
};

module.exports = {
  getAllUsers,
};
