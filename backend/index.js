require("dotenv").config()
require('./config/database').connect()
const express = require('express')
const auth = require('./middleware/auth')
const User = require('./model/user')
const Employee = require('./model/employee')
const cors = require('cors')
const Transaction = require("./model/transaction")

const port = process.env.PORT || 4000 
const app = express()
app.use(express.json())
app.use(cors())

app.get('/', async(req, res) => {
  res.status(200).json({message: 'Hello World!'})
})

app.get('/employees', auth, async (req, res) => {
  try {
    const userWalletAddress = req.user
    const type = req.query.type
    let user = await User.findOne({walletAddress: userWalletAddress}) 
    if(!user) {
      user = await User.create({walletAddress: userWalletAddress, employees: []})
    }
    const employees = user.employees;
    res.status(200).json(type ? employees.filter((e) => e.type = type) : employees)
  } catch (error) {
    console.error({error})
    res.status(500).json({message: 'Error fetching employees'})
  }
});

app.post('/employee', auth, async (req, res) => {
  const employeeData = req.body
  const userWalletAddress = req.user

  try {
    let user = await User.findOne({walletAddress: userWalletAddress})
    if(!user) {
      user = await User.create({walletAddress: userWalletAddress, employees: []})
    }
    const {firstName, lastName, walletAddress, salary} = employeeData
    
    if(!firstName || !lastName || !walletAddress || !salary) {
      return res.status(400).json({message: "Invalid employee data"})
    }

    // Check if an employee with the same wallet address already exists
    const duplicateEmployee = user.employees.find(
      (employee) => employee.walletAddress === walletAddress
    );

    if (duplicateEmployee) {
      return res.status(409).json({ message: "Employee with the same wallet address already exists." });
    }

    const newEmployee = await Employee.create(employeeData)
    user.employees.push(newEmployee)
    await user.save()

    res.status(200).json({ message: 'Employee data saved' })
  } catch (error) {
    console.error({error})
    res.status(500).json({message: 'Error creating employee'})
  }
});

app.post('/employee/paid/:employeeId', auth, async (req, res) => {
  const employeeId = req.params.employeeId;
  const employeeData = req.body
  const userWalletAddress = req.user

  try {
    let user = await User.findOne({ walletAddress: userWalletAddress });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const employeeIndex = user.employees.findIndex((employee) => employee._id == employeeId);

    if (employeeIndex === -1) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, {lastPaid: new Date().toUTCString()}, { new: true });
    user.employees[employeeIndex] = updatedEmployee;

    const newTransaction = await Transaction.create({firstName: updatedEmployee.firstName, lastName: updatedEmployee.lastName, walletAddress: updatedEmployee.walletAddress, amount: updatedEmployee.salary, status: "SUCCESS"}); //Employee.create(employeeData)
    user.transactions.unshift(newTransaction);

    await user.save();

    res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });

  } catch (error) {
    console.error({error})
    res.status(500).json({message: 'Error updating employee'})
  }
});


// Create a new endpoint for bulk employee creation
app.post('/employees', auth, async (req, res) => {
  const userWalletAddress = req.user;
  const {employees} = req.body; // An array of employee data

    if(!employees) {
      return res.status(401).json({message: "Invalid employee data"})
    }

  try {
    let user = await User.findOne({ walletAddress: userWalletAddress });
    if(!user) {
      user = await User.create({walletAddress: userWalletAddress, employees: []})
    }

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const createdEmployees = await Employee.create(employees);
    user.employees = user.employees.concat(createdEmployees);
    await user.save();

    res.status(200).json({ message: 'Employees created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating employees' });
  }
});

// Create an endpoint for employee update by employee ID
app.put('/employee/:employeeId', auth, async (req, res) => {
  const userWalletAddress = req.user;
  const employeeId = req.params.employeeId;
  const {data} = req.body;

  try {
    let user = await User.findOne({ walletAddress: userWalletAddress });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const employeeIndex = user.employees.findIndex((employee) => employee._id == employeeId);

    if (employeeIndex === -1) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, data, { new: true });

    user.employees[employeeIndex] = updatedEmployee;
    await user.save();

    res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating employee' });
  }
});

// Create an endpoint for employee deletion by employee ID
app.delete('/employee/:employeeId', auth, async (req, res) => {
  const userWalletAddress = req.user;
  const employeeId = req.params.employeeId;

  try {
    let user = await User.findOne({ walletAddress: userWalletAddress });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const employeeIndex = user.employees.findIndex((employee) => employee._id == employeeId);

    if (employeeIndex === -1) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    user.employees.splice(employeeIndex, 1);
    await user.save();

    await Employee.findByIdAndDelete(employeeId);

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting employee' });
  }
});

// Create an endpoint for getting a single employee by employee ID
app.get('/employee/:employeeId', auth, async (req, res) => {
  const userWalletAddress = req.user;
  const employeeId = req.params.employeeId;

  try {
    let user = await User.findOne({ walletAddress: userWalletAddress });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const employee = user.employees.find((employee) => employee._id == employeeId);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting employee' });
  }
});

app.get('/transactions', auth, async (req, res) => {
  try {
    const userWalletAddress = req.user;
    let user = await User.findOne({walletAddress: userWalletAddress});
    if(!user) {
      user = await User.create({walletAddress: userWalletAddress, transactions: []});
    }
    const transactions = user.transactions;
    res.status(200).json(transactions);
  } catch (error) {
    console.error({error});
    res.status(500).json({message: 'Error fetching transactions'});
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
