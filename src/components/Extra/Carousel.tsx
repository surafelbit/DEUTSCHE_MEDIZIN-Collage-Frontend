import React, { useState } from "react";

export default function Carousel({ slides }) {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
    console.log("clikced ");
  };

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="relative w-[700px] h-[300px] overflow-hidden  rounded-xl shadow-lg">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full rounded-xl overflow-hidden shadow-xl transition-all duration-700 ease-in-out ${
              index === current
                ? "opacity-100 scale-100 z-10"
                : "opacity-0 scale-90 z-0"
            }`}
          >
            {/* Background image */}
            <img
              src={slide.image}
              alt={slide.text}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Student info overlay */}
            <div className="absolute bottom-0 left-0 p-6 w-full flex flex-col justify-end space-y-2 bg-gradient-to-t from-black/70 to-transparent rounded-t-xl">
              {/* Top badge */}

              {/* Name */}
              <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                {slide.name}
              </h2>

              {/* Grade */}
              {slide.grade && (
                <p className="text-yellow-300 text-lg md:text-xl font-semibold tracking-wide">
                  Grade: {slide.grade}
                </p>
              )}

              {/* Class */}
              <p className="text-white/90 text-base md:text-lg font-medium tracking-wide">
                Class: {slide.class}
              </p>
              <span className="inline-block bg-yellow-400 text-black font-extrabold px-4 py-1 rounded-full text-sm shadow-md tracking-wide">
                Top Student
              </span>
            </div>

            {/* Floating overlay number */}
            <h1 className="absolute top-4 left-4 text-xl md:text-2xl font-semibold text-white/90 drop-shadow-lg">
              #{index + 1}
            </h1>
          </div>
        ))}

        {/* Controls */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-3 -translate-y-1/2 
             flex items-center justify-center
             w-10 h-10 rounded-full bg-black/40 
             hover:bg-black/70 transition z-20"
        >
          <span className="block w-3 h-3 border-t-2 border-l-2 border-white rotate-[-45deg]" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-3 -translate-y-1/2 
             flex items-center justify-center
             w-10 h-10 rounded-full bg-black/40 
             hover:bg-black/70 transition z-20"
        >
          <span className="block w-3 h-3 border-t-2 border-r-2 border-white rotate-[45deg]" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 w-full flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-4 h-4 rounded-full transition ${
                index === current ? "bg-white" : "bg-gray-400 opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
