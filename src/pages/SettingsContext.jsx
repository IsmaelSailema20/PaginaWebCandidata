import React, { createContext, useContext, useEffect, useState } from "react";

// Crear el contexto
const SettingsContext = createContext();

// Hook para usar el contexto en cualquier componente
export const useSettings = () => useContext(SettingsContext);

// Proveedor del contexto
export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    backgroundColor: "#ffffff",
    menuColor: "#000000",
    textColor: "#333333",
    font: "Arial",
  });

  useEffect(() => {
    // Cargar configuraciones desde el backend
    fetch(
      "http://localhost:8081/ProyectoManejo/PaginaWebCandidata/models/getSettings.php"
    )
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((error) =>
        console.error("Error al cargar configuraciones:", error)
      );
  }, []);

  // Aplicar configuraciones como variables CSS globales
  useEffect(() => {
    Object.entries(settings).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  }, [settings]);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};
