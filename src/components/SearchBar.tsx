import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onUseCurrentLocation: () => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onUseCurrentLocation, 
  isLoading 
}) => {
  const [cityInput, setCityInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityInput.trim()) {
      onSearch(cityInput);
    }
  };
  
  const handleLocationClick = () => {
    onUseCurrentLocation();
  };
  
  // Focus input on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  return (
    <div className="w-full max-w-md mx-auto mb-8 relative">
      <form 
        onSubmit={handleSubmit}
        className="relative flex items-center"
      >
        <input
          ref={inputRef}
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Search for a city..."
          className="w-full px-5 py-3 pr-12 text-sm md:text-base rounded-full 
                    bg-white/10 backdrop-blur-md border border-white/20
                    text-white placeholder-white/60
                    focus:outline-none focus:ring-2 focus:ring-blue-400
                    transition-all duration-300"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="absolute right-14 md:right-16 rounded-full p-1.5
                    text-white hover:text-blue-300
                    transition-colors duration-300
                    disabled:opacity-50"
          disabled={isLoading || !cityInput.trim()}
          aria-label="Search"
        >
          <Search size={20} />
        </button>
        <button
          type="button"
          onClick={handleLocationClick}
          className="absolute right-4 rounded-full p-1.5
                    text-white hover:text-blue-300
                    transition-colors duration-300
                    disabled:opacity-50"
          disabled={isLoading}
          aria-label="Use current location"
        >
          <MapPin size={20} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;