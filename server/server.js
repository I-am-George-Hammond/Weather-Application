const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const API_URL = 'http://api.openweathermap.org/data/2.5/weather';
const secretKey = '298a3ab3b55539f0398ba22e87a4433b';

app.get('/weather/:zipCode', async (req, res) => {
  const { zipCode } = req.params;

  const url =` ${API_URL}?zip=${zipCode},za&appid=${secretKey}`;
  const response = await fetch(url);
  const data = await response.json();

  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});