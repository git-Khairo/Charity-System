// components/AboutUs.js
import React from "react";

const AboutUs = () => {
  return (
    <section className="relative py-32">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=Diverse%20group%20of%20charity%20volunteers%20working%20together%20in%20community%20setting%2C%20aerial%20view%20of%20humanitarian%20aid%20distribution%2C%20people%20from%20different%20backgrounds%20united%20for%20a%20common%20cause%2C%20warm%20sunset%20lighting%20with%20simple%20outdoor%20background&width=1440&height=600&seq=6&orientation=landscape"
          alt="About Our Charity"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#002366] to-[#002366] opacity-70"></div>
      </div>
      <div className="relative max-w-4xl mx-auto px-8 text-center">
        <div className="bg-black bg-opacity-40 p-10 rounded-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white font-['Montserrat',_sans-serif]">
            About Us
          </h2>
          <p className="text-white text-lg mb-8">
            Founded in 2010, our organization has been dedicated to creating
            positive change in communities worldwide. We believe in the power
            of collective action and work tirelessly to address pressing
            social issues through sustainable solutions. Our network of
            volunteers and partners enables us to reach those most in need,
            providing essential services and support that empower individuals
            and strengthen communities. We are committed to transparency,
            accountability, and maximizing the impact of every donation we
            receive.
          </p>
          <a
            href="#"
            className="text-[#97c9ea] font-semibold hover:text-white transition-colors duration-300 inline-flex items-center cursor-pointer whitespace-nowrap"
          >
            Learn More
            <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;