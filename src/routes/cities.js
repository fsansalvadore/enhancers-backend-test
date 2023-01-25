const express = require('express');
const router = express.Router();
const cities = require('../utils/cities');
const {
  fetchCityBusinesses,
  fetchCityWeatherData,
  getCompositeCities
} = require('../utils/helpers');

// GET /cities
// list of available cities
router.get("/", async (req, res) => {
  const limit = req.query.limit;

  const citiesRes = await Promise.all([...cities.map((city) => fetchCityWeatherData(city.lat, city.lon))])
  const citiesWithBusinesses = await Promise.all(citiesRes.map(city => fetchCityBusinesses(city, limit)))
  const compositeCities = getCompositeCities(citiesRes, citiesWithBusinesses)

  if (!citiesRes) res.status(500).send({message: "Couln't find cities"})

  res.status(200).send(compositeCities);
});

module.exports = router;