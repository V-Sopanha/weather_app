export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  dt: number;
  timezone: number;
  coord: {
    lat: number;
    lon: number;
  };
}

export interface ForecastData {
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    wind: {
      speed: number;
    };
    dt_txt: string;
  }[];
  city: {
    name: string;
    country: string;
  };
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface DailyForecast {
  date: string;
  day: string;
  temp_max: number;
  temp_min: number;
  description: string;
  icon: string;
}