import React from 'react';
import { TemperatureUnit } from '../types/weather';

interface TemperatureToggleProps {
  unit: TemperatureUnit;
  onToggle: () => void;
}

const TemperatureToggle: React.FC<TemperatureToggleProps> = ({ unit, onToggle }) => {
  return (
    <div className="inline-flex items-center justify-center p-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
      <button
        className={`px-3 py-1 rounded-full transition-all duration-300 text-sm font-medium ${
          unit === 'celsius'
            ? 'bg-blue-500 text-white shadow-md'
            : 'text-white/80 hover:text-white'
        }`}
        onClick={unit === 'fahrenheit' ? onToggle : undefined}
      >
        °C
      </button>
      <button
        className={`px-3 py-1 rounded-full transition-all duration-300 text-sm font-medium ${
          unit === 'fahrenheit'
            ? 'bg-blue-500 text-white shadow-md'
            : 'text-white/80 hover:text-white'
        }`}
        onClick={unit === 'celsius' ? onToggle : undefined}
      >
        °F
      </button>
    </div>
  );
};

export default TemperatureToggle;