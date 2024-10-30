import React, { useEffect, useState } from 'react';

function Home() {
  const [message, setMessage] = useState('Unión y Futuro Universitario');

  useEffect(() => {
    fetch('/api/message')
      .then((response) => response.json())
      .then((data) => setMessage(data.message || 'Unión y Futuro Universitario'));
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="bg-red-600 text-white py-8 text-center">
        <h1 className="text-4xl font-bold">{message}</h1>
        <p className="mt-2 text-lg">Unidos haremos lo posible.</p>
      </header>

      <section className="py-12 px-4 md:px-16">
        <h2 className="text-3xl font-semibold mb-6 text-center">Descubre Más</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-red-100 hover:bg-red-200 text-center p-8 rounded-lg shadow-md cursor-pointer">
            <h3 className="text-2xl font-semibold mb-2">Eventos</h3>
            <p>Conoce los próximos eventos del partido.</p>
          </div>
          <div className="bg-red-100 hover:bg-red-200 text-center p-8 rounded-lg shadow-md cursor-pointer">
            <h3 className="text-2xl font-semibold mb-2">Candidatos</h3>
            <p>Descubre quiénes representan al partido.</p>
          </div>
          <div className="bg-red-100 hover:bg-red-200 text-center p-8 rounded-lg shadow-md cursor-pointer">
            <h3 className="text-2xl font-semibold mb-2">Propuestas</h3>
            <p>Consulta las propuestas que tenemos para la universidad.</p>
          </div>
          <div className="bg-red-100 hover:bg-red-200 text-center p-8 rounded-lg shadow-md cursor-pointer">
            <h3 className="text-2xl font-semibold mb-2">Noticias</h3>
            <p>Mantente informado sobre las últimas noticias.</p>
          </div>
          <div className="bg-red-100 hover:bg-red-200 text-center p-8 rounded-lg shadow-md cursor-pointer">
            <h3 className="text-2xl font-semibold mb-2">Sugerencias</h3>
            <p>Compártenos tus ideas y opiniones.</p>
          </div>
          <div className="bg-red-100 hover:bg-red-200 text-center p-8 rounded-lg shadow-md cursor-pointer">
            <h3 className="text-2xl font-semibold mb-2">Encuesta de Votación</h3>
            <p>
              <a href="/votacion" className="text-blue-600 hover:underline">
                ¿Por quién vas a votar?
              </a>
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-blue-600 text-white py-4 text-center">
        <p>Contacto: contacto@partidouniversitario.edu</p>
      </footer>
    </div>
  );
}

export default Home;
