import axios from 'axios';
import { WeatherData, ForecastData } from '../types/weather';

// OpenWeatherMap API base URL
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// This would typically be stored in an environment variable
const API_KEY = '435e4fb5909ae47a55e52ed57878e30b'; // Users would replace this with their actual API key

// Create an axios instance
const weatherApi = axios.create({
  baseURL: API_BASE_URL,
  params: {
    appid: API_KEY,
  },
});

// Fetch current weather data by city name
export const fetchWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const response = await weatherApi.get('/weather', {
      params: {
        q: city,
        units: 'metric', // Default to metric units
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

// Fetch current weather data by coordinates
export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await weatherApi.get('/weather', {
      params: {
        lat,
        lon,
        units: 'metric', // Default to metric units
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

// Fetch 5-day forecast by city name
export const fetchForecastByCity = async (city: string): Promise<ForecastData> => {
  try {
    const response = await weatherApi.get('/forecast', {
      params: {
        q: city,
        units: 'metric', // Default to metric units
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};

// Fetch 5-day forecast by coordinates
export const fetchForecastByCoords = async (lat: number, lon: number): Promise<ForecastData> => {
  try {
    const response = await weatherApi.get('/forecast', {
      params: {
        lat,
        lon,
        units: 'metric', // Default to metric units
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};