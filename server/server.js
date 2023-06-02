const PORT = 3000;
const express = require('express');
const axios = require('axios');

const app = express();

const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip';
const secretKey = 'f8137048d0461e134ea214a4760d67b9';


app.get('/weather/:zipcode', async (req, res) => {
  const zipcode = req.params;


  const apiUrl = baseURL+zipcode +",za&appid=" + secretKey;

  axios
    .get(apiUrl)
    .then(response => {
      const { main, wind } = response.data;
      const { temp_min, temp_max, temp } = main;
      const { speed } = wind;

      const weatherData = {
        minTemp: temp_min,
        maxTemp: temp_max,
        currentTemp: temp,
        windSpeed: speed,
      };

      res.json(weatherData);
    })
    .catch(error => {
      console.error('Error retrieving weather data:', error);
      res.status(500).json({ error: 'Failed to retrieve weather data' });
    });
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

