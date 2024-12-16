import React, { useState } from "react";
import FormularioSeccionInicio from "../FormularioSeccionInicio.jsx";

function SeccionInicioAdm() {
  const [isAddingNew, setIsAddingNew] = useState(false);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Gestión de Secciones de Inicio</h2>
          <button
            onClick={() => setIsAddingNew(true)}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Agregar sección en el inicio
          </button>
        </div>

        {isAddingNew && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-96">
              <FormularioSeccionInicio onCancel={() => setIsAddingNew(false)} />
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
