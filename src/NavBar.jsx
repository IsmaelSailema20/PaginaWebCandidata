import React from 'react';

const Navbar = () => {
  const navItems = [
    { name: 'Inicio', image: 'iconosBarra/inicio.png' },
    { name: 'Eventos', image: 'iconosBarra/eventos.png' },
    { name: 'Candidatos', image: 'iconosBarra/candidatos.png' },
    { name: 'Encuestas', image: 'iconosBarra/encuestas.png' },
    { name: 'Propuestas', image: 'iconosBarra/propuestas.png' },
    { name: 'Sugerencias', image: 'iconosBarra/sugerencias.png' },
  ];

  return (
    <nav className="bg-pink-500 p-2">
      <ul className="flex items-center">
        {navItems.map((item) => (
          <li key={item.name} className="flex items-center mr-4">
            <img src={`/${item.image}`} alt={item.name} className="h-5 w-5 mr-1" />
            <span className="text-white font-bold cursor-pointer hover:text-pink-200">
              {item.name}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
