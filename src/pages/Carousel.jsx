import React, { useState } from "react";

function Carousel() {
  const sections = [
    {
      text: "First Slide",
      bgColor: "bg-gray-100",
    },
    {
      text: "Second Slide",
      bgColor: "bg-gray-200",
    },
    {
      text: "Third Slide",
      bgColor: "bg-gray-300",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="relative w-full bg-white rounded-lg shadow-md dark:bg-neutral-800">
      <div className="relative overflow-hidden w-full min-h-64 bg-white rounded-lg">
        <div
          className="flex transition-transform duration-700"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {sections.map((slide, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-full h-full flex justify-center items-center p-6 ${slide.bgColor} dark:bg-neutral-${900 - index * 100}`}
            >
              <span className="text-4xl text-gray-800 dark:text-white">
                {slide.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute inset-y-0 left-0 flex justify-center items-center w-[46px] text-gray-800 hover:bg-gray-800/10 focus:outline-none focus:bg-gray-800/10 rounded-l-lg dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
        >
          <path d="M15 18L9 12l6-6"></path>
        </svg>
        <span className="sr-only">Previous</span>
      </button>

      <button
        onClick={nextSlide}
        className="absolute inset-y-0 right-0 flex justify-center items-center w-[46px] text-gray-800 hover:bg-gray-800/10 focus:outline-none focus:bg-gray-800/10 rounded-r-lg dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
        >
          <path d="M9 18l6-6-6-6"></path>
        </svg>
        <span className="sr-only">Next</span>
      </button>

      <div className="flex justify-center space-x-2 absolute bottom-3 left-0 right-0">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 border rounded-full ${
              index === currentSlide
                ? "bg-blue-700 border-blue-700"
                : "bg-gray-400 border-gray-400"
            } dark:border-neutral-600`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
