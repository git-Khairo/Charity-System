// components/LatestCampaigns.js
import React from "react";

const LatestCampaigns = () => {
  return (
    <section className="py-20 px-8 bg-white dark:bg-dark-background dark:text-dark-text">
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
  );
};

export default LatestCampaigns;