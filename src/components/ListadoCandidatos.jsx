import React, { useState, useEffect } from "react";
import EditModal from "./EditModalCandidatos";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { X, Save, Delete, DeleteIcon, Trash2 } from "lucide-react";

export function ListWithAvatar() {
  const [miembros, setMiembros] = useState([]);
  const [miembroEditado, setMiembroEditado] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [miembroAEliminar, setMiembroAEliminar] = useState(null);

  const fetchMiembros = async () => {
    try {
      const response = await fetch(
        "http://localhost/ProyectoManejo/paginaWebCandidata/models/ConsultaMiembros.php"
      );
      const data = await response.json();
      setMiembros(data);
      console.log(data);
    } catch (error) {
      console.error("Error al obtener los miembros:", error);
    }
  };

  useEffect(() => {
    fetchMiembros();
  }, []);

  const handleEdit = (miembro) => {
    setMiembroEditado(miembro);
    setModalMode("edit");
    setOpenModal(true);
  };

  const handleCreate = () => {
    console.log("createlist");
    setMiembroEditado(null);
    setModalMode("create");
    setOpenModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMiembroEditado((prevMiembro) => ({
      ...prevMiembro,
      [name]: value,
    }));
  };

  

  const handleDelete = (miembro) => {
    setMiembroAEliminar(miembro);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        "http://localhost/Proyectomanejo/paginaWebCandidata/models/deleteCandidato.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_miembro: miembroAEliminar.id_miembro }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setMiembros((prevMiembros) =>
          prevMiembros.filter(
            (miembro) => miembro.id_miembro !== miembroAEliminar.id_miembro
          )
        );
        console.log("Miembro eliminado con éxito.");
      } else {
        console.error("Error al eliminar el miembro.");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud de eliminación:", error);
    }
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setMiembroAEliminar(null);
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-lg p-4">
      <div className="flex justify-end">
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white p-4 rounded-md mb-4"
        >
          
          Crear Nuevo Candidato
        </button>
      </div>

      <ul className="w-full">
        {miembros.length > 0 ? (
          miembros.map((miembro, index) => (
            <li
              key={index}
              className="flex items-center justify-between space-x-4 p-2 border-b border-gray-200 transition duration-200 ease-in-out transform hover:bg-gray-100 hover:scale-105 hover:shadow-lg"
            >
              <div className="flex items-center space-x-4">
                <img
                  className="w-12 h-12 rounded-full"
                  alt={miembro.nombre_miembro}
                  src={miembro.imgSrc}
                />
                <div>
                  <h6 className="text-blue-600 text-lg">
                    {miembro.nombre_miembro}
                  </h6>
                  <p className="text-gray-500 text-sm">
                    {miembro.tipo_miembro}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(miembro)}
                  className="text-yellow-500 hover:text-yellow-700"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(miembro)}
                  className="text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>Cargando Candidatos...</p>
        )}
      </ul>

      <EditModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        miembroEditado={miembroEditado}
        handleChange={handleChange}
        mode={modalMode}
        onSave={() => {
          fetchMiembros(); // Recargar la lista
          setOpenModal(false); // Asegurarse de cerrar el modal
        }}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <p>¿Estás seguro de que deseas eliminar este candidato?</p>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleCloseDialog}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            <X className="mr-2 inline" /> Cancelar
          </button>
          <button
            onClick={handleConfirmDelete}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            <Trash2 className="mr-2 inline" /> Aceptar
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
