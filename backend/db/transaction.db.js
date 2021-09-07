const Transaction = require("../models/transaction.model");

const dbCreateTransaction = async (transaction) => {
  const result = await Transaction.insertMany([transaction]).catch(() => {
    throw { errorMessage: "Error inserting transaction", statusCode: 500 };
  });
  return { data: result[0], statusCode: 200 };
};

const dbUpdateTransaction = async (transactionId, friendId) => {
  const transaction = await Transaction.findOneAndUpdate(
    {
      _id: transactionId,
      "friends.userId": friendId,
    },
    {
      $set: {
        "friends.$.paymentStatus": true,
        "friends.$.settledDate": Date.now(),
      },
    },
    { new: true }
  ).catch((e) => {
    console.log(e);
    throw { errorMessage: "Error fetching transactions", statusCode: 500 };
  });

  if (transaction === null) {
    throw {
      errorMessage: "No transaction record exists for this user",
      statusCode: 400,
    };
  }
  return { data: transaction, statusCode: 200 };
};

const dbFetchAllTransactions = async (userId) => {
  const result = await Transaction.find({
    $or: [
      { "owner.ownerId": userId },
      { friends: { $elemMatch: { userId: userId } } },
    ],
  }).catch(() => {
    throw { errorMessage: "Error fetching transactions", statusCode: 500 };
  });
  if (result.length === 0) {
    throw {
      errorMessage: "No transaction record exists for this user",
      statusCode: 400,
    };
  }
  return { data: result, statusCode: 200 };
};

module.exports = {
  dbCreateTransaction,
  dbUpdateTransaction,
  dbFetchAllTransactions,
};
