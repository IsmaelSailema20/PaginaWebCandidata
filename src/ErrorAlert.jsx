import React, { useEffect, useState } from "react";
import "./styleNotificaciones.css";

const ErrorAlert = ({ visible, onClose, message }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (visible) {
      setShow(true); // Muestra el componente cuando visible es true
      setTimeout(() => setShow(false), 3000); // Oculta después de 3 segundos
    }
  }, [visible]);

  useEffect(() => {
    if (!show) {
      setTimeout(onClose, 800); // Llama a onClose después de la animación de salida
    }
  }, [show, onClose]);

  return (
    <div
      className={`fixed top-5 left-5 z-50 bg-red-500 text-white shadow-lg rounded-lg px-5 py-4 border-l-4 border-red-700 flex items-start w-2/5 max-w-sm ${
        show ? "slide-in" : "slide-out"
      }`}
    >
      <div className="bg-red mr-5 flex h-[30px] w-full max-w-[40px] items-center justify-center rounded-md">
        <svg
          width="18"
          height="18"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_961_15656)">
            <path
              d="M6 0.337494C2.86875 0.337494 0.3375 2.86874 0.3375 5.99999C0.3375 9.13124 2.86875 11.6812 6 11.6812C9.13125 11.6812 11.6813 9.13124 11.6813 5.99999C11.6813 2.86874 9.13125 0.337494 6 0.337494ZM6 10.8375C3.3375 10.8375 1.18125 8.66249 1.18125 5.99999C1.18125 3.33749 3.3375 1.18124 6 1.18124C8.6625 1.18124 10.8375 3.35624 10.8375 6.01874C10.8375 8.66249 8.6625 10.8375 6 10.8375Z"
              fill="white"
            />
            <path
              d="M7.725 4.25625C7.55625 4.0875 7.29375 4.0875 7.125 4.25625L6 5.4L4.85625 4.25625C4.6875 4.0875 4.425 4.0875 4.25625 4.25625C4.0875 4.425 4.0875 4.6875 4.25625 4.85625L5.4 6L4.25625 7.14375C4.0875 7.3125 4.0875 7.575 4.25625 7.74375C4.33125 7.81875 4.44375 7.875 4.55625 7.875C4.66875 7.875 4.78125 7.8375 4.85625 7.74375L6 6.6L7.14375 7.74375C7.21875 7.81875 7.33125 7.875 7.44375 7.875C7.55625 7.875 7.66875 7.8375 7.74375 7.74375C7.9125 7.575 7.9125 7.3125 7.74375 7.14375L6.6 6L7.74375 4.85625C7.89375 4.6875 7.89375 4.425 7.725 4.25625Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_961_15656">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="w-full">
        <h5 className="mb-3 text-lg font-semibold">{message}</h5>
      </div>
    </div>
  );
};

export default ErrorAlert;
