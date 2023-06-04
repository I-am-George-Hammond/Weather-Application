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
          fetchWeatherData(userZipCode);
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
          <div className='container'>
            <h1>Weather App</h1>
            <form className='search' placeholder='Enter Zip Code:' onSubmit={handleFormSubmit}>
              <label>
                
                <input
                  type="text"
                  value={userZipCode}
                  onChange={(event) => setUserZipCode(event.target.value)}
                />
              </label>
              <button type="submit">Get Weather</button>
            </form>
            <div className="Toggle">
              <button onClick={handleToggleClick}>
                {isCelsius ? 'Switch to Fahrenheit' : 'Switch to Celsius'}
              </button>
            </div>
      
            {weatherData && (
              <div className="displayWeather">
                <div className='weatherIcon'>

                {/* weatherIcon(weatherData) */}

                </div>

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
      
            
          </div>
        );
      }
      
      //change weather icon according to weather
      function weatherIcon(weatherData) {
        let weather = weatherData.weather[0].main;
        if (weather === 'Clouds') {
          return <img src="./Images/Clouds.png" alt="clouds" />;
        } 
        else if (weather === 'Clear') {
          return <img src="./Images/Clear.png" alt="clear" />;
        } 
        else if (weather === 'Drizzle') {
          return <img src="./Images/Drizzle.png" alt="drizzle" />;
        }
        else if (weather === 'Mist') {
          return <img src="./Images/Mist.png" alt="mist" />;
        } 
        else if (weather === 'Rain') {
          return <img src="./Images/Rain.png" alt="rain" />;
        } 
        else if (weather === 'Snow') {
          return <img src="./Images/Snow" alt="snow" />;
        } 
        
      };







  export default App;
  