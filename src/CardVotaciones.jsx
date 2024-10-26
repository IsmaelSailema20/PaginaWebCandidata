import React from "react";

function CardVotaciones({ src, candidata, alt }) {
  return (
    <>
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow  ">
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-64 h-60 mb-3 rounded-lg shadow-lg mt-8"
            src={src}
            alt={alt}
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 ">
            {candidata}
          </h5>
          <div className="flex mt-4 md:mt-6">
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
            >
              Apoyo a esta candidata
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardVotaciones;
