import { useState, useEffect } from "react";
import { useSettings } from "./SettingsContext";

const EventosNoticias = () => {
  const {
    backgroundColor,
    textColor,
    font,
    cardPrimaryColor,
    cardSecondaryColor,
    cardTextPrimaryColor,
    cardTextSecondaryColor,
  } = useSettings();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNoticia, setSelectedNoticia] = useState(null);
  const [isModalEventOpen, setIsModalEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const openModal = (noticia) => {
    setSelectedNoticia(noticia);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNoticia(null);
  };

  const openModalEvent = (evento) => {
    setSelectedEvent(evento);
    setIsModalEventOpen(true);
  };

  const closeModalEvent = () => {
    setIsModalEventOpen(false);
    setSelectedEvent(null);
  };

  const [eventos, setEventos] = useState([]);
  useEffect(() => {
    fetch(
      "http://localhost:8081/ProyectoManejo/paginaWebCandidata/models/ConsultaEventos.php"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setEventos(data);
      })
      .catch((error) => {
        console.error("Error fetching the events:", error);
      });
  }, []);

  const [noticias, setNoticias] = useState([]);
  useEffect(() => {
    fetch(
      "http://localhost:8081/ProyectoManejo/paginaWebCandidata/models/ConsultaNoticias.php"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setNoticias(data);
      })
      .catch((error) => {
        console.error("Error fetching the events:", error);
      });
  }, []);

  return (
    <>
      <div
        className="general overflow-x-hidden p-10 relative w-full min-h-screen overflow-hidden"
        style={{ backgroundColor: backgroundColor }}
      >
        <h1
          className="text-center mt-2 mb-10 text-5xl font-bold "
          style={{ color: textColor, fontFamily: font }}
        >
          EVENTOS Y NOTICIAS
        </h1>
        <div className=" text-black py-10 px-4">
          <h2
            className="text-4xl font-bold text-center mb-8"
            style={{ color: textColor, fontFamily: font }}
          >
            NOTICIAS
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {noticias.map((noticia) => (
              <div
                key={noticia.id}
                className="w-full max-w-sm  text-black rounded-lg overflow-hidden shadow-lg"
                style={{
                  backgroundColor: cardPrimaryColor,
                  color: cardTextPrimaryColor,
                }}
              >
                <div className="relative">
                  <img
                    src={noticia.imagen}
                    alt={`Noticia ${noticia.id + 1}`}
                    className="w-full h-56 object-cover"
                  />
                  <button
                    className="absolute bottom-0 left-0 bg-red-500 text-white text-sm px-3 py-1  hover:bg-red-400 hover:scale-x-105"
                    onClick={() => openModal(noticia)}
                  >
                    Leer más
                  </button>
                  <div
                    className="absolute top-0 left-0 w-full  text-sm px-3 py-2 flex flex-col sm:flex-row justify-between items-start sm:items-center"
                    style={{
                      backgroundColor: cardSecondaryColor,
                      color: cardTextSecondaryColor,
                    }}
                  >
                    <div className="flex items-center">
                      <span className="font-bold whitespace-normal break-words flex items-center w-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C8.686 2 6 4.686 6 8c0 4.28 6 12 6 12s6-7.72 6-12c0-3.314-2.686-6-6-6zm0 8.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 5.5 12 5.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        {noticia.lugar}
                      </span>
                    </div>
                    <div className="flex items-center mt-2 sm:mt-0">
                      <span className="flex flex-col items-start">
                        <span className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM5 8h14v12H5V8zm2-4h10v2H7V4z" />
                          </svg>
                          {noticia.fecha}
                        </span>
                        <span className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 1a11 11 0 110 22A11 11 0 0112 1zm0 2a9 9 0 100 18 9 9 0 000-18zm0 4a1 1 0 011 1v4.586l3.293 3.293-1.414 1.414L11 12.414V7a1 1 0 011-1z" />
                          </svg>
                          {noticia.hora}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p
                    className=" text-2xl uppercase font-semibold"
                    style={{ color: cardTextPrimaryColor, fontFamily: font }}
                  >
                    {noticia.titulo}
                  </p>
                  <p
                    className="text-gray-700 text-sm"
                    style={{ color: cardTextPrimaryColor, fontFamily: font }}
                  >
                    {noticia.descripcion.length > 100
                      ? `${noticia.descripcion.substring(0, 100)} ...`
                      : noticia.descripcion}
                  </p>
                </div>
              </div>
            ))}
            {isModalOpen && selectedNoticia && (
              <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                <div
                  className=" rounded-2xl shadow-xl w-11/12 md:w-3/5 overflow-hidden relative"
                  style={{ backgroundColor: backgroundColor }}
                >
                  {/* Botón de cierre */}
                  <button
                    className="absolute top-4 right-4 bg-gray-100 hover:bg-red-500 text-gray-800 hover:text-white text-xl rounded-full w-10 h-10 flex items-center justify-center transition-all"
                    onClick={closeModal}
                  >
                    &times;
                  </button>

                  {/* Contenido del modal */}
                  <div className="overflow-y-auto max-h-[calc(100vh-100px)] scrollbar-hide">
                    {/* Imagen */}
                    <img
                      src={selectedNoticia.imagen}
                      alt={selectedNoticia.titulo}
                      className="w-full h-72 object-cover"
                    />

                    {/* Contenido textual */}
                    <div className="p-6 space-y-4">
                      <div>
                        <h2 className="text-2xl font-bold ">
                          {selectedNoticia.titulo}
                        </h2>
                      </div>

                      <div
                        style={{ backgroundColor: backgroundColor }}
                        className=" rounded-lg p-4"
                      >
                        <p className="font-semibold text-sm text-gray-700">
                          Descripción:
                        </p>
                        <p className="text-gray-600 mt-1">
                          {selectedNoticia.descripcion}
                        </p>
                      </div>

                      <div
                        style={{ backgroundColor: backgroundColor }}
                        className=" rounded-lg p-4"
                      >
                        <p className="font-semibold text-sm text-gray-700">
                          Lugar:
                        </p>
                        <p className="text-gray-600 mt-1">
                          {selectedNoticia.lugar}
                        </p>
                      </div>

                      <div className=" rounded-lg p-4 grid grid-cols-2 gap-4">
                        <div
                          style={{ backgroundColor: backgroundColor }}
                          className=" rounded-lg p-4"
                        >
                          <p className="font-semibold text-sm text-gray-700">
                            Fecha:
                          </p>
                          <p className="text-gray-600 mt-1">
                            {selectedNoticia.fecha}
                          </p>
                        </div>
                        <div
                          style={{ backgroundColor: backgroundColor }}
                          className=" rounded-lg p-4"
                        >
                          <p className="font-semibold text-sm text-gray-700">
                            Hora:
                          </p>
                          <p className="text-gray-600 mt-1">
                            {selectedNoticia.hora}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div
                    className=" p-4 rounded-b-2xl"
                    style={{ backgroundColor: cardSecondaryColor }}
                  >
                    <p className="text-center text-lg font-bold text-white uppercase">
                      {selectedNoticia.titulo}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="contenedorEventos mt-10">
          <h1
            className="text-center mt-2 mb-10 text-4xl font-bold"
            style={{ color: textColor, fontFamily: font }}
          >
            EVENTOS
          </h1>
          <div className="eventos grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-screen-lg mx-auto">
            {eventos.map((evento) => (
              <div
                key={evento.id}
                className="relative bg-white text-black rounded-lg overflow-hidden shadow-lg"
                style={{
                  backgroundColor: cardPrimaryColor,
                  color: cardTextPrimaryColor,
                }}
              >
                <button
                  className="absolute z-20 top-0 right-0 bg-red-500 text-white text-sm px-3 py-1 hover:bg-red-400 hover:scale-x-105"
                  onClick={() => openModalEvent(evento)}
                >
                  Leer más
                </button>
                <div className="relative w-full h-64">
                  <img
                    className="object-cover w-full h-60 rounded-sm"
                    src={evento.imagen}
                    alt={evento.titulo}
                  />
                </div>

                <div className="p-2">
                  <div
                    className="text-lg sm:text-xl md:text-2xl font-bold"
                    style={{ color: cardTextPrimaryColor, fontFamily: font }}
                  >
                    {evento.titulo}
                  </div>
                  <p
                    className=" text-xs sm:text-sm md:text-base mt-2"
                    style={{ color: cardTextPrimaryColor, fontFamily: font }}
                  >
                    {evento.descripcion.length > 100
                      ? `${evento.descripcion.substring(0, 100)} ...`
                      : evento.descripcion}
                  </p>
                </div>

                <div
                  className="p-4 text-sm flex flex-col sm:flex-row justify-between items-start sm:items-center"
                  style={{
                    backgroundColor: cardSecondaryColor,
                    color: cardTextSecondaryColor,
                  }}
                >
                  <div className="flex items-center w-3/4">
                    <span className="font-bold whitespace-normal break-words flex items-center w-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C8.686 2 6 4.686 6 8c0 4.28 6 12 6 12s6-7.72 6-12c0-3.314-2.686-6-6-6zm0 8.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 5.5 12 5.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      {evento.lugar}
                    </span>
                  </div>
                  <div className="flex items-center mt-2 sm:mt-0">
                    <span className="flex flex-col items-start">
                      <span className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM5 8h14v12H5V8zm2-4h10v2H7V4z" />
                        </svg>
                        {evento.fecha}
                      </span>
                      <span className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 1a11 11 0 110 22A11 11 0 0112 1zm0 2a9 9 0 100 18 9 9 0 000-18zm0 4a1 1 0 011 1v4.586l3.293 3.293-1.414 1.414L11 12.414V7a1 1 0 011-1z" />
                        </svg>
                        {evento.hora}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isModalEventOpen && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-11/12 md:w-3/5 overflow-hidden relative">
              {/* Botón de cierre */}
              <button
                className="absolute top-4 right-4 bg-gray-100 hover:bg-red-500 text-gray-800 hover:text-white text-xl rounded-full w-10 h-10 flex items-center justify-center transition-all"
                onClick={closeModalEvent}
              >
                &times;
              </button>

              {/* Contenido del modal */}
              <div
                className="overflow-y-auto max-h-[calc(100vh-100px)] scrollbar-hide"
                style={{ backgroundColor: backgroundColor }}
              >
                {/* Imagen */}
                <img
                  src={selectedEvent.imagen}
                  alt={selectedEvent.titulo}
                  className="w-full h-72 object-cover"
                />

                {/* Contenido textual */}
                <div className="p-6 space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {selectedEvent.titulo}
                    </h2>
                  </div>

                  <div
                    className=" rounded-lg p-4"
                    style={{ backgroundColor: backgroundColor }}
                  >
                    <p className="font-semibold text-sm text-gray-700">
                      Descripción:
                    </p>
                    <p className="text-gray-600 mt-1">
                      {selectedEvent.descripcion}
                    </p>
                  </div>

                  <div
                    className=" rounded-lg p-4 "
                    style={{ backgroundColor: backgroundColor }}
                  >
                    <p className="font-semibold text-sm text-gray-700">
                      Lugar:
                    </p>
                    <p className="text-gray-600 mt-1">{selectedEvent.lugar}</p>
                  </div>

                  <div className=" rounded-lg p-4 grid grid-cols-2 gap-4">
                    <div
                      className=" rounded-lg p-4"
                      style={{ backgroundColor: backgroundColor }}
                    >
                      <p className="font-semibold text-sm text-gray-700">
                        Fecha:
                      </p>
                      <p className="text-gray-600 mt-1">
                        {selectedEvent.fecha}
                      </p>
                    </div>
                    <div
                      className=" rounded-lg p-4"
                      style={{ backgroundColor: backgroundColor }}
                    >
                      <p className="font-semibold text-sm text-gray-700">
                        Hora:
                      </p>
                      <p className="text-gray-600 mt-1">{selectedEvent.hora}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div
                className="p-4 rounded-b-2xl"
                style={{ backgroundColor: cardSecondaryColor }}
              >
                <p className="text-center text-lg font-bold text-white uppercase">
                  {selectedEvent.titulo}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EventosNoticias;
