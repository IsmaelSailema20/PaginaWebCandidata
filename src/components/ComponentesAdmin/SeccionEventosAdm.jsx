import React, { useState, useEffect } from "react";
import { PlusCircle, Edit2, Trash2 } from "lucide-react";
import ModalEventos from "../ModalNuevoEventos.jsx";

function SeccionEventosAdm() {
  const [eventos, setEventos] = useState([]);
  const [editingEvento, setEditingEvento] = useState(null);
  const [newEvento, setNewEvento] = useState({
    titulo: "",
    descripcion: "",
    lugar: "",
    fecha: "",
    hora: "",
    imagen: "",
    tipo: "",
    visible: true,
  });
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch("http://localhost/ProyectoManejo/PaginaWebCandidata/models/getEventosNoticias.php");
        const data = await response.json();
        const uniqueEventos = Array.from(
          new Map(data.eventos.map((e) => [e.id, e])).values()
        );
        setEventos(uniqueEventos);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEventos();
  }, []);

  const handleAddEvento = async () => {

  };

  const handleEditEvento = async () => {

  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Gestión de Eventos</h2>
          <button
            onClick={() => setIsAddingNew(true)}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            <PlusCircle className="mr-2" /> Agregar Evento
          </button>
        </div>

        {(isAddingNew || editingEvento) && (
          <ModalEventos
            evento={isAddingNew ? newEvento : editingEvento}
            setEvento={isAddingNew ? setNewEvento : setEditingEvento}
            onSave={isAddingNew ? handleAddEvento : handleEditEvento}
            onCancel={() => {
              if (isAddingNew) {
                setIsAddingNew(false);
                setNewEvento({
                  titulo: "",
                  descripcion: "",
                  lugar: "",
                  fecha: "",
                  hora: "",
                  imagen: "",
                  visible: true,
                });
              } else {
                setEditingEvento(null);
              }
            }}
            isEditing={!!editingEvento}
          />
        )}

        <div className="space-y-4">
          {eventos.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              No se encontraron eventos
            </div>
          ) : (
            eventos.map((evento) => (
              <div
                key={evento.id}
                className="bg-white border rounded-lg p-4 flex justify-between items-center hover:shadow-md transition"
              >
                {evento.imagen && (
                  <img
                    src={evento.imagen}
                    alt={evento.titulo}
                    className="w-32 h-20 object-cover mt-2 rounded-md"
                  />
                )}
                <div className="flex-grow ml-5">
                  <h3 className="font-bold text-lg">{evento.titulo}</h3>
                  <p className="text-gray-600">{evento.descripcion}</p>
                  <p className="text-sm text-gray-500">
                    {evento.lugar} - {evento.fecha} {evento.hora}
                  </p>

                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingEvento(evento)}
                    className="text-blue-500 hover:bg-blue-100 p-2 rounded"
                  >
                    <Edit2 />
                  </button>
                  <button
                    onClick={() => handleDeleteEvento(evento.id)}
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
    </div>
  );
}

export default SeccionEventosAdm;
