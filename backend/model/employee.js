const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  walletAddress: {type: String, unique: true, required: true},
//   email: String,
//   position: String,
  salary: Number,
  type: {type: String, default: 'Businness'},
  deductions: { type: Number, default: 0 },
  // interval: { type: Number, default: null },
  lastPaid: { type: Date, default: null },
});

module.exports = mongoose.model('Employee', employeeSchema);
