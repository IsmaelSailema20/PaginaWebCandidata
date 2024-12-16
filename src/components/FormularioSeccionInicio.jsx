import React, { useState } from "react";

function FormularioSeccionInicio({ onCancel }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isInvisible, setIsInvisible] = useState(false);

  const handleVisibilityChange = (type) => {
    if (type === "visible") {
      setIsVisible(true);
      setIsInvisible(false);
    } else {
      setIsVisible(false);
      setIsInvisible(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nombre:", nombre);
    console.log("Descripción:", descripcion);
    console.log("URL de la imagen:", imagenUrl);
    console.log("Visible:", isVisible);
    console.log("Invisible:", isInvisible);
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
        Formulario de Inicio
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="nombre"
            className="block text-sm font-bold text-gray-700"
          >
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
        <div>
          <label
            htmlFor="descripcion"
            className="block text-sm font-bold text-gray-700"
          >
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
        <div>
          <label
            htmlFor="imagenUrl"
            className="block text-sm font-bold text-gray-700"
          >
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
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="visible"
              checked={isVisible}
              onChange={() => handleVisibilityChange("visible")}
              className="mr-2"
            />
            <label htmlFor="visible" className="text-gray-700">Visible</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="invisible"
              checked={isInvisible}
              onChange={() => handleVisibilityChange("invisible")}
              className="mr-2"
            />
            <label htmlFor="invisible" className="text-gray-700">Invisible</label>
          </div>
        </div>
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
