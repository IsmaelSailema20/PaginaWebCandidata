import React, { useEffect, useState } from "react";
import "../styles/stylesHome.css";

function Home() {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);

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
      .then(data => setEvents(data.slice(0, 3))) // Filtrar solo los primeros 3 eventos
      .catch(error => console.error('Error al obtener eventos:', error));
  }, []);

  return (
    <>
      <section className="hero-section">
        <div className="content">
          <p className="subtitle">TE ESPERAMOS</p>
          <h1>Hagamos del Mundo un Lugar Mejor</h1>
          <p>Podemos comenzar dando pequeños pasos y realizando cambios que tengan un gran impacto en el mundo.</p>
        </div>
        <div className="hero-image">
          <img src="hero-image.png" alt="Político hablando" />
        </div>
      </section>

      <section className="mission-section">
        <div className="content">
          <p className="subtitle">MISIÓN</p>
          <h1>Estamos Comprometidos con Empoderar a la Comunidad</h1>
          <p>Nuestra misión es empoderar a las personas a través de la educación, la salud y el apoyo social, asegurando un mejor mañana. Al crear iniciativas y programas que fomenten un sentido de responsabilidad, estamos sentando las bases para una comunidad más fuerte y conectada.</p>
        </div>
        <div className="image">
          <img src="mission-image.png" alt="Misión" />
        </div>
      </section>

      <section className="vision-section">
        <div className="content">
          <p className="subtitle">VISIÓN</p>
          <h1>Construyendo un Futuro Sostenible Juntos</h1>
          <p>Imaginamos un futuro donde cada persona tenga acceso a las herramientas necesarias para prosperar. Nuestra visión es una sociedad donde las oportunidades de crecimiento y éxito sean abundantes, y cada voz sea escuchada, llevando a un mundo más justo, más verde y más equitativo para todos.</p>
        </div>
        <div className="image">
          <img src="vision-image.png" alt="Visión" />
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

      {/* Sección de Eventos */}
      <section className="events-section">
        <div className="content">
          <p className="subtitle">EVENTOS</p>
          <h1>Únete a Nuestros Próximos Eventos</h1>
          <p>Estamos organizando varios eventos para interactuar con la comunidad. ¡No te pierdas la oportunidad de ser parte del movimiento!</p>
        </div>
        <div className="events-items">
          {events.length > 0 ? (
            events.map((item, index) => (
              <div className="event-item" key={index}>
                <h3>{item.titulo}</h3>
                <img src={item.urlImagen} alt={item.titulo} />
                <p>{item.descripcion}</p>
              </div>
            ))
          ) : (
            <p>Cargando eventos...</p>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
