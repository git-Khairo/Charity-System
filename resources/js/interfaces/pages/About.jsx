import React from "react";

export default function About() {
  return (
    <div id="about-page" className="min-h-screen bg-white dark:text-white dark:bg-dark-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 dark:text-white">About Us</h1>
          <p className="text-xl text-gray-600 dark:text-white max-w-3xl mx-auto">
            We're on a mission to make donation simple, secure, and impactful.
          </p>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {[
            {
              icon: "ri-heart-line",
              title: "Our Mission",
              text: "To create a world where giving is effortless and every donation makes a meaningful difference.",
            },
            {
              icon: "ri-eye-line",
              title: "Our Vision",
              text: "To be the most trusted and innovative platform connecting donors with meaningful causes.",
            },
            {
              icon: "ri-shield-star-line",
              title: "Our Values",
              text: "Transparency, security, and impact drive everything we do to serve our community.",
            },
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`${item.icon} text-[#002366] ri-2x dark:text-white`}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-white">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Our Story */}
        <div className="bg-gray-50 dark:bg-dark-background2 rounded-xl p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 dark:text-white">Our Story</h2>
              <p className="text-gray-600 mb-4 dark:text-white">
                Founded in 2025, we recognized the need for a more efficient and secure way to connect donors with causes they care about. Our platform was built with the latest technology and highest security standards to ensure every donation reaches its intended destination.
              </p>
              <p className="text-gray-600 dark:text-white">
                Today, we serve thousands of donors and organizations worldwide, facilitating millions in donations to various causes and making a real difference in communities globally.
              </p>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <img
                src="https://readdy.ai/api/search-image?query=modern%20office%20team%20collaboration%20meeting%2C%20diverse%20team%20members%20discussing%20project%20plans%20in%20a%20bright%20contemporary%20workspace%20with%20glass%20walls%20and%20natural%20light%2C%20professional%20business%20environment&width=800&height=600&seq=1&orientation=landscape"
                alt="Our Team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Our Impact */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 dark:text-white">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 dark:text-white">
            {[
              { value: "10K+", label: "Active Donors" },
              { value: "$5M+", label: "Donations Processed" },
              { value: "500+", label: "Partner Organizations" },
              { value: "50+", label: "Countries Reached" },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="text-4xl font-bold text-[#435b8f] mb-2 dark:text-white">{item.value}</div>
                <p className="text-gray-600 dark:text-white">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 dark:text-white">Join Us Today</h2>
         <button className="bg-[#002366] text-white px-8 dark:text-white py-3 rounded-md hover:bg-blue-900 transition-colors text-lg whitespace-nowrap"
>
  Get Started
</button>
        </div>
      </div>
    </div>
  );
}
