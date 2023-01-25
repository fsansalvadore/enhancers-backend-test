const express = require('express');
const router = express.Router();
const axios = require('axios');
const cities = require('../utils/cities');

// GET /cities
// list of available cities
router.get("/", async (req, res) => {
  const citiesRes = await Promise.all([...cities.map((city) => fetchCityWeatherData(city.lat, city.lon))])
  const citiesWithBusinesses = fetchAndAddBusinessesByCity(citiesRes);

  console.log("cities", citiesWithBusinesses)
});

// fetch city weather
const fetchCityWeatherData = async (lat, lon) => {
  const res = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPENWEATHER_API}`)
    .catch((err) => console.error(err));

  return res.data;
}

// fetch city businesses
const fetchCityBusinesses = async (city) => {
  const headers = {
    method: 'get',
    url: `https://api.yelp.com/v3/businesses/search?latitude=${city.lat}&longitude=${city.lon}&sort_by=best_match&limit=1`,
    headers: {
      "Authorization": `Bearer ${process.env.YELP_FUSION_API}`,
      "accept": 'application/json'
    }
  };

  const res = await axios(headers)
    .catch((err) => console.error(err));

  return res.data;
}

// compose data
const fetchAndAddBusinessesByCity = (cities) =>{
  let newCities = [];

  cities.forEach(async (city) => {
      const cityBusinessesData = await fetchCityBusinesses(city)

      const compositeCities = {
        city: city,
        businesses: cityBusinessesData.data
      }
  
      newCities.push(compositeCities)
  });

  console.log("newCities", newCities)

  return newCities
}

// GET /cities/:id
// city weather data + business data
// const city = {
//   lon: "",
//   lat: "",
//   timezone: "",
//   timezone_offset: "",
//   current: {},
//   minutely: {},
//   hourly: {},
//   daily: {},
//   alerts: {},
//   businesses: [
//     {
//       id: "Nlof_ograHvCMfWVcIYqmw",
//       alias: "museo-nazionale-del-cinema-torino",
//       name: "Museo Nazionale del Cinema",
//       image_url: "https://s3-media3.fl.yelpcdn.com/bphoto/thXeSAYAk0N9p5m2Q1O6sQ/o.jpg",
//       is_closed: false,
//       url: "https://www.yelp.com/biz/museo-nazionale-del-cinema-torino?adjust_creative=4j4077H8Spw_HTif8E_4fA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=4j4077H8Spw_HTif8E_4fA",
//       review_count: 55,
//       categories: [
//         {
//           alias: "museums",
//           title: "Museums"
//         }
//       ],
//       rating: 4.5,
//       coordinates: {
//         latitude: 45.0685183,
//         longitude: 7.6922662
//       },
//       transactions: [],
//       location: {
//         address1: "Via Montebello 20",
//         address2: null,
//         address3: null,
//         city: "Torino",
//         zip_code: "10124",
//         country: "IT",
//         state: "TO",
//         display_address: [
//           "Via Montebello 20",
//           "10124 Torino",
//           "Italy"
//         ]
//       },
//       phone: "+390118123565",
//       display_phone: "+39 011 812 3565",
//       distance: 1440.108806852547
//     }
//   ],
// total: 1100,
// region: {
//   center: {
//     longitude: 7.675323486328125,
//     latitude: 45.0734743192446
//   }
// }
// }

module.exports = router;