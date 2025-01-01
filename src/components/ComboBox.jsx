import React from "react";
import { useState } from "react";
const ComboBox = ({
  label,
  options,
  name,
  selectedOption,
  setSelectedOption,
}) => {
  const [isEmpty, setIsEmpty] = useState(false);
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    setIsEmpty(false);
  };

  const handleBlur = () => {
    if (!selectedOption) {
      setIsEmpty(true); // Marca el campo como vacío si no se selecciona ninguna opción
    }
  };

  return (
    <div className="mb-4">
      <label className="mb-[10px] block text-base font-semibold text-dark">
        {label}
      </label>
      <div className="relative">
        <select
          name={name}
          value={selectedOption}
          onChange={handleSelectChange}
          onBlur={handleBlur}
          className={`w-full bg-transparent rounded-md border py-[10px] pr-5 pl-4 text-dark-6 outline-none transition ${
            isEmpty ? "border-red-500" : "border-stroke"
          } focus:border-blue-500 active:border-blue-500 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2`}
        >
          <option value="" disabled>
            Seleccione una opción
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ComboBox;
