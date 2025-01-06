import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [informacion, setInformacion] = useState({});

  const API_BASE_URL = "http://localhost/ProyectoManejo/PaginaWebCandidata/models";

  useEffect(() => {
    fetch(`${API_BASE_URL}/get_informacion_partido.php`)
      .then((response) => response.json())
      .then((data) => setInformacion(data))
      .catch((error) => console.error("Error al obtener información:", error));
  }, []);

  if (!informacion.Facebook) {
    return <div>Loading...</div>; // Muestra un mensaje mientras los datos se cargan
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      />
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-semibold mb-2 text-yellow-400">Ejemplo Unido</h3>
              <p className="text-lg text-gray-300">Trabajamos por un futuro mejor para todos.</p>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href={informacion.Facebook} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500">
                <i className="fab fa-facebook-square text-3xl"></i>
              </a>
              <a href={informacion.Instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-500">
                <i className="fab fa-instagram text-3xl"></i>
              </a>
              <a href={informacion.Twitter} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
                <i className="fab fa-twitter text-3xl"></i>
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            <p className="mb-1 text-gray-300">{informacion.Telefono}</p>
            <p className="mb-1 text-gray-300">{informacion.Correo_electronico}</p>
            <p className="mb-1 text-gray-300">Fundado en: {informacion["Fecha de fundación"]}</p>
            <p className="mb-1 text-gray-300"><strong>Misión:</strong> {informacion.Misión}</p>
            <p className="mb-1 text-gray-300"><strong>Visión:</strong> {informacion.Visión}</p>
            <p className="text-gray-300"><strong>Valores:</strong> {informacion.Valores}</p>
          </div>
        </div>
        <div className="text-center text-sm mt-8">
          <p className="text-gray-300">&copy; {new Date().getFullYear()} {informacion["Nombre del partido"]}. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
