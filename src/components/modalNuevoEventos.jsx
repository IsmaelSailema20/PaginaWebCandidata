import React from "react";
import { X, Save } from "lucide-react";

const modalNuevoEventos = ({
    propuesta,
    setPropuesta,
    categorias,
    availableIcons,
    onSave,
    onCancel,
    isEditing,
}) => {
    return (
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-4">
                {isEditing ? "Editar Propuesta" : "Nueva Propuesta"}
            </h3>
            <div className="grid grid-cols-2 gap-4">
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
                            {icon}
                        </option>
                    ))}
                </select>
                <div className="col-span-2 flex justify-end space-x-2">
                    <button
                        onClick={onCancel}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        <X className="mr-2 inline" /> Cancelar
                    </button>
                    <button
                        onClick={onSave}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        <Save className="mr-2 inline" /> Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};
export default modalNuevoEventos;