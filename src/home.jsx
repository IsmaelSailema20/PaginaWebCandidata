import React, { useEffect, useState } from 'react';

function Home() {
  const [message, setMessage] = useState('Unión y Futuro Universitario');
  const [startIndex, setStartIndex] = useState(0);

  const sections = [
    { title: 'Eventos', description: 'Conoce los próximos eventos del partido.' },
    { title: 'Candidatos', description: 'Descubre quiénes representan al partido.' },
    { title: 'Propuestas', description: 'Consulta las propuestas que tenemos para la universidad.' },
    { title: 'Sugerencias', description: 'Compártenos tus ideas y opiniones.' },
  ];

  const handleNext = () => {
    if (startIndex + 3 >= sections.length) {
      setStartIndex(0);
    } else {
      setStartIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (startIndex === 0) {
      setStartIndex(sections.length - 3);
    } else {
      setStartIndex((prev) => (prev - 1 + sections.length) % sections.length);
    }
  };

  useEffect(() => {
    fetch('/api/message')
      .then((response) => response.json())
      .then((data) => setMessage(data.message || 'Unión y Futuro Universitario'));
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <header className="bg-red-600 text-white py-8 text-center">
        <h1 className="text-4xl font-bold">{message}</h1>
        <p className="mt-2 text-lg">Unidos haremos lo posible.</p>
      </header>

      <div className="flex flex-1">
        <div className="flex flex-col w-3/4 p-4">
          <div className="flex items-center mb-4">
            <button onClick={handlePrevious} className="bg-gray-200 rounded p-2 cursor-pointer">←</button>
            <div className="flex overflow-hidden w-full transition-all duration-500">
              <div className="flex space-x-4">
                {sections.slice(startIndex, startIndex + 3).map((section, index) => (
                  <div 
                    key={index} 
                    className="bg-red-100 text-center rounded-lg shadow-md flex-1 flex flex-col mx-2 h-96 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  >
                    <h3 className="text-2xl font-semibold mb-2 p-4">{section.title}</h3>
                    <p className="text-sm mb-2 px-4">{section.description}</p>
                    <div className="flex-grow flex items-center justify-center h-20">
                      <img 
                        src={`/seccionesMenuIm/${section.title}.png`} 
                        alt={section.title} 
                        className="h-full object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={handleNext} className="bg-gray-200 rounded p-2 cursor-pointer">→</button>
          </div>

          <footer className="mt-auto p-4 text-center">
            <h4 className="text-lg font-semibold">Síguenos en redes sociales</h4>
            <div className="flex justify-center space-x-2 mt-2">
              <img src="/iconosRedes/facebook.png" alt="Facebook" className="w-10 h-10 cursor-pointer" />
              <img src="/iconosRedes/instagram.png" alt="Instagram" className="w-10 h-10 cursor-pointer" />
              <img src="/iconosRedes/tiktok.png" alt="TikTok" className="w-10 h-10 cursor-pointer" />
            </div>
          </footer>
        </div>

        <div className="w-1/4 p-4 flex flex-col h-full">
          <div className="bg-purple-500 text-white p-4 flex-grow rounded-lg cursor-pointer">
            <h2 className="text-lg font-bold">Dinos por quien vas a votar</h2>
            <img 
              src="/seccionesMenuIm/Encuesta.png" 
              alt="Encuesta" 
              className="mt-2 transition-transform duration-300 transform hover:scale-105" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
