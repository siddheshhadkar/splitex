const User = require("./../models/user.model");

const dbCreateUser = async (user) => {
  const result = await User.find({ email: user.email }).catch(() => {
    throw { errorMessage: "Error fetching user", statusCode: 500 };
  });
  if (result.length === 0) {
    const r = await User.create(user).catch(() => {
      throw { errorMessage: "Error inserting user", statusCode: 500 };
    });
  } else {
    throw {
      errorMessage: `Email: ${user.email} is already associated with a different account`,
      statusCode: 400,
    };
  }
};

const dbGetUser = async (email) => {
  const query = await User.find({ email: email })
    .select({
      id: 1,
      name: 1,
      email: 1,
      password: 1,
    })
    .catch(() => {
      throw { errorMessage: "Error fetching user", statusCode: 500 };
    });
  if (query.length === 0) {
    throw {
      errorMessage: `There exists no user with email: ${email}`,
      statusCode: 400,
    };
  }
  return { data: query[0], statusCode: 200 };
};

const dbAddBalance = async (email, amount) => {
  try {
    await User.updateOne({ email: email }, { $inc: { balance: amount } });
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
