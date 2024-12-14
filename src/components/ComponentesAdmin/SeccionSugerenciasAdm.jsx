import React, { useState } from "react";
import FormularioVotaciones from "./FormularioVotaciones";
import { CirclePlus } from "lucide-react";

function SeccionSugerenciasAdm() {
  // Estado para controlar el modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Funciones para abrir y cerrar el modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-lg">
          Gestión de candidatos para votaciones
        </h2>
        <div className="flex justify-end items-center">
          <button
            onClick={openModal} // Abrir el modal al hacer clic
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-400"
          >
            <CirclePlus className="mr-2 inline" />
            Agregar Nueva Votación
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/2 p-6 relative">
            <button
              onClick={closeModal} // Botón para cerrar el modal
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              ✕
            </button>
            <FormularioVotaciones /> {/* Formulario integrado */}
          </div>
        </div>
      )}
    </div>
  );
}
export default SeccionSugerenciasAdm;
