const express = require('express');
const router = express.Router();
const cities = require('../utils/cities');
const {
  fetchCityBusinesses,
  fetchCityWeatherData,
  getCompositeCities,
} = require('../utils/helpers');

// GET /cities?limit=3
router.get('/', async (req, res) => {
  try {
    const isNumber = new RegExp('^[0-9]$');
    const limitDefault = 10;
    const limit = req.query.limit;
    const isLimitValid = isNumber.test(limit);

    // Retrieve weather data for all cities from openweather api
    const citiesRes = await Promise.all(
      cities.map((city) => fetchCityWeatherData(city.lat, city.lon))
    );
    // Retrieve businesses data for all cities from yelp fusion api
    const citiesWithBusinesses = await Promise.all(
      citiesRes.map((city) =>
        fetchCityBusinesses(city, isLimitValid ? limit : limitDefault)
      )
    );
    // Combine data in one object by mathing coordinates
    const compositeCities = getCompositeCities(citiesRes, citiesWithBusinesses);

    // Respond with composed object
    res.status(200).send(compositeCities);
  } catch (err) {
    // Send some kind of error message if something doesn't work
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
