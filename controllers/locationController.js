// controllers/locationController.js
const axios = require('axios');

// Example: Use OpenWeatherMap or any location API
// Here I’ll just return mock data for simplicity

// Render Locations Page (UI)
exports.getLocations = async (req, res) => {
  try {
    // Later you can fetch from API or DB
    const locations = [
      { city: "Mumbai", country: "India" },
      { city: "New York", country: "USA" }
    ];
    res.render('locations', { locations });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// API: return locations as JSON
exports.getLocationsApi = async (req, res) => {
  try {
    // Example: external API call (replace with real one if needed)
    // const response = await axios.get(`https://api.example.com/locations`);
    // const locations = response.data;

    const locations = [
      { city: "Mumbai", country: "India" },
      { city: "London", country: "UK" },
      { city: "Tokyo", country: "Japan" }
    ];

    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
