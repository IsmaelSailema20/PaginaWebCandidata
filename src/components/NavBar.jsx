import React from "react";
import { Link } from "react-router-dom";
import { useSettings } from "../pages/SettingsContext";

const Navbar = () => {
  const { menuColor, textColorMenu, font } = useSettings();

  const navItems = [
    { name: "Inicio", image: "iconosBarra/inicio.png", path: "/" },
    {
      name: "Candidatos",
      image: "iconosBarra/candidatos.png",
      path: "/candidatos",
    },
    {
      name: "Propuestas",
      image: "iconosBarra/propuestas.png",
      path: "/propuestas",
    },
    { name: "Eventos", image: "iconosBarra/eventos.png", path: "/eventos" },
    {
      name: "Sugerencias",
      image: "iconosBarra/sugerencias.png",
      path: "/sugerencias",
    },
    {
      name: "Votaciones",
      image: "iconosBarra/caja-de-votacion.png",
      path: "/votaciones",
    },
  ];

  return (
    <nav style={{ backgroundColor: menuColor }}>
      <ul className="flex items-center gap-10 h-20 ml-5">
        {navItems.map((item) => (
          <li key={item.name} className="flex items-center mr-4">
            <Link
              to={item.path}
              className="flex items-center"
              style={{
                color: textColorMenu,
                fontFamily: font,
              }}
            >
              <img
                src={`/${item.image}`}
                alt={item.name}
                className="h-6 w-6 mr-4"
              />
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
