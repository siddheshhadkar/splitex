const {
  createTransaction,
  updateTransaction,
  fetchAllTransactions,
} = require("../services/transaction.services");

const postTransaction = async (req, res) => {
  const transaction = req.body;
  try {
    const result = await createTransaction(transaction, req.user.id);
    return res.status(200).json({ data: result.data, success: true });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
};

const putTransaction = async (req, res) => {
  const transactionId = req.body.transactionId;
  try {
    const result = await updateTransaction(transactionId, req.user.id);
    return res.status(200).json({ data: result.data, success: true });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const result = await fetchAllTransactions(req.user.id);
    return res.status(200).json({ data: result.data, success: true });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ errorMessage: e.errorMessage, success: false });
  }
};

module.exports = {
  postTransaction,
  putTransaction,
  getAllTransactions,
};
