const axios = require('axios');

// fetch city weather
const fetchCityWeatherData = async (lat, lon) => {
  const res = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPENWEATHER_API}`)
    .catch((err) => console.error(err));

  return res.data;
}

// fetch city businesses
const fetchCityBusinesses = async (city, limit = 10) => {
  const headers = {
    method: 'get',
    url: `https://api.yelp.com/v3/businesses/search?latitude=${city.lat}&longitude=${city.lon}&sort_by=best_match&limit=${limit}`,
    headers: {
      "Authorization": `Bearer ${process.env.YELP_FUSION_API}`,
      "accept": 'application/json'
    }
  };

  const res = await axios(headers)
    .catch((err) => console.error(err));

  return res.data;
}

// compose city weather + business
// based on geo coordinates
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

    const compositeData = {
      weather: city,
      yelp: cityBusinessesData
    }

    return compositeData
  });

  module.exports = {
    fetchCityBusinesses,
    fetchCityWeatherData,
    getCompositeCities
  }