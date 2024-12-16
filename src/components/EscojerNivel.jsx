import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { X, Trash2 } from "react-feather"; // Asegúrate de tener estos iconos o usa los que prefieras

const DiagonalBackground = () => {
  const [showSelect, setShowSelect] = useState(false);
  const [selectedOption, setSelectedOption] = useState(""); // Para almacenar la opción seleccionada
  const [openDialog, setOpenDialog] = useState(false); // Para controlar la apertura del diálogo de confirmación

  // Usamos useEffect para hacer el fetch cuando el componente se monte
  useEffect(() => {
    fetch("http://localhost/ProyectoManejo/paginaWebCandidata/models/ConsultarNivel.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.error === "No se pudo determinar el nivel") {
          setShowSelect(true);
        } else {
          setShowSelect(false);
        }
      })
      .catch((error) => {
        console.error("Error al hacer el fetch:", error);
        setShowSelect(true);
      });
  }, []);

  // Función para manejar la selección del nivel
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Función para abrir el diálogo de confirmación
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Función para cerrar el diálogo
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Función para manejar la confirmación de selección
  const handleConfirmSelection = () => {
    alert(`Nivel seleccionado: ${selectedOption}`);
    handleCloseDialog(); // Cerrar el diálogo
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-white to-gray-500 flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">Bienvenido</h1>
        <p className="text-gray-800 text-lg leading-relaxed font-medium mb-6">
          En este panel podrás configurar todas las necesidades para
          <br /> tu partido político, desde la creación y gestión de propuestas
          <br /> hasta la actualización y seguimiento de la información <br /> de
          tus candidatos.
        </p>

        {/* Condicionalmente renderizamos el ComboBox */}
        {showSelect && (
          <select
            className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 focus:outline-none"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option value="" disabled>
              Seleccione el nivel de campaña
            </option>
            <option value="opcion1">Pais</option>
            <option value="opcion2">Provincia</option>
            <option value="opcion3">Universidad</option>
          </select>
        )}

        {/* Mostrar el botón "Aceptar" solo si se ha seleccionado una opción */}
        {selectedOption && (
          <button
            onClick={handleOpenDialog}
            className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Aceptar
          </button>
        )}
      </div>

      {/* Diálogo de confirmación */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmar Selección</DialogTitle>
        <DialogContent>
          <p>¿Estás seguro de que deseas seleccionar el nivel "{selectedOption}"?</p>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleCloseDialog}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            <X className="mr-2 inline" /> Cancelar
          </button>
          <button
            onClick={handleConfirmSelection}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            <Trash2 className="mr-2 inline" /> Aceptar
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DiagonalBackground;
