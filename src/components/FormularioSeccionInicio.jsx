import React, { useState } from "react";

function FormularioSeccionInicio() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nombre:", nombre);
    console.log("Descripción:", descripcion);
    console.log("URL de la imagen:", imagenUrl);
    // Aquí puedes manejar el envío del formulario o integrar lógica adicional.
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-lg p-6 fade-in">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Formulario de Inicio</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="imagenUrl" className="block text-sm font-medium text-gray-700">URL de la Imagen</label>
          <input
            type="url"
            id="imagenUrl"
            value={imagenUrl}
            onChange={(e) => setImagenUrl(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 focus:ring focus:ring-blue-200 transition-transform duration-300 transform hover:scale-105"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioSeccionInicio;
