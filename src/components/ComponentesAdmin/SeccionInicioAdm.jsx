import React, { useState, useEffect } from "react";
import { PlusCircle, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import ModalEventos from "../modalNuevasSeccionesInicio.jsx";

function SeccionInicioAdm() {
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
    // Aquí se eliminó la conexión a la base de datos.
    // Ahora eventos solo se establece con datos ficticios si es necesario
    const dummyEventos = [
      {
        id: 1,
        titulo: "Evento de prueba 1",
        descripcion: "Descripción del evento 1",
        lugar: "Lugar 1",
        fecha: "2024-12-20",
        hora: "10:00 AM",
        imagen: "/path/to/image1.jpg",
        tipo: "Conferencia",
        visible: true,
      },
      {
        id: 2,
        titulo: "Evento de prueba 2",
        descripcion: "Descripción del evento 2",
        lugar: "Lugar 2",
        fecha: "2024-12-22",
        hora: "02:00 PM",
        imagen: "/path/to/image2.jpg",
        tipo: "Seminario",
        visible: false,
      },
    ];
    setEventos(dummyEventos);
  }, []);

  const handleAddEvento = () => {
    if (
      !newEvento.titulo ||
      !newEvento.tipo ||
      !newEvento.descripcion ||
      !newEvento.lugar ||
      !newEvento.fecha ||
      !newEvento.hora ||
      !newEvento.imagen
    ) {
      alert("Por favor complete todos los campos");
      return;
    }

    // Aquí no se hace la solicitud al servidor, solo se agrega el evento localmente
    setEventos([...eventos, { ...newEvento, id: eventos.length + 1 }]);
    setNewEvento({
      titulo: "",
      tipo: "",
      descripcion: "",
      lugar: "",
      fecha: "",
      hora: "",
      imagen: "",
      visible: true,
    });
    setIsAddingNew(false);
  };

  const handleEditEvento = () => {
    if (
      !editingEvento.titulo ||
      !editingEvento.tipo ||
      !editingEvento.descripcion ||
      !editingEvento.lugar ||
      !editingEvento.fecha ||
      !editingEvento.hora ||
      !editingEvento.imagen
    ) {
      alert("Por favor complete todos los campos obligatorios");
      return;
    }

    // Actualiza el evento localmente sin conexión a la base de datos
    const updatedEventos = eventos.map((evento) =>
      evento.id === editingEvento.id ? { ...editingEvento } : evento
    );
    setEventos(updatedEventos);
    setEditingEvento(null);
  };

  const handleToggleVisibilidadEvento = (id, currentVisibility) => {
    const updatedEventos = eventos.map((evento) =>
      evento.id === id ? { ...evento, visible: !currentVisibility } : evento
    );
    setEventos(updatedEventos);
  };

  const handleDeleteEvento = (id) => {
    const updatedEventos = eventos.filter((evento) => evento.id !== id);
    setEventos(updatedEventos);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Gestion de secciones de Inicio</h2>
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
                  <p className="text-sm text-blue-500">
                    {evento.tipo}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingEvento(evento);
                      window.scrollTo({ top: 0, behavior: 'smooth' }); // Desplaza al inicio de la página
                    }}
                    className="text-blue-500 hover:bg-blue-100 p-2 rounded"
                  >
                    <Edit2 />
                  </button>
                  <button
                    onClick={() =>
                      handleToggleVisibilidadEvento(
                        evento.id,
                        evento.visible
                      )
                    }
                    className={`p-2 rounded ${evento.visible
                      ? "text-yellow-500 hover:bg-yellow-100"
                      : "text-green-500 hover:bg-green-100"
                      }`}
                  >
                    {evento.visible ? <Eye /> : <EyeOff />}
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

export default SeccionInicioAdm;
