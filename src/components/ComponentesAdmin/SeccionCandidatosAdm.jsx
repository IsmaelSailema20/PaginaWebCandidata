// SeccionCandidatosAdm.jsx
import React from "react";
import { ListWithAvatar } from "../ListadoCandidatos"; // Asegúrate de cambiar la ruta a la ubicación correcta

function SeccionCandidatosAdm() {
  return (
    <div>
      <h2 className="m">Sección de Candidatos</h2>
      <ListWithAvatar />
    </div>
  );
}

export default SeccionCandidatosAdm;