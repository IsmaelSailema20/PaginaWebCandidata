import React, { useEffect, useState } from "react";
import "../styles/stylesHome.css";

function Home() {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [leader, setLeader] = useState(null);
  const [members, setMembers] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [sections, setSections] = useState([]); // Estado para almacenar las secciones

  // Obtener secciones
  useEffect(() => {
    fetch(
      "http://localhost:8081/ProyectoManejo/PaginaWebCandidata/models/get_secciones_visibles.php"
    )
      .then((response) => response.json())
      .then((data) => {
        // Asegurarse de que data es un array antes de actualizar el estado
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
    fetch(
      "http://localhost:8081/ProyectoManejo/PaginaWebCandidata/models/get_news.php"
    )
      .then((response) => response.json())
      .then((data) => setNews(data))
      .catch((error) => console.error("Error al obtener noticias:", error));
  }, []);

  // Obtener eventos (solo los 3 primeros)
  useEffect(() => {
    fetch(
      "http://localhost:8081/ProyectoManejo/PaginaWebCandidata/models/get_events.php"
    )
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
    fetch(
      "http://localhost:8081/ProyectoManejo/PaginaWebCandidata/models/get_leader.php"
    )
      .then((response) => response.json())
      .then((data) => setLeader(data))
      .catch((error) =>
        console.error("Error al obtener información del líder:", error)
      );
  }, []);

  // Obtener miembros (no el líder)
  useEffect(() => {
    fetch(
      "http://localhost:8081/ProyectoManejo/PaginaWebCandidata/models/get_members_no_leader.php"
    )
      .then((response) => response.json())
      .then((data) => setMembers(data))
      .catch((error) => console.error("Error al obtener miembros:", error));
  }, []);

  // Obtener las primeras 3 propuestas
  useEffect(() => {
    fetch(
      "http://localhost:8081/ProyectoManejo/PaginaWebCandidata/models/get_proposals.php"
    )
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
      {/* Título, imagen y descripción en la parte superior */}
      <section className="top-section">
        <div className="content">
          <table style={{ width: "100%", borderCollapse: "collapse" }}></table>
        </div>
      </section>

      {/* Sección de Líder */}
      {leader && (
        <section className="leader-section">
          <div className="content">
            <div className="leader-info">
              <h2>Líder del partido</h2>
              <div className="leader-card">
                <div className="leader-name-photo">
                  <h3>{leader.nombre_miembro}</h3>
                  {leader.url_to_image_placeholder && (
                    <img
                      src={leader.url_to_image_placeholder}
                      alt={leader.nombre_miembro}
                    />
                  )}
                </div>
                <div className="leader-description">
                  <p>{leader.descripcion_miembro}</p>
                  <p>
                    <strong>Nivel Académico:</strong> {leader.nivel_academico}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

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
