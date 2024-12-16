import React, { useEffect, useState } from "react";
import "../styles/stylesHome.css";

function Home() {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [leader, setLeader] = useState(null);
  const [members, setMembers] = useState([]);
  const [proposals, setProposals] = useState([]); // Estado para almacenar las propuestas

  // Obtener noticias
  useEffect(() => {
    fetch("http://localhost/ProyectoManejo/PaginaWebCandidata/models/get_news.php")
      .then(response => response.json())
      .then(data => setNews(data))
      .catch(error => console.error('Error al obtener noticias:', error));
  }, []);

  // Obtener eventos (solo los 3 primeros)
  useEffect(() => {
    fetch("http://localhost/ProyectoManejo/PaginaWebCandidata/models/get_events.php")
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setEvents(data.slice(0, 3));
        } else {
          console.error('La respuesta no es un arreglo de eventos válido');
        }
      })
      .catch(error => console.error('Error al obtener eventos:', error));
  }, []);

  // Obtener información del líder
  useEffect(() => {
    fetch("http://localhost/ProyectoManejo/PaginaWebCandidata/models/get_leader.php")
      .then(response => response.json())
      .then(data => setLeader(data))
      .catch(error => console.error('Error al obtener información del líder:', error));
  }, []);

  // Obtener miembros (no el líder)
  useEffect(() => {
    fetch("http://localhost/ProyectoManejo/PaginaWebCandidata/models/get_members_no_leader.php")
      .then(response => response.json())
      .then(data => setMembers(data))
      .catch(error => console.error('Error al obtener miembros:', error));
  }, []);

  // Obtener las primeras 3 propuestas
  useEffect(() => {
    fetch("http://localhost/ProyectoManejo/PaginaWebCandidata/models/get_proposals.php")
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProposals(data.slice(0, 3)); // Solo las 3 primeras propuestas
        } else {
          console.error('La respuesta no es un arreglo de propuestas válido');
        }
      })
      .catch(error => console.error('Error al obtener propuestas:', error));
  }, []);

  return (
    <>
      {leader && (
        <section className="leader-section">
          <div className="content">
            <div className="leader-info">
              <h2>Líder del partido</h2>
              <div className="leader-card">
                <div className="leader-name-photo">
                  <h3>{leader.nombre_miembro}</h3>
                  {leader.url_to_image_placeholder && (
                    <img src={leader.url_to_image_placeholder} alt={leader.nombre_miembro} />
                  )}
                </div>
                <div className="leader-description">
                  <p>{leader.descripcion_miembro}</p>
                  <p><strong>Nivel Académico:</strong> {leader.nivel_academico}</p>
                  <div className="social-links">
                    {leader.facebook_url && (
                      <a href={leader.facebook_url} target="_blank" rel="noopener noreferrer">
                        <img src="iconosRedes/facebook.png" alt="Facebook" />
                      </a>
                    )}
                    {leader.instagram_url && (
                      <a href={leader.instagram_url} target="_blank" rel="noopener noreferrer">
                        <img src="iconosRedes/instagram.png" alt="Instagram" />
                      </a>
                    )}
                  </div>
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
                    <img src={member.url_to_image_placeholder} alt={member.nombre_miembro} />
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
          <p>Mantente al día con las últimas noticias y desarrollos de nuestra campaña. Estamos comprometidos a mantenerte informado sobre los avances que estamos logrando juntos.</p>
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
                  <p><strong>Alcance:</strong> {proposal.alcance_propuesta}</p>
                </div>
              ))
            ) : (
              <p>Cargando propuestas...</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
