import React, { useEffect, useState } from "react";
import CardVotaciones from "../components/CardVotaciones";

function Votaciones() {
  const [votedCandidate, setVotedCandidate] = useState(null);

  useEffect(() => {
    // Verificar en localStorage si ya se ha votado por una candidata
    const storedVote = localStorage.getItem("voto_candidata");
    if (storedVote) {
      setVotedCandidate(storedVote);
    }
  }, []);

  const handleVote = (candidate) => {
    // Guardar el voto en localStorage y actualizar el estado
    localStorage.setItem("voto_candidata", candidate);
    setVotedCandidate(candidate);
  };
  return (
    <section className="relative w-full min-h-screen py-16 flex justify-center items-center">
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
      <div className="absolute inset-0 overflow-hidden">
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
      <div className="w-full h-screen flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-screen-2xl h-full p-10 rounded-xl flex flex-col">
          <h1 className="text-4xl font-bold text-center mb-6">
            Queremos Conocer A quién Apoyas
          </h1>
          <div className="flex-grow flex flex-wrap gap-8 justify-center items-center">
            {/* Tarjetas dinámicas */}
            <CardVotaciones
              src="/images/Mary.jpg"
              candidata="Mary Cruz Lascano"
              alt="Imagen de la candidata Mary Cruz"
              hasVoted={votedCandidate !== null}
              votedFor={votedCandidate}
              onVote={handleVote}
            />
            <CardVotaciones
              src="/images/Sara.jpeg"
              candidata="Sara Camacho"
              alt="Imagen de la candidata Sara Camacho"
              hasVoted={votedCandidate !== null}
              votedFor={votedCandidate}
              onVote={handleVote}
            />
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