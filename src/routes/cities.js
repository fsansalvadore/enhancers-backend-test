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
    const businessesLimitDefault = 10;
    const businessesLimit = req.query.bLimit;
    const isBusinessesLimitValid = isNumber.test(businessesLimit);

    // Retrieve weather data for all cities from openweather api
    const citiesRes = await Promise.all(
      cities.map((city) => fetchCityWeatherData(city.lat, city.lon))
    );
    // Retrieve businesses data for all cities from yelp fusion api
    const citiesWithBusinesses = await Promise.all(
      citiesRes.map((city) =>
        fetchCityBusinesses(
          city,
          isBusinessesLimitValid ? businessesLimit : businessesLimitDefault
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
