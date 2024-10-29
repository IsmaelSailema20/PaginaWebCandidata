import { useState, useEffect } from "react";

const EventosNoticias = () => {
    const slides = [
        "https://scontent.fuio13-1.fna.fbcdn.net/v/t39.30808-6/465031634_1095635932566765_2479774533372684715_n.jpg?stp=cp6_dst-jpg&_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEmKs78K1SfOY4dGlu1zpaD9Zo0-UvvIuT1mjT5S-8i5HFUvOUiSkhMbdB0uZF0PoSdvT5PUISJaKhOys6JWOQZ&_nc_ohc=l8ZR1BfpzyMQ7kNvgH6aIP8&_nc_zt=23&_nc_ht=scontent.fuio13-1.fna&_nc_gid=A-QMUIn8DQ_aT0YvqFPy2ms&oh=00_AYA6KEjTUCVpta_-q-Sp6QdtEhMyE5Sa-PXDCjWQFqDQYg&oe=6726BAD1",
        "https://scontent.fuio13-1.fna.fbcdn.net/v/t39.30808-6/464691522_1094172892713069_614902590782850419_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFXyvfU-kSeY0EWsm_7bL6kty9w6ZDF9vq3L3DpkMX2-krkcrqfBIaX7iP-T6zqg2gn1lYG9J5R-VNJ1F5aD3Vf&_nc_ohc=3f-1-ZDwgt4Q7kNvgHuVt3v&_nc_zt=23&_nc_ht=scontent.fuio13-1.fna&_nc_gid=AHNRl-p5Qbb89cDDNW2IAXg&oh=00_AYD73Bzs8Le8QLIIf-R_8c3lrleJbND5ZCut1B4NH4tjdQ&oe=6726F166",
        "https://scontent.fuio13-1.fna.fbcdn.net/v/t39.30808-6/464476926_122117652416531672_6924628406467556159_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeG4AOrtLw2pCZT1-j8lPCEV5mwht24wQnHmbCG3bjBCcfdir5QKGEGc_Y-lpQUp3JhjO7sGmJxwR6VYV9kWsi4W&_nc_ohc=Kud80t-T6esQ7kNvgHjeaLl&_nc_zt=23&_nc_ht=scontent.fuio13-1.fna&_nc_gid=AJInlzABgvzk1ncUtKPr6nP&oh=00_AYBEg82xdbxnNbxubWpigb4PlVcF1PSSYKAAT5p8_33_Hg&oe=6726CE85",
        "https://scontent.fuio13-1.fna.fbcdn.net/v/t39.30808-6/464925443_1095635919233433_7993654235331919541_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHv9YY136X5JIx4GLynyo7fKb0EIIdSPzgpvQQgh1I_OHD8Y1VCBLHarxx7NWZm2zZJ219tFVzCkIm5mA9Mhxn_&_nc_ohc=BsPHRS7RE3sQ7kNvgH2TOJV&_nc_zt=23&_nc_ht=scontent.fuio13-1.fna&_nc_gid=A61F02hfYFb6YWnAjNbZIrd&oh=00_AYDlZlJ-F2YKKqMUWDZ0TkVkrXhHzqYVYnsyuxIAi5Wwjg&oe=6726C2DD",
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
                    <div className="relative mr-10 flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md hover:scale-105">
                        <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                            <img src="https://scontent.fuio13-1.fna.fbcdn.net/v/t39.30808-6/464965109_1095635895900102_6323470146362526041_n.jpg?stp=cp6_dst-jpg&_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEZw5xJHZ7dpimDJV47COmuEVdlzluYlaQRV2XOW5iVpKPFswUgsqm1-6TyO810kdDLB-B9O67ASUdXyiXVQDbx&_nc_ohc=qdRv9SpM2lEQ7kNvgHhH2jG&_nc_zt=23&_nc_ht=scontent.fuio13-1.fna&_nc_gid=A7fbj9yAQV9QyFySTjIVQ9v&oh=00_AYAIE2eM1cDfB9JJHR3WipvHXVzAbjzix1ETlgauTA81-g&oe=6726E8E7"></img>
                        </div>
                        <div className="p-6">
                            <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                INICIO DE CAMPAÑA
                            </h5>
                            <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                                Ni la lluvia nos detiene 🩵🌧️
                                Que energía! 🩷 gracias por todo ese apoyo tan lindo.
                                Con Mary Cruz 🫶🏻, Unidos lo haremos posible
                            </p>
                        </div>
                        <div className="p-6 pt-0">
                            <p className="text-xl absolute bottom-5"> Lun, 28 Oct 2024</p>
                        </div>
                    </div>
                    <div className="relative mr-10 flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md hover:scale-105">
                        <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                            <img src="https://scontent.fuio13-1.fna.fbcdn.net/v/t39.30808-6/464691522_1094172892713069_614902590782850419_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFXyvfU-kSeY0EWsm_7bL6kty9w6ZDF9vq3L3DpkMX2-krkcrqfBIaX7iP-T6zqg2gn1lYG9J5R-VNJ1F5aD3Vf&_nc_ohc=3f-1-ZDwgt4Q7kNvgHuVt3v&_nc_zt=23&_nc_ht=scontent.fuio13-1.fna&_nc_gid=AHNRl-p5Qbb89cDDNW2IAXg&oh=00_AYD73Bzs8Le8QLIIf-R_8c3lrleJbND5ZCut1B4NH4tjdQ&oe=6726F166"></img>
                        </div>
                        <div className="p-6">
                            <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                CORRE CON MARY CRUZ
                            </h5>
                            <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                                Un día espléndido para hacer deporte 🏃🏻‍♀️ y salir con nuestras mascotas 🐶. Compartimos algo de baile y caminata junto a Mary Cruz 🫶🏻
                                Unidos lo haremos posible 🩷🩵
                            </p>
                        </div>
                        <div className="p-6 pt-0">
                            <p className="text-xl absolute bottom-5"> Sab, 26 Oct 2024</p>
                        </div>
                    </div>
                    <div className="relative mr-10 flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md hover:scale-105">
                        <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                            <img src="https://scontent.fuio13-1.fna.fbcdn.net/v/t39.30808-6/464875819_1095877289209296_5262507630370797234_n.jpg?stp=cp6_dst-jpg&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeF5kfrZyNN8zuVgW_EaOZWVtUUyqG2z-m-1RTKobbP6b7FoLoZimKQ_JEbiAmu9mUXYg4yoV6Oyj-qpwOduII26&_nc_ohc=_i4hhxx2f1MQ7kNvgFxX_dL&_nc_zt=23&_nc_ht=scontent.fuio13-1.fna&_nc_gid=AxjU1RUpOp7h4EArTtj7Xzi&oh=00_AYDJYXnRxCmmKkarD4ZSZBYMpeNixhoY2YvX-2-9bj0aaQ&oe=6726DE64"></img>
                        </div>
                        <div className="p-6">
                            <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                REGALAMOS HELADOS
                            </h5>
                            <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                                Llega Mary Cruz 🩷 y llega la lluvia 🩵, mejor día imposible 😊.
                                Unidos lo haremos posible.
                            </p>
                        </div>
                        <div className="p-6 pt-0">
                            <p className="text-xl absolute bottom-5"> Lun, 28 Oct 2024</p>
                        </div>
                    </div>
                    <div className="relative mr-10 flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md hover:scale-105">
                        <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                            <img src="https://scontent.fuio13-1.fna.fbcdn.net/v/t39.30808-6/464965109_1095635895900102_6323470146362526041_n.jpg?stp=cp6_dst-jpg&_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEZw5xJHZ7dpimDJV47COmuEVdlzluYlaQRV2XOW5iVpKPFswUgsqm1-6TyO810kdDLB-B9O67ASUdXyiXVQDbx&_nc_ohc=qdRv9SpM2lEQ7kNvgHhH2jG&_nc_zt=23&_nc_ht=scontent.fuio13-1.fna&_nc_gid=A7fbj9yAQV9QyFySTjIVQ9v&oh=00_AYAIE2eM1cDfB9JJHR3WipvHXVzAbjzix1ETlgauTA81-g&oe=6726E8E7"></img>
                        </div>
                        <div className="p-6">
                            <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                INICIO DE CAMPAÑA
                            </h5>
                            <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                                Ni la lluvia nos detiene 🩵🌧️
                                Que energía! 🩷 gracias por todo ese apoyo tan lindo.
                                Con Mary Cruz 🫶🏻, Unidos lo haremos posible
                            </p>
                        </div>
                        <div className="p-6 pt-0">
                            <p className="text-xl absolute bottom-5"> Lun, 28 Oct 2024</p>
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

