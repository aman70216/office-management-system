const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

// Routes
router.get('/', departmentController.getDepartments);
router.post('/', departmentController.createDepartment);
router.put('/:id', departmentController.updateDepartment);
router.delete('/:id', departmentController.deleteDepartment);

// API endpoint
router.get('/api', departmentController.getDepartmentsApi);

module.exports = router;
