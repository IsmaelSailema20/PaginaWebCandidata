import { useState, useEffect } from "react";

const EventosNoticias = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transitionClass, setTransitionClass] = useState("");

  useEffect(() => {
    fetch(
      "http://localhost/ProyectoManejo/paginaWebCandidata/models/ConsultaImagenesCarrusel.php"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Supongamos que data es un arreglo de objetos y cada objeto tiene una propiedad `url` con la URL de la imagen.
        setSlides(data.map((evento) => evento.url));
      })
      .catch((error) => {
        console.error("Error fetching the events:", error);
      });
  }, []);

  // Cambiar automáticamente cada 3 segundos

  // Función para manejar el cambio de slide y activar la animación
  const handleNextSlide = () => {
    setTransitionClass("animate-slide"); // Activa la animación
    setTimeout(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
      setTransitionClass(""); // Remueve la animación después de cambiar de slide
    }, 50); // Duración de la animación
  };

  const handlePrevSlide = () => {
    setTransitionClass("animate-slide"); // Activa la animación
    setTimeout(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === 0 ? slides.length - 1 : prevSlide - 1
      );
      setTransitionClass(""); // Remueve la animación después de cambiar de slide
    }, 50); // Duración de la animación
  };

  // Función para obtener los índices de las imágenes en pantalla (anterior, actual, siguiente)
  const getPrevSlide = () =>
    currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
  const getNextSlide = () =>
    currentSlide === slides.length - 1 ? 0 : currentSlide + 1;

  const [eventos, setEventos] = useState([]);
  useEffect(() => {
    fetch(
      "http://localhost/ProyectoManejo/paginaWebCandidata/models/ConsultaEventos.php"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setEventos(data);
      })
      .catch((error) => {
        console.error("Error fetching the events:", error);
      });
  }, []);
  const [noticias, setNoticias] = useState([]);
  useEffect(() => {
    fetch(
      "http://localhost/ProyectoManejo/paginaWebCandidata/models/ConsultaNoticias.php"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setNoticias(data);
      })
      .catch((error) => {
        console.error("Error fetching the events:", error);
      });
  }, []);

  return (
    <div className="general overflow-x-hidden p-10 relative w-full min-h-screen overflow-hidden bg-white">
      <h1 className="text-center mt-2 mb-10 text-4xl font-bold text-black">
        Eventos Y Noticias
      </h1>
      {slides.length > 0 ? (
        <div className="relative p-10 bg-slate-100 rounded-md border-dotted shadow-lg">
          {/* Botón para ir al slide anterior */}
          <button
            onClick={handlePrevSlide}
            className="absolute left-10 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white rounded-full
                    bg-gradient-to-r from-[#FF8B9A] to-[#72D5FF]  p-3 shadow-lg hover:opacity-90 transition-all duration-300 
                    hover:scale-110 disabled:opacity-50"
          >
            &#10094;
          </button>

          <div className="carrusel flex items-center justify-center space-x-4 max-w-screen-md mx-auto relative">
            {/* Imagen izquierda - sin animación */}
            <img
              src={slides[getPrevSlide()]}
              alt="Prev Slide"
              className="rounded-md w-1/3 h-64 object-cover opacity-60 scale-90"
            />

            {/* Imagen central - con animación hacia la derecha */}
            <img
              src={slides[currentSlide]}
              alt="Current Slide"
              className={`rounded-md w-8/12 h-96 object-cover transition-transform duration-500 transform scale-105`}
            />

            {/* Imagen derecha - con animación hacia la derecha */}
            <img
              src={slides[getNextSlide()]}
              alt="Next Slide"
              className={`rounded-md w-1/3 h-64 object-cover opacity-60 scale-90 transition-transform duration-500 `}
            />
          </div>

          {/* Botón para ir al siguiente slide */}
          <button
            onClick={handleNextSlide}
            className="absolute right-10 top-1/2 -translate-y-1/2 bg-gray-500 text-white rounded-full
                    bg-gradient-to-r from-[#FF8B9A] to-[#72D5FF]  p-3 shadow-lg hover:opacity-90 transition-all duration-300 
                    transform hover:scale-110 disabled:opacity-50"
          >
            &#10095;
          </button>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-4">
          No existen Eventos ni Noticias
        </div>
      )}

      {/* Estilos para la animación */}
      <style jsx>{`
        @keyframes slideRight {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-slide {
          animation: slideRight 0.2s ease-in-out forwards;
        }
      `}</style>

      <div className="noticias mt-10 mb10 text-5xl">
        <h1 className="text-black text-center mt-2 mb-10 text-4xl font-bold">
          Noticias
        </h1>
        <div className="contenedorNoticias grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20  mt-14">
          {noticias.map((noticia) => (
            <div
              key={noticia.id}
              className="relative flex w-80 mt-8 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md hover:scale-105"
            >
              <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                <img src={noticia.imagen} alt={noticia.titulo} />
              </div>
              <div className="p-6">
                <h5 className="text-black mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  {noticia.titulo}
                </h5>
                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                  {noticia.descripcion}
                </p>
              </div>
              <div className="p-6 pt-0">
                <p className="text-[#3662e6] text-xl absolute bottom-5">
                  {noticia.lugar}, {noticia.fecha}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="contenedorEventos mt-10">
        <h1 className="text-center mt-2 mb-10 text-4xl font-bold">Eventos</h1>
        <div className="eventos flex flex-col gap-8 w-full max-w-screen-lg mx-auto">
          {eventos.map((evento, index) => (
            <div
              key={evento.id}
              className={`flex w-full ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              } mt-10`}
            >
              <div
                className={`contenido${
                  index % 2 === 0 ? "Izquierda" : "Derecha"
                } hover:scale-105 rounded-md shadow-lg bg-slate-50 border w-1/2 p-4 flex ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                {index % 2 === 0 && (
                  <p className="mb-4 mr-10 text-justify">
                    <h1 className={`text-xl font-bold mb-2`}>
                      {evento.titulo}
                    </h1>
                    {evento.descripcion}
                    <p className="mt-5">{evento.lugar}</p>
                  </p>
                )}
                <div className="before:absolute border-black border-2 before:w-12 before:h-12 before:rounded-full before:blur-xl before:top-16 relative flex flex-col justify-around items-center w-24 h-24 rounded-2xl shadow-lg  bg-gray-600 text-gray-50">
                  <span className=""> {evento.fecha}</span>
                  <span className="z-10 flex items-center text-4xl text-white [text-shadow:_2px_2px_#231917,_1px_2px_#231917]">
                    {evento.hora.split(":")[0]}
                    <span class="text-xl font-bold text-gray-50 [text-shadow:none]">
                      :
                    </span>
                    {evento.hora.split(":")[1]}
                  </span>
                  <div className="text-gray-50 w-48 flex flex-row justify-evenly"></div>
                </div>
                {index % 2 !== 0 && (
                  <div className="text-right">
                    <h1 className={`mr-5 text-xl font-bold mb-2`}>
                      {evento.titulo}
                    </h1>
                    <p className="mb-4 text-justify w-[85%] ml-10">
                      {evento.descripcion}
                    </p>
                    <p className="mt-5">{evento.lugar}</p>
                  </div>
                )}
              </div>
              <div
                className={`flex gap-4 ${
                  index % 2 === 0 ? "ml-32" : "mr-32"
                } self-center relative w-64 h-64`}
              >
                <img
                  src={evento.imagen}
                  alt={evento.titulo}
                  className="w-72 h-60 object-cover rounded-md"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventosNoticias;
