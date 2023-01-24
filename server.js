const express = require('express');
const app = express();
const weatherRoutes = require("./routes/weather");

app.use(express.json());
app.use('/weather', weatherRoutes)

app.listen('3000', () => console.log("Server started"))