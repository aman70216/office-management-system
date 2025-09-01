// controllers/departmentController.js
const Department = require('../models/Department');
const Employee = require('../models/Employee');

// Render Department List
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().lean();
    res.render('departments', { departments });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Create Department
exports.createDepartment = async (req, res) => {
  try {
    await Department.create(req.body);
    res.redirect('/departments');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Update Department
exports.updateDepartment = async (req, res) => {
  try {
    await Department.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
    res.redirect('/departments');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Delete Department
exports.deleteDepartment = async (req, res) => {
  try {
    // Optional: prevent deleting if employees exist in this department
    const employees = await Employee.findOne({ department: req.params.id });
    if (employees) {
      return res.status(400).send("Cannot delete: Employees are assigned to this department");
    }

    await Department.findByIdAndDelete(req.params.id);
    res.redirect('/departments');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// API: JSON response for departments
exports.getDepartmentsApi = async (req, res) => {
  try {
    const departments = await Department.find().lean();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
