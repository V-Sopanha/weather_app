import React, { useState, useEffect } from 'react';
import { WeatherData, ForecastData, TemperatureUnit } from './types/weather';
import { 
  fetchWeatherByCity, 
  fetchWeatherByCoords,
  fetchForecastByCity,
  fetchForecastByCoords
} from './api/weatherApi';
import { getWeatherBackground, getTextColor } from './utils/weatherUtils';

// Components
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import Footer from './components/Footer';

function App() {
  // State
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<TemperatureUnit>('celsius');
  
  // Background styles based on weather
  const backgroundClass = weatherData 
    ? getWeatherBackground(
        weatherData.weather[0].id,
        weatherData.dt,
        weatherData.sys.sunrise,
        weatherData.sys.sunset
      )
    : 'bg-gradient-to-br from-blue-600 to-blue-900';
    
  const textColorClass = weatherData 
    ? getTextColor(weatherData.weather[0].id)
    : 'text-white';
  
  // Toggle temperature unit
  const toggleUnit = () => {
    setUnit(prev => prev === 'celsius' ? 'fahrenheit' : 'celsius');
  };
  
  // Fetch weather by city name
  const fetchWeatherData = async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch current weather
      const weather = await fetchWeatherByCity(city);
      setWeatherData(weather);
      
      // Fetch forecast
      const forecast = await fetchForecastByCity(city);
      setForecastData(forecast);
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError('City not found. Please try another location.');
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch weather by geolocation
  const fetchWeatherByLocation = () => {
    setLoading(true);
    setError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            
            // Fetch current weather
            const weather = await fetchWeatherByCoords(latitude, longitude);
            setWeatherData(weather);
            
            // Fetch forecast
            const forecast = await fetchForecastByCoords(latitude, longitude);
            setForecastData(forecast);
          } catch (err) {
            console.error('Error fetching weather:', err);
            setError('Could not fetch weather data for your location.');
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          console.error('Geolocation error:', err);
          setError('Location access denied. Please enable location services or search by city.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
    }
  };
  
  // Initialize with default city
  useEffect(() => {
    fetchWeatherData('London');
  }, []);
  
  return (
    <div className={`min-h-screen transition-colors duration-1000 ${backgroundClass}`}>
      <div className="container mx-auto px-4 pb-8">
        <Header unit={unit} onToggleUnit={toggleUnit} />
        
        <main className={textColorClass}>
          <SearchBar 
            onSearch={fetchWeatherData}
            onUseCurrentLocation={fetchWeatherByLocation}
            isLoading={loading}
          />
          
          {loading && <LoadingSpinner />}
          
          {error && (
            <ErrorMessage 
              message={error} 
              onRetry={() => setError(null)}
            />
          )}
          
          {!loading && !error && weatherData && (
            <CurrentWeather data={weatherData} unit={unit} />
          )}
          
          {!loading && !error && forecastData && (
            <Forecast data={forecastData} unit={unit} />
          )}
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

export default App;