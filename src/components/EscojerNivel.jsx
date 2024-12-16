import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { X, Save } from "lucide-react"; // Usamos los íconos de lucide-react

const DiagonalBackground = () => {
  const [showSelect, setShowSelect] = useState(false);
  const [selectedOption, setSelectedOption] = useState(""); // Para almacenar la opción seleccionada
  const [openDialog, setOpenDialog] = useState(false); // Para controlar la apertura del diálogo de confirmación

  // Usamos useEffect para hacer el fetch cuando el componente se monte
  useEffect(() => {
    fetch(
      "http://localhost/ProyectoManejo/paginaWebCandidata/models/ConsultarNivel.php"
    )
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

  // Función para manejar la confirmación de selección y hacer el POST
  const handleConfirmSelection = () => {
    fetch("http://localhost/ProyectoManejo/paginaWebCandidata/models/crearNivel.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        nivel: selectedOption,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === '"Se inserto correctamente"') {
          alert("Nivel insertado correctamente");
          window.location.reload(); // Recargar la página si la inserción fue exitosa
        } else {
          alert("Error al insertar el nivel");
        }
      })
      .catch((error) => {
        console.error("Error al enviar la solicitud:", error);
        alert("Hubo un error al intentar insertar el nivel");
      });

    handleCloseDialog(); // Cerrar el diálogo
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-white to-gray-500 flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">Bienvenido</h1>
        <p className="text-gray-800 text-lg leading-relaxed font-medium mb-6">
          En este panel podrás configurar todas las necesidades para
          <br /> tu partido político, desde la creación y gestión de propuestas
          <br /> hasta la actualización y seguimiento de la información <br />{" "}
          de tus candidatos.
        </p>
        <div className="flex flex-col space-y-2">
          {showSelect && (
            <select
              className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 focus:outline-none w-auto mx-auto"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="" disabled>
                Seleccione el nivel de campaña
              </option>
              <option value="Pais">Pais</option>
              <option value="Provincia">Provincia</option>
              <option value="Universidad">Universidad</option>
            </select>
          )}

          {/* Mostrar el botón "Aceptar" debajo del ComboBox solo si se ha seleccionado una opción */}
          {selectedOption && (
            <button
              onClick={handleOpenDialog}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-900 w-auto mx-auto"
            >
              Aceptar
            </button>
          )}
        </div>
      </div>

      {/* Diálogo de confirmación */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmar Selección</DialogTitle>
        <DialogContent>
          <p>
            ¿Estás seguro de que deseas seleccionar el nivel "{selectedOption}"?
          </p>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleCloseDialog}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-teal-900"
          >
            <X className="mr-2 inline" /> Cancelar
          </button>
          <button
            onClick={handleConfirmSelection}
            className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-teal-900"
          >
            <Save className="mr-2 inline" /> Aceptar
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DiagonalBackground;
