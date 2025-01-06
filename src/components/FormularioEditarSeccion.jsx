import React, { useState, useEffect } from "react";

const ENDPOINT =
  "http://localhost/ProyectoManejo/PaginaWebCandidata/models/editar_seccion.php";

function FormularioEditarSeccion({ seccion, onCancel, onSectionUpdated }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (seccion) {
      setNombre(seccion.nombre);
      setDescripcion(seccion.descripcion);
      setImagenUrl(seccion.url_de_la_imagen);
      setIsVisible(seccion.visibilidad);
    }
  }, [seccion]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sectionData = {
      id: seccion.id,
      nombre,
      descripcion,
      url_de_la_imagen: imagenUrl,
      visibilidad: isVisible,
    };

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sectionData),
      });

      const data = await response.json();

      if (data.success) {
        if (typeof onSectionUpdated === "function") {
          await onSectionUpdated();
        }
        onCancel();
      } else {
        alert("Error al editar la sección: " + data.message);
      }
    } catch (error) {
      console.error("Error al editar la sección:", error);
      alert("Hubo un problema al editar la sección.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="descripcion"
              className="block text-sm font-medium text-gray-700"
            >
              Descripción
            </label>
            <textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="imagenUrl"
              className="block text-sm font-medium text-gray-700"
            >
              URL de la imagen
            </label>
            <input
              type="url"
              id="imagenUrl"
              value={imagenUrl}
              onChange={(e) => setImagenUrl(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="visibilidad"
              className="block text-sm font-medium text-gray-700"
            >
              Visible
            </label>
            <input
              type="checkbox"
              id="visibilidad"
              checked={isVisible == 1}
              onChange={() => setIsVisible(!isVisible)}
              className="mt-1"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-400 text-white px-4 py-2 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Actualizar Sección
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormularioEditarSeccion;
