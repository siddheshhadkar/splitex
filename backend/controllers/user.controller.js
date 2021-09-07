const jwt = require("jsonwebtoken");

const {
  createUser,
  findUser,
  addBalance,
} = require("../services/user.services");

const { checkPassword } = require("./../helpers/index");

const postUser = async (req, res) => {
  // const name = req.body.name;   //fetch user obj here
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
  // const name = req.body.name;   //fetch user obj here
  user = {
    email: req.user.email,
  };
  try {
    const result = await findUser(user);
    console.log(result);
    return res.status(200).json({
      success: true,
      name: result.data.name,
      email: result.data.email,
    });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
};

const putBalance = async (req, res) => {
  // const name = req.body.name;   //fetch user obj here
  user = {
    email: req.user.email,
  };
  amount = req.body.addBalance;
  try {
    const result = await addBalance(user, amount);
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
    result = await findUser({
      email: req.body.email,
    });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
  const user = result.data;
  const passwordHash = user.password;
  if (await checkPassword(password, passwordHash)) {
    const payload = {
      id: user.id,
      email: user.email,
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3000 },
      (err, token) => {
        if (!err) {
          return res.status(200).json({
            data: {
              token: token,
              name: user.name,
              user_id: user.id,
            },
            success: true,
          });
        }
      }
    );
  } else {
    return res
      .status(401)
      .json({ errorMessage: "Wrong password", success: false });
  }
};

module.exports = {
  postUser,
  getUser,
  putBalance,
  getToken,
};
