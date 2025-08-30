// components/CharityCategories.js
import React from "react";

const CharityCategories = () => {
  return (
    <section className="py-20 px-8 dark:bg-dark-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl dark:text-dark-text md:text-4xl font-bold text-center font-['Montserrat',_sans-serif] mb-16">
          Our Charity Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Food & Hunger */}
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 hover:border-[#97c9ea] border border-transparent cursor-pointer">
            <div className="flex justify-center mb-6">
              <i className="fas fa-utensils text-5xl text-[#002366]"></i>
            </div>
            <h3 className="text-2xl font-bold text-center mb-4 font-['Montserrat',_sans-serif]">
              Food & Hunger
            </h3>
            <p className="text-center">
              Help us fight hunger and provide nutritious meals to those
              facing food insecurity around the world. Every donation helps
              feed families in need.
            </p>
          </div>
          {/* Education */}
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 hover:border-[#97c9ea] border border-transparent cursor-pointer">
            <div className="flex justify-center mb-6">
              <i className="fas fa-graduation-cap text-5xl text-[#002366]"></i>
            </div>
            <h3 className="text-2xl font-bold text-center mb-4 font-['Montserrat',_sans-serif]">
              Education
            </h3>
            <p className="text-center">
              Support educational initiatives that provide learning
              opportunities for underprivileged children and adults, helping
              them build brighter futures.
            </p>
          </div>
          {/* Health & Medical */}
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 hover:border-[#97c9ea] border border-transparent cursor-pointer">
            <div className="flex justify-center mb-6">
              <i className="fas fa-heartbeat text-5xl text-[#002366]"></i>
            </div>
            <h3 className="text-2xl font-bold text-center mb-4 font-['Montserrat',_sans-serif]">
              Health & Medical
            </h3>
            <p className="text-center">
              Contribute to healthcare initiatives that provide medical
              services, supplies, and support to communities with limited
              access to healthcare resources.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CharityCategories;