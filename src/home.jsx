import React, { useEffect, useState } from 'react';

function Home() {
  const [message, setMessage] = useState('Unión y Futuro Universitario');
  const [startIndex, setStartIndex] = useState(0);

  const sections = [
    { title: 'Eventos', description: 'Conoce los próximos eventos del partido.' },
    { title: 'Candidatos', description: 'Descubre quiénes representan al partido.' },
    { title: 'Propuestas', description: 'Consulta las propuestas que tenemos para la universidad.' },
    { title: 'Noticias', description: 'Mantente informado sobre las últimas noticias.' },
    { title: 'Sugerencias', description: 'Compártenos tus ideas y opiniones.' },
    { title: 'Encuesta de Votación', description: '¿Por quién vas a votar?', link: '/votacion' },
  ];

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % sections.length);
  };

  const handlePrevious = () => {
    setStartIndex((prev) => (prev - 1 + sections.length) % sections.length);
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
            <button onClick={handlePrevious} className="bg-gray-200 rounded p-2">←</button>
            <div className="flex overflow-hidden w-full transition-all duration-500">
              {sections.slice(startIndex, startIndex + 3).map((section, index) => (
                <div key={index} className="bg-red-100 hover:bg-red-200 text-center p-4 rounded-lg shadow-md mx-2 flex-grow h-96">
                  <h3 className="text-2xl font-semibold mb-2">{section.title}</h3>
                  <p className="text-sm">{section.description}</p>
                  {section.link && (
                    <p>
                      <a href={section.link} className="text-blue-600 hover:underline">
                        {section.description}
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
            <button onClick={handleNext} className="bg-gray-200 rounded p-2">→</button>
          </div>

          <footer className="mt-auto p-4 text-center">
            <h4 className="text-lg font-semibold">Síguenos en redes sociales</h4>
            <div className="flex justify-center space-x-2 mt-2">
              <img src="/facebook.png" alt="Facebook" className="w-10 h-10" />
              <img src="/instagram.png" alt="Instagram" className="w-10 h-10" />
              <img src="/tiktok.png" alt="TikTok" className="w-10 h-10" />
            </div>
          </footer>
        </div>

        <div className="w-1/4 p-4">
          {/* Aquí va el contenido de la parte derecha */}
        </div>
      </div>
    </div>
  );
}

export default Home;
