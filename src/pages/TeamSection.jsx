import React, { useState, useEffect } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetch(
      "http://localhost:8081/ProyectoManejo/paginaWebCandidata/models/ConsultaMiembros.php"
    )
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
        console.error("Error fetching the team members:", error);
      });
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-white text-black py-16">
      <style>
        {`
          @keyframes float {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 0.5;
            }
            90% {
              opacity: 0.5;
            }
            100% {
              transform: translateY(-100vh) rotate(360deg);
              opacity: 0;
            }
          }

          .bubble {
            position: absolute;
            background: linear-gradient(to right, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.1));
            backdrop-filter: blur(2px);
            border-radius: 50%;
            pointer-events: none;
            will-change: transform;
          }
        `}
      </style>

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => {
          const size = Math.random() * 4 + 1;
          const left = Math.random() * 100;
          const delay = Math.random() * 5;
          const duration = Math.random() * 3 + 6;

          return (
            <div
              key={i}
              className="bubble"
              style={{
                width: `${size}rem`,
                height: `${size}rem`,
                left: `${left}%`,
                bottom: "-20px",
                animation: `float ${duration}s linear infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>

      <div className="container mx-auto relative">
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

            <p className="text-lg mt-4">
              Te invitamos a conocer a cada uno de nuestros candidatos, quienes
              aportan su experiencia, pasión y compromiso para representar los
              intereses de todos los estudiantes. Juntos, podemos lograr que
              nuestra universidad sea un lugar donde todos podamos crecer y
              desarrollarnos, tanto académica como personalmente.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="relative group">
              <div className="overflow-hidden rounded-lg shadow-2xl hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-shadow duration-300 h-96 transform transition-transform duration-500 group-hover:scale-95">
                <img
                  src={member.imgSrc}
                  alt={member.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center space-y-4">
                  <div className="text-center px-4">
                    <p className="text-xl font-bold mb-4 text-white">
                      {member.tipo_miembro}
                    </p>
                    <p className="text-sm text-white">{member.title}</p>
                  </div>
                  {/* Botones de redes sociales con íconos */}
                  <div className="flex space-x-4">
                    <a
                      href={member.facebook_url || "#"}
                      className="bg-gradient-to-r from-[#FF8B9A] to-[#72D5FF] text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-all duration-300 transform hover:scale-110 disabled:opacity-50"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebook size={24} /> {/* Ícono de Facebook */}
                    </a>
                    <a
                      href={member.instagram_url || "#"}
                      className="bg-gradient-to-r from-[#FF8B9A] to-[#72D5FF] text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-all duration-300 transform hover:scale-110 disabled:opacity-50"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram size={24} /> {/* Ícono de Instagram */}
                    </a>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mt-10 transition-transform duration-500 ease-in-out group-hover:-translate-y-24 group-hover:text-white">
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
