import React from "react";
import { X, Save } from "lucide-react";

const ModalSeccionesInicio = ({
    evento,
    setEvento,
    onSave,
    onCancel,
    isEditing,
}) => {
    return (
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-4">
                {isEditing ? "Editar Evento" : "Nuevo Evento"}
            </h3>
            <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Título del Evento *"
                    value={evento.titulo}
                    onChange={(e) =>
                        setEvento({ ...evento, titulo: e.target.value })
                    }
                    className="border p-2 rounded"
                    required
                />
                <select
                    value={evento.tipo}
                    onChange={(e) =>
                        setEvento({ ...evento, tipo: e.target.value })
                    }
                    className="border p-2 rounded"
                    required
                >
                    <option value="">Seleccionar Tipo *</option>
                    <option value="Evento">Evento</option>
                    <option value="Noticia">Noticia</option>
                </select>
                <textarea
                    placeholder="Descripción *"
                    value={evento.descripcion}
                    onChange={(e) =>
                        setEvento({ ...evento, descripcion: e.target.value })
                    }
                    className="border p-2 rounded col-span-2"
                    rows="3"
                />
                <input
                    type="text"
                    placeholder="Lugar del Evento *"
                    value={evento.lugar}
                    onChange={(e) =>
                        setEvento({ ...evento, lugar: e.target.value })
                    }
                    className="border p-2 rounded"
                />
                <input
                    type="date"
                    value={evento.fecha}
                    onChange={(e) =>
                        setEvento({ ...evento, fecha: e.target.value })
                    }
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="time"
                    value={evento.hora}
                    onChange={(e) =>
                        setEvento({ ...evento, hora: e.target.value })
                    }
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="url"
                    placeholder="URL de la Imagen *"
                    value={evento.imagen}
                    onChange={(e) =>
                        setEvento({ ...evento, imagen: e.target.value })
                    }
                    className="border p-2 rounded"
                />
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

export default ModalSeccionesInicio;
