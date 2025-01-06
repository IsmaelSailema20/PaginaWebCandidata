import React, { useState, useEffect } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

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
        const levelsOrder = {
          presidente: 1,
          alcalde: 1,
          rectora: 1,
          vicepresidente: 2,
          prefecto: 2,
          vicerrector: 2,
          asambleista: 3,
          concejal: 3,
        };

        const sortedMembers = data
          .filter((member) => member.visible == 1) // Solo miembros visibles
          .sort(
            (a, b) =>
              levelsOrder[a.tipo_miembro.toLowerCase()] -
              levelsOrder[b.tipo_miembro.toLowerCase()]
          );

        setTeamMembers(sortedMembers);
      })
      .catch((error) => {
        console.error("Error fetching the team members:", error);
      });
  }, []);
  const openModal = (candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
    console.log(selectedCandidate);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCandidate(null);
  };
  const truncateText = (text, maxLength, candidate) => {
    if (text.length > maxLength) {
      return (
        <>
          {text.slice(0, maxLength)}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => openModal(candidate)}
          >
            ... Ver más
          </span>
        </>
      );
    }
    return text;
  };
  if (teamMembers.length === 0) {
    return <p className="text-center">Cargando...</p>;
  }

  const [mainCandidate, secondCandidate, ...otherCandidates] = teamMembers;

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-white text-black py-16">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <div className="bg-white bg-opacity-80 p-4 rounded-md inline-block">
            <h1 className="text-4xl font-bold text-center mb-5">
              <span className="font-bold">Candidatos</span>
            </h1>
            <p className="text-lg mt-4">
              Te invitamos a conocer a cada uno de nuestros candidatos, quienes
              aportan su experiencia, pasión y compromiso para representar los
              intereses de todos. Juntos, podemos lograr un futuro donde cada
              persona tenga la oportunidad de crecer y desarrollarse.
            </p>
          </div>
        </div>
        {/* Primer candidato */}
        <div className="flex flex-col lg:flex-row items-center mb-12">
          <div className="w-full lg:w-1/2 p-4 flex justify-center">
            <img
              src={mainCandidate.imgSrc}
              alt={mainCandidate.nombre_miembro}
              className="rounded-lg shadow-lg object-cover"
              style={{
                width: "300px",
                height: "300px",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            />
          </div>
          <div className="w-full lg:w-1/2 p-4">
            <h2 className="text-3xl font-bold mb-4">
              {mainCandidate.nombre_miembro}
            </h2>
            <p className="text-lg font-bold mb-2">
              {mainCandidate.tipo_miembro}
            </p>
            <p className="text-lg mb-4">
              {truncateText(
                mainCandidate.descripcion_miembro,
                100,
                mainCandidate
              )}
            </p>
            <p className="text-md mb-6 font-semibold">
              Nivel Académico: {mainCandidate.nivel_academico}
            </p>
            <div className="flex space-x-4">
              <a
                href={mainCandidate.facebook_url || "#"}
                className="bg-gradient-to-r from-[#8bb9ff] to-[#72D5FF] text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-all duration-300 transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href={mainCandidate.instagram_url || "#"}
                className="bg-gradient-to-r from-[#8bb9ff] to-[#72D5FF] text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-all duration-300 transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Segundo candidato */}
        {secondCandidate && (
          <div className="flex flex-col lg:flex-row items-center mb-12">
            <div className="w-full lg:w-1/2 p-4 flex justify-center">
              <img
                src={secondCandidate.imgSrc}
                alt={secondCandidate.nombre_miembro}
                className="rounded-lg shadow-lg object-cover"
                style={{
                  width: "250px",
                  height: "250px",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
            </div>
            <div className="w-full lg:w-1/2 p-4">
              <h2 className="text-2xl font-bold mb-4">
                {secondCandidate.nombre_miembro}
              </h2>
              <p className="text-lg font-bold mb-2">
                {secondCandidate.tipo_miembro}
              </p>
              <p className="text-lg mb-4">
                {truncateText(
                  secondCandidate.descripcion_miembro,
                  100,
                  secondCandidate
                )}
              </p>
              <p className="text-md mb-6 font-semibold">
                Nivel Académico: {secondCandidate.nivel_academico}
              </p>
              <div className="flex space-x-4">
                <a
                  href={secondCandidate.facebook_url || "#"}
                  className="bg-gradient-to-r from-[#8bb9ff] to-[#72D5FF] text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-all duration-300 transform hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href={secondCandidate.instagram_url || "#"}
                  className="bg-gradient-to-r from-[#8bb9ff] to-[#72D5FF] text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-all duration-300 transform hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>
          </div>
        )}
        {/* Otros miembros */}
        {isModalOpen && selectedCandidate && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-11/12 md:w-3/5 h-[63%] overflow-hidden flex relative">
              {/* Botón de cierre */}
              <button
                className="absolute top-4 right-4 bg-gray-100 hover:bg-red-500 text-gray-800 hover:text-white text-xl rounded-full w-10 h-10 flex items-center justify-center transition-all"
                onClick={closeModal}
              >
                &times;
              </button>

              {/* Contenido del modal */}
              <div className="flex flex-col md:flex-row w-full h-full">
                {/* Información textual */}
                <div className="w-full md:w-2/3 p-6 space-y-4">
                  {/* Título */}
                  <h2 className="text-3xl font-bold text-gray-800">
                    {selectedCandidate.nombre_miembro}
                  </h2>
                  <p className="text-lg font-semibold text-gray-700">
                    {selectedCandidate.nivel_academico}
                  </p>
                  <p className="text-lg font-semibold text-gray-700">
                    {selectedCandidate.tipo_miembro}
                  </p>

                  {/* Descripción con altura más corta */}
                  <div className="overflow-y-scroll h-80 border-t mt-4 pt-4 border-gray-200 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                    <p className="text-gray-600 text-justify">
                      {selectedCandidate.descripcion_miembro}
                    </p>
                  </div>
                </div>

                {/* Imagen del candidato */}
                <div className="w-full md:w-1/3 h-full bg-gray-100 flex items-center justify-center">
                  <img
                    src={selectedCandidate.imgSrc}
                    alt={selectedCandidate.nombre_miembro}
                    className="rounded-lg shadow-lg object-cover max-h-full max-w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherCandidates.map((member, index) => (
            <div key={index} className="relative group">
              <div className="overflow-hidden rounded-lg shadow-2xl hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-shadow duration-300 h-96 transform transition-transform duration-500 group-hover:scale-95">
                <img
                  src={member.imgSrc}
                  alt={member.nombre_miembro}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center space-y-4">
                  <div className="text-center px-4">
                    <p className="text-xl font-bold mb-4 text-white">
                      {member.tipo_miembro}
                    </p>
                    <p className="text-sm text-white">
                      {truncateText(member.descripcion_miembro, 200, member)}
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href={member.facebook_url || "#"}
                      className="bg-gradient-to-r from-[#8bb9ff] to-[#72D5FF] text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-all duration-300 transform hover:scale-110 disabled:opacity-50"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebook size={24} />
                    </a>
                    <a
                      href={member.instagram_url || "#"}
                      className="bg-gradient-to-r from-[#8bb9ff] to-[#72D5FF] text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-all duration-300 transform hover:scale-110 disabled:opacity-50"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram size={24} />
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
