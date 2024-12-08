import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
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

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h4 className="text-lg font-semibold mb-4">
          {mode === "edit" ? "Editar Miembro" : "Crear Miembro"}
        </h4>
        <form>
          <div className="mb-2">
            <TextField
              label="Nombre"
              name="nombre_miembro"
              value={nuevoMiembro.nombre_miembro || ""}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </div>
          <div className="mb-2">
            <TextField
              label="Descripción"
              name="descripcion_miembro"
              value={nuevoMiembro.descripcion_miembro || ""}
              onChange={handleInputChange}
              fullWidth
              required
              multiline
              inputProps={{ maxLength: 210 }} // Limitar a 200 caracteres
            />
            <p>{nuevoMiembro.descripcion_miembro?.length || 0} / 210</p> {/* Mostrar la cantidad de caracteres restantes */}
          </div>
          <div className="mb-2">
            <TextField
              label="Tipo"
              name="tipo_miembro"
              value={nuevoMiembro.tipo_miembro || ""}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </div>
          <div className="mb-2">
            <TextField
              label="Nivel Académico"
              name="nivel_academico"
              value={nuevoMiembro.nivel_academico || ""}
              onChange={handleInputChange}
              fullWidth
            />
          </div>
          <div className="mb-2">
            <TextField
              label="URL de Imagen"
              name="imgSrc"
              value={nuevoMiembro.imgSrc || ""}
              onChange={handleInputChange}
              fullWidth
            />
          </div>
          <div className="mb-2">
            <TextField
              label="URL de Facebook"
              name="facebook_url"
              value={nuevoMiembro.facebook_url || ""}
              onChange={handleInputChange}
              fullWidth
            />
          </div>
          <div className="mb-2">
            <TextField
              label="URL de Instagram"
              name="instagram_url"
              value={nuevoMiembro.instagram_url || ""}
              onChange={handleInputChange}
              fullWidth
            />
          </div>

          <FormControl component="fieldset" className="mb-4">
            <FormLabel component="legend">Estado de Visibilidad</FormLabel>
            <RadioGroup
              row
              name="visible"
              value={nuevoMiembro.visible || "1"}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="Visible"
              />
              <FormControlLabel
                value="0"
                control={<Radio />}
                label="Oculto"
              />
            </RadioGroup>
          </FormControl>

          {error && <p className="text-red-500">{error}</p>}

          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            {mode === "edit" ? "Guardar Cambios" : "Crear Miembro"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
