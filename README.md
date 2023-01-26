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
        {
          "id": "SKMKr2sJgWCVr0_zD7Yyxw",
          "alias": "galleria-vittorio-emanuele-ii-milano-5",
          "name": "Galleria Vittorio Emanuele II",
          "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/eVpSIIhCLUoN2_xruql7OA/o.jpg",
          "is_closed": false,
          "url": "https://www.yelp.com/biz/galleria-vittorio-emanuele-ii-milano-5?adjust_creative=4j4077H8Spw_HTif8E_4fA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=4j4077H8Spw_HTif8E_4fA",
          "review_count": 176,
          "categories": [
          {
          "alias": "landmarks",
          "title": "Landmarks & Historical Buildings"
          },
          {
          "alias": "shoppingpassages",
          "title": "Shopping Passages"
          }
          ],
          "rating": 4.5,
          "coordinates": {
          "latitude": 45.4656388665993,
          "longitude": 9.19007420539856
          },
          "transactions": [],
          "price": "€€€€",
          "location": {
          "address1": "Galleria Vittorio Emanuele II",
          "address2": "",
          "address3": "",
          "city": "Milan",
          "zip_code": "20123",
          "country": "IT",
          "state": "MI",
          "display_address": [
          "Galleria Vittorio Emanuele II",
          "20123 Milan",
          "Italy"
          ]
          },
          "phone": "+390288455555",
          "display_phone": "+39 02 8845 5555",
          "distance": 185.72210258259466
          },
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
