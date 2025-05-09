import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-6 mt-12 text-center text-white/60 text-sm">
      <p>
        &copy; {currentYear} Skycast Weather | Powered by OpenWeatherMap
      </p>
      <p className="mt-1 text-xs">
        Note: Please add your own OpenWeatherMap API key in the weatherApi.ts file
      </p>
    </footer>
  );
};

export default Footer;