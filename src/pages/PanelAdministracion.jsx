import React from "react";

function PanelAdministracion() {
  return (
    <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r-2 rtl:border-r-0 rtl:border-l ">
      <a href="#" className="flex items-center">
        <img
          className="  w-auto h-6 sm:h-7"
          src="https://merakiui.com/images/logo.svg"
          alt=""
        />
        <span className="mx-3 font-medium">Panel de configuración</span>
      </a>
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          <a
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md  hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            href="#"
          >
            <span className="mx-4 font-medium">Sección Principal</span>
          </a>

          <a
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md  hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            href="#"
          >
            <span className="mx-4 font-medium">Sección Eventos</span>
          </a>

          <a
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md  hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            href="#"
          >
            <span className="mx-4 font-medium">Sección Candidatos</span>
          </a>

          <a
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md  hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            href="#"
          >
            <span className="mx-4 font-medium">Sección Propuestas</span>
          </a>

          <a
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md  hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            href="#"
          >
            <span className="mx-4 font-medium">Sección sugerencias</span>
          </a>
        </nav>

        <a href="#" className="flex items-center px-4 -mx-2">
          <span className="mx-2 font-medium text-gray-800 ">Cerrar Sesión</span>
        </a>
      </div>
    </aside>
  );
}

export default PanelAdministracion;
