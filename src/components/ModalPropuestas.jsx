import React, { useEffect, useState } from "react";
import { X, Save } from "lucide-react";

const ModalPropuestas = ({
  propuesta,
  setPropuesta,
  categorias,
  availableIcons,
  onSave,
  onCancel,
  candidatos,
}) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-4">
        {propuesta.id_propuesta ? "Editar Propuesta" : "Nueva Propuesta"}
      </h3>
    </div>
  );
};

export default ModalPropuestas;