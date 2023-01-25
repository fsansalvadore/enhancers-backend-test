"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var express = require('express');

var router = express.Router();

var axios = require('axios');

var cities = require('../utils/cities');

var OPENWEATHER_API = "1b15cf4482656544175a3c11404fd92e"; // GET /cities
// list of available cities

router.get("/", function _callee(req, res) {
  var citiesRes, citiesWithBusinesses, compositeCities;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Promise.all(_toConsumableArray(cities.map(function (city) {
            return fetchCityWeatherData(city.lat, city.lon);
          }))));

        case 2:
          citiesRes = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(Promise.all(citiesRes.map(function (city) {
            return fetchCityBusinesses(city);
          })));

        case 5:
          citiesWithBusinesses = _context.sent;
          compositeCities = getCompositeCities(citiesRes, citiesWithBusinesses);
          console.log("cities", compositeCities);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}); // fetch city weather

var fetchCityWeatherData = function fetchCityWeatherData(lat, lon) {
  var res;
  return regeneratorRuntime.async(function fetchCityWeatherData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(axios.get("https://api.openweathermap.org/data/3.0/onecall?lat=".concat(lat, "&lon=").concat(lon, "&units=metric&appid=").concat(OPENWEATHER_API))["catch"](function (err) {
            return console.error(err);
          }));

        case 2:
          res = _context2.sent;
          return _context2.abrupt("return", res.data);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // fetch city businesses


var fetchCityBusinesses = function fetchCityBusinesses(city) {
  var headers, res;
  return regeneratorRuntime.async(function fetchCityBusinesses$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          headers = {
            method: 'get',
            url: "https://api.yelp.com/v3/businesses/search?latitude=".concat(city.lat, "&longitude=").concat(city.lon, "&sort_by=best_match&limit=1"),
            headers: {
              "Authorization": "Bearer ulNGm33_6FB54gEM4BHegXPbNEtJxaCLMp7IcbdddoE3xJCnNvC8IzG9psp2Qls4Dh0i9DcWmlBlGy43xOHiOJWSH8COifthklDOq9gA1-KLe0tkh6-kJ2hq6VvOY3Yx",
              "accept": 'application/json'
            }
          };
          _context3.next = 3;
          return regeneratorRuntime.awrap(axios(headers)["catch"](function (err) {
            return console.error(err);
          }));

        case 3:
          res = _context3.sent;
          return _context3.abrupt("return", res.data);

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var getCompositeCities = function getCompositeCities(cities, citiesWithBusinesses) {
  return cities.map(function (city) {
    var cLon = city.lon.toFixed(3);
    var cLat = city.lat.toFixed(3);
    var cityBusinessesData = citiesWithBusinesses.find(function (bCity) {
      var bLon = bCity.region.center.longitude.toFixed(3);
      var bLat = bCity.region.center.latitude.toFixed(3);
      var isMatch = bLon === cLon && bLat === cLat;
      return isMatch;
    });
    return {
      city: city,
      businesses: cityBusinessesData
    };
  });
}; // compose data
// const fetchAndAddBusinessesByCity = async (cities) =>{
//   const newCities = await cities.map(async (city) => {
//     const cityBusinessesData = await fetchCityBusinesses(city)
//     const compositeCities = {
//       city: city,
//       businesses: cityBusinessesData.data
//     }
//     return compositeCities
//   });
//   console.log("newCities", newCities)
//   return newCities.data


var fetchAndAddBusinessesByCity = function fetchAndAddBusinessesByCity(cities) {
  var withBusinesses, newCities;
  return regeneratorRuntime.async(function fetchAndAddBusinessesByCity$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Promise.all(cities.map(function _callee2(city) {
            var cityBusinessesData;
            return regeneratorRuntime.async(function _callee2$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return regeneratorRuntime.awrap(fetchCityBusinesses(city));

                  case 2:
                    cityBusinessesData = _context4.sent;
                    return _context4.abrupt("return", cityBusinessesData.data);

                  case 4:
                  case "end":
                    return _context4.stop();
                }
              }
            });
          })));

        case 2:
          withBusinesses = _context5.sent;
          newCities = cities.map(function (city) {
            console.log("city.lon", city.lon);
            console.log("withBusinesses.lon", withBusinesses.data[0]["coordinates"]["longitude"]); // withBusinesses.find(cityWithBusiness => parseFloat(cityWithBusiness.longitude).toFixed(3) === city.lon)
          });
          console.log("newCities", newCities);
          return _context5.abrupt("return", newCities.data);

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
}; // GET /cities/:id
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