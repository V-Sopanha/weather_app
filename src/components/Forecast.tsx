import React from 'react';
import { format } from 'date-fns';
import { ForecastData, TemperatureUnit, DailyForecast } from '../types/weather';
import { processForecastData } from '../utils/weatherUtils';
import ForecastCard from './ForecastCard';

interface ForecastProps {
  data: ForecastData;
  unit: TemperatureUnit;
}

const Forecast: React.FC<ForecastProps> = ({ data, unit }) => {
  const dailyForecasts = processForecastData(data, unit);
  const today = format(new Date(), 'yyyy-MM-dd');
  
  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
        5-Day Forecast
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 animate-fadeIn">
        {dailyForecasts.map((forecast: DailyForecast, index: number) => (
          <ForecastCard 
            key={forecast.date} 
            forecast={forecast} 
            unit={unit}
            isToday={forecast.date === today}
          />
        ))}
      </div>
    </div>
  );
};

export default Forecast;