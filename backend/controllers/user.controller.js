const { createUser } = require("../services/user.services");

const postUser = async (req, res) => {
  // const name = req.body.name;   //fetch user obj here
  try {
    await createUser(user);
    return res.status(200).json({ success: true });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
};

module.exports = {
  postUser,
};
