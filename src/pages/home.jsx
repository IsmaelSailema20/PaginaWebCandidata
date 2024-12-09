import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [message, setMessage] = useState("Unión y Futuro Universitario");
  const [currentSlide, setCurrentSlide] = useState(0);
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
  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? sections.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === sections.length - 1 ? 0 : prev + 1
    );
  };

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

  

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      

      <div className="flex flex-1">
        <div className="flex flex-col w-4/5 p-4 h-300">
        <div className="relative h-[500px] w-full bg-white rounded-lg shadow-md dark:bg-neutral-800">
  <div className="relative h-full overflow-hidden flex items-center justify-center">
    <div
      className="flex transition-transform duration-700 h-full"
      style={{
        transform: `translateX(-${currentSlide * 33.33}%)`, // Desplazamiento del carrusel
      }}
    >
      {sections.map((slide, index) => {
        const isActive = index === currentSlide;

        return (
          <div
            key={index}
            className={`flex-shrink-0 h-full ${
              isActive ? "w-[70%] ml-[25%]" : "w-[15%] opacity-60"
            } flex justify-center items-center transition-all duration-500`}
          >
            <div className="relative w-full h-full flex flex-col items-center">
              <img
                src={`/seccionesMenuIm/${slide.title}.png`}
                alt={slide.title}
                className="h-full object-contain"
              />
              {isActive && (
                <span className="absolute bottom-4 text-lg font-bold text-gray-800 dark:text-white text-center px-4">
                  {slide.description}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>

  {/* Botón Anterior */}
  <button
    onClick={prevSlide}
    className="z-10 absolute inset-y-0 left-0 flex justify-center items-center w-[46px] bg-gray-300 hover:bg-gray-400 rounded-l-lg"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <path d="M15 18L9 12l6-6"></path>
    </svg>
  </button>

  {/* Botón Siguiente */}
  <button
    onClick={nextSlide}
    className="z-10 absolute inset-y-0 right-0 flex justify-center items-center w-[46px] bg-gray-300 hover:bg-gray-400 rounded-r-lg"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <path d="M9 18l6-6-6-6"></path>
    </svg>
  </button>

  {/* Indicadores */}
  <div className="flex justify-center space-x-2 absolute bottom-3 left-0 right-0">
    {sections.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentSlide(index)}
        className={`w-3 h-3 border rounded-full ${
          index === currentSlide
            ? "bg-blue-700 border-blue-700"
            : "bg-gray-400 border-gray-400"
        }`}
      ></button>
    ))}
  </div>
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
