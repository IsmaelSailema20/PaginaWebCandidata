import React, { useEffect, useState } from "react";

function FormularioVotaciones() {
  // Estado para nuevas votaciones
  const [newVotacion, setNewVotacion] = useState({
    nombre_votacion: "",
    descripcion: "",
    imagen: "",
  });

  // Estado para las votaciones desde la base de datos
  const [votaciones, setVotaciones] = useState([]);

  const handleAddVotacion = () => {
    if (
      !newVotacion.nombre_votacion ||
      !newVotacion.descripcion ||
      !newVotacion.imagen
    ) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    const formData = new FormData();
    formData.append("nombre_votacion", newVotacion.nombre_votacion);
    formData.append("descripcion", newVotacion.descripcion);
    formData.append("imagen", newVotacion.imagen);

    fetch(
      "http://localhost:8081/ProyectoManejo/PaginaWebCandidata/models/CrearVotaciones.php",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data === "Se inserto correctamente") {
          alert("Votación guardada con éxito");
          // Puedes actualizar el estado de tus votaciones aquí si es necesario
          setNewVotacion({ nombre_votacion: "", descripcion: "", imagen: "" }); // Limpiar formulario
        }
      })
      .catch((error) => console.error("Error al guardar la votación:", error));
  };

  return (
    <div className="w-1/2 h-screen  p-8">
      <div className="bg-white p-6 rounded-lg shadow mb-10">
        <h3 className="text-xl font-semibold mb-4">
          Agregar Candidato Para Votaciones
        </h3>
        <div className="flex flex-col gap-4">
          <label htmlFor="nombre_votacion" className="font-semibold">
            Nombre
          </label>
          <input
            type="text"
            name="nombre_votacion"
            placeholder="Nombre del candidato o lista"
            value={newVotacion.nombre_votacion}
            onChange={(e) =>
              setNewVotacion({
                ...newVotacion,
                nombre_votacion: e.target.value,
              })
            }
            className="border p-2 rounded"
            required
          />
          <label htmlFor="eslogan" className="font-semibold">
            Eslogan del candidato
          </label>
          <input
            type="text"
            name="eslogan"
            placeholder="Eslogan de candidatura."
            value={newVotacion.descripcion}
            onChange={(e) =>
              setNewVotacion({ ...newVotacion, descripcion: e.target.value })
            }
            className="border p-2 rounded col-span-2"
            required
          />
          <label htmlFor="imagen" className="font-semibold">
            Imagen
          </label>
          <input
            type="text"
            name="imagen"
            placeholder="url de la imagen del candidato."
            value={newVotacion.imagen}
            onChange={(e) =>
              setNewVotacion({ ...newVotacion, imagen: e.target.value })
            }
            className="border p-2 rounded col-span-2"
            required
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleAddVotacion}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Guardar Votación
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormularioVotaciones;
