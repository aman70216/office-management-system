const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Routes
router.get('/', employeeController.getEmployees);
router.post('/', employeeController.createEmployee);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

// API endpoint
router.get('/api', employeeController.getEmployeesApi);

module.exports = router;
