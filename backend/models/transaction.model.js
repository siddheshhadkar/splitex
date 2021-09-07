const mongoose = require("../db/db.config");
const { Schema } = mongoose;

const transactionSchema = new Schema({
  description: String,
  date: { type: Date, default: Date.now },
  totalAmount: Number,
  owner: {
    ownerId: { type: mongoose.ObjectId, required: true },
    amount: Number,
  },
  friends: [
    {
      userId: { type: mongoose.ObjectId, required: true },
      amount: Number,
      paymentStatus: Boolean,
      settledDate: Date,
    },
  ],
});

module.exports = mongoose.model("Transaction", transactionSchema);
