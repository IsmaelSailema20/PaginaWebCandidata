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
    const [alcancePropuesta, setAlcancePropuesta] = useState("");

    useEffect(() => {
      if (propuesta.alcance_propuesta) {
        setAlcancePropuesta(propuesta.alcance_propuesta);
      }
    }, [propuesta]);
  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-4">
        {propuesta.id_propuesta ? "Editar Propuesta" : "Nueva Propuesta"}
      </h3>
      <input
        type="text"
        placeholder="Título de la Propuesta *"
        value={propuesta.titulo_propuesta}
        onChange={(e) =>
          setPropuesta({ ...propuesta, titulo_propuesta: e.target.value })
        }
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Subtítulo"
        value={propuesta.subtitle}
        onChange={(e) =>
          setPropuesta({ ...propuesta, subtitle: e.target.value })
        }
        className="border p-2 rounded"
      />
      <textarea
        placeholder="Descripción"
        value={propuesta.descripcion_propuesta}
        onChange={(e) =>
          setPropuesta({ ...propuesta, descripcion_propuesta: e.target.value })
        }
        className="border p-2 rounded col-span-2"
        rows="3"
      />
    </div>
  );
};

export default ModalPropuestas;