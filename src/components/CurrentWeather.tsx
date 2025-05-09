import React from 'react';
import { Droplets, Wind, Thermometer } from 'lucide-react';
import { WeatherData, TemperatureUnit } from '../types/weather';
import { 
  formatTemperature, 
  convertWindSpeed, 
  formatDate, 
  formatTime 
} from '../utils/weatherUtils';

interface CurrentWeatherProps {
  data: WeatherData;
  unit: TemperatureUnit;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, unit }) => {
  const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="rounded-xl overflow-hidden backdrop-blur-lg bg-white/10 border border-white/20 p-6 md:p-8 
                      transition-all duration-300 animate-fadeIn shadow-lg">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
          {/* City Information */}
          <div className="text-center md:text-left mb-4 md:mb-0 animate-slideUp">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {data.name}, {data.sys.country}
            </h1>
            <p className="text-sm md:text-base text-white/80 mt-1">
              {formatDate(data.dt)}
            </p>
            <p className="text-xs md:text-sm text-white/60 mt-1">
              Last updated: {formatTime(data.dt)}
            </p>
          </div>
          
          {/* Temperature Display */}
          <div className="flex items-center animate-slideUp animation-delay-100">
            <img 
              src={weatherIcon} 
              alt={data.weather[0].description}
              className="w-20 h-20 md:w-24 md:h-24 animate-pulse-slow"
            />
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white">
                {formatTemperature(data.main.temp, unit)}
              </div>
              <p className="text-sm md:text-base capitalize text-white/80">
                {data.weather[0].description}
              </p>
            </div>
          </div>
        </div>
        
        {/* Weather Details */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 animate-slideUp animation-delay-200">
          <div className="flex items-center bg-white/5 p-4 rounded-lg">
            <Thermometer className="text-blue-300 mr-4" size={24} />
            <div>
              <p className="text-white/60 text-sm">Feels Like</p>
              <p className="text-white font-semibold">
                {formatTemperature(data.main.feels_like, unit)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center bg-white/5 p-4 rounded-lg">
            <Droplets className="text-blue-300 mr-4" size={24} />
            <div>
              <p className="text-white/60 text-sm">Humidity</p>
              <p className="text-white font-semibold">{data.main.humidity}%</p>
            </div>
          </div>
          
          <div className="flex items-center bg-white/5 p-4 rounded-lg">
            <Wind className="text-blue-300 mr-4" size={24} />
            <div>
              <p className="text-white/60 text-sm">Wind</p>
              <p className="text-white font-semibold">
                {Math.round(convertWindSpeed(data.wind.speed))} km/h
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;