import React, { useState, useEffect } from "react";
import { PlusCircle, Edit2, Trash2, Eye, EyeOff, Star } from "lucide-react"; // Importación de los iconos
import FormularioSeccionInicio from "../FormularioSeccionInicio.jsx";
import FormularioEditarSeccion from "../FormularioEditarSeccion.jsx";

function SeccionInicioAdm() {
  const API_BASE_URL =
    "http://localhost:8081/ProyectoManejo/PaginaWebCandidata/models";

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [secciones, setSecciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState(null);

  const fetchSecciones = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/get_secciones_inicio.php`);
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

  const handleSectionAddedOrUpdated = () => {
    fetchSecciones();
    setIsAddingNew(false);
    setEditingSection(null);
  };

  const handleDeleteClick = (id) => {
    setSectionToDelete(id);
    setIsModalVisible(true);
  };

  const handleDelete = async () => {
    if (sectionToDelete) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/eliminar_seccion.php?id=${sectionToDelete}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();

        fetchSecciones();
        setIsModalVisible(false);
      } catch (error) {
        console.error("Error al eliminar la sección:", error);
      }
    }
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
    setSectionToDelete(null);
  };

  const handleEdit = (seccion) => {
    setEditingSection(seccion);
    setIsAddingNew(true);
  };

  useEffect(() => {
    fetchSecciones();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Título "Información del Partido" con el botón al lado */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Gestión de Secciones de Inicio
          </h2>
          <button
            onClick={() => {
              setIsAddingNew(true);
              setEditingSection(null);
            }}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            <PlusCircle className="mr-2" />
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
                  onSectionUpdated={handleSectionAddedOrUpdated}
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
            <div className="text-center text-gray-500 py-4">
              No se encontraron secciones
            </div>
          ) : (
            <div>
              {secciones.map((seccion) => (
                <div
                  key={seccion.id}
                  className="grid grid-cols-4 gap-1 items-center border-b py-4"
                >
                  {/* Columna para la imagen */}
                  <div className="col-span-1">
                    <img
                      src={seccion.url_de_la_imagen}
                      alt={seccion.nombre}
                      className="w-32 h-32 object-cover ml-16"
                    />
                  </div>

                  {/* Columna para la descripción */}
                  <div className="col-span-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {seccion.nombre}
                    </h3>
                    <p className="text-gray-600">
                      {seccion.descripcion.split(" ").slice(0, 7).join(" ")}
                      {seccion.descripcion.split(" ").length > 7 && "..."}
                    </p>
                    <p
                      className={`mt-2 ${
                        seccion.visibilidad == 1
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {seccion.visibilidad == 1 ? "Visible" : "No visible"}
                    </p>
                  </div>

                  {/* Columna para los botones */}
                  <div className="col-span-1 flex justify-center">
                    <button
                      onClick={() => handleEdit(seccion)}
                      className="text-blue-500 hover:bg-blue-100 p-2 rounded"
                    >
                      <Edit2 className="mr-2" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(seccion.id)}
                      className="text-red-500 hover:bg-red-100 p-2 rounded"
                    >
                      <Trash2 className="mr-2" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {isModalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-96">
              <h3 className="text-lg font-semibold text-gray-800">
                Confirmación
              </h3>
              <p className="text-gray-600 mt-4">
                ¿Estás seguro de que quieres eliminar esta sección?
              </p>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={handleCancelDelete}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SeccionInicioAdm;
