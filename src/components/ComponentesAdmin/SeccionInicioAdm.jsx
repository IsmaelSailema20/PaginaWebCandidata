import React, { useState } from "react";
import FormularioSeccionInicio from "../FormularioSeccionInicio.jsx";

function SeccionInicioAdm() {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isInvisible, setIsInvisible] = useState(false);

  const handleVisibilityChange = (type) => {
    if (type === "visible") {
      setIsVisible(true);
      setIsInvisible(false);
    } else {
      setIsVisible(false);
      setIsInvisible(true);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Gestión de Secciones de Inicio</h2>
          <button
            onClick={() => setIsAddingNew(!isAddingNew)}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            {isAddingNew ? "Cerrar Formulario" : "Agregar sección en el inicio"}
          </button>
        </div>

        {isAddingNew && (
          <div className="mb-6 bg-gray-100 p-4 rounded-lg shadow-lg relative">
            <button
              onClick={() => setIsAddingNew(false)}
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
            >
              Cancelar
            </button>

            <FormularioSeccionInicio />

            <div className="mt-4">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="visible"
                  checked={isVisible}
                  onChange={() => handleVisibilityChange("visible")}
                  className="mr-2"
                />
                <label htmlFor="visible" className="text-gray-700">Visible</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="invisible"
                  checked={isInvisible}
                  onChange={() => handleVisibilityChange("invisible")}
                  className="mr-2"
                />
                <label htmlFor="invisible" className="text-gray-700">Invisible</label>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {/* Aquí iría la lógica para listar las secciones */}
          <div className="text-center text-gray-500 py-4">No se encontraron secciones</div>
        </div>
      </div>
    </div>
  );
}

export default SeccionInicioAdm;
