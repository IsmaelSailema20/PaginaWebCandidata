import { useState, useEffect } from "react";

const EventosNoticias = () => {
    const slides = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnRhoMJLzv82MzmXpYH68nsVK6vhxV9TnAXA&s",
        "https://media.licdn.com/dms/image/C5612AQGbvv_Zj5JQ1w/article-cover_image-shrink_720_1280/0/1551108267663?e=2147483647&v=beta&t=0Q8tP_opTQTHswRBcgHlCOzSIc67crsHE61AGWLOS44",
        "https://cevents.es/wp-content/uploads/2022/10/organizacion-eventos-online-729x410.jpg",
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zmllc3RhJTIwZWxlY3RyJUMzJUIzbmljYXxlbnwwfHwwfHx8MA%3D%3D",
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [transitionClass, setTransitionClass] = useState('');

    // Cambiar automáticamente cada 3 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            handleNextSlide();
        }, 30000);

        return () => clearInterval(interval);
    }, [currentSlide]);

    // Función para manejar el cambio de slide y activar la animación
    const handleNextSlide = () => {
        setTransitionClass('animate-slide'); // Activa la animación
        setTimeout(() => {
            setCurrentSlide((prevSlide) =>
                prevSlide === slides.length - 1 ? 0 : prevSlide + 1
            );
            setTransitionClass(''); // Remueve la animación después de cambiar de slide
        }, 50); // Duración de la animación
    };

    const handlePrevSlide = () => {
        setTransitionClass('animate-slide'); // Activa la animación
        setTimeout(() => {
            setCurrentSlide((prevSlide) =>
                prevSlide === 0 ? slides.length - 1 : prevSlide - 1
            );
            setTransitionClass(''); // Remueve la animación después de cambiar de slide
        }, 50); // Duración de la animación
    };

    // Función para obtener los índices de las imágenes en pantalla (anterior, actual, siguiente)
    const getPrevSlide = () => (currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
    const getNextSlide = () => (currentSlide === slides.length - 1 ? 0 : currentSlide + 1);

    return (
        <div className="general overflow-x-hidden p-10 relative w-full min-h-screen overflow-hidden bg-white">
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

            <h1 className="text-center mt-2 mb-10 text-5xl font-bold">
                <span className="text-5x1 text-[#40b2e6] drop-shadow-[4px_2px_0px_#ded2d2]">
                    EVENTOS
                </span>
                <span className="text-5x1 text-pink-500 drop-shadow-[4px_2px_0px_#ded2d2]">
                    &
                </span>
                <span className="text-5x1 text-[#40b2e6] drop-shadow-[4px_2px_0px_#ded2d2]">
                    NOTICIAS
                </span>
            </h1>
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
            </div>

            <div className="noticias mt-10 text-5xl">
                <h1 className="text-center mt-2 mb-20 text-5xl font-bold">
                    <span className="text-5x1 text-[#40b2e6] drop-shadow-[4px_2px_0px_#ded2d2]">
                        NOTICIAS
                    </span>
                </h1>
                <div className="contenedorNoticias flex">
                    <div className="relative mr-10 flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                        <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                        </div>
                        <div className="p-6">
                            <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                NOTICIA1
                            </h5>
                            <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc felis ligula.
                            </p>
                        </div>
                        <div className="p-6 pt-0">
                            <p className="text-xl"> Sab, 26 Mayo 2024</p>
                        </div>
                    </div>
                    <div className="relative mr-10 flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                        <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                        </div>
                        <div className="p-6">
                            <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                NOTICIA2
                            </h5>
                            <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc felis ligula.
                            </p>
                        </div>
                        <div className="p-6 pt-0">
                            <p className="text-xl"> Sab, 26 Mayo 2024</p>
                        </div>
                    </div>
                    <div className="relative mr-10 flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                        <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                        </div>
                        <div className="p-6">
                            <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                NOTICIA3
                            </h5>
                            <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc felis ligula.
                            </p>
                        </div>
                        <div className="p-6 pt-0">
                            <p className="text-xl"> Sab, 26 Mayo 2024</p>
                        </div>
                    </div>
                    <div className="relative mr-10 flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                        <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                        </div>
                        <div className="p-6">
                            <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                NOTICIA4
                            </h5>
                            <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc felis ligula.
                            </p>
                        </div>
                        <div className="p-6 pt-0">
                            <p className="text-xl"> Sab, 26 Mayo 2024</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className="contenedorEventos">
                <h1 className="text-center mt-10 mb-10 text-5xl font-bold">
                    <span className="text-5x1 text-[#40b2e6] drop-shadow-[4px_2px_0px_#ded2d2]">
                        EVENTOS
                    </span>
                </h1>
                <div className="eventos flex flex-col gap-8 w-full max-w-screen-lg mx-auto">
                    {/* Evento 1 (Texto a la izquierda, imágenes a la derecha) */}
                    <div className="flex w-full justify-center flex-row">
                        <div className="contenidoIzquierda bg-slate-50 border w-1/2 p-4">
                            <h1 className="tituloEvento1 text-xl font-bold mb-2">EVENTO 1</h1>
                            <div className="reloj text-gray-500 text-sm mb-2">12:40</div>
                            <p className="mb-4">
                                Descripción del evento con detalles relevantes. Texto adicional para ilustrar el contenido.
                            </p>
                            <div className="before:absolute before:w-12 before:h-12 before:bg-orange-800 before:rounded-full before:blur-xl before:top-16 relative   flex flex-col justify-around items-center w-44 h-44 rounded-2xl shadow-inner shadow-gray-50 bg-neutral-900 text-gray-50">
                                <span className="">SAB, Sep 21</span>
                                <span className="z-10 flex items-center text-6xl text-amber-600 [text-shadow:_2px_2px_#fff,_1px_2px_#fff]">
                                    08
                                    <span class="text-xl font-bold text-gray-50 [text-shadow:none]">:</span>
                                    52
                                </span>
                                <div className="text-gray-50 w-48 flex flex-row justify-evenly">
                                </div>
                            </div>

                        </div>
                        <div className="flex flex-col gap-2 ml-4 self-center">
                            <img
                                src="https://via.placeholder.com/100"
                                alt="Imagen 1"
                                className="w-24 h-24 object-cover"
                            />
                            <img
                                src="https://via.placeholder.com/100"
                                alt="Imagen 2"
                                className="w-24 h-24 object-cover"
                            />
                        </div>
                    </div>

                    {/* Evento 2 (Texto a la derecha, imágenes a la izquierda) */}
                    <div className="flex w-full justify-center flex-row-reverse">
                        <div className="contenidoDerecha bg-slate-50 border w-1/2 p-4">
                            <h1 className="tituloEvento2 text-xl font-bold mb-2">EVENTO 2</h1>
                            <div className="reloj text-gray-500 text-sm mb-2">13:30</div>
                            <p className="mb-4">
                                Descripción del evento con detalles relevantes. Texto adicional para ilustrar el contenido.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 mr-4 self-center">
                            <img
                                src="https://via.placeholder.com/100"
                                alt="Imagen 1"
                                className="w-24 h-24 object-cover"
                            />
                            <img
                                src="https://via.placeholder.com/100"
                                alt="Imagen 2"
                                className="w-24 h-24 object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventosNoticias;

