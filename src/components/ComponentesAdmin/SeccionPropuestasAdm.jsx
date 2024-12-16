import React, { useState, useEffect } from "react";
import { PlusCircle, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import ModalPropuestas from '../ModalPropuestas';

function SeccionPropuestasAdm() {
  const [propuestas, setPropuestas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [candidatos, setCandidatos] = useState([]);
  const [editingPropuesta, setEditingPropuesta] = useState(null);
  const [newPropuesta, setNewPropuesta] = useState({
    titulo_propuesta: "",
    subtitle: "",
    descripcion_propuesta: "",
    categoria: "",
    icon: "",
    visible: true,
    id_candidato: "",
    alcance_propuesta: "",
  });
  const [isAddingNew, setIsAddingNew] = useState(false);

  const availableIcons = [
    "ScrollText",
    "Building2",
    "Briefcase",
    "GraduationCap",
    "Users",
    "Target",
    "Lightbulb",
    "Users2",
    "DollarSign",
    "Building",
    "UserCog",
  ];

  useEffect(() => {
    const fetchPropuestas = async () => {
      try {
        const response = await fetch(
          "http://localhost/models/get_propuestas.php"
        );
        const data = await response.json();
        const uniquePropuestas = Array.from(
          new Map(data.propuestas.map((p) => [p.id_propuesta, p])).values()
        );
        setPropuestas(uniquePropuestas);
        setCategorias(data.categorias);
      } catch (error) {
        console.error("Error fetching proposals:", error);
      }
    };

    const fetchCandidatos = async () => {
      try {
        const response = await fetch(
          "http://localhost/models/ConsultaMiembros.php"
        );
        const data = await response.json();
        setCandidatos(data);
      } catch (error) {
        console.error("Error fetching candidatos:", error);
      }
    };

    fetchPropuestas();
    fetchCandidatos();
  }, []);

  const handleAddPropuesta = async () => {
    if (!newPropuesta.titulo_propuesta || !newPropuesta.categoria || !newPropuesta.icon || !newPropuesta.id_candidato || !newPropuesta.alcance_propuesta) {
      alert("Por favor complete todos los campos obligatorios");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/models/agregar_propuesta.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...newPropuesta, visible: true }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setPropuestas([...propuestas, result.propuesta]);
        setNewPropuesta({
          titulo_propuesta: "",
          subtitle: "",
          descripcion_propuesta: "",
          categoria: "",
          icon: "",
          visible: true,
          id_candidato: "",
          alcance_propuesta: "",
        });
        setIsAddingNew(false);
      }
    } catch (error) {
      console.error("Error adding proposal:", error);
    }
  };

  const handleEditPropuesta = async (propuesta) => {
    if (!propuesta.titulo_propuesta || !propuesta.categoria || !propuesta.icon || !propuesta.id_candidato || !propuesta.alcance_propuesta) {
      alert("Por favor complete todos los campos obligatorios");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/models/editar_propuesta.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(propuesta),
        }
      );

      if (response.ok) {
        const updatedPropuestas = propuestas.map((p) =>
          p.id_propuesta === propuesta.id_propuesta ? propuesta : p
        );
        setPropuestas(updatedPropuestas);
        setEditingPropuesta(null);
      }
    } catch (error) {
      console.error("Error editing proposal:", error);
    }
  };

  const handleDeletePropuesta = async (id) => {
    try {
      const response = await fetch(
        `http://localhost/models/eliminar_propuesta.php?id=${id}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setPropuestas(propuestas.filter((p) => p.id_propuesta !== id));
      }
    } catch (error) {
      console.error("Error deleting proposal:", error);
    }
  };

  const handleToggleVisibilidad = async (id, currentVisibility) => {
    try {
      const response = await fetch(
        "http://localhost/models/visibilidad_propuesta.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, visible: !currentVisibility }),
        }
      );

      if (response.ok) {
        const updatedPropuestas = propuestas.map((p) =>
          p.id_propuesta === id ? { ...p, visible: !currentVisibility } : p
        );
        setPropuestas(updatedPropuestas);
      }
    } catch (error) {
      console.error("Error cambiando visibilidad:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Gestión de Propuestas
          </h2>
          <button
            onClick={() => setIsAddingNew(true)}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            <PlusCircle className="mr-2" /> Agregar Propuesta
          </button>
        </div>

        {isAddingNew && (
          <ModalPropuestas
            propuesta={newPropuesta}
            setPropuesta={setNewPropuesta}
            categorias={categorias}
            availableIcons={availableIcons}
            onSave={handleAddPropuesta}
            onCancel={() => {
              setIsAddingNew(false);
              setNewPropuesta({
                titulo_propuesta: "",
                subtitle: "",
                descripcion_propuesta: "",
                categoria: "",
                icon: "",
                visible: true,
                id_candidato: "",
                alcance_propuesta: "",
              });
            }}
            candidatos={candidatos}
          />
        )}

        <div className="space-y-4">
          {propuestas.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              No se encontraron propuestas
            </div>
          ) : (
            propuestas.map((propuesta) => (
              <div key={propuesta.id_propuesta}>
                <div
                  className={`bg-white border rounded-lg p-4 flex justify-between items-center hover:shadow-md transition ${
                    !propuesta.visible ? "opacity-50 bg-gray-100" : ""
                  }`}
                >
                  <div className={`flex-grow ${!propuesta.visible ? "opacity-70" : ""}`}>
                    <h3 className="font-bold text-lg flex items-center">
                      {propuesta.titulo_propuesta}
                      {!propuesta.visible && (
                        <span className="text-xs text-yellow-600 ml-2">
                          (Oculto)
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-600">
                      {propuesta.descripcion_propuesta}
                    </p>
                    <span className="text-sm text-blue-500">
                      {propuesta.categoria}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingPropuesta(propuesta)}
                      className="text-blue-500 hover:bg-blue-100 p-2 rounded"
                    >
                      <Edit2 />
                    </button>
                    <button
                      onClick={() =>
                        handleToggleVisibilidad(
                          propuesta.id_propuesta,
                          propuesta.visible
                        )
                      }
                      className={`p-2 rounded ${
                        propuesta.visible
                          ? "text-yellow-500 hover:bg-yellow-100"
                          : "text-green-500 hover:bg-green-100"
                      }`}
                    >
                      {propuesta.visible ? <Eye /> : <EyeOff />}
                    </button>
                    <button
                      onClick={() =>
                        handleDeletePropuesta(propuesta.id_propuesta)
                      }
                      className="text-red-500 hover:bg-red-100 p-2 rounded"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
                {editingPropuesta && editingPropuesta.id_propuesta === propuesta.id_propuesta && (
                  <ModalPropuestas
                    propuesta={editingPropuesta}
                    setPropuesta={setEditingPropuesta}
                    categorias={categorias}
                    availableIcons={availableIcons}
                    onSave={() => handleEditPropuesta(editingPropuesta)}
                    onCancel={() => setEditingPropuesta(null)}
                    candidatos={candidatos}
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SeccionPropuestasAdm;

