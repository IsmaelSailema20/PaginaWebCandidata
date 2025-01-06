import React, { useState, useEffect } from 'react';

const FormularioInfoPartido = () => {
  const [informacion, setInformacion] = useState({});
  const [mensaje, setMensaje] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal

  useEffect(() => {
    // Obtener los datos de la base de datos
    fetch('http://localhost/ProyectoManejo/PaginaWebCandidata/models/get_informacion_partido.php')
      .then((response) => response.json())
      .then((data) => {
        setInformacion(data); // Suponiendo que los datos están en formato objeto con tipo como claves
      })
      .catch((error) => console.error('Error al obtener la información:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Preparar el objeto con las claves de los campos y sus valores
      const payload = Object.keys(informacion).reduce((acc, tipo) => {
        acc[tipo] = informacion[tipo]; // Asignar el valor del campo al objeto
        return acc;
      }, {});
      console.log(payload);
      const response = await fetch('http://localhost/ProyectoManejo/PaginaWebCandidata/models/actualizar_informacion_partido.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // Enviar el objeto con las claves y valores
      });

      const result = await response.json();

      if (result.success) {
        setMensaje('Información actualizada correctamente.');
      } else {
        setMensaje('Error al actualizar la información.');
      }
    } catch (error) {
      setMensaje('Hubo un problema con la conexión.');
      console.error(error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Botón para abrir el modal */}
      <button
        onClick={toggleModal}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        Actualizar Información del Partido
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] overflow-y-auto relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-xl text-gray-700 hover:text-gray-900"
            >
              ×
            </button>

            <h2 className="text-2xl font-semibold text-center mb-4">Formulario de Información del Partido</h2>

            {mensaje && <p className="text-center mb-4 text-green-500">{mensaje}</p>}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                {Object.keys(informacion).map((tipo) => (
                  <div key={tipo} className="mb-4">
                    <label htmlFor={tipo} className="block text-sm font-medium text-gray-700">
                      {tipo}
                    </label>
                    <input
                      type="text"
                      id={tipo}
                      name={tipo}
                      value={informacion[tipo]}
                      onChange={(e) =>
                        setInformacion({ ...informacion, [tipo]: e.target.value })
                      }
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder={`Escribe la descripción de ${tipo}`}
                    />
                  </div>
                ))}
              </div>

              <div className="mb-4 flex space-x-4">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                  Actualizar Información
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormularioInfoPartido;
