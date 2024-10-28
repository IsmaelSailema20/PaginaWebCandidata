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
<section className="w-full min-h-screen bg-gradient-to-br from-[#ff6b6b] to-[#ffb6b6] text-white py-16">
<div className="container mx-auto">
        <div className="mb-12 text-center">
        <div className="bg-white bg-opacity-80 p-4 rounded-md inline-block">
  <h1 className="text-4xl font-bold text-center mb-5">
    <span className="text-5xl text-pink-500 drop-shadow-[4px_2px_0px_#ded2d2]">
      C
    </span>
    <span className="text-[#40b2e6] drop-shadow-[4px_2px_0px_#ded2d2]">
      andidatos
    </span>
  
  </h1>
</div>

          <p className="text-lg mt-4 font-bold">
          Te invitamos a conocer a cada uno de nuestros candidatos, 
          quienes aportan su experiencia, pasión y compromiso para representar 
          los intereses de todos los estudiantes. Juntos, podemos lograr que nuestra
           universidad sea un lugar donde todos podamos crecer y desarrollarnos, 
           tanto académica como personalmente.


          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="relative group"
            >
              <div className="overflow-hidden rounded-lg shadow-lg h-96 transform transition-all duration-500 group-hover:scale-95">
                <img
                  src={member.imgSrc}
                  alt={member.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
                  <div className="text-center px-4">
                    
                    <p className="text-xl font-bold mb-9">{member.tipo_miembro}</p>
                    <p className="text-s">{member.title}</p>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mt-7 transition-transform duration-500 ease-in-out group-hover:-translate-y-24 group-hover:text-white">
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
