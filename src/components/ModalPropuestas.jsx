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
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label htmlFor="titulo_propuesta" className="block mb-1">Título de la Propuesta</label>
          <input
            type="text"
            id="titulo_propuesta"
            placeholder="Título de la Propuesta"
            value={propuesta.titulo_propuesta}
            onChange={(e) =>
              setPropuesta({ ...propuesta, titulo_propuesta: e.target.value })
            }
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="subtitle" className="block mb-1">Subtítulo de la Propuesta</label>
          <input
            type="text"
            id="subtitle"
            placeholder="Subtítulo de la Propuesta"
            value={propuesta.subtitle}
            onChange={(e) =>
              setPropuesta({ ...propuesta, subtitle: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="descripcion_propuesta" className="block mb-1">Descripción de la Propuesta</label>
          <textarea
            id="descripcion_propuesta"
            placeholder="Descripción de la Propuesta"
            value={propuesta.descripcion_propuesta}
            onChange={(e) =>
              setPropuesta({ ...propuesta, descripcion_propuesta: e.target.value })
            }
            className="border p-2 rounded w-full"
            rows="3"
          />
        </div>
        <div>
          <label htmlFor="categoria" className="block mb-1">Seleccionar Categoría</label>
          <select
            id="categoria"
            value={propuesta.categoria}
            onChange={(e) =>
              setPropuesta({ ...propuesta, categoria: e.target.value })
            }
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Seleccionar Categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id_cat_propuesta} value={cat.nombre_cat_propuesta}>
                {cat.nombre_cat_propuesta}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="icon" className="block mb-1">Seleccionar Ícono</label>
          <select
            id="icon"
            value={propuesta.icon}
            onChange={(e) => setPropuesta({ ...propuesta, icon: e.target.value })}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Seleccionar Ícono</option>
            {availableIcons.map((icon) => (
              <option key={icon} value={icon}>
                {ICON_NAMES[icon] || icon}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="id_candidato" className="block mb-1">Seleccionar Candidato</label>
          <select
            id="id_candidato"
            value={propuesta.id_candidato}
            onChange={(e) =>
              setPropuesta({ ...propuesta, id_candidato: e.target.value })
            }
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Seleccionar Candidato</option>
            {candidatos.map((candidato) => (
              <option key={candidato.id_miembro} value={candidato.id_miembro}>
                {candidato.nombre_miembro}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="alcance_propuesta" className="block mb-1">Seleccionar Alcance de la Propuesta</label>
          <select
            id="alcance_propuesta"
            value={alcancePropuesta}
            onChange={(e) => {
              setAlcancePropuesta(e.target.value);
              setPropuesta({ ...propuesta, alcance_propuesta: e.target.value });
            }}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Seleccionar Alcance de la Propuesta</option>
            <option value="nacional">Nacional</option>
            <option value="regional">Regional</option>
            <option value="local">Local</option>
          </select>
        </div>
        {/* Nuevo campo para la URL de la imagen */}
        <div className="col-span-2">
          <label htmlFor="img_url" className="block mb-1">URL de la Imagen de la Propuesta</label>
          <input
            type="url"
            id="img_url"
            placeholder="https://ejemplo.com/imagen.jpg"
            value={propuesta.img_url}
            onChange={(e) =>
              setPropuesta({ ...propuesta, img_url: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
        </div>
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
    </div>
  );
};

export default ModalPropuestas;
