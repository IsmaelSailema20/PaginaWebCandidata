import React, { useState } from "react";
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
}) {
  const [error, setError] = useState("");

  const handleSave = async () => {
    console.log(miembroEditado.id_miembro);
    if (
      !miembroEditado.nombre_miembro ||
      !miembroEditado.title ||
      !miembroEditado.tipo_miembro ||
      !miembroEditado.nivel_academico ||
      !miembroEditado.imgSrc
    ) {
      setError("Por favor, complete todos los campos obligatorios.");
      return;
    }

    setError("");

    try {
      const response = await fetch("http://localhost/Manejo/paginaWebCandidata/models/editCandidato.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(miembroEditado),
      });

      const result = await response.json();

      if (result.success) {
        console.log("Datos guardados exitosamente:", result);
        handleClose(); 
      } else {
        setError("Hubo un error al guardar los cambios.");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setError("Error al comunicarse con el servidor.");
    }
  };

  const handleRadioChange = (event) => {
    handleChange(event); 
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h4 className="text-lg font-semibold mb-4">Editar Miembro</h4>
        <form>
          <div className="mb-2">
            <TextField
              label="Nombre"
              name="nombre_miembro"
              value={miembroEditado?.nombre_miembro || ""}
              onChange={handleChange}
              fullWidth
              required
            />
          </div>
          <div className="mb-2">
            <TextField
              label="Descripción"
              name="descripcion_miembro"
              value={miembroEditado?.title || ""}
              onChange={handleChange}
              fullWidth
              required
              multiline
            />
          </div>
          <div className="mb-2">
            <TextField
              label="Tipo"
              name="tipo_miembro"
              value={miembroEditado?.tipo_miembro || ""}
              onChange={handleChange}
              fullWidth
              required
            />
          </div>
          <div className="mb-2">
            <TextField
              label="Nivel Académico"
              name="nivel_academico"
              value={miembroEditado?.nivel_academico || ""}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <div className="mb-2">
            <TextField
              label="URL de Imagen"
              name="imgSrc"
              value={miembroEditado?.imgSrc || ""}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <div className="mb-2">
            <TextField
              label="URL de Facebook"
              name="facebook_url"
              value={miembroEditado?.facebook_url || ""}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <div className="mb-2">
            <TextField
              label="URL de Instagram"
              name="instagram_url"
              value={miembroEditado?.instagram_url || ""}
              onChange={handleChange}
              fullWidth
            />
          </div>

          {/* Radio buttons para Visible/Oculto */}
          <FormControl component="fieldset" className="mb-4">
            <FormLabel component="legend">Estado de Visibilidad</FormLabel>
            <RadioGroup
              row
              name="visible"
              value={miembroEditado?.visible || "1"} // Valor predeterminado en "Visible"
              onChange={handleRadioChange}
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
            Guardar Cambios
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
