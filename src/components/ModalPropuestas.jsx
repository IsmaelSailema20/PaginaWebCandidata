import React, { useEffect, useState } from "react";
import { X, Save } from "lucide-react";

const ICON_NAMES = {
  ScrollText: "Pergamino",
  Building2: "Edificio Corporativo",
  Briefcase: "Maletín",
  GraduationCap: "Graduación",
  Users: "Grupo de Personas",
  Target: "Objetivo",
  Lightbulb: "Bombilla",
  Users2: "Red de Contactos",
  DollarSign: "Finanzas",
  Building: "Edificio",
  UserCog: "Configuración de Usuario"
};

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
      <select
        value={propuesta.categoria}
        onChange={(e) =>
          setPropuesta({ ...propuesta, categoria: e.target.value })
        }
        className="border p-2 rounded"
        required
      >
        <option value="">Seleccionar Categoría *</option>
        {categorias.map((cat) => (
          <option key={cat.id_cat_propuesta} value={cat.nombre_cat_propuesta}>
            {cat.nombre_cat_propuesta}
          </option>
        ))}
      </select>
      <select
        value={propuesta.icon}
        onChange={(e) => setPropuesta({ ...propuesta, icon: e.target.value })}
        className="border p-2 rounded"
        required
      >
        <option value="">Seleccionar Ícono *</option>
        {availableIcons.map((icon) => (
          <option key={icon} value={icon}>
            {ICON_NAMES[icon] || icon}
          </option>
        ))}
      </select>
      <select
        value={propuesta.id_candidato}
        onChange={(e) =>
          setPropuesta({ ...propuesta, id_candidato: e.target.value })
        }
        className="border p-2 rounded"
        required
      >
        <option value="">Seleccionar Candidato *</option>
        {candidatos.map((candidato) => (
          <option key={candidato.id_miembro} value={candidato.id_miembro}>
            {candidato.nombre_miembro}
          </option>
        ))}
      </select>
      <select
        value={alcancePropuesta}
        onChange={(e) => {
          setAlcancePropuesta(e.target.value);
          setPropuesta({ ...propuesta, alcance_propuesta: e.target.value });
        }}
        className="border p-2 rounded"
        required
      >
        <option value="">Seleccionar Alcance de la Propuesta *</option>
        <option value="nacional">Nacional</option>
        <option value="regional">Regional</option>
        <option value="local">Local</option>
      </select>
      <div className="col-span-2 flex justify-end space-x-2">
        <button
          onClick={onCancel}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          <X className="mr-2 inline" /> Cancelar
        </button>
        <button
          onClick={() => onSave(propuesta)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          <Save className="mr-2 inline" /> Guardar
        </button>
      </div>
    </div>
  );
};

export default ModalPropuestas;