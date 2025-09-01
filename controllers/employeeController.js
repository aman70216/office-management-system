// controllers/employeeController.js
const mongoose = require("mongoose");
const Employee = require('../models/Employee');
const Department = require('../models/Department');

// Render Employee List with Filters + Pagination
exports.getEmployees = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = 5;
    const search = (req.query.search || '').trim();
    const department = (req.query.department || '').trim();
    const jobTitle = (req.query.jobTitle || '').trim();

    const query = {};
    if (search) query.$or = [
      { name: new RegExp(search, 'i') },
      { email: new RegExp(search, 'i') }
    ];
    if (department) query.department = department;
    if (jobTitle) query.position = new RegExp(jobTitle, 'i');

    const total = await Employee.countDocuments(query);
    const pages = Math.max(Math.ceil(total / limit), 1);
    const skip = (page - 1) * limit;

    const employees = await Employee.find(query)
      .populate('department')
      .populate('supervisor')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const departments = await Department.find();

    res.render('employees', {
      employees,
      departments,
      pagination: { total, page, pages },
      filters: { search, department, jobTitle }
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Create Employee
exports.createEmployee = async (req, res) => {
  try {
    if (!req.body.supervisor || !mongoose.Types.ObjectId.isValid(req.body.supervisor)) {
      req.body.supervisor = null; // ignore invalid supervisor
    }

    await Employee.create(req.body);
    res.redirect('/employees');
  } catch (err) {
    res.status(400).send(err.message);
  }
};


// Update Employee
exports.updateEmployee = async (req, res) => {
  try {
    if (!req.body.supervisor || !mongoose.Types.ObjectId.isValid(req.body.supervisor)) {
      req.body.supervisor = null;
    }

    await Employee.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
    res.redirect('/employees');
  } catch (err) {
    res.status(400).send(err.message);
  }
};
// Delete Employee
exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.redirect('/employees');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// API: JSON response with pagination
exports.getEmployeesApi = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const search = (req.query.search || '').trim();
    const department = (req.query.department || '').trim();
    const jobTitle = (req.query.jobTitle || '').trim();

    const query = {};
    if (search) query.$or = [
      { name: new RegExp(search, 'i') },
      { email: new RegExp(search, 'i') }
    ];
    if (department) query.department = department;
    if (jobTitle) query.position = new RegExp(jobTitle, 'i');

    const total = await Employee.countDocuments(query);
    const pages = Math.max(Math.ceil(total / limit), 1);
    const skip = (page - 1) * limit;

    const employees = await Employee.find(query)
      .populate('department', 'name')
      .populate('supervisor', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    res.json({ data: employees, pagination: { total, page, limit, pages } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
