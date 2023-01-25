require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000
const citiesRoutes = require("./routes/cities");

app.use(express.json());
app.use('/cities', citiesRoutes)

app.listen(port, () => console.log("Server started"))