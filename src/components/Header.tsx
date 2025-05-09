import React from 'react';
import { Cloud, Sun, Moon } from 'lucide-react';
import TemperatureToggle from './TemperatureToggle';
import { TemperatureUnit } from '../types/weather';

interface HeaderProps {
  unit: TemperatureUnit;
  onToggleUnit: () => void;
}

const Header: React.FC<HeaderProps> = ({ unit, onToggleUnit }) => {
  // Check if it's night time
  const isNight = new Date().getHours() >= 18 || new Date().getHours() < 6;
  
  return (
    <header className="py-6 px-4 flex justify-between items-center">
      <div className="flex items-center">
        {isNight ? (
          <Moon className="text-white mr-2" size={24} />
        ) : (
          <Sun className="text-white mr-2" size={24} />
        )}
        <h1 className="text-xl md:text-2xl font-bold text-white">
          Skycast Weather
        </h1>
      </div>
      <TemperatureToggle unit={unit} onToggle={onToggleUnit} />
    </header>
  );
};

export default Header;