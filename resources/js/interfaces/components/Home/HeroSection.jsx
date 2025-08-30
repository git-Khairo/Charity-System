// components/HeroSection.js
import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = ({ currentSlide, heroImages }) => {

  return (
    <section className="relative h-screen flex flex-col md:flex-row dark:bg-dark-background">
      <div className="md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12 z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-['Montserrat',_sans-serif] mb-6 dark:text-dark-text">
          Making a Difference Together
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-xl dark:text-dark-text">
          Join our mission to create positive change in communities worldwide.
          Your support can transform lives and build a better future for those
          in need.
        </p>
        <button
          className="bg-[#002366] text-white py-3 px-8 rounded-button text-lg font-semibold hover:bg-[#97c9ea] transition-colors duration-300 w-fit whitespace-nowrap cursor-pointer"
        >
          Donate to Charities
        </button>
      </div>

      <div className="md:w-1/2 absolute md:relative inset-0">
        <div className="relative h-full w-full overflow-hidden">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover object-top"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f9f9f9] dark:from-dark-background to-transparent md:block hidden"></div>
          <div className="absolute inset-0 bg-black bg-opacity-30 md:hidden"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
