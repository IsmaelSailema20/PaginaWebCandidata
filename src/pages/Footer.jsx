import React, { useState, useEffect } from "react";

const Footer = () => {
  

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      />
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-semibold mb-2 text-yellow-400">
                
              </h3>
              <p className="text-lg text-gray-300">
                Trabajamos por un futuro mejor para todos.
              </p>
            </div>
            
          </div>
         
        </div>
        <div className="text-center text-sm mt-8">
          <p className="text-gray-300">
            &copy; {new Date().getFullYear()}{" "}
             Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
