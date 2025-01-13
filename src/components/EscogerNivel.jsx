import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { X, Save } from "lucide-react";
const DiagonalBackground = () => {
  const [selectedOption, setSelectedOption] = useState(""); // Nivel seleccionado actualmente
  const [pendingOption, setPendingOption] = useState(""); // Opción pendiente de confirmación
  const [openDialog, setOpenDialog] = useState(false); // Control del diálogo de confirmación

  // Cargar el nivel actual desde el backend al montar el componente
  useEffect(() => {
    fetch(
      "http://localhost:8081/ProyectoManejo/paginaWebCandidata/models/ConsultarNivel.php"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.nivel) {
          setSelectedOption(data.nivel); // Establecer el nivel actual si existe
        }
      })
      .catch((error) => {
        console.error("Error al consultar el nivel:", error);
      });
  }, []);

  const handleSelectChange = (event) => {
    const newOption = event.target.value;

    if (newOption !== selectedOption) {
      // Si el nivel cambia, mostrar el diálogo de confirmación
      setPendingOption(newOption);
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setPendingOption(""); // Limpiar la opción pendiente
  };

  const handleConfirmSelection = () => {
    // Confirmar la selección y enviar al backend
    setSelectedOption(pendingOption); // Actualizar el nivel seleccionado
    setPendingOption(""); // Limpiar la opción pendiente

    fetch(
      "http://localhost:8081/ProyectoManejo/paginaWebCandidata/models/CrearNivel.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          nivel: pendingOption, // Nivel seleccionado
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
        } else {
          alert("Error: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error al guardar/actualizar el nivel:", error);
        alert("Hubo un error al intentar guardar/actualizar el nivel");
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

        {/* Combo Box */}
        <div className="flex flex-col space-y-2">
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
        </div>
      </div>

      {/* Diálogo de confirmación */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedOption ? "Confirmar Cambio" : "Confirmar Selección"}
        </DialogTitle>
        <DialogContent>
          <p>
            {selectedOption
              ? `¿Estás seguro de que deseas cambiar el nivel a "${pendingOption}"? Toda la información actual de propuestas y de candidatos se eliminara.`
              : `¿Estás seguro de que deseas seleccionar el nivel "${pendingOption}"? Si despues decides cambiar de nivel, toda la información actual se actualizará.`}
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
