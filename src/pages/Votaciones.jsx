import React, { useEffect, useState } from "react";
import CardVotaciones from "../components/CardVotaciones";

function Votaciones() {
  const [votedCandidate, setVotedCandidate] = useState(null);
  const [votaciones, setVotaciones] = useState([]); // Estado para las votaciones desde el backend

  useEffect(() => {
    // Verificar en localStorage si ya se ha votado por una candidata
    const storedVote = localStorage.getItem("voto_candidata");
    if (storedVote) {
      setVotedCandidate(storedVote);
    }

    // Cargar las votaciones desde el backend
    const fetchVotaciones = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/ProyectoManejo/PaginaWebCandidata/models/ObtenerVotaciones.php"
        );
        const data = await response.json();
        // Filtrar solo las votaciones con visibilidad activa
        const votacionesVisibles = data.filter(
          (votacion) => votacion.visible === 1
        );
        setVotaciones(votacionesVisibles);
      } catch (error) {
        console.error("Error al cargar las votaciones:", error);
      }
    };

    fetchVotaciones();
  }, []);

  const handleVote = async (candidate) => {
    try {
      // Guardar el voto en el backend
      const response = await fetch(
        "http://localhost:8081/ProyectoManejo/PaginaWebCandidata/models/GuardarVotos.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_votacion: candidate.id_votacion }),
        }
      );

      const result = await response.json();

      if (result.success) {
        // Guardar el voto en localStorage y actualizar el estado
        localStorage.setItem("voto_candidata", candidate.nombre_votacion);
        setVotedCandidate(candidate.nombre_votacion);
      } else {
        alert(result.message || "Error al guardar el voto");
      }
    } catch (error) {
      console.error("Error al guardar el voto:", error);
      alert("Ocurrió un error al intentar guardar tu voto");
    }
  };

  return (
    <section className="relative w-full min-h-screen py-6 flex justify-center items-center">
      <style>
        {`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
  
        .bubble {
          position: absolute;
          background: linear-gradient(to right, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.1));
          backdrop-filter: blur(2px);
          border-radius: 50%;
          pointer-events: none;
          will-change: transform;
        }
      `}
      </style>
      <div className="absolute w-full h-full overflow-hidden">
        {[...Array(20)].map((_, i) => {
          const size = Math.random() * 4 + 1;
          const left = Math.random() * 100;
          const delay = Math.random() * 5;
          const duration = Math.random() * 3 + 6;

          return (
            <div
              key={i}
              className="bubble"
              style={{
                width: `${size}rem`,
                height: `${size}rem`,
                left: `${left}%`,
                bottom: `-20px`,
                animation: `float ${duration}s linear infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>
      <div className="w-full flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-screen-2xl p-10 rounded-xl flex flex-col">
          <h1 className="text-4xl font-bold text-center mb-6">
            Queremos Conocer A quién Apoyas
          </h1>
          <div className="flex-grow flex flex-wrap gap-8 justify-center items-center">
            {/* Renderizar tarjetas dinámicamente */}
            {votaciones.length > 0 ? (
              votaciones.map((votacion) => (
                <CardVotaciones
                  key={votacion.id_votacion}
                  src={votacion.imagen}
                  candidata={votacion.nombre_votacion}
                  alt={`Imagen de ${votacion.nombre_votacion}`}
                  hasVoted={votedCandidate !== null}
                  votedFor={votedCandidate}
                  onVote={() => handleVote(votacion)}
                  descripcion={votacion.descripcion}
                />
              ))
            ) : (
              <p className="text-gray-500">
                No existen información para las votaciones
              </p>
            )}
          </div>
          <h5 className="my-6 font-semibold text-sm text-gray-700 text-center">
            Los votos de apoyo solo serán utilizados a manera de encuesta.
            Ninguno de estos votos son significativos durante las encuestas.
          </h5>
        </div>
      </div>
    </section>
  );
}

export default Votaciones;
