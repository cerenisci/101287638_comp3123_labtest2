import axios from 'axios';

// Function to fetch weather data
export const fetchWeatherData = async (city) => {
  try {
    const API_KEY = '9af6afa1fb1923070059f813ec262cea';
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    return response.data; // Return the data from the API
  } catch (error) {
    throw new Error('City not found or API error');
  }
};
