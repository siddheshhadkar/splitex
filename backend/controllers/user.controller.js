const jwt = require("jsonwebtoken");
const {
  createUser,
  findUser,
  addBalance,
  fetchAllUsers,
} = require("../services/user.services");
const { checkPassword } = require("./../helpers");

const postUser = async (req, res) => {
  user = {
    name: req.body.name,
    email: req.body.email,
    password: req.passwordHash,
    balance: 100,
  };
  try {
    await createUser(user);
    return res.status(200).json({ success: true });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
};

const getUser = async (req, res) => {
  try {
    const result = await findUser(req.user.email);
    console.log(result);
    return res.status(200).json({ data: result.data, success: true });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
};

const putBalance = async (req, res) => {
  try {
    await addBalance(req.user.email, req.body.amount);
    return res.status(200).json({ success: true });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
};

const getToken = async (req, res) => {
  const password = req.body.password;
  let result;
  try {
    result = await findUser(req.body.email);
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
  const user = result.data;
  const passwordHash = user.password;
  if (await checkPassword(password, passwordHash)) {
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 300 },
      (err, token) => {
        if (!err) {
          return res.status(200).json({ data: token, success: true });
        } else {
          return res
            .status(400)
            .json({ errorMessage: "Error signing token", success: false });
        }
      }
    );
  } else {
    return res
      .status(401)
      .json({ errorMessage: "Wrong password", success: false });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await fetchAllUsers(req.user.email);
    return res.status(200).json({ data: users.data, success: true });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
};

module.exports = {
  postUser,
  getUser,
  putBalance,
  getToken,
  getAllUsers,
};
