import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { X, Save } from "lucide-react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

import { ButtonBase, ButtonGroup } from "@mui/material";
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
  mode,
  onSave,
}) {
  const [error, setError] = useState("");
  //const [restricciones, setRestricciones] = useState(null);
  const [conteos, setConteos] = useState({});
  const [nivel, setNivel] = useState("");
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
    setError(""); // Limpiar el mensaje de error
    handleClose(); // Llamar al manejador proporcionado
  };

  useEffect(() => {
    if (open) {
      if (mode === "edit" && miembroEditado) {
        setNuevoMiembro(miembroEditado);
      } else if (mode === "create") {
        // Reinicia el estado al abrir en modo "create"
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
    }
  }, [open, mode, miembroEditado]);
  useEffect(() => {
    fetch(
      "http://localhost/ProyectoManejo/paginaWebCandidata/models/ConsultarNivel.php"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          console.log(data.error, "error en consulta de nivel");
        } else {
          console.log(data.nivel, "+ ", data.conteos);
          setNivel(data.nivel);
          setConteos(data.conteos);
        }
      })
      .catch((err) => setError("Error al cargar datos del servidor."));
  }, [open]);
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

    setError("");
    const tipo = nuevoMiembro.tipo_miembro.toUpperCase().trim();
    nuevoMiembro.tipo_miembro = tipo;
    if (nivel === "Pais") {
      if (
        (mode !== "edit" && conteos.PRESIDENTE >= 1 && tipo === "PRESIDENTE") ||
        (mode !== "edit" &&
          conteos.VICEPRESIDENTE >= 1 &&
          tipo === "VICEPRESIDENTE")
      ) {
        setError(`No se puede añadir más ${tipo}s. Límite alcanzado.`);
        return;
      } else {
        if (
          (mode == "edit" &&
            conteos.PRESIDENTE >= 1 &&
            tipo === "PRESIDENTE") ||
          (mode == "edit" &&
            conteos.VICEPRESIDENTE >= 1 &&
            tipo === "VICEPRESIDENTE")
        ) {
          setError(`No se puede añadir más ${tipo}s. Límite alcanzado.`);
          return;
        }
      }
    } else if (nivel === "Provincia") {
      if (
        (mode !== "edit" && conteos.ALCALDE >= 1 && tipo === "ALCALDE") || // no se porque alterna el campo "alcalde" entre mayus y minus"
        (mode !== "edit" && conteos.PREFECTO >= 1 && tipo === "VICEPRESIDENTE") // no se
      ) {
        setError(`No se puede añadir más ${tipo}S. Límite alcanzado.`);
        return;
      } else {
        if (
          (mode == "edit" &&
            conteos.ALCALDE >= 1 &&
            tipo === "ALCALDE") ||
          (mode == "edit" &&
            conteos.PREFECTO >= 1 &&
            tipo === "PREFECTO")
        ) {
          setError(`No se puede añadir más ${tipo}S. Límite alcanzado.`);
          return;
        }
      }
    } else if (nivel === "Universidad") {
      if (conteos >= 4) {
        setError("No se puede añadir más candidatos. Límite alcanzado.");
        return;
      }
    }

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
            <RadioGroup
              row
              name="visible"
              value={nuevoMiembro.visible || "1"}
              onChange={handleInputChange}
            >
              <FormControlLabel value="1" control={<Radio />} label="Visible" />
              <FormControlLabel value="0" control={<Radio />} label="Oculto" />
            </RadioGroup>

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
