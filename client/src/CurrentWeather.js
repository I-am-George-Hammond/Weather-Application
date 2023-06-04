import React, { useEffect, useState } from 'react';

function kelvinToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(2);
}

function kelvinToFahrenheit(kelvin) {
  return Math.round((kelvin - 273.15) * 9 / 5 + 32);
}

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [userZipCode, setUserZipCode] = useState('');
  const [isCelsius, setIsCelsius] = useState(true);

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

    if (userZipCode.length !== 4 || isNaN(userZipCode)) {
      alert('Please enter a valid 4-digit zip code.');
      setUserZipCode('');
      setWeatherData(null);
      return;
    }

    fetchWeatherData(userZipCode);

    setUserZipCode('');
  };

  const convertTemperature = (temperature) => {
    if (isCelsius) {
      return kelvinToCelsius(temperature) + '°C';
    } else {
      return kelvinToFahrenheit(temperature) + '°F';
    }
  };

  const handleToggleClick = () => {
    setIsCelsius(!isCelsius);
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
            <p>Temperature: {convertTemperature(weatherData.main.temp)}</p>
            <p>Feels Like: {convertTemperature(weatherData.main.feels_like)}</p>
            <p>Weather: {weatherData.weather[0].main}</p>
            <p>Description: {weatherData.weather[0].description}</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        </div>
      )}

      <div className="Toggle">
        <button onClick={handleToggleClick}>
          {isCelsius ? 'Switch to Fahrenheit' : 'Switch to Celsius'}
        </button>
      </div>
    </div>
  );
}

export default App;




  