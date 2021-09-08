const Transaction = require("../models/transaction.model");
const User = require("../models/user.model");

const dbUpdateWallet = async (userId, amount) => {
  const balance = await User.find({ _id: userId }, "balance").catch(() => {
    throw { errorMessage: "Error fetching user", statusCode: 500 };
  });

  if (balance[0].balance < amount) {
    throw { errorMessage: "Insufficient amount in wallet", statusCode: 500 };
  }

  await User.updateOne({ _id: userId }, { $inc: { balance: -amount } }).catch(
    () => {
      throw { errorMessage: "Error updating wallet", statusCode: 500 };
    }
  );
};

const dbCreateTransaction = async (transaction) => {
  try {
    await dbUpdateWallet(transaction.owner.ownerId, transaction.totalAmount);
  } catch (e) {
    throw e;
  }

  const result = await Transaction.insertMany([transaction]).catch(() => {
    throw { errorMessage: "Error creating new transaction", statusCode: 500 };
  });
  return { data: result[0], statusCode: 200 };
};

const dbUpdateTransaction = async (transactionId, friendId) => {
  const amount = await Transaction.findOne(
    { _id: transactionId, "friends.userId": friendId },
    { "friends.$": 1, "owner.ownerId": 1 }
  ).catch((e) => {
    console.log(e);
    throw {
      errorMessage: "Error fetching transaction amount",
      statusCode: 500,
    };
  });

  try {
    await dbUpdateWallet(friendId, amount.friends[0].amount);
    await User.updateOne(
      { _id: amount.owner.ownerId },
      { $inc: { balance: amount.friends[0].amount } }
    ).catch(() => {
      throw { errorMessage: "Error adding amount to wallet", statusCode: 500 };
    });
  } catch (e) {
    throw e;
  }

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
