import logo from './logo.svg';
import './App.css';

import {useEffect, useState} from 'react';

const API_URL = "http://api.openweathermap.org/data/2.5/weather?zip=0182,za&appid=298a3ab3b55539f0398ba22e87a4433b";
const secretKey = "298a3ab3b55539f0398ba22e87a4433b"


function App() {

  const [weatherInfo, setWeatherInfo] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const searchWeather = async (zipCode) => {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();

    setWeatherInfo(data.weather)
  }
  useEffect(()=> {
    searchWeather()
  }, [])
  return (
    
  <div> 

    <h1>Weather App</h1>

    <div className = "searchZipCode">
      <input placeholder = "Enter the zip code " value = {searchTerm} onChange = {(e)=> setSearchTerm(e.target.value)}></input>
      <button onClick = {()=> {}}>Search</button>
    </div>

    <div className = "container">
      <div className = "Weather">
        <p>weatherInfo</p>

        {
            weatherInfo.map((item)=> (
                <p>item</p>

            ))}


      </div>
    </div>

  </div>    

  );
}

export default App;
