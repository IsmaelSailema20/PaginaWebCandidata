import React, { useState, useEffect } from "react";
import FormularioSeccionInicio from "../FormularioSeccionInicio.jsx";

function SeccionInicioAdm() {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [secciones, setSecciones] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener las secciones desde el backend
  const fetchSecciones = async () => {
    try {
      const response = await fetch("http://localhost/ProyectoManejo/PaginaWebCandidata/models/get_secciones_incio.php");
      const data = await response.json();

      if (data.mensaje) {
        setSecciones([]);
      } else {
        setSecciones(data);
      }
    } catch (error) {
      console.error("Error al obtener las secciones:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSecciones();  // Se ejecuta una vez al montar el componente
  }, []);

  // Función que se llama cuando se agrega una nueva sección
  const handleSectionAdded = () => {
    fetchSecciones();  // Recargamos las secciones
  };

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
              <FormularioSeccionInicio onCancel={() => setIsAddingNew(false)} onSectionAdded={handleSectionAdded} />
            </div>
          </div>
        )}

        <div className="space-y-4">
          {loading ? (
            <div className="text-center text-gray-500 py-4">Cargando...</div>
          ) : secciones.length === 0 ? (
            <div className="text-center text-gray-500 py-4">No se encontraron secciones</div>
          ) : (
            <div>
              {secciones.map((seccion) => (
                <div key={seccion.id} className="border-b py-4">
                  <h3 className="text-lg font-semibold text-gray-800">{seccion.nombre}</h3>
                  <p className="text-gray-600">{seccion.descripcion}</p>
                  <img src={seccion.url_de_la_imagen} alt={seccion.nombre} className="w-32 h-32 object-cover mt-2" />
                  <p className={`mt-2 ${seccion.visibilidad ? 'text-green-500' : 'text-red-500'}`}>
                    {seccion.visibilidad ? 'Visible' : 'No visible'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SeccionInicioAdm;
