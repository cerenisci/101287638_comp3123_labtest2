import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from './api/weatherApi';

function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Toronto');
  const [error, setError] = useState(null);

  // Fetch weather data when the city changes
  useEffect(() => {
    const getWeather = async () => {
      try {
        const data = await fetchWeatherData(city);
        setWeather(data);  // Set the fetched data into state
        setError(null);     // Clear any previous errors
      } catch (error) {
        setError(error.message); // Set error message if API call fails
        setWeather(null);        // Clear previous weather data
      }
    };

    getWeather();  // Call the function to fetch data
  }, [city]); // This will re-run the effect when the city changes

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)} // Update city when user types
        placeholder="Enter city"
      />
      <button onClick={() => setCity(city)}>Search</button>

      {error && <p>{error}</p>}

      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather icon"
          />
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
