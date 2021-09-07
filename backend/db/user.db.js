const User = require("./../models/user.model");

// create new user
const dbCreateUser = async (user) => {
  // db logic
  User.create(user, function (err, small) {
    if (err) return err;
    // saved!
  });
};

const dbGetUser = async (user) => {
  // db logic
  try {
    const query = await User.find(user).select({
      name: 1,
      email: 1,
      password: 1,
    });
    return { data: query[0], statusCode: 200 };
  } catch (e) {
    throw { errorMessage: "Malformed query", statusCode: 400 };
  }
};

const dbAddBalance = async (user, amount) => {
  // db logic
  try {
    console.log(user, amount);
    await User.updateOne(user, { $inc: { balance: amount } });
    return { statusCode: 200 };
  } catch (e) {
    throw { errorMessage: "Malformed query", statusCode: 400 };
  }
};

module.exports = {
  dbCreateUser,
  dbGetUser,
  dbAddBalance,
};
