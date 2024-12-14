import React, { useState, useEffect } from "react";
import EditModal from "./EditModalCandidatos";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export function ListWithAvatar() {
  const [miembros, setMiembros] = useState([]);
  const [miembroEditado, setMiembroEditado] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState("edit"); 

  const [openDialog, setOpenDialog] = useState(false);
  const [miembroAEliminar, setMiembroAEliminar] = useState(null);

  const fetchMiembros = async () => {
    try {
      const response = await fetch("http://localhost/ProyectoManejo/paginaWebCandidata/models/ConsultaMiembros.php");
      const data = await response.json();
      setMiembros(data);
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

  const handleSave = async () => {
    const url =
      modalMode === "edit"
        ? "http://localhost/Manejo/paginaWebCandidata/models/editCandidato.php"
        : "http://localhost/Manejo/paginaWebCandidata/models/createCandidato.php";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(miembroEditado),
      });

      const result = await response.json();

      if (result.success) {
        if (modalMode === "edit") {
          setMiembros((prevMiembros) =>
            prevMiembros.map((miembro) =>
              miembro.id_miembro === miembroEditado.id_miembro ? miembroEditado : miembro
            )
          );
        } else if (modalMode === "create") {
          setMiembros((prevMiembros) => [...prevMiembros, result.nuevoMiembro]);
        }
        setOpenModal(false);
        console.log(`Miembro ${modalMode === "edit" ? "editado" : "creado"} con éxito.`);
      } else {
        console.error(`Error al ${modalMode === "edit" ? "editar" : "crear"} el miembro.`);
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  const handleDelete = (miembro) => {
    setMiembroAEliminar(miembro);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch("http://localhost/manejo/paginaWebCandidata/models/deleteCandidato.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_miembro: miembroAEliminar.id_miembro }),
      });

      const result = await response.json();

      if (result.success) {
        setMiembros((prevMiembros) =>
          prevMiembros.filter((miembro) => miembro.id_miembro !== miembroAEliminar.id_miembro)
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
                  <h6 className="text-blue-600 text-lg">{miembro.nombre_miembro}</h6>
                  <p className="text-gray-500 text-sm">{miembro.tipo_miembro}</p>
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
        handleSave={handleSave}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <p>¿Estás seguro de que deseas eliminar este candidato?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
