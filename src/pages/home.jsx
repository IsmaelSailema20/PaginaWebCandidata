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
        <div className="relative h-[380px] w-25 bg-white rounded-lg shadow-md dark:bg-neutral-800">
      
      <div className="  relative overflow-hidden h-130 w-3/4 bg-white rounded-lg">
        <div
          className=" flex w-80 transition-transform duration-700"
          style={{
            transform: `translateX(-${currentSlide * 30}%)`,
          }}
        >
          {sections.map((slide, index) => (
            <div
              key={index}
              className={`  flex-shrink-0 w-full h-full flex justify-center items-center p-6  dark:bg-neutral-${900 - index * 100}`}
            >
              <span className=" text-4xl text-gray-800 dark:text-white">
                {slide.description}
              </span>
              <img src={"/seccionesMenuIm/"+slide.title+".png"}></img>
            </div>
            
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="z-[9999]  absolute inset-y-0 left-0 flex justify-center items-center w-[46px] text-gray-800 hover:bg-gray-800/10 focus:outline-none focus:bg-gray-800/10 rounded-l-lg dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="grey"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
        >
          <path d="M15 18L9 12l6-6"></path>
        </svg>
        <span className="sr-only">Previous</span>
      </button>

      <button
        onClick={nextSlide}
        className="z-[9999] absolute inset-y-0 right-0 flex justify-center items-center w-[46px] text-gray-800 hover:bg-gray-800/10 focus:outline-none focus:bg-gray-800/10 rounded-r-lg dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="grey"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
          
        >
           <path  d="m1 9 4-4-4-4"/>
        </svg>
        <span className="sr-only">Next</span>
      </button>

      <div   className=" flex justify-center space-x-2 absolute bottom-3 left-0 right-0"
     >
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 border rounded-full ${
              index === currentSlide
                ? "bg-blue-700 border-blue-700"
                : "bg-gray-400 border-gray-400"
            } dark:border-neutral-600`}
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
