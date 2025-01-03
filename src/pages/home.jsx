import React, { useEffect, useState } from "react";
import "../styles/stylesHome.css";

function Home() {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [leader, setLeader] = useState(null);
  const [members, setMembers] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [sections, setSections] = useState([]); // Estado para almacenar las secciones
  const [informacion, setInformacion] = useState([]);
  const API_BASE_URL = "http://localhost/ProyectoManejo/PaginaWebCandidata/models";

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

  // Obtener noticias
  useEffect(() => {
    fetch(`${API_BASE_URL}/get_news.php`)
      .then((response) => response.json())
      .then((data) => setNews(data))
      .catch((error) => console.error("Error al obtener noticias:", error));
  }, []);
  useEffect(() => {
    fetch(`${API_BASE_URL}/get_informacion_partido.php`)
      .then((response) => response.json())
      .then((data) => setInformacion(data))
      .catch((error) => console.error("Error al obtener noticias:", error));
  }, []);
  // Obtener eventos (solo los 3 primeros)
  useEffect(() => {
    fetch(`${API_BASE_URL}/get_events.php`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEvents(data.slice(0, 3));
        } else {
          console.error("La respuesta no es un arreglo de eventos válido");
        }
      })
      .catch((error) => console.error("Error al obtener eventos:", error));
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

  // Obtener las primeras 3 propuestas
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
            filter: "brightness(0.5) blur(5px)" 
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
          <div style={{ flex: 1, marginTop: "50px" , textAlign: "center"}}>
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
                  {informacion['Nombre del partido']}
                </h3>
                <h3 style={{ fontSize: "1.5rem", lineHeight: "1.5", marginTop: "10px",  textAlign: "center" }}>
                  {informacion['Slogan del partido']}
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
              <div style={{ marginTop: "50px" , textAlign: "center"}}>
              
              <h3 style={{ fontSize: "2.1rem",color: "fuchsia", lineHeight: "1.5", marginTop: "30px" }}>
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
      <section className="news-section">
        <div className="content">
          <p className="subtitle">MIEMBROS DESTACADOS</p>
          <div className="members-list">
            {members.length > 0 ? (
              members.map((member, index) => (
                <div className="member-card" key={index}>
                  <div className="member-name-photo">
                    <h3>{member.nombre_miembro}</h3>
                    <img
                      src={member.url_to_image_placeholder}
                      alt={member.nombre_miembro}
                    />
                  </div>
                  <div className="member-description">
                    <p>{member.descripcion_miembro}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Cargando miembros...</p>
            )}
          </div>
        </div>
      </section>

      {/* Sección de Noticias */}
      <section className="news-section">
        <div className="content">
          <p className="subtitle">NOTICIAS</p>
          <h1>Últimas Actualizaciones y Noticias</h1>
          <p>
            Mantente al día con las últimas noticias y desarrollos de nuestra
            campaña.
          </p>
        </div>
        <div className="news-items">
          {news.length > 0 ? (
            news.map((item, index) => (
              <div className="news-item" key={index}>
                <img src={item.urlImagen} alt={item.titulo} />
                <h3>{item.titulo}</h3>
                <p>{item.descripcion}</p>
              </div>
            ))
          ) : (
            <p>Cargando noticias...</p>
          )}
        </div>
      </section>

      {/* Sección de Propuestas */}
      <section className="news-section">
        <div className="content">
          <p className="subtitle">PROPUETAS DESTACADAS</p>
          <div className="news-items">
            {proposals.length > 0 ? (
              proposals.map((proposal, index) => (
                <div className="news-item" key={index}>
                  <h3>{proposal.titulo_propuesta}</h3>
                  <p>{proposal.descripcion_propuesta}</p>
                  <p>
                    <strong>Alcance:</strong> {proposal.alcance_propuesta}
                  </p>
                </div>
              ))
            ) : (
              <p>Cargando propuestas...</p>
            )}
          </div>
        </div>
      </section>

      {/* Sección de Secciones Dinámicas */}
      <section className="sections-section">
        <div className="content">
          <div className="sections-list">
            {sections.length > 0 ? (
              sections.map((section, index) => (
                <div className="section-card" key={index}>
                  <div className="content">
                    <p className="subtitle center">{section.nombre}</p>
                  </div>
                  <div className="section-row">
                    <div className="section-description">
                      <p className="left">{section.descripcion}</p>
                    </div>
                    {section.url_de_la_imagen && (
                      <div className="section-image">
                        <img
                          src={section.url_de_la_imagen}
                          alt={section.nombre}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>Cargando secciones...</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
