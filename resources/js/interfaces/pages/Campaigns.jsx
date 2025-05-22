// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from "react";

const Campaigns = () => {
  // Campaign data
  const campaigns = [
    {
      id: 1,
      title: "Clean Water for Rural Communities",
      description:
        "Help provide clean water access to villages facing severe drought and water contamination issues.",
      image:
        "https://readdy.ai/api/search-image?query=Clean%20water%20project%20in%20rural%20village%20with%20people%20gathering%20around%20a%20new%20well%2C%20sunlight%20filtering%20through%20trees%2C%20hopeful%20atmosphere%2C%20professional%20photography%20with%20natural%20lighting%20and%20vibrant%20colors&width=600&height=340&seq=1&orientation=landscape",
      raised: 8750,
      goal: 10000,
      status: "Active",
      category: "Health",
      location: "Africa",
      daysLeft: 12,
    },
    {
      id: 2,
      title: "Education for Underprivileged Children",
      description:
        "Support education initiatives for children in low-income neighborhoods to break the cycle of poverty.",
      image:
        "https://readdy.ai/api/search-image?query=Diverse%20group%20of%20children%20in%20a%20bright%20classroom%20with%20books%20and%20learning%20materials%2C%20engaged%20in%20educational%20activities%2C%20natural%20lighting%20through%20windows%2C%20hopeful%20atmosphere%2C%20professional%20photography&width=600&height=340&seq=2&orientation=landscape",
      raised: 15200,
      goal: 25000,
      status: "Active",
      category: "Education",
      location: "Asia",
      daysLeft: 30,
    },
    {
      id: 3,
      title: "Wildlife Conservation Project",
      description:
        "Protect endangered species and their habitats through conservation efforts and community engagement.",
      image:
        "https://readdy.ai/api/search-image?query=Wildlife%20conservation%20scene%20with%20rangers%20monitoring%20animals%20in%20natural%20habitat%2C%20lush%20green%20environment%2C%20professional%20nature%20photography%20with%20golden%20hour%20lighting%2C%20conservation%20efforts%20in%20action&width=600&height=340&seq=3&orientation=landscape",
      raised: 12400,
      goal: 20000,
      status: "Active",
      category: "Environment",
      location: "South America",
      daysLeft: 45,
    },
    {
      id: 4,
      title: "Emergency Disaster Relief",
      description:
        "Provide immediate assistance to communities affected by recent natural disasters with food, shelter, and medical aid.",
      image:
        "https://readdy.ai/api/search-image?query=Disaster%20relief%20workers%20distributing%20supplies%20to%20affected%20community%20members%2C%20tents%20and%20emergency%20supplies%20visible%2C%20compassionate%20interactions%2C%20professional%20documentary%20style%20photography%20with%20natural%20lighting&width=600&height=340&seq=4&orientation=landscape",
      raised: 35000,
      goal: 50000,
      status: "Active",
      category: "Emergency",
      location: "Caribbean",
      daysLeft: 5,
    },
    {
      id: 5,
      title: "Community Health Clinic",
      description:
        "Build a sustainable health clinic to provide ongoing medical care to an underserved community.",
      image:
        "https://readdy.ai/api/search-image?query=Modern%20community%20health%20clinic%20with%20medical%20staff%20attending%20to%20patients%2C%20bright%20and%20clean%20interior%2C%20medical%20equipment%20visible%2C%20professional%20healthcare%20photography%20with%20warm%20lighting&width=600&height=340&seq=5&orientation=landscape",
      raised: 75000,
      goal: 100000,
      status: "Active",
      category: "Health",
      location: "North America",
      daysLeft: 60,
    },
    {
      id: 6,
      title: "Hunger Relief Program",
      description:
        "Distribute nutritious meals to families facing food insecurity and establish sustainable food sources.",
      image:
        "https://readdy.ai/api/search-image?query=Food%20distribution%20center%20with%20volunteers%20organizing%20meals%20and%20groceries%20for%20families%2C%20bright%20organized%20space%2C%20diverse%20volunteers%20working%20together%2C%20professional%20documentary%20photography&width=600&height=340&seq=6&orientation=landscape",
      raised: 18500,
      goal: 30000,
      status: "Active",
      category: "Food",
      location: "Europe",
      daysLeft: 25,
    },
    {
      id: 7,
      title: "Refugee Support Initiative",
      description:
        "Provide housing, education, and integration support for refugee families seeking safety and new beginnings.",
      image:
        "https://readdy.ai/api/search-image?query=Refugee%20support%20center%20with%20families%20receiving%20assistance%2C%20children%20playing%2C%20education%20activities%20visible%2C%20warm%20welcoming%20atmosphere%2C%20professional%20documentary%20style%20photography&width=600&height=340&seq=7&orientation=landscape",
      raised: 45000,
      goal: 60000,
      status: "Completed",
      category: "Humanitarian",
      location: "Middle East",
      daysLeft: 0,
    },
    {
      id: 8,
      title: "Ocean Cleanup Project",
      description:
        "Remove plastic pollution from marine ecosystems and implement prevention strategies with local communities.",
      image:
        "https://readdy.ai/api/search-image?query=Ocean%20cleanup%20operation%20with%20volunteers%20collecting%20plastic%20from%20beaches%20and%20shallow%20waters%2C%20beautiful%20coastal%20scenery%2C%20environmental%20conservation%20in%20action%2C%20professional%20nature%20photography&width=600&height=340&seq=8&orientation=landscape",
      raised: 28000,
      goal: 40000,
      status: "Completed",
      category: "Environment",
      location: "Pacific",
      daysLeft: 0,
    },
    {
      id: 9,
      title: "Women's Empowerment Program",
      description:
        "Support skills training, education, and entrepreneurship opportunities for women in developing regions.",
      image:
        "https://readdy.ai/api/search-image?query=Womens%20empowerment%20workshop%20with%20diverse%20participants%20learning%20skills%2C%20collaborative%20atmosphere%2C%20bright%20modern%20space%2C%20professional%20photography%20with%20natural%20lighting&width=600&height=340&seq=9&orientation=landscape",
      raised: 22000,
      goal: 35000,
      status: "Upcoming",
      category: "Education",
      location: "Global",
      daysLeft: null,
    },
  ];

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 6;

  // Derived data
  const categories = [
    "All",
    "Education",
    "Health",
    "Environment",
    "Emergency",
    "Food",
    "Humanitarian",
  ];
  const statuses = ["All", "Active", "Completed", "Upcoming"];
  const locations = [
    "All",
    "Africa",
    "Asia",
    "Europe",
    "North America",
    "South America",
    "Caribbean",
    "Middle East",
    "Pacific",
    "Global",
  ];
  const sortOptions = ["Newest", "Most Funded", "Ending Soon"];

  // Filter and sort campaigns
  const filteredCampaigns = campaigns
    .filter((campaign) => {
      return (
        (searchTerm === "" ||
          campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          campaign.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) &&
        (categoryFilter === "All" || campaign.category === categoryFilter) &&
        (statusFilter === "All" || campaign.status === statusFilter) &&
        (locationFilter === "All" || campaign.location === locationFilter)
      );
    })
    .sort((a, b) => {
      if (sortOption === "Most Funded") {
        return b.raised / b.goal - a.raised / a.goal;
      } else if (sortOption === "Ending Soon") {
        // Put completed campaigns at the end
        if (a.status === "Completed" && b.status !== "Completed") return 1;
        if (a.status !== "Completed" && b.status === "Completed") return -1;
        // Put upcoming campaigns after active ones
        if (a.status === "Upcoming" && b.status === "Active") return 1;
        if (a.status === "Active" && b.status === "Upcoming") return -1;
        // Sort active campaigns by days left
        if (a.status === "Active" && b.status === "Active") {
          return (a.daysLeft || 0) - (b.daysLeft || 0);
        }
        return 0;
      } else {
        // Default: Newest
        return b.id - a.id;
      }
    });

  // Pagination
  const indexOfLastCampaign = currentPage * campaignsPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
  const currentCampaigns = filteredCampaigns.slice(
    indexOfFirstCampaign,
    indexOfLastCampaign,
  );
  const totalPages = Math.ceil(filteredCampaigns.length / campaignsPerPage);

  // Pagination controls
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            All Campaigns
          </h1>
          <p className="mt-2 text-lg text-gray-600 text-center max-w-3xl mx-auto">
            Support a cause that matters. Browse our active and completed
            campaigns.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative inline-block text-left">
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md cursor-pointer"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "All" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative inline-block text-left">
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md cursor-pointer"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status === "All" ? "All Statuses" : status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative inline-block text-left">
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md cursor-pointer"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location === "All" ? "All Locations" : location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative inline-block text-left">
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md cursor-pointer"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Results */}
        <div className="mb-10">
          {currentCampaigns.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform hover:shadow-md"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={campaign.image}
                        alt={campaign.title}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute top-3 right-3">
                        <span
                          className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${
                            campaign.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : campaign.status === "Completed"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {campaign.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                        {campaign.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {campaign.description}
                      </p>

                      <div className="mb-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{
                              width: `${Math.min(100, (campaign.raised / campaign.goal) * 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <span className="text-lg font-bold text-gray-900">
                            ${campaign.raised.toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-600">
                            {" "}
                            raised of ${campaign.goal.toLocaleString()}
                          </span>
                        </div>
                        {campaign.status === "Active" && (
                          <div className="text-sm text-orange-600 font-medium">
                            {campaign.daysLeft} days left
                          </div>
                        )}
                      </div>

                      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer">
                        View Campaign
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 flex items-center justify-center">
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:bg-gray-50 cursor-pointer"
                    } !rounded-button whitespace-nowrap`}
                  >
                    <i className="fas fa-chevron-left text-xs"></i>
                    <span className="sr-only">Previous</span>
                  </button>

                  {Array.from({ length: totalPages }).map((_, index) => {
                    const pageNumber = index + 1;
                    // Show limited page numbers with ellipsis
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 &&
                        pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => paginate(pageNumber)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === pageNumber
                              ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                          } !rounded-button whitespace-nowrap cursor-pointer`}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (
                      (pageNumber === currentPage - 2 && currentPage > 3) ||
                      (pageNumber === currentPage + 2 &&
                        currentPage < totalPages - 2)
                    ) {
                      return (
                        <span
                          key={pageNumber}
                          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}

                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === totalPages
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:bg-gray-50 cursor-pointer"
                    } !rounded-button whitespace-nowrap`}
                  >
                    <i className="fas fa-chevron-right text-xs"></i>
                    <span className="sr-only">Next</span>
                  </button>
                </nav>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-5xl text-gray-300 mb-4">
                <i className="fas fa-search"></i>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No campaigns found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Campaigns;
