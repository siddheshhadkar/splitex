const { getAllUsers } = require("../services/users.services");

const getUsers = async (req, res) => {
  // const name = req.body.name;   //fetch user obj here
  try {
    const users = await getAllUsers();
    return res.status(200).json({ success: true , users: users});
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
};

module.exports = {
    getUsers,
};
