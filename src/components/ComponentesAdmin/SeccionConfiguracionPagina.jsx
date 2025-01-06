import React, { useEffect, useState } from "react";

function SeccionConfiguracionPagina() {
  const [settings, setSettings] = useState({
    backgroundColor: "#ffffff",
    menuColor: "#000000",
    textColor: "#333333",
    textColorMenu: "#333333",
    cardPrimaryColor: "#f5f5f5",
    cardSecondaryColor: "#e0e0e0",
    cardTextPrimaryColor: "#333333",
    cardTextSecondaryColor: "#333333",
    font: "Arial",
  });

  const commonFonts = [
    "Arial",
    "Verdana",
    "Helvetica",
    "Times New Roman",
    "Courier New",
    "Georgia",
    "Trebuchet MS",
    "Lucida Console",
    "Comic Sans MS",
    "Impact",
    "Tahoma",
    "Palatino Linotype",
    "Garamond",
    "Century Gothic",
    "Calibri",
    "Cambria",
    "Consolas",
    "Candara",
    "Optima",
    "Baskerville",
    "Gill Sans",
    "Futura",
    "Franklin Gothic Medium",
    "Book Antiqua",
    "Didot",
    "Rockwell",
    "Monaco",
    "Segoe UI",
  ];

  useEffect(() => {
    // Cargar configuraciones existentes desde la API
    fetch(
      "http://localhost:8081/ProyectoManejo/PaginaWebCandidata/models/getSettings.php"
    )
      .then((res) => res.json())
      .then((data) => setSettings(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const saveSettings = () => {
    fetch(
      "http://localhost:8081/ProyectoManejo/PaginaWebCandidata/models/saveSettings.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      }
    ).then(() => alert("Configuraciones guardadas"));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Panel de Configuración
      </h1>
      <form className="bg-white shadow-lg rounded-lg p-8 space-y-8">
        {/* Sección: Colores */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Colores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Color de Fondo */}
            <div>
              <label className="text-gray-600 font-medium mb-2 block">
                Color de Fondo:
              </label>
              <input
                type="color"
                name="backgroundColor"
                value={settings.backgroundColor}
                onChange={handleChange}
                className="w-20 h-10 border border-gray-300 rounded-md"
              />
            </div>

            {/* Color del Menú */}
            <div>
              <label className="text-gray-600 font-medium mb-2 block">
                Color del Menú:
              </label>
              <input
                type="color"
                name="menuColor"
                value={settings.menuColor}
                onChange={handleChange}
                className="w-20 h-10 border border-gray-300 rounded-md"
              />
            </div>

            {/* Color del Texto del Menú */}
            <div>
              <label className="text-gray-600 font-medium mb-2 block">
                Color del Texto del Menú:
              </label>
              <input
                type="color"
                name="textColorMenu"
                value={settings.textColorMenu}
                onChange={handleChange}
                className="w-20 h-10 border border-gray-300 rounded-md"
              />
            </div>

            {/* Color del Texto */}
            <div>
              <label className="text-gray-600 font-medium mb-2 block">
                Color del Texto:
              </label>
              <input
                type="color"
                name="textColor"
                value={settings.textColor}
                onChange={handleChange}
                className="w-20 h-10 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Cards</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Color Primario de las Cards */}
            <div>
              <label className="text-gray-600 font-medium mb-2 block">
                Color Primario de las Cards:
              </label>
              <input
                type="color"
                name="cardPrimaryColor"
                value={settings.cardPrimaryColor}
                onChange={handleChange}
                className="w-20 h-10 border border-gray-300 rounded-md"
              />
            </div>

            {/* Color Secundario de las Cards */}
            <div>
              <label className="text-gray-600 font-medium mb-2 block">
                Color Secundario de las Cards:
              </label>
              <input
                type="color"
                name="cardSecondaryColor"
                value={settings.cardSecondaryColor}
                onChange={handleChange}
                className="w-20 h-10 border border-gray-300 rounded-md"
              />
            </div>
            {/* Color texto Primario de las Cards */}
            <div>
              <label className="text-gray-600 font-medium mb-2 block">
                Color Texto Primario de las Cards:
              </label>
              <input
                type="color"
                name="cardTextPrimaryColor"
                value={settings.cardTextPrimaryColor}
                onChange={handleChange}
                className="w-20 h-10 border border-gray-300 rounded-md"
              />
            </div>

            {/* Color Texto Secundario de las Cards */}
            <div>
              <label className="text-gray-600 font-medium mb-2 block">
                Color Texto Secundario de las Cards:
              </label>
              <input
                type="color"
                name="cardTextSecondaryColor"
                value={settings.cardTextSecondaryColor}
                onChange={handleChange}
                className="w-20 h-10 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </section>
        {/* Sección: Tipografía */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Tipografía
          </h2>
          <div>
            <label className="text-gray-600 font-medium mb-2 block">
              Fuente Principal:
            </label>
            <select
              name="font"
              value={settings.font}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {commonFonts.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
            <div className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-50">
              <p className="text-gray-600">
                Vista previa de la fuente: "{settings.font}"
              </p>
              <p style={{ fontFamily: settings.font }}>
                El texto se verá como este ejemplo.
              </p>
            </div>
          </div>
        </section>

        {/* Botón de Guardar */}
        <div className="text-right">
          <button
            type="button"
            onClick={saveSettings}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}

export default SeccionConfiguracionPagina;
