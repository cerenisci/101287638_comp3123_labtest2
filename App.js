// src/App.js
import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from './api/weatherApi';  // Correctly import from api/weatherApi

const App = () => {
    const [city, setCity] = useState('Toronto');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getWeather = async () => {
            try {
                const data = await fetchWeatherData(city);  // Fetch data for the specified city
                setWeather(data);
            } catch (err) {
                setError('Error fetching weather data');
            }
        };

        getWeather();
    }, [city]);  // Trigger when city changes

    return (
        <div>
            <h1>Weather App</h1>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}  // Update city state on input change
                placeholder="Enter city"
            />
            <button onClick={() => fetchWeatherData(city)}>Get Weather</button>
            {error && <p>{error}</p>}
            {weather && (
                <div>
                    <h2>{weather.name}</h2>
                    <p>{weather.main.temp}°C</p>
                    <p>{weather.weather[0].description}</p>
                </div>
            )}
        </div>
    );
};

export default App;

