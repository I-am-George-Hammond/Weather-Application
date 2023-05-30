import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css"
import searchIcon  from "./Images/search.png"
import weatherIcon from "./Images/rain.png"

const App = () => {
  const [zipcode, setZipcode] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'Weather App'; 
  }, []);

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
      <>
    <div className="Container" >
      <h1>Weather App</h1>
      <form className="search" onSubmit={handleSubmit}>
        <input type="text" value={zipcode} onChange={handleZipcodeChange} placeholder="Enter ZIP code" />
        <button type="submit"> <img src={searchIcon} alt="Search button"></img> </button>
      </form>

      {/* test purpose vir ui bou --- delete--- */}
      
      <div className='cardWeather'>
          <img src={weatherIcon} ></img>
          <h1>26&deg;c</h1>
          <h2>Shongololo</h2>
          <br></br>
          <p>Min: 7&deg;c </p>
          <p>Max: 27&deg;c </p>
          <p>Wind Speed: 15km/h </p>
          <p>Humidity: 50% </p>
        </div>
     

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {weatherData && (
        <div className='cardWeather'>
        <p>Min Temperature: {weatherData.minTemp}</p>
        <p>Max Temperature: {weatherData.maxTemp}</p>
        <p>Current Temperature: {weatherData.currentTemp}</p>
        <p>Wind Speed: {weatherData.windSpeed}</p>
      </div>
      )}
    
    </div>
    </>
  );
};

export default App;

