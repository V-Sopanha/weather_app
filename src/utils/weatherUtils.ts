import { format } from 'date-fns';
import { ForecastData, DailyForecast, TemperatureUnit } from '../types/weather';

// Convert temperature between Celsius and Fahrenheit
export const convertTemperature = (
  temp: number,
  unit: TemperatureUnit
): number => {
  if (unit === 'fahrenheit') {
    return (temp * 9) / 5 + 32;
  }
  return temp;
};

// Format temperature with the appropriate unit symbol
export const formatTemperature = (
  temp: number,
  unit: TemperatureUnit
): string => {
  const roundedTemp = Math.round(temp);
  const symbol = unit === 'celsius' ? '°C' : '°F';
  return `${roundedTemp}${symbol}`;
};

// Convert wind speed from m/s to km/h
export const convertWindSpeed = (speed: number): number => {
  return speed * 3.6; // m/s to km/h
};

// Format date from timestamp
export const formatDate = (timestamp: number): string => {
  return format(new Date(timestamp * 1000), 'EEEE, MMMM do');
};

// Format time from timestamp
export const formatTime = (timestamp: number): string => {
  return format(new Date(timestamp * 1000), 'h:mm a');
};

// Get background class based on weather condition and time
export const getWeatherBackground = (
  weatherId: number,
  dt: number,
  sunrise: number,
  sunset: number
): string => {
  const isDay = dt > sunrise && dt < sunset;
  
  // Weather condition codes: https://openweathermap.org/weather-conditions
  if (weatherId >= 200 && weatherId < 300) {
    return 'bg-gradient-to-br from-gray-800 to-gray-900'; // Thunderstorm
  } else if (weatherId >= 300 && weatherId < 400) {
    return 'bg-gradient-to-br from-gray-500 to-gray-700'; // Drizzle
  } else if (weatherId >= 500 && weatherId < 600) {
    return 'bg-gradient-to-br from-blue-700 to-blue-900'; // Rain
  } else if (weatherId >= 600 && weatherId < 700) {
    return 'bg-gradient-to-br from-blue-100 to-blue-300'; // Snow
  } else if (weatherId >= 700 && weatherId < 800) {
    return 'bg-gradient-to-br from-gray-300 to-gray-500'; // Atmosphere (fog, haze)
  } else if (weatherId === 800) {
    return isDay 
      ? 'bg-gradient-to-br from-blue-400 to-blue-600' // Clear sky day
      : 'bg-gradient-to-br from-blue-900 to-indigo-900'; // Clear sky night
  } else {
    return isDay
      ? 'bg-gradient-to-br from-blue-300 to-blue-500' // Cloudy day
      : 'bg-gradient-to-br from-gray-700 to-gray-900'; // Cloudy night
  }
};

// Get text color based on background
export const getTextColor = (weatherId: number): string => {
  if (weatherId >= 600 && weatherId < 700) {
    return 'text-gray-800'; // Darker text for light backgrounds (snow)
  }
  return 'text-white'; // Light text for dark backgrounds
};

// Process forecast data to group by day
export const processForecastData = (
  forecastData: ForecastData,
  unit: TemperatureUnit
): DailyForecast[] => {
  // Group forecasts by day
  const dailyData: Record<string, any> = {};

  forecastData.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const day = format(date, 'yyyy-MM-dd');
    
    if (!dailyData[day]) {
      dailyData[day] = {
        temp_max: -100,
        temp_min: 100,
        forecasts: [],
      };
    }
    
    // Update min/max temperatures
    const temp = unit === 'celsius' ? item.main.temp : convertTemperature(item.main.temp, 'fahrenheit');
    dailyData[day].temp_max = Math.max(dailyData[day].temp_max, temp);
    dailyData[day].temp_min = Math.min(dailyData[day].temp_min, temp);
    
    // Add forecast details
    dailyData[day].forecasts.push({
      time: format(date, 'HH:mm'),
      temp: temp,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
    });
  });
  
  // Convert to array and format for display
  return Object.keys(dailyData)
    .slice(0, 5) // Limit to 5 days
    .map(day => {
      const dayData = dailyData[day];
      const date = new Date(day);
      
      return {
        date: day,
        day: format(date, 'EEEE'),
        temp_max: Math.round(dayData.temp_max),
        temp_min: Math.round(dayData.temp_min),
        description: dayData.forecasts[0].description,
        icon: dayData.forecasts[0].icon,
      };
    });
};