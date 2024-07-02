import React from 'react';

interface UnitSwitcherProps {
  unit: string;
  onSwitch: (unit: string) => void;
}

const UnitSwitcher: React.FC<UnitSwitcherProps> = ({ unit, onSwitch }) => {
  return (
    <div className="flex justify-center space-x-4 mt-4">
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="radio"
          checked={unit === 'metric'}
          onChange={() => onSwitch('metric')}
          className="form-radio h-4 w-4 text-blue-500"
        />
        <span className="text-gray-700">Metric (°C)</span>
      </label>
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="radio"
          checked={unit === 'imperial'}
          onChange={() => onSwitch('imperial')}
          className="form-radio h-4 w-4 text-blue-500"
        />
        <span className="text-gray-700">Imperial (°F)</span>
      </label>
    </div>
  );
};

export default UnitSwitcher;
