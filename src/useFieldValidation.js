import { useState } from "react";

const useFieldValidation = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);
  const [isEmpty, setIsEmpty] = useState(false);

  const handleBlur = () => {
    setIsEmpty(!value.trim());
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    if (isEmpty && e.target.value.trim()) {
      setIsEmpty(false); // Elimina el estado de "vacío" si se ingresa texto
    }
  };
  const resetField = () => {
    setValue("");
    setIsEmpty(false);
  };
  return {
    value,
    isEmpty,
    handleBlur,
    handleChange,
    resetField,
  };
};

export default useFieldValidation;