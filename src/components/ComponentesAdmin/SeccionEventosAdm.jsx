import React, { useState, useEffect } from "react";
import ModalNuevoEventos from "../modalNuevoEventos.jsx";


function SeccionEventosAdm() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState(null);
  const openModal = (id) => {
    setIsModalOpen(id); // Guardar el ID del elemento seleccionado
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return <div>
    <div className="flex flex-wrap -mx-3 mb-5">
      <div className="w-full max-w-5xl px-3 mb-6 mx-auto">
        <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
          <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
            <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
              <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                <span className="mr-3 font-semibold text-dark">
                  Lista de Eventos y Noticias
                  <button className="ml-5 px-3 py-1 text-sm text-black bg-primary hover:bg-primary-200 rounded-md"
                    onClick={() => setIsModalOpen(true)}>
                    Nuevo Elemento
                  </button>
                </span>
              </h3>
            </div>
            <div className="flex-auto block py-8 pt-6 px-9">
              <div className="overflow-x-auto">
                <table className="w-full my-0 align-middle text-dark border-neutral-200">
                  <thead className="align-bottom">
                    <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                      <th className="pb-3 text-center min-w-[175px]">CÓDIGO</th>
                      <th className="pb-3 text-center min-w-[200px]">
                        NOMBRE DE EVENTO
                      </th>
                      <th className="pb-3 text-center min-w-[300px]">
                        TIPO
                      </th>
                      <th className="pb-3 text-center min-w-[100px]">FECHA</th>
                      <th className="pb-3 text-center min-w-[100px]">OPCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 ? (
                      data.map((item) => (
                        <tr
                          key={item.ID_CAM}
                          className="border-b border-dashed last:border-b-0"
                        >
                          <td className="p-3 pl-0">{`SC-${item.ID_CAM.toString().padStart(
                            3,
                            "0"
                          )}`}</td>
                          <td className="p-3 pl-0">{item.NOM_SOL}</td>
                          <td className="p-3 pl-0">
                            {item.DES_CAM.length > 50
                              ? `${item.DES_CAM.substring(0, 80)}...`
                              : item.DES_CAM}
                          </td>

                          <td className="p-3 pl-0">
                            <span
                              className={`text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none rounded-lg ${item.TIP_CAM === "Urgente"
                                ? "text-orange-700 bg-orange-100"
                                : item.ESTD_SOL === "Enviado"
                                  ? "text-blue-700 bg-blue-100"
                                  : item.ESTD_SOL === "Aprobado"
                                    ? "text-green-700 bg-green-100"
                                    : item.ESTD_SOL === "Rechazado"
                                      ? "text-red-700 bg-red-100"
                                      : "text-gray-500 bg-gray-200"
                                }`}
                            >
                              {item.ESTD_SOL === "Enviado"
                                ? "Pendiente"
                                : item.ESTD_SOL || "Pendiente"}
                            </span>
                          </td>

                          <td className="p-3 pl-0">{item.FEC_SOL}</td>
                          <td className="p-3 pr-0 text-end">
                            <button
                              onClick={() => openModal(item.ID_CAM)} // Pasar ID_CAM al abrir el modal
                              className="ml-10 relative text-secondary-dark bg-light-dark hover:text-primary flex items-center h-[25px] w-[25px] text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-200 ease-in-out shadow-none border-0 justify-center"
                            >
                              \uD83D\uDC41
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="p-3 text-center text-gray-500"
                        >
                          No hay datos disponibles
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ModalNuevoEventos closeModal={closeModal} id={isModalOpen} />
      )}
    </div>
  </div>;
}

export default SeccionEventosAdm;





