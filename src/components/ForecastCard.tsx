import React from 'react';
import { DailyForecast, TemperatureUnit } from '../types/weather';

interface ForecastCardProps {
  forecast: DailyForecast;
  unit: TemperatureUnit;
  isToday: boolean;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, unit, isToday }) => {
  const weatherIcon = `https://openweathermap.org/img/wn/${forecast.icon}.png`;
  const unitSymbol = unit === 'celsius' ? '°C' : '°F';
  
  return (
    <div 
      className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-4 
                  transition-all duration-300 hover:bg-white/10 
                  ${isToday ? 'ring-2 ring-blue-400' : ''}`}
    >
      <div className="text-center">
        <p className="text-white font-medium mb-1">
          {isToday ? 'Today' : forecast.day}
        </p>
        <div className="flex justify-center">
          <img 
            src={weatherIcon} 
            alt={forecast.description}
            className="w-10 h-10"
          />
        </div>
        <p className="text-xs text-white/70 capitalize mb-2">
          {forecast.description}
        </p>
        <div className="flex justify-center items-center gap-2">
          <span className="text-white font-semibold">
            {forecast.temp_max}{unitSymbol}
          </span>
          <span className="text-white/60 text-sm">
            {forecast.temp_min}{unitSymbol}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;