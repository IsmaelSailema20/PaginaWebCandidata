import React, { useState, useEffect } from "react";
import FormularioSeccionInicio from "../FormularioSeccionInicio.jsx";
import FormularioEditarSeccion from "../FormularioEditarSeccion.jsx"; // Renombrado

function SeccionInicioAdm() {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [secciones, setSecciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState(null);

  // Función para obtener las secciones desde el backend
  const fetchSecciones = async () => {
    try {
      const response = await fetch("http://localhost/ProyectoManejo/PaginaWebCandidata/models/get_secciones_inicio.php");
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

  // Función que se llama cuando se agrega o edita una nueva sección
  const handleSectionAddedOrUpdated = () => {
    fetchSecciones();  // Recargamos las secciones
    setIsAddingNew(false);  // Cerrar el formulario después de agregar o editar
  };

  // Función para eliminar una sección
  const handleDelete = async (id) => {
    const confirmed = window.confirm("¿Estás seguro de que quieres eliminar esta sección?");
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost/ProyectoManejo/PaginaWebCandidata/models/eliminar_seccion.php?id=${id}`, {
          method: "GET",
        });
        const data = await response.json();
        alert(data.mensaje); // Mostrar mensaje del backend
        fetchSecciones(); // Recargar las secciones después de eliminar
      } catch (error) {
        console.error("Error al eliminar la sección:", error);
      }
    }
  };

  // Función para iniciar la edición de una sección
  const handleEdit = (seccion) => {
    setEditingSection(seccion); // Poner la sección en estado de edición
    setIsAddingNew(true); // Mostrar el formulario para editar
  };

  useEffect(() => {
    fetchSecciones();  // Se ejecuta una vez al montar el componente
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Gestión de Secciones de Inicio</h2>
          <button
            onClick={() => {
              setIsAddingNew(true);
              setEditingSection(null); // No hay sección para editar cuando agregamos nueva
            }}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Agregar sección en el inicio
          </button>
        </div>

        {isAddingNew && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-96">
              {editingSection ? (
                <FormularioEditarSeccion
                  seccion={editingSection}
                  onCancel={() => setIsAddingNew(false)}
                  onSectionAdded={handleSectionAddedOrUpdated}
                />
              ) : (
                <FormularioSeccionInicio
                  onCancel={() => setIsAddingNew(false)}
                  onSectionAdded={handleSectionAddedOrUpdated}
                />
              )}
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
                <div key={seccion.id} className="grid grid-cols-3 gap-4 items-center border-b py-4">
                  {/* Columna para la imagen */}
                  <div className="col-span-1">
                    <img
                      src={seccion.url_de_la_imagen}
                      alt={seccion.nombre}
                      className="w-32 h-32 object-cover"
                    />
                  </div>

                  {/* Columna para el texto */}
                  <div className="col-span-1">
                    <h3 className="text-lg font-semibold text-gray-800">{seccion.nombre}</h3>
                    <p className="text-gray-600">{seccion.descripcion}</p>
                    <p className={`mt-2 ${seccion.visibilidad ? 'text-green-500' : 'text-red-500'}`}>
                      {seccion.visibilidad ? 'Visible' : 'No visible'}
                    </p>
                  </div>

                  {/* Columna para los botones */}
                  <div className="col-span-1 flex justify-center">
                    <button
                      onClick={() => handleEdit(seccion)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(seccion.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    >
                      Eliminar
                    </button>
                  </div>
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
