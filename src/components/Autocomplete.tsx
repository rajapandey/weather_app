import React, { useState, useEffect } from "react";
import axios from "axios";

interface AutocompleteProps {
  onSelectCity: (city: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ onSelectCity }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (inputValue.length > 2) {
        try {
          const response = await axios.get(
            `http://api.openweathermap.org/data/2.5/find?q=${inputValue}&type=like&appid=24103f99cb5a8ecdcffeaeaa887f17ac`
          );
          const cities = response.data.list.map((city: any) => city.name);
          setSuggestions(cities);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [inputValue]);

  const handleSelectCity = (city: string) => {
    setSuggestions([]);
    setInputValue(city);
    onSelectCity(city);
  };

  return (
    <div className="relative mb-4">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search for a city"
      />
      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelectCity(suggestion)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
