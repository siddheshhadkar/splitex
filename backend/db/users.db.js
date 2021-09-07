const User = require("./../models/user.model");

const dbGetAllUsers = async () => {
  const query = await User.find({}).select({ name: 1, email: 1 });
  // console.log(query);
  return query;
};

module.exports = { dbGetAllUsers };
