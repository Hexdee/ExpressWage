const mongoose = require('mongoose')

const Employee = require('./employee')
const Transaction = require('./transaction')

const userSchema = new mongoose.Schema({
    walletAddress: {type: String, unique: true, required: true},
    employees: {type: [Employee.schema], default: []},
    transactions: {type: [Transaction.schema], default: []}
})

module.exports = mongoose.model('User', userSchema)