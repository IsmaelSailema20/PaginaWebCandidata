import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [message, setMessage] = useState("Unión y Futuro Universitario");
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const sections = [
    {
      title: "Eventos",
      description: "Conoce los próximos eventos del partido.",
      path: "/eventos",
    },
    {
      title: "Candidatos",
      description: "Descubre quiénes representan al partido.",
      path: "/candidatos",
    },
    {
      title: "Propuestas",
      description: "Consulta las propuestas que tenemos para la universidad.",
      path: "/propuestas",
    },
    {
      title: "Sugerencias",
      description: "Compártenos tus ideas y opiniones.",
      path: "/sugerencias",
    },
  ];

  useEffect(() => {
    fetch("/api/message")
      .then((response) => response.json())
      .then((data) =>
        setMessage(data.message || "Unión y Futuro Universitario")
      );
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const nextSection = () => {
    if (currentSectionIndex >= sections.length - 3) {
      setCurrentSectionIndex(0);
    } else {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  const prevSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <div className="relative flex-1">
        <img
          src="/imagenInicio/inicio.png"
          alt="Inicio"
          className="w-full h-[90vh] object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
          <h1 className="text-4xl font-bold text-white">{message}</h1>
        </div>
      </div>

      <div className="flex flex-1">
        <div className="flex flex-col w-3/4 p-4">
          <div className="flex items-center mb-4">
            <button
              onClick={prevSection}
              disabled={currentSectionIndex === 0}
              className="bg-gray-300 p-2 rounded-l-md"
            >
              ←
            </button>
            <div className="flex overflow-hidden">
              {sections
                .slice(currentSectionIndex, currentSectionIndex + 3)
                .map((section, index) => (
                  <Link to={section.path} key={index} className="flex-1">
                    <div className="bg-red-100 text-center rounded-lg shadow-md flex flex-col mx-2 h-[500px] transition-all duration-300 transform hover:scale-105 cursor-pointer">
                      <h3 className="text-2xl font-semibold mb-2 p-4">
                        {section.title}
                      </h3>
                      <p className="text-sm mb-2 px-4">{section.description}</p>
                      <div className="flex-grow flex items-center justify-center h-20">
                        <img
                          src={`/seccionesMenuIm/${section.title}.png`}
                          alt={section.title}
                          className="h-full object-contain"
                        />
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
            <button
              onClick={nextSection}
              className="bg-gray-300 p-2 rounded-r-md"
            >
              →
            </button>
          </div>

          <footer className="mt-auto p-4 text-center">
            <h4 className="text-lg font-semibold">
              Síguenos en redes sociales
            </h4>
            <div className="flex justify-center items-center gap-8 mt-2">
              <img
                src="/iconosRedes/facebook.png"
                alt="Facebook"
                className="w-12 h-12 cursor-pointer rounded-full"
              />
              <img
                src="/iconosRedes/instagram.png"
                alt="Instagram"
                className="w-9 h-9   cursor-pointer rounded-full"
              />
              <img
                src="/iconosRedes/tiktok.png"
                alt="TikTok"
                className="w-8 h-8 cursor-pointer rounded-full"
              />
            </div>
          </footer>
        </div>

        <div className="w-1/4 p-4 flex flex-col h-full">
          <Link to="/sugerencias" className="flex-grow">
            <div className="bg-purple-500 text-white p-4 rounded-lg cursor-pointer">
              <h2 className="text-lg font-bold">Dinos por quién vas a votar</h2>
              <img
                src="/seccionesMenuIm/Encuesta.png"
                alt="Encuesta"
                className="mt-2 transition-transform duration-300 transform hover:scale-105"
              />
            </div>
          </Link>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <button
          onClick={scrollToBottom}
          className="bg-red-600 text-white rounded-full p-3 shadow-md absolute bottom-10 w-12 h-12 flex items-center justify-center"
        >
          ↓
        </button>
      </div>
    </div>
  );
}

export default Home;
