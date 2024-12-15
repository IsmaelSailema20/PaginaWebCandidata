import React, { useEffect, useState } from "react";
import FormularioVotaciones from "./FormularioVotaciones";
import { CirclePlus, Edit2, Eye, EyeOff, Trash2 } from "lucide-react";

function SeccionSugerenciasAdm() {
  const [votaciones, setVotaciones] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVotacion, setEditingVotacion] = useState(null); // Estado para la votación en edición

  // Función para cargar las votaciones desde la base de datos
  const fetchVotaciones = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/ProyectoManejo/PaginaWebCandidata/models/ObtenerVotaciones.php"
      );
      const data = await response.json();
      setVotaciones(data); // Actualizar el estado con las votaciones obtenidas
    } catch (error) {
      console.error("Error al cargar votaciones:", error);
    }
  };
  const handleToggleVisibilidadVotacion = async (
    id_votacion,
    currentVisibility
  ) => {
    try {
      const response = await fetch(
        "http://localhost:8081/ProyectoManejo/PaginaWebCandidata/models/visibilidadVotacion.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_votacion: id_votacion,
            visible: !currentVisibility,
          }),
        }
      );

      if (response.ok) {
        // Actualiza el estado de las votaciones para reflejar el cambio de visibilidad
        const updatedVotaciones = votaciones.map((votacion) =>
          votacion.id_votacion === id_votacion
            ? { ...votacion, visible: !currentVisibility }
            : votacion
        );
        setVotaciones(updatedVotaciones);
      }
    } catch (error) {
      console.error("Error cambiando visibilidad de la votacion:", error);
    }
  };

  const handleDeleteVotacion = async (id) => {
    try {
      // Realizar la solicitud DELETE
      const response = await fetch(
        `http://localhost:8081/ProyectoManejo/PaginaWebCandidata/models/eliminar_votacion.php?id_votacion=${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updatedVotaciones = votaciones.filter(
          (votacion) => votacion.id_votacion !== id
        );
        setVotaciones(updatedVotaciones);
      }
    } catch (error) {
      console.error("Error al borrar la votacion:", error);
    }
  };
  // Manejar guardar o actualizar votación
  const handleSaveVotacion = async (votacionData) => {
    if (editingVotacion) {
      // Editar votación existente
      try {
        const response = await fetch(
          `http://localhost:8081/ProyectoManejo/PaginaWebCandidata/models/EditarVotacion.php`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id_votacion: editingVotacion.id_votacion,
              ...votacionData,
            }),
          }
        );

        if (response.ok) {
          fetchVotaciones(); // Recargar la lista de votaciones
          closeModal();
        }
      } catch (error) {
        console.error("Error al editar la votación:", error);
      }
    } else {
      // Crear nueva votación
      try {
        const response = await fetch(
          "http://localhost:8081/ProyectoManejo/PaginaWebCandidata/models/CrearVotaciones.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(votacionData),
          }
        );

        if (response.ok) {
          fetchVotaciones(); // Recargar la lista de votaciones
          closeModal();
        }
      } catch (error) {
        console.error("Error al agregar votación:", error);
      }
    }
  };
  // Llamar a fetchVotaciones cuando el componente se monta
  useEffect(() => {
    fetchVotaciones();
  }, []);

  const openModal = (votacion = null) => {
    setEditingVotacion(votacion); // Configurar la votación a editar o null para agregar
    setIsModalOpen(true);
  };
  // Función para cerrar el modal
  const closeModal = () => {
    setEditingVotacion(null);
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-lg">
          Gestión de candidatos para votaciones
        </h2>
        <div className="flex justify-end items-center">
          <button
            onClick={() => openModal()} // Abrir el modal al hacer clic
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
            <FormularioVotaciones
              initialData={editingVotacion}
              onSave={handleSaveVotacion}
            />{" "}
            {/* Formulario integrado */}
          </div>
        </div>
      )}

      {/* Lista de votaciones */}
      <div className="space-y-4">
        {votaciones.length === 0 ? (
          <div className="text-center text-gray-500 py-4">
            No se encontraron votaciones
          </div>
        ) : (
          votaciones.map((votacion, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg p-4 flex justify-between items-center hover:shadow-md transition"
            >
              {votacion.imagen && (
                <img
                  src={votacion.imagen}
                  alt={votacion.nombre_votacion}
                  className="w-32 h-20 object-cover mt-2 rounded-md"
                />
              )}
              <div className="flex-grow ml-5">
                <h3 className="font-bold text-lg">
                  {votacion.nombre_votacion}
                </h3>
                <p className="text-gray-600">{votacion.descripcion}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => openModal(votacion)}
                  className="text-blue-500 hover:bg-blue-100 p-2 rounded"
                >
                  <Edit2 />
                </button>
                <button
                  onClick={() =>
                    handleToggleVisibilidadVotacion(
                      votacion.id_votacion,
                      votacion.visible
                    )
                  }
                  className={`p-2 rounded ${
                    votacion.visible
                      ? "text-yellow-500 hover:bg-yellow-100"
                      : "text-green-500 hover:bg-green-100"
                  }`}
                >
                  {votacion.visible ? <Eye /> : <EyeOff />}
                </button>
                <button
                  onClick={() => handleDeleteVotacion(votacion.id_votacion)}
                  className="text-red-500 hover:bg-red-100 p-2 rounded"
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default SeccionSugerenciasAdm;
