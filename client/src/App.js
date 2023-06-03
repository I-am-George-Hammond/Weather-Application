import './App.css';
import React, { useEffect, useState } from 'react';

function kelvinToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(2);
}

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [userZipCode, setUserZipCode] = useState('');

  const fetchWeatherData = (zipCode) => {
    const API_URL = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},za&appid=298a3ab3b55539f0398ba22e87a4433b`;

    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error(error);
        setWeatherData(null);
      });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData(userZipCode);
  };

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Enter Zip Code:
          <input
            type="text"
            value={userZipCode}
            onChange={(event) => setUserZipCode(event.target.value)}
          />
        </label>
        <button type="submit">Get Weather</button>
      </form>

      {weatherData && (
        <div className="container">
          <div className="Weather">
            <p>City: {weatherData.name}</p>
            <p>Temperature: {kelvinToCelsius(weatherData.main.temp)}°C</p>
            <p>Feels Like: {kelvinToCelsius(weatherData.main.feels_like)}°C</p>
            <p>Weather: {weatherData.weather[0].main}</p>
            <p>Description: {weatherData.weather[0].description}</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
