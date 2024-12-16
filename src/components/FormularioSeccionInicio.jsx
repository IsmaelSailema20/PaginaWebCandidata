import React, { useState } from "react";

function FormularioSeccionInicio({ onCancel, onSectionAdded }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // Maneja el cambio de visibilidad
  const handleVisibilityChange = (e) => {
    setIsVisible(e.target.checked);
  };

  // Envía los datos del formulario al servidor
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Preparamos los datos que vamos a enviar al servidor
    const sectionData = {
      nombre,
      descripcion,
      url_de_la_imagen: imagenUrl,
      visibilidad: isVisible, // Enviamos el valor booleano directamente
    };

    try {
      // Enviamos los datos al endpoint PHP
      const response = await fetch("http://localhost/ProyectoManejo/PaginaWebCandidata/models/agregar_seccion_inicio.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sectionData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Sección agregada exitosamente.");
        onSectionAdded(); // Llamamos a la función para actualizar el listado
      } else {
        alert("Error al agregar la sección: " + data.message);
      }
    } catch (error) {
      console.error("Error al enviar la sección:", error);
      alert("Hubo un problema al agregar la sección.");
    }
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
        Formulario de Inicio
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo Nombre */}
        <div>
          <label htmlFor="nombre" className="block text-sm font-bold text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mt-2 block w-full rounded-lg border-gray-300 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Campo Descripción */}
        <div>
          <label htmlFor="descripcion" className="block text-sm font-bold text-gray-700">
            Descripción
          </label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows="3"
            className="mt-2 block w-full rounded-lg border-gray-300 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200"
            required
          ></textarea>
        </div>

        {/* Campo URL de la Imagen */}
        <div>
          <label htmlFor="imagenUrl" className="block text-sm font-bold text-gray-700">
            URL de la Imagen
          </label>
          <input
            type="url"
            id="imagenUrl"
            value={imagenUrl}
            onChange={(e) => setImagenUrl(e.target.value)}
            className="mt-2 block w-full rounded-lg border-gray-300 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Campo Visibilidad */}
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="visible"
            checked={isVisible}
            onChange={handleVisibilityChange}
            className="mr-2"
          />
          <label htmlFor="visible" className="text-gray-700">
            Visible para el usuario
          </label>
        </div>

        {/* Botones de Enviar y Cancelar */}
        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-2 font-bold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700"
          >
            Enviar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center px-6 py-2 font-bold text-white bg-red-500 rounded-lg shadow-lg hover:bg-red-600"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioSeccionInicio;
