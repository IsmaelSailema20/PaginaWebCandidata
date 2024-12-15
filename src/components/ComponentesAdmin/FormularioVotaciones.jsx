import { Save, X } from "lucide-react";
import React, { useEffect, useState } from "react";

function FormularioVotaciones({ initialData = null, onSave }) {
  // Estado para manejar los datos de la votación (se inicializa con los datos existentes o vacíos)
  const [votacionData, setVotacionData] = useState(
    initialData || {
      nombre_votacion: "",
      descripcion: "",
      imagen: "",
    }
  );

  // Manejar el cambio en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVotacionData({ ...votacionData, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = () => {
    if (
      !votacionData.nombre_votacion ||
      !votacionData.descripcion ||
      !votacionData.imagen
    ) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    onSave(votacionData); // Llamar a la función proporcionada desde el componente superior
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-10">
      <h3 className="text-xl font-semibold mb-4">
        {initialData ? "Editar Votación" : "Agregar Candidato Para Votaciones"}
      </h3>
      <div className="flex flex-col gap-4">
        <label htmlFor="nombre_votacion" className="font-semibold">
          Nombre
        </label>
        <input
          type="text"
          name="nombre_votacion"
          placeholder="Nombre del candidato o lista"
          value={votacionData.nombre_votacion}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <label htmlFor="descripcion" className="font-semibold">
          Eslogan del candidato
        </label>
        <input
          type="text"
          name="descripcion"
          placeholder="Eslogan de candidatura."
          value={votacionData.descripcion}
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
          required
        />
        <label htmlFor="imagen" className="font-semibold">
          Imagen
        </label>
        <input
          type="text"
          name="imagen"
          placeholder="URL de la imagen del candidato."
          value={votacionData.imagen}
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
          required
        />
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {initialData ? "Actualizar Votación" : "Guardar Votación"}
        </button>
      </div>
    </div>
  );
}

export default FormularioVotaciones;
