import { EyeIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

function SeccionSugerenciasAdm() {
  const [sugerencias, setSugerencias] = useState([]);
  const [sugerenciaSeleccionada, setSugerenciaSeleccionada] = useState(null);

  // Función para cargar las sugerencias desde la base de datos
  const fetchSugerencias = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/ProyectoManejo/PaginaWebCandidata/models/ObtenerSugerencias.php"
      );
      const data = await response.json();
      setSugerencias(data); // Actualizar el estado con las sugerencias obtenidas
    } catch (error) {
      console.error("Error al cargar sugerencias:", error);
    }
  };

  useEffect(() => {
    fetchSugerencias();
  }, []);

  // Función para abrir la modal
  const handleOpenModal = (sugerencia) => {
    setSugerenciaSeleccionada(sugerencia);
  };

  // Función para cerrar la modal
  const handleCloseModal = () => {
    setSugerenciaSeleccionada(null);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-3xl mb-6">
          Sugerencias recibidas por los usuarios
        </h2>
      </div>

      {/* Lista de sugerencias */}
      <div className="space-y-4">
        {sugerencias.length === 0 ? (
          <div className="text-center text-gray-500 py-4">
            No se encontraron sugerencias.
          </div>
        ) : (
          sugerencias.map((sugerencia, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg p-4 flex justify-between items-center hover:shadow-md transition"
            >
              <div className="flex-grow ml-5">
                <span className="font-bold text-sm text-blue-600">
                  {sugerencia.fecha_sugerencia.split(" ")[0]}
                </span>
                <h3 className="font-bold text-lg">
                  {sugerencia.nombre_usuario} {sugerencia.apellido_usuario}
                </h3>
                <h4 className="text-gray-600">
                  {sugerencia.correo_electronico}
                </h4>
                <p className="text-gray-600"> {sugerencia.sugerencia}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="text-blue-600 hover:bg-green-100 p-2 rounded"
                  onClick={() => handleOpenModal(sugerencia)} // Abre la modal
                >
                  <EyeIcon />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/** Modal*/}
      {sugerenciaSeleccionada && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-96 sm:w-2/3 lg:w-1/2 transform scale-100 transition-transform duration-300">
            {/* Encabezado */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4 text-white text-center">
              <h3 className="text-2xl font-bold">Detalles de la Sugerencia</h3>
            </div>

            {/* Contenido */}
            <div className="p-6 space-y-4 text-gray-700">
              <p>
                <strong>Fecha:</strong>{" "}
                {sugerenciaSeleccionada.fecha_sugerencia}
              </p>
              <p>
                <strong>Nombre:</strong> {sugerenciaSeleccionada.nombre_usuario}{" "}
                {sugerenciaSeleccionada.apellido_usuario}
              </p>
              <p>
                <strong>Correo:</strong>{" "}
                {sugerenciaSeleccionada.correo_electronico}
              </p>
              <p>
                <strong>Género:</strong> {sugerenciaSeleccionada.genero}
              </p>
              <p>
                <strong>Tipo de Persona:</strong>{" "}
                {sugerenciaSeleccionada.tipo_persona}
              </p>
              <p>
                <strong>Sugerencia:</strong> {sugerenciaSeleccionada.sugerencia}
              </p>
            </div>

            {/* Pie y Botón de cierre */}
            <div className="bg-gray-100 p-4 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SeccionSugerenciasAdm;
