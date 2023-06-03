const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');

const port = 5000;

const API_BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = '298a3ab3b55539f0398ba22e87a4433b';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api', (req, res) => {
  const { zipCode } = req.query;
  const apiUrl = `${API_BASE_URL}?zip=${zipCode},za&appid=${API_KEY}`;

  axios
    .get(apiUrl)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error while fetching weather data');
    });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

