import React from 'react';

interface WeatherCardProps {
  weatherData: any;
  unit: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData, unit }) => {
  if (!weatherData) return null;

  const temperature = unit === 'metric' ? weatherData.main.temp : (((weatherData.main.temp * 9 )/5) + 32);
  const unitSymbol = unit === 'metric' ? '°C' : '°F';

  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center mt-6">
      <h2 className="text-2xl font-semibold text-gray-800">{weatherData.name}</h2>
      <p className="text-4xl mt-2 text-blue-600">{temperature.toFixed(2)} {unitSymbol}</p>
      <p className="text-lg capitalize mt-2 text-gray-700">{weatherData.weather[0].description}</p>
    </div>
  );
};

export default WeatherCard;
