import './App.css';
import React, { useEffect, useState } from 'react';



function kelvinToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(2);
}
function kelvinToFahrenheit(kelvin) {
  return Math.round((kelvin - 273.15) * 9 / 5 + 32);
}

function App() {

  const [weatherData, setWeatherData] = useState(null);
  //Send a request to the API which then returns the weather data in JSON form.
  useEffect(()=>{
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setWeatherData(data)
      }
    )
  }, [])

 // const [searchTerm, setSearchTerm] = useState('');

  // const searchWeather = async (zipCode) => {
  //   const response = await fetch(`${API_URL}`);
  //   const data = await response.json();
  //   setWeatherData(data);
  // };

  // useEffect(() => {
  //   searchWeather();
  // }, []);

  return (
    <div>
      <h1>Weather App</h1>

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

      {/* <div className="searchZipCode">
        <input
          placeholder="Enter the zip code "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
        <button onClick={() => searchWeather(searchTerm)}>Search</button>
      </div>

       */}
    </div>
  );
}

export default App;
