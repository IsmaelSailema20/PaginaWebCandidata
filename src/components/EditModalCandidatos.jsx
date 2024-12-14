import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { X, Save } from "lucide-react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%", // Ancho responsivo
  maxWidth: "800px", // Máximo ancho para pantallas grandes
  maxHeight: "80vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditModal({
  open,
  handleClose,
  miembroEditado,
  handleChange,
  mode = "edit",
  onSave,
}) {
  const [error, setError] = useState("");
  const [nuevoMiembro, setNuevoMiembro] = useState({
    nombre_miembro: "",
    descripcion_miembro: "",
    tipo_miembro: "",
    nivel_academico: "",
    imgSrc: "",
    facebook_url: "",
    instagram_url: "",
    visible: "1",
  });
  const [imgError, setImgError] = useState(false);
  const handleModalClose = () => {
    setError(""); // Limpiar el mensaje de error
    handleClose(); // Llamar al manejador proporcionado
  };

  useEffect(() => {
    if (mode === "edit" && miembroEditado) {
      setNuevoMiembro(miembroEditado);
    } else if (mode === "create") {
      setNuevoMiembro({
        nombre_miembro: "",
        descripcion_miembro: "",
        tipo_miembro: "",
        nivel_academico: "",
        imgSrc: "",
        facebook_url: "",
        instagram_url: "",
        visible: "1",
      });
    }
  }, [mode, miembroEditado]);

  const handleSave = async () => {
    setError(""); // Limpiar errores antes de continuar

    if (
      !nuevoMiembro.nombre_miembro ||
      !nuevoMiembro.descripcion_miembro ||
      !nuevoMiembro.tipo_miembro ||
      !nuevoMiembro.nivel_academico ||
      !nuevoMiembro.imgSrc
    ) {
      setError("Por favor, complete todos los campos obligatorios.");
      return;
    }

    setError(""); // Limpiar errores antes de continuar

    const url =
      mode === "edit"
        ? "http://localhost/ProyectoManejo/paginaWebCandidata/models/editCandidato.php"
        : "http://localhost/ProyectoManejo/paginaWebCandidata/models/createCandidato.php";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoMiembro),
      });

      const result = await response.json();

      if (result.success) {
        console.log(
          mode === "edit"
            ? "Candidato editado exitosamente:"
            : "Candidato creado exitosamente:",
          result
        );
        handleClose();
        if (onSave) onSave(); // Notificar al padre
      } else {
        setError("Hubo un error al guardar los cambios.");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setError("Error al comunicarse con el servidor.");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "descripcion_miembro" && value.length > 210) {
      return;
    }

    setNuevoMiembro((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleImageError = () => {
    setImgError(true);
  };
  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {mode === "edit" ? "Editar Candidato" : "Crear Candidato"}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nombre del Miembro *"
              name="nombre_miembro"
              value={nuevoMiembro.nombre_miembro || ""}
              onChange={handleInputChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Tipo de Miembro *"
              name="tipo_miembro"
              value={nuevoMiembro.tipo_miembro || ""}
              onChange={handleInputChange}
              className="border p-2 rounded"
              required
            />
            <textarea
              placeholder="Descripción *"
              name="descripcion_miembro"
              value={nuevoMiembro.descripcion_miembro || ""}
              onChange={handleInputChange}
              className="border p-2 rounded col-span-2"
              rows="3"
              maxLength="210"
            />
            <input
              type="text"
              placeholder="Nivel Académico"
              name="nivel_academico"
              value={nuevoMiembro.nivel_academico || ""}
              onChange={handleInputChange}
              className="border p-2 rounded"
            />

            <input
              type="text"
              placeholder="URL de Imagen"
              name="imgSrc"
              value={nuevoMiembro.imgSrc || ""}
              onChange={handleInputChange}
              className="border p-2 rounded"
              required
            />

            <input
              type="text"
              placeholder="URL de Facebook"
              name="facebook_url"
              value={nuevoMiembro.facebook_url || ""}
              onChange={handleInputChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="URL de Instagram"
              name="instagram_url"
              value={nuevoMiembro.instagram_url || ""}
              onChange={handleInputChange}
              className="border p-2 rounded"
            />

            <div className="col-span-2 flex justify-end space-x-2">
              <button
                onClick={handleModalClose}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                <X className="mr-2 inline" /> Cancelar
              </button>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                <Save className="mr-2 inline" /> Guardar
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </Box>
    </Modal>
  );
}
