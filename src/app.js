require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const citiesRoutes = require('./routes/cities');

app.use(helmet());
app.use(express.json());
app.use('/cities', citiesRoutes);

app.listen(PORT, () => console.log('Server started'));
