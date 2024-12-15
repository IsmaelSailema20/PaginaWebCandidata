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
            "http://localhost/models/get_candidatos.php"
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
      </div>
    </div>
  );
}

export default SeccionPropuestasAdm;


