import React, { useEffect, useState } from "react";
import "../styles/stylesHome.css";
import { useSettings } from "./SettingsContext";

function Home() {
  const {
    backgroundColor,
    textColor,
    font,
    cardPrimaryColor,
    cardSecondaryColor,
    cardTextPrimaryColor,
    cardTextSecondaryColor,
  } = useSettings();
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [leader, setLeader] = useState(null);
  const [members, setMembers] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [sections, setSections] = useState([]); // Estado para almacenar las secciones
  const [informacion, setInformacion] = useState([]);
  const API_BASE_URL =
    "http://localhost:8081/ProyectoManejo/PaginaWebCandidata/models";
  const [selectedMember, setSelectedMember] = useState(members[0]);
  // Aquí debería estar la lista de miembros

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);

  const openModal = (proposal) => {
    setSelectedProposal(proposal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProposal(null);
  };

  const nextMember = () => {
    const currentIndex = members.indexOf(selectedMember);
    const nextIndex = (currentIndex + 1) % members.length; // Si llega al final, vuelve al primero
    setSelectedMember(members[nextIndex]);
  };

  // Función para ir al miembro anterior
  const prevMember = () => {
    const currentIndex = members.indexOf(selectedMember);
    const prevIndex = (currentIndex - 1 + members.length) % members.length; // Si llega al primero, vuelve al último
    setSelectedMember(members[prevIndex]);
  };

  // Inicializa el primer miembro
  useEffect(() => {
    if (members.length > 0) {
      setSelectedMember(members[0]);
    }
  }, [members]);
  // Obtener secciones
  useEffect(() => {
    fetch(`${API_BASE_URL}/get_secciones_visibles.php`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSections(data);
        } else {
          console.error("La respuesta no es un arreglo válido");
        }
      })
      .catch((error) => console.error("Error al obtener secciones:", error));
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/get_news.php`)
      .then((response) => response.json())
      .then((data) => {
        const updatedNews = data.map((item) => {
          const words = item.descrip_evento_noticia.split(" ");
          const truncatedDescription = words.slice(0, 10).join(" "); // Cortar las primeras 10 palabras
          return {
            ...item,
            descrip_evento_noticia: truncatedDescription.endsWith("...")
              ? truncatedDescription // Si ya tiene puntos al final, no hacer nada
              : `${truncatedDescription}...`, // Si no, agregar exactamente tres puntos
          };
        });
        setNews(updatedNews); // Actualizar el estado con las noticias procesadas.
        console.log(data);
      })
      .catch((error) => console.error("Error al obtener noticias:", error));
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/get_events.php`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const updatedEvents = data.map((item) => {
          const words = item.descrip_evento_noticia.split(" ");
          const truncatedDescription = words.slice(0, 10).join(" "); // Cortar las primeras 10 palabras
          return {
            ...item,
            descrip_evento_noticia: truncatedDescription.endsWith("...")
              ? truncatedDescription // Si ya tiene puntos al final, no hacer nada
              : `${truncatedDescription}...`, // Si no, agregar exactamente tres puntos
          };
        });
        setEvents(updatedEvents); // Actualizar el estado con los eventos procesados.
        console.log("Eventos:");
        console.log(data);
      })
      .catch((error) => console.error("Error al obtener eventos:", error));
  }, []);
  useEffect(() => {
    fetch(`${API_BASE_URL}/get_informacion_partido.php`)
      .then((response) => response.json())
      .then((data) => setInformacion(data))
      .catch((error) => console.error("Error al obtener noticias:", error));
  }, []);

  // Obtener información del líder
  useEffect(() => {
    fetch(`${API_BASE_URL}/get_leader.php`)
      .then((response) => response.json())
      .then((data) => setLeader(data))
      .catch((error) =>
        console.error("Error al obtener información del líder:", error)
      );
  }, []);

  // Obtener miembros (no el líder)
  useEffect(() => {
    fetch(`${API_BASE_URL}/get_members_no_leader.php`)
      .then((response) => response.json())
      .then((data) => setMembers(data))
      .catch((error) => console.error("Error al obtener miembros:", error));
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/get_proposals.php`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProposals(data.slice(0, 3));
        } else {
          console.error("La respuesta no es un arreglo de propuestas válido");
        }
      })
      .catch((error) => console.error("Error al obtener propuestas:", error));
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      />
      <section
        className="top-section"
        style={{
          position: "relative",
          height: "95vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        {/* Imagen de fondo borrosa */}
        <div
          style={{
            backgroundImage: "url(/fondo.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
            filter: "brightness(0.5) blur(2px)",
          }}
        ></div>

        {/* Contenido principal */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "row",
            width: "90%",
            maxWidth: "1200px",
            gap: "20px",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          {/* Información del partido (Izquierda) */}
          <div style={{ flex: 1, marginTop: "50px", textAlign: "center" }}>
            {leader && (
              <div>
                <h3
                  style={{
                    fontSize: "2rem",
                    marginBottom: "20px",
                    padding: "10px",
                    backgroundColor: "#007bff",
                    color: "white",
                    borderRadius: "5px",
                    textAlign: "center",
                  }}
                >
                  {informacion["Nombre del partido"]}
                </h3>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    lineHeight: "1.5",
                    marginTop: "10px",
                    textAlign: "center",
                  }}
                >
                  {informacion["Slogan del partido"]}
                </h3>
              </div>
            )}
          </div>

          {/* Imagen del líder (Centro) */}
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            {leader?.url_to_image_placeholder && (
              <img
                src={leader.url_to_image_placeholder}
                alt={leader.nombre_miembro}
                style={{
                  width: "300px",
                  height: "300px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
                }}
              />
            )}
          </div>

          {/* Información del líder (Derecha) */}
          <div style={{ flex: 1 }}>
            {leader && (
              <div style={{ marginTop: "50px", textAlign: "center" }}>
                <h3
                  style={{
                    fontSize: "2.1rem",
                    color: "fuchsia",
                    lineHeight: "1.5",
                    marginTop: "30px",
                  }}
                >
                  {leader.descripcion_miembro}
                </h3>
                <h3 style={{ fontSize: "2rem", marginBottom: "30px" }}>
                  {leader.nombre_miembro}
                </h3>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Sección de Miembros (no el líder) */}
      <section
        className="min-h-[600px] relative bg-dark text-white p-8 mb-0"
        style={{
          backgroundColor: backgroundColor,
          color: textColor,
        }}
      >
        <h3
          className="text-3xl  my-10 text-center"
          style={{ fontFamily: font }}
        >
          Miembros del partido político
        </h3>
        <div className="content container mx-auto relative flex flex-col items-center gap-4">
          {selectedMember ? (
            <div className="grid grid-cols-2 items-center w-full max-w-5xl">
              {/* Card de información */}
              <div
                className=" rounded-l-lg shadow-lg p-6 h-[350px] w-full flex flex-col justify-between"
                style={{ backgroundColor: cardPrimaryColor }}
              >
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    {selectedMember.tipo_miembro}
                  </h3>
                  <h3 className="text-xl mb-2">
                    {selectedMember.nombre_miembro}
                  </h3>
                  <h2 className="text-base font-normal mb-4">
                    {selectedMember.descripcion_miembro}
                  </h2>
                </div>
                <div className="flex space-x-4">
                  <i
                    className="fab fa-facebook text-3xl text-blue-600 hover:scale-110 cursor-pointer transition-transform"
                    onClick={() =>
                      (window.location.href = selectedMember.facebook_url)
                    }
                  ></i>
                  <i
                    className="fab fa-instagram text-3xl text-pink-500 hover:scale-110 cursor-pointer transition-transform"
                    onClick={() =>
                      (window.location.href = selectedMember.instagram_url)
                    }
                  ></i>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-base font-semibold hover:scale-110 transition-transform"
                    onClick={() =>
                      (window.location.href =
                        "http://localhost:5173/candidatos")
                    }
                  >
                    Ver más
                  </button>
                </div>
              </div>

              {/* Imagen */}
              <div className="w-[350px] h-[350px] flex">
                <img
                  src={selectedMember.url_to_image_placeholder}
                  alt={selectedMember.nombre_miembro}
                  className="w-full h-full object-cover rounded-r-lg"
                />
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-400">
              No se encontrarón miembros del partido.
            </p>
          )}

          {/* Botones de navegación */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={prevMember}
              className="bg-blue-950 text-white w-12 h-12 flex items-center justify-center rounded-full hover:bg-fuchsia-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M14 7l-5 5 5 5" />
              </svg>
            </button>
            <button
              onClick={nextMember}
              className="bg-blue-950 text-white w-12 h-12 flex items-center justify-center rounded-full hover:bg-fuchsia-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M10 17l5-5-5-5" />
              </svg>
            </button>
          </div>
        </div>
      </section>
      {/* Sección de Noticias */}
      <section
        className="py-8 bg-gray-100 text-center mt-0"
        style={{
          backgroundColor: backgroundColor,
          color: textColor,
        }}
      >
        <div className="content mb-6">
          <h1
            className="mt-4 text-4xl font-semibold"
            style={{ fontFamily: font }}
          >
            Noticias Relevantes
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-7xl mx-auto px-16">
          {news.length > 0 ? (
            news.slice(0, 4).map((item, index) => (
              <div
                className={`flex flex-col border rounded-lg overflow-hidden shadow-md  ${
                  index < 2 ? "col-span-1" : "col-span-1"
                }`}
                style={{ backgroundColor: cardPrimaryColor }}
                key={index}
              >
                {/* Header con fecha */}
                <div
                  className="flex items-center  text-white px-4 py-2"
                  style={{
                    backgroundColor: cardSecondaryColor,
                    color: cardTextSecondaryColor,
                  }}
                >
                  <span className="mr-2">Fecha</span>
                  <span className="font-medium">{item.fecha}</span>
                </div>

                {/* Imagen */}
                <img
                  className="w-full h-48 object-cover"
                  src={item.urlImagen}
                  alt={item.titulo}
                />

                {/* Cuerpo de la noticia */}
                <div className=" p-4 flex-1 text-left">
                  <h3
                    className=" font-semibold mb-2"
                    style={{ color: cardTextPrimaryColor, fontFamily: font }}
                  >
                    {item.titulo_evento_noticia}
                  </h3>
                  <p
                    className=""
                    style={{ color: cardTextPrimaryColor, fontFamily: font }}
                  >
                    {item.descrip_evento_noticia}
                  </p>
                </div>

                {/* Botón Leer más */}
                <button
                  className="mt-6 mb-6 bg-blue-700 text-white py-2 px-4 w-max mx-auto rounded-md hover:bg-blue-800"
                  onClick={() =>
                    (window.location.href = "http://localhost:5173/eventos")
                  }
                >
                  Leer más
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No existen Noticias</p>
          )}
        </div>
      </section>
      {/* Sección de Eventos */}
      <section
        className="py-8 bg-gray-100 text-center"
        style={{ backgroundColor: backgroundColor, color: textColor }}
      >
        <div className="content mb-6">
          <h1
            className="mt-4 text-4xl font-semibold"
            style={{ fontFamily: font }}
          >
            Ultimos eventos
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-7xl mx-auto px-16">
          {events.length > 0 ? (
            events.slice(0, 4).map((item, index) => (
              <div
                className={`flex flex-col border rounded-lg overflow-hidden shadow-md bg-blue-900 ${
                  index < 2 ? "col-span-1" : "col-span-1"
                }`}
                key={index}
              >
                {/* Header con fecha */}
                <div
                  className="flex items-center px-4 py-2"
                  style={{
                    backgroundColor: cardSecondaryColor,
                    color: cardTextPrimaryColor,
                    fontFamily: font,
                  }}
                >
                  <span className="mr-2">Fecha</span>
                  <span className="font-medium">{item.fecha}</span>
                </div>

                {/* Imagen */}
                <img
                  className="w-full h-48 object-cover"
                  src={item.urlImagen}
                  alt={item.titulo}
                />

                {/* Cuerpo del evento */}
                <div
                  className=" p-4 flex-1 text-left"
                  style={{
                    background: cardPrimaryColor,
                  }}
                >
                  <h3
                    className=" font-semibold mb-2"
                    style={{ color: cardTextPrimaryColor, fontFamily: font }}
                  >
                    {item.titulo_evento_noticia}
                  </h3>
                  <p
                    className=""
                    style={{ color: cardTextPrimaryColor, fontFamily: font }}
                  >
                    {item.descrip_evento_noticia}
                  </p>

                  {/* Botón Leer más */}
                  <button
                    className="mt-6 mb-6 bg-blue-700  py-2 px-4 w-max mx-auto rounded-md hover:bg-blue-800"
                    onClick={() =>
                      (window.location.href = "http://localhost:5173/eventos")
                    }
                  >
                    Leer más
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No existen eventos</p>
          )}
        </div>
      </section>
      {/* Sección de Propuestas */}
      <section
        className="py-8 bg-gray-100 text-center"
        style={{ backgroundColor: backgroundColor, color: textColor }}
      >
        <div className="content mb-6">
          <h1
            className="mt-4 text-4xl font-semibold"
            style={{ fontFamily: font }}
          >
            Propuestas Destacadas
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-7xl mx-auto px-16">
          {proposals.length > 0 ? (
            proposals.map((proposal, index) => (
              <div
                className={`flex flex-col border rounded-lg overflow-hidden shadow-md ${
                  index < 2 ? "col-span-1" : "col-span-1"
                }`}
                key={index}
              >
                {/* Header con información relevante */}
                <div
                  className="flex items-center  text-white px-4 py-2"
                  style={{
                    backgroundColor: cardSecondaryColor,
                    color: cardTextSecondaryColor,
                    fontFamily: font,
                  }}
                >
                  <span className="mr-2">Alcance:</span>
                  <span className="font-medium">
                    {proposal.alcance_propuesta.toUpperCase()}
                  </span>
                </div>

                {/* Imagen de la propuesta */}
                <img
                  className="w-full h-48 object-cover"
                  src={proposal.img_url} // Reemplaza con la URL de la imagen de la propuesta
                  alt={proposal.titulo_propuesta}
                />

                {/* Cuerpo de la propuesta */}
                <div
                  className=" p-4 flex-1 text-left"
                  style={{ backgroundColor: cardPrimaryColor }}
                >
                  <h3
                    className=" font-semibold mb-2"
                    style={{ fontFamily: font, color: cardTextPrimaryColor }}
                  >
                    {proposal.titulo_propuesta}
                  </h3>
                  <p
                    className=" "
                    style={{ fontFamily: font, color: cardTextPrimaryColor }}
                  >
                    {proposal.descripcion_propuesta
                      .split(" ")
                      .slice(0, 5)
                      .join(" ")}
                    ...
                  </p>

                  {/* Botón Leer más */}
                  <button
                    onClick={() => openModal(proposal)}
                    className="mt-6 mb-6 bg-blue-700 text-white py-2 px-4 w-max mx-auto rounded-md hover:bg-blue-800"
                  >
                    Leer más
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No existen propuestas favoritas.</p>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && selectedProposal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-3xl w-full">
              <h3 className="text-xl font-semibold mb-4 justify-start">
                {selectedProposal.titulo_propuesta}
              </h3>
              <img
                className="w-full h-48 object-cover mb-4"
                src={selectedProposal.img_url}
                alt={selectedProposal.titulo_propuesta}
              />
              <p className="mb-4 justify-start">
                {selectedProposal.descripcion_propuesta}
              </p>
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
      {/* Sección de Secciones Dinámicas */}
      <section
        className="py-6 text-white"
        style={{ backgroundColor: backgroundColor }}
      >
        <div className="max-w-7xl mx-auto px-4 text-white">
          <div className="space-y-6 text-white">
            {sections.length > 0 ? (
              sections.map((section, index) => (
                <div
                  className="flex items-center p-4 text-white  border-gray-300 rounded-lg shadow-sm space-x-6"
                  key={index}
                >
                  <div
                    className="flex-1  text-white p-4 rounded-lg"
                    style={{
                      backgroundColor: cardPrimaryColor,
                    }}
                  >
                    <p
                      className="text-center text-white font-semibold text-lg"
                      style={{ fontFamily: font, color: cardTextPrimaryColor }}
                    >
                      {section.nombre}
                    </p>
                    <p
                      className="mt-2 mb-4 text-white"
                      style={{ fontFamily: font, color: cardTextPrimaryColor }}
                    >
                      {section.descripcion}
                    </p>
                  </div>
                  {section.url_de_la_imagen && (
                    <div className="flex-shrink-0">
                      <img
                        src={section.url_de_la_imagen}
                        alt={section.nombre}
                        className="w-80 h-auto rounded-lg shadow-lg"
                      />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-white">
                No se encontrarón mas secciones.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
