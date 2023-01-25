const express = require('express');
const router = express.Router();
const axios = require('axios');
const cities = require('../utils/cities');
const OPENWEATHER_API = "1b15cf4482656544175a3c11404fd92e"

// GET /cities
// list of available cities
router.get("/", async (req, res) => {
  const citiesRes = await Promise.all([...cities.map((city) => fetchCityWeatherData(city.lat, city.lon))])
  const citiesWithBusinesses = await Promise.all(citiesRes.map(city => fetchCityBusinesses(city)))
  const compositeCities = getCompositeCities(citiesRes, citiesWithBusinesses)
  console.log("cities", compositeCities)
});

// fetch city weather
const fetchCityWeatherData = async (lat, lon) => {
  const res = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API}`)
    .catch((err) => console.error(err));

  return res.data;
}

// fetch city businesses
const fetchCityBusinesses = async (city) => {
  const headers = {
    method: 'get',
    url: `https://api.yelp.com/v3/businesses/search?latitude=${city.lat}&longitude=${city.lon}&sort_by=best_match&limit=10`,
    headers: {
      "Authorization": `Bearer ulNGm33_6FB54gEM4BHegXPbNEtJxaCLMp7IcbdddoE3xJCnNvC8IzG9psp2Qls4Dh0i9DcWmlBlGy43xOHiOJWSH8COifthklDOq9gA1-KLe0tkh6-kJ2hq6VvOY3Yx`,
      "accept": 'application/json'
    }
  };

  const res = await axios(headers)
    .catch((err) => console.error(err));

  return res.data;
}

const getCompositeCities = (cities, citiesWithBusinesses) =>
  cities.map(city => {
    const cLon = city.lon.toFixed(3);
    const cLat = city.lat.toFixed(3);

    const cityBusinessesData = citiesWithBusinesses.find(bCity => {
      const bLon = bCity.region.center.longitude.toFixed(3);
      const bLat = bCity.region.center.latitude.toFixed(3);
      const isMatch = bLon === cLon && bLat === cLat
      
      return isMatch;
    })

    return {
      ...city,
      businesses: cityBusinessesData
    }
  })

module.exports = router;