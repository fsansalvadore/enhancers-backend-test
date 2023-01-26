const express = require('express');
const router = express.Router();
const {
  fetchCityBusinesses,
  fetchCityWeatherData,
  getCompositeCities,
  isNumber,
} = require('../utils/helpers');
const { CITIES, DEFAULT_BUSINESSES_LIMIT } = require('../utils/constants');

// GET /cities?bLimit=3
router.get('/', async (req, res) => {
  try {
    const businessesLimit = req.query.bLimit;
    const isBusinessesLimitValid = isNumber.test(businessesLimit);

    // Retrieve weather data for all cities from openweather api
    const citiesRes = await Promise.all(
      CITIES.map((city) => fetchCityWeatherData(city.lat, city.lon))
    );
    // Retrieve businesses data for all cities from yelp fusion api
    const citiesWithBusinesses = await Promise.all(
      citiesRes.map((city) =>
        fetchCityBusinesses(
          city,
          isBusinessesLimitValid ? businessesLimit : DEFAULT_BUSINESSES_LIMIT
        )
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
