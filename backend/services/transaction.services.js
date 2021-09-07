const {
  dbCreateTransaction,
  dbUpdateTransaction,
  dbFetchAllTransactions,
} = require("../db/transaction.db");

const createTransaction = async (transaction, ownerId) => {
  transaction.owner["ownerId"] = ownerId;
  transaction.friends.map((friend) => {
    friend["paymentStatus"] = false;
  });
  try {
    return await dbCreateTransaction(transaction);
  } catch (e) {
    throw e;
  }
};

const updateTransaction = async (transactionId, friendId) => {
  try {
    return await dbUpdateTransaction(transactionId, friendId);
  } catch (e) {
    throw e;
  }
};

const fetchAllTransactions = async (userId) => {
  try {
    return await dbFetchAllTransactions(userId);
  } catch (e) {
    throw e;
  }
};

module.exports = {
  createTransaction,
  updateTransaction,
  fetchAllTransactions,
};
