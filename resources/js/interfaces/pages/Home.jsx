// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from "react";
const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = [
    {
      url: "https://readdy.ai/api/search-image?query=Emotional%20image%20of%20diverse%20volunteers%20helping%20communities%20in%20need%2C%20with%20warm%20lighting%20and%20genuine%20human%20connection%2C%20showing%20hands%20reaching%20out%20to%20help%20others%2C%20professional%20photography%20with%20soft%20natural%20lighting%20and%20blurred%20background&width=800&height=800&seq=1&orientation=landscape",
      alt: "Volunteers helping communities",
    },
    {
      url: "https://readdy.ai/api/search-image?query=Children%20receiving%20education%20in%20a%20rural%20school%20setting%20with%20hopeful%20expressions%2C%20natural%20lighting%20through%20windows%2C%20teachers%20helping%20students%20learn%2C%20inspirational%20moment%20of%20knowledge%20sharing%20with%20simple%20classroom%20background&width=800&height=800&seq=2&orientation=landscape",
      alt: "Children receiving education",
    },
    {
      url: "https://readdy.ai/api/search-image?query=Medical%20volunteers%20providing%20healthcare%20services%20in%20underserved%20areas%2C%20doctors%20examining%20patients%20with%20care%20and%20compassion%2C%20medical%20equipment%20visible%2C%20warm%20lighting%20creating%20hopeful%20atmosphere%20against%20simple%20clinic%20background&width=800&height=800&seq=3&orientation=landscape",
      alt: "Medical volunteers providing healthcare",
    },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#000111] font-['Open_Sans',_sans-serif]">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col md:flex-row">
        <div className="md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12 z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-['Montserrat',_sans-serif] mb-6">
            Making a Difference Together
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-xl">
            Join our mission to create positive change in communities worldwide.
            Your support can transform lives and build a better future for those
            in need.
          </p>
          <button className="bg-[#002366] text-white py-3 px-8 rounded-button text-lg font-semibold hover:bg-[#97c9ea] transition-colors duration-300 w-fit whitespace-nowrap cursor-pointer">
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
            <div className="absolute inset-0 bg-gradient-to-r from-[#f9f9f9] to-transparent md:block hidden"></div>
            <div className="absolute inset-0 bg-black bg-opacity-30 md:hidden"></div>
          </div>
        </div>
      </section>
      {/* Charity Categories */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center font-['Montserrat',_sans-serif] mb-16">
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
      {/* Latest Campaigns */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center font-['Montserrat',_sans-serif] mb-16">
            Latest Campaigns
          </h2>
          {/* First Campaign */}
          <div className="flex flex-col md:flex-row overflow-hidden">
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 font-['Montserrat',_sans-serif]">
                Clean Water Initiative
              </h3>
              <p className="mb-6">
                Our Clean Water Initiative aims to provide safe drinking water
                to rural communities facing water scarcity. With your support,
                we can install water purification systems and wells that will
                serve thousands of people daily, reducing waterborne diseases
                and improving quality of life.
              </p>
              <button className="bg-[#002366] text-white py-3 px-8 rounded-button font-semibold hover:bg-[#97c9ea] transition-colors duration-300 w-fit whitespace-nowrap cursor-pointer">
                View Campaign
              </button>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://readdy.ai/api/search-image?query=Clean%20water%20initiative%20showing%20water%20wells%20being%20installed%20in%20rural%20villages%2C%20people%20collecting%20clean%20water%20from%20taps%2C%20community%20members%20celebrating%20access%20to%20clean%20water%2C%20natural%20lighting%20with%20simple%20village%20background&width=600&height=500&seq=4&orientation=landscape"
                alt="Clean Water Initiative"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
          {/* Second Campaign */}
          <div className="flex flex-col md:flex-row-reverse overflow-hidden">
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 font-['Montserrat',_sans-serif]">
                School Supplies Drive
              </h3>
              <p className="mb-6">
                Help us equip underprivileged students with the tools they need
                to succeed. Our School Supplies Drive provides backpacks,
                notebooks, writing utensils, and other essential learning
                materials to children who otherwise might go without these basic
                educational necessities.
              </p>
              <button className="bg-[#002366] text-white py-3 px-8 rounded-button font-semibold hover:bg-[#97c9ea] transition-colors duration-300 w-fit whitespace-nowrap cursor-pointer">
                View Campaign
              </button>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://readdy.ai/api/search-image?query=School%20supplies%20drive%20showing%20colorful%20backpacks%2C%20notebooks%20and%20educational%20materials%20being%20distributed%20to%20happy%20children%20in%20classroom%20setting%2C%20volunteers%20helping%20organize%20supplies%2C%20warm%20lighting%20with%20simple%20school%20background&width=600&height=500&seq=5&orientation=landscape"
                alt="School Supplies Drive"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>
      {/* About Us */}
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
    </div>
  );
};
export default App;
