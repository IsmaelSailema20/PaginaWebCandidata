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
  ];

  return (
    <nav className="bg-pink-500 p-5">
      <ul className="flex items-center gap-10">
        {navItems.map((item) => (
          <li key={item.name} className="flex items-center mr-4">
            <Link to={item.path} className="flex items-center">
              <img
                src={`/${item.image}`}
                alt={item.name}
                className="h-5 w-5 mr-1"
              />
              <span className="text-white font-bold cursor-pointer hover:text-pink-200">
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
