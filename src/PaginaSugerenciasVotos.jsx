import React from "react";
import { useState, useEffect } from "react";
import FormularioSugerencias from "./FormularioSugerencias.jsx";
import CardVotaciones from "./CardVotaciones.jsx";
import "./styles.css";
function PaginaSugerenciasVotos() {
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
    <section className="relative w-full min-h-screen overflow-hidden py-16 flex justify-center items-center">
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
      <div className="w-full max-w-screen-2xl flex flex-wrap gap-8 justify-center items-center px-4">
        <FormularioSugerencias />
        <div className="w-full sm:w-1/2 bg-slate-100 bg-opacity-90 p-10 rounded-xl shadow-lg max-w-3xl fade-in">
          <h1 className="text-4xl font-bold text-center mb-6">
            <span className="text-[#40b2e6] drop-shadow-[4px_2px_0px_#ded2d2]">
              Queremos
            </span>{" "}
            <span className="text-pink-500 drop-shadow-[4px_2px_0px_#ded2d2]">
              Conocer
            </span>{" "}
            <span className="text-[#40b2e6] drop-shadow-[4px_2px_0px_#ded2d2]">
              A Quién
            </span>{" "}
            <span className="text-pink-500 drop-shadow-[4px_2px_0px_#ded2d2]">
              Apoyas
            </span>{" "}
          </h1>
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
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
          <h5 className="mt-8 font-semibold text-sm text-gray-700">
            Los votos de apoyo a las candidatas solo serán utilizados a manera
            de encuesta.
          </h5>
        </div>
      </div>
    </section>
  );
}

export default PaginaSugerenciasVotos;
