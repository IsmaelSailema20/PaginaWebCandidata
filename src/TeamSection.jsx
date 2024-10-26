import React, { useState, useEffect } from 'react';

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetch('http://localhost/proyectopaginawebcandidata/models/ConsultaMiembros.php')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTeamMembers(data);
      })
      .catch((error) => {
        console.error('Error fetching the team members:', error);
      });
  }, []);

  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">Nuestro Equipo</h2>
          <p className="text-lg mt-4">
            Aquí nos enfocamos en mercados donde la tecnología e innovación pueden desbloquear valor a largo plazo.
            Interactuarás con profesionales talentosos, te desafiarán a resolver problemas difíciles
            y a pensar de formas nuevas y creativas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="relative group">
              <div className="overflow-hidden rounded-lg shadow-lg h-96">
                <img
                  src={member.imgSrc}
                  alt={member.name}
                  className="w-full h-full object-cover object-center transform transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
                  <div className="text-center px-4">
                    <p className="text-sm">{member.title}</p>
                  </div>
                </div>
              </div>
              {/* Nombre del miembro, visible inicialmente debajo del div */}
              <h3 className="text-xl font-bold text-center mt-4 transition-transform duration-500 ease-in-out group-hover:-translate-y-24 group-hover:text-white">
                {member.nombre_miembro}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
