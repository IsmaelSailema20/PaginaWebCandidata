import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navItems = [
    { name: "Inicio", image: "iconosBarra/inicio.png", path: "/" },
    { name: "Eventos", image: "iconosBarra/eventos.png", path: "/eventos" },
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
    <nav className="bg-blue-600 p-7">
      <ul className="flex items-center gap-10">
        {navItems.map((item) => (
          <li key={item.name} className="flex items-center mr-4">
            <Link to={item.path} className="flex items-center">
              <img
                src={`/${item.image}`}
                alt={item.name}
                className="h-6 w-6 mr-4"
              />
              <span className="text-white font-bold cursor-pointer hover:text-gray-200">
                {item.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
