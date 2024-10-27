import React from "react";
import { useState, useEffect } from "react";
import FormularioSugerencias from "./FormularioSugerencias.jsx";
import CardVotaciones from "./CardVotaciones.jsx";
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
    <div className="w-full flex flex-wrap gap-1 items-center max-w-screen-2xl">
      <FormularioSugerencias />
      <div className="w-1/2  mr-16 bg-slate-100 bg-opacity-80 p-8 rounded-lg max-w-3xl">
        <h1 className="mb-7 text-center font-bold text-3xl">
          ¡Queremos conocer tu opinión!
        </h1>
        <div className="flex flex-row gap-8">
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
        <h2 className="mt-8 font-semibold">
          Los votos de apoyo a las candidatas solo serán utilizados a manera de
          encuesta.
        </h2>
      </div>
    </div>
  );
}

export default PaginaSugerenciasVotos;
