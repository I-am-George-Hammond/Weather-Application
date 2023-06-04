import React, { useEffect, useState } from 'react';

function kelvinToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(2);
}

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
        const [zipCodeError, setZipCodeError] = useState('');
      
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
          if (userZipCode.length !== 4) {
            setZipCodeError('Zip code should be exactly 4 numbers.');
            setWeatherData(null); // Clear the weather data
            setUserZipCode(''); // Clear the input
          } else {
            setZipCodeError('');
            fetchWeatherData(userZipCode);
            setUserZipCode(''); // Clear the input
          }
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
            <br/>
            <div className="Toggle">
              <button className="switch" onClick={handleToggleClick}>
                {isCelsius ? 'Switch to Fahrenheit' : 'Switch to Celsius'}
              </button>
            </div>
            <br/>
      
            {weatherData && (
              <div className="displayWeather">
                <div >

                <img className='weatherIcon' src={weatherIcon(weatherData)} alt="weather icon" />

                </div>

                <div className="Weather">
                  <h1>{weatherData.name}</h1>
                  <br />
                  <h1 className='tempNow'>{convertTemperature(weatherData.main.temp)}</h1>
                  <br />
                  <p>Feels Like: {convertTemperature(weatherData.main.feels_like)}</p>
                  {/* <p>Weather: {weatherData.weather[0].main}</p> */}

                  <div className='moreDetails'>
                    <div className='col'>
                      <img src="./Images/Humidity.png" />
                      <p>Humidity: {weatherData.main.humidity}%</p>
                    </div>
                    <div className='col'>
                      <img src="./Images/Wind.png" />
                      <p>Wind Speed: {weatherData.wind.speed} km/h</p>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// change weather icon according to weather
function weatherIcon(weatherData) {
  let weather = weatherData.weather[0].main;
  if (weather === 'Clouds') {
    return "./Images/Clouds.png";
  } else if (weather === 'Clear') {
    return "./Images/Clear.png";
  } else if (weather === 'Drizzle') {
    return "./Images/Drizzle.png";
  } else if (weather === 'Mist') {
    return "./Images/Mist.png";
  } else if (weather === 'Rain') {
    return "./Images/Rain.png";
  } else if (weather === 'Snow') {
    return "./Images/Snow.png";
  }
}

export default App;




  