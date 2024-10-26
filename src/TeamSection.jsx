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
        console.log('Datos obtenidos:', data); 
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
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
