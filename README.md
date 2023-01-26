# Enhancers backend test

API that grabs and combines location data from:

- Open Weather Map (https://openweathermap.org/api) for weather
- API Yelp Fusion (https://www.yelp.com/developers/documentation/v3/business_search) for businesses

### Endpoint:

> `GET` [https://enhancers-backend-test.herokuapp.com/cities](https://enhancers-backend-test.herokuapp.com/cities)

### Parameters

• `bLimit` (businesses limit) is optional and defaults to `10`.

### Cities

```js
const CITIES = [
  {
    name: 'Milan',
    lat: 45.464100545064,
    lon: 9.1909546405077,
  },
  {
    name: 'Modena',
    lat: 44.64482,
    lon: 10.92154,
  },
  {
    name: 'Naples',
    lat: 40.84978,
    lon: 14.26322,
  },
  {
    name: 'Rome',
    lat: 41.8902496828181,
    lon: 12.4922484062616,
  },
  {
    name: 'Turin',
    lat: 45.0685183,
    lon: 7.6922662,
  },
];
```

### Response

```json
[
  {
    "location": "Milan",
    "weather": {},
    "yelp": {
      "businesses": [
        {},
        {},
        {},
        ...
      ],
      "total": 4600,
      "region": {
        "center": {
        "longitude": 9.191,
        "latitude": 45.4641
        }
      }
    }
  },
  ...
]
```
