const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

// Routes
router.get('/', locationController.getLocations);

// API endpoint
router.get('/api', locationController.getLocationsApi);

module.exports = router;
