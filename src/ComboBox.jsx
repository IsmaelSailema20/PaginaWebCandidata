//ComboBox
import React, { useState } from "react";

const ComboBox = ({ label, options }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="mb-4">
      <label className="mb-[10px] block text-base font-medium text-dark">
        {label}
      </label>
      <div className="relative">
        <select
          name={label === "Género" ? "genero" : "tipo_persona"}
          value={selectedOption}
          onChange={handleSelectChange}
          className="w-full bg-transparent rounded-md border border-stroke py-[10px] pr-5 pl-4 text-dark-6 outline-none transition focus:border-blue-500 active:border-blue-500 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2"
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
