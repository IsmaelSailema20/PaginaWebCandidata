import { EyeIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

function SeccionSugerenciasAdm() {
  const [sugerencias, setSugerencias] = useState([]);

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

  // Llamar a fetchSugerencias cuando el componente se monta
  useEffect(() => {
    fetchSugerencias();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-3xl ">
          Sugerencias recibidas por los usuarios
        </h2>
      </div>

      {/* Lista de sugerencias */}
      <div className="space-y-4 ">
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
                <h3 className="font-bold text-lg">
                  {sugerencia.nombre_usuario} {sugerencia.apellido_usuario}
                </h3>
                <h4 className="text-gray-600">
                  {sugerencia.correo_electronico}
                </h4>
                <p className="text-gray-600"> {sugerencia.sugerencia}</p>
              </div>
              <div className="flex space-x-2">
                <button className="text-green-600 hover:bg-red-100 p-2 rounded">
                  <EyeIcon />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default SeccionSugerenciasAdm;
