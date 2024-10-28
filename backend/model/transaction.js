const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  walletAddress: String,
  amount: Number,
  status: String
});

module.exports = mongoose.model('Transaction', transactionSchema);
