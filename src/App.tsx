import React, { useState, useEffect } from 'react';
import Autocomplete from './components/Autocomplete';
import WeatherCard from './components/WeatherCard';
import UnitSwitcher from './components/UnitSwitcher';
import axios from 'axios';

const App: React.FC = () => {
  const [city, setCity] = useState<string | null>(localStorage.getItem('city'));
  const [unit, setUnit] = useState<string>(localStorage.getItem('unit') || 'metric');
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    if (city) {
      fetchWeather(city);
    }
  }, [city, unit]);

  const fetchWeather = async (city: string) => {
    const unitParam = unit === 'metric' ? 'metric' : 'imperial';
    try {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unitParam}&appid=24103f99cb5a8ecdcffeaeaa887f17ac`);
      setWeatherData(response.data);
    } catch (error) {
      setWeatherData(null);
      console.error("Error fetching weather:", error); 
    }
  };

  const handleSelectCity = (city: string) => {
    setCity(city);
    localStorage.setItem('city', city);
  };

  const handleSwitchUnit = (unit: string) => {
    setUnit(unit);
    localStorage.setItem('unit', unit);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Weather Dashboard</h1>

        {/* select country input box */}
        <Autocomplete onSelectCity={handleSelectCity} />

        {/* switch: celsius and fahrenheit */}
        <UnitSwitcher unit={unit} onSwitch={handleSwitchUnit} />

        {/* weather card component */}
        {weatherData && <WeatherCard weatherData={weatherData} unit={unit} />}
      </div>
    </div>
  );
};

export default App;
