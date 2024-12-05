import React, { useState } from "react";
import SeccionInicioAdm from "../components/ComponentesAdmin/SeccionInicioAdm";
import SeccionEventosAdm from "../components/ComponentesAdmin/SeccionEventosAdm";
import SeccionCandidatosAdm from "../components/ComponentesAdmin/SeccionCandidatosAdm";
import SeccionPropuestasAdm from "../components/ComponentesAdmin/SeccionPropuestasAdm";
import SeccionSugerenciasAdm from "../components/ComponentesAdmin/SeccionSugerenciasAdm";
import {
  CalendarCog,
  House,
  LayoutPanelLeft,
  NotebookPen,
  NotepadText,
  Users,
} from "lucide-react";

function PanelAdministracion() {
  // Estado para la sección activa
  const [activeSection, setActiveSection] = useState("principal");

  // Función para cambiar la sección activa
  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="flex">
      {/* Barra lateral con botones */}
      <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r-2 rtl:border-r-0 rtl:border-l">
        <a href="#" className="flex items-center">
          <img
            className="w-auto h-6 sm:h-7"
            src="https://merakiui.com/images/logo.svg"
            alt=""
          />
          <span className="mx-3 font-medium">Panel de configuración</span>
        </a>
        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            <a
              onClick={() => handleSectionClick("principal")}
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer"
            >
              <House />
              <span className="mx-4 font-medium">Home</span>
            </a>

            <a
              onClick={() => handleSectionClick("inicio")}
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer"
            >
              <LayoutPanelLeft />
              <span className="mx-4 font-medium">Sección Inicio</span>
            </a>

            <a
              onClick={() => handleSectionClick("eventos")}
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer"
            >
              <CalendarCog />
              <span className="mx-4 font-medium">Sección Eventos</span>
            </a>

            <a
              onClick={() => handleSectionClick("candidatos")}
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer"
            >
              <Users />
              <span className="mx-4 font-medium">Sección Candidatos</span>
            </a>

            <a
              onClick={() => handleSectionClick("propuestas")}
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer"
            >
              <NotepadText />
              <span className="mx-4 font-medium">Sección Propuestas</span>
            </a>

            <a
              onClick={() => handleSectionClick("sugerencias")}
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer"
            >
              <NotebookPen />
              <span className="mx-4 font-medium">Sección Sugerencias</span>
            </a>
          </nav>

          <a href="#" className="flex items-center px-4 -mx-2">
            <span className="mx-2 font-medium text-gray-800">
              Cerrar Sesión
            </span>
          </a>
        </div>
      </aside>

      {/* Área de contenido que cambia dependiendo de la sección */}
      <div className="flex-1 p-6">
        {activeSection === "principal" && (
          <section>
            <h2>Sección Principal</h2>
            <p>Contenido de la sección principal.</p>
          </section>
        )}
        {activeSection === "inicio" && <SeccionInicioAdm />}
        {activeSection === "eventos" && <SeccionEventosAdm />}
        {activeSection === "candidatos" && <SeccionCandidatosAdm />}
        {activeSection === "propuestas" && <SeccionPropuestasAdm />}
        {activeSection === "sugerencias" && <SeccionSugerenciasAdm />}
      </div>
    </div>
  );
}

export default PanelAdministracion;
