import React from "react";
import { useState, useEffect } from "react";
import FormularioSugerencias from "../components/FormularioSugerencias.jsx";
import "../styles/stylesForm.css";
import { useSettings } from "./SettingsContext.jsx";
function PaginaSugerenciasVotos() {
  const { backgroundColor, textColor, font } = useSettings();
  return (
    <>
      <section
        className="relative w-full min-h-screen overflow-hidden py-16 flex justify-center items-center"
        style={{ backgroundColor: backgroundColor }}
      >
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
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => {
            const size = Math.random() * 4 + 1;
            const left = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 3 + 6;

            return (
              <div
                key={i}
                className="bubble"
                style={{
                  width: `${size}rem`,
                  height: `${size}rem`,
                  left: `${left}%`,
                  bottom: `-20px`,
                  animation: `float ${duration}s linear infinite`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
        <div
          className="w-full max-w-screen-2xl flex flex-wrap gap-8 justify-center items-center px-4"
          style={{ backgroundColor: backgroundColor }}
        >
          <FormularioSugerencias />
        </div>
      </section>
    </>
  );
}

export default PaginaSugerenciasVotos;
