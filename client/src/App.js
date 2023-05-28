import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [zipcode, setZipcode] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleZipcodeChange = event => {
    setZipcode(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    axios
      .get(`/weather/${zipcode}`)
      .then(response => {
        setWeatherData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error retrieving weather data:', error);
        setError('Failed to retrieve weather data');
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={zipcode} onChange={handleZipcodeChange} placeholder="Enter ZIP code" />
        <button type="submit">Get Weather</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {weatherData && (
        <div>
          <p>Min Temperature: {weatherData.minTemp}</p>
          <p>Max Temperature: {weatherData.maxTemp}</p>
          <p>Current Temperature: {weatherData.currentTemp}</p>
          <p>Wind Speed: {weatherData.windSpeed}</p>
        </div>
      )}
    </div>
  );
};

export default App;

