// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from "react";
const Charities = () => {
  // Charity categories
  const categories = [
    { id: "all", name: "All Categories" },
    { id: "education", name: "Education" },
    { id: "health", name: "Health" },
    { id: "environment", name: "Environment" },
    { id: "food", name: "Food & Hunger" },
    { id: "animals", name: "Animal Welfare" },
    { id: "disaster", name: "Disaster Relief" },
  ];
  // Sort options
  const sortOptions = [
    { id: "newest", name: "Newest First" },
    { id: "az", name: "Name (A-Z)" },
    { id: "za", name: "Name (Z-A)" },
  ];
  // Sample charities data
  const charitiesData = [
    {
      id: 1,
      name: "Clean Water Initiative",
      description:
        "Providing clean water solutions to communities in need across developing regions.",
      category: "health",
      imagePrompt:
        "A professional photograph of clean water being poured into a glass, with water droplets and a blue background, showing clean water initiatives for charity, high quality professional photography with soft lighting and clear details, minimalist background",
    },
    {
      id: 2,
      name: "Global Education Fund",
      description:
        "Supporting education programs for underprivileged children around the world.",
      category: "education",
      imagePrompt:
        "A professional photograph of diverse children reading books in a classroom setting, with natural light coming through windows, showing education charity work, high quality professional photography with warm lighting and clear details, minimalist background",
    },
    {
      id: 3,
      name: "Rainforest Protection Alliance",
      description:
        "Preserving rainforest ecosystems and protecting endangered species from deforestation.",
      category: "environment",
      imagePrompt:
        "A professional photograph of a lush green rainforest with sunlight filtering through the canopy, showing environmental conservation efforts, high quality professional photography with natural lighting and vibrant colors, minimalist background",
    },
    {
      id: 4,
      name: "Food for Families",
      description:
        "Distributing nutritious meals to families facing food insecurity in urban communities.",
      category: "food",
      imagePrompt:
        "A professional photograph of fresh healthy food being prepared and packaged for distribution, showing food charity work, high quality professional photography with bright lighting and clear details, minimalist background",
    },
    {
      id: 5,
      name: "Wildlife Conservation Trust",
      description:
        "Protecting endangered wildlife through conservation programs and habitat restoration.",
      category: "animals",
      imagePrompt:
        "A professional photograph of diverse wildlife in their natural habitat, showing animal conservation efforts, high quality professional photography with natural lighting and clear details, minimalist background",
    },
    {
      id: 6,
      name: "Hurricane Relief Project",
      description:
        "Providing emergency relief and rebuilding assistance to communities affected by hurricanes.",
      category: "disaster",
      imagePrompt:
        "A professional photograph of volunteers distributing supplies and helping with rebuilding efforts after a natural disaster, showing disaster relief work, high quality professional photography with natural lighting and clear details, minimalist background",
    },
    {
      id: 7,
      name: "Children's Health Foundation",
      description:
        "Improving healthcare access and outcomes for children in underserved communities.",
      category: "health",
      imagePrompt:
        "A professional photograph of healthcare professionals caring for children in a bright medical facility, showing children healthcare charity work, high quality professional photography with soft lighting and clear details, minimalist background",
    },
    {
      id: 8,
      name: "Ocean Cleanup Coalition",
      description:
        "Removing plastic pollution from oceans and promoting sustainable practices to protect marine life.",
      category: "environment",
      imagePrompt:
        "A professional photograph of volunteers cleaning up a beach with blue ocean in the background, showing environmental ocean cleanup efforts, high quality professional photography with natural lighting and vibrant colors, minimalist background",
    },
    {
      id: 9,
      name: "Literacy for All",
      description:
        "Promoting literacy and providing educational resources to communities with limited access to books.",
      category: "education",
      imagePrompt:
        "A professional photograph of people of various ages reading books in a community library setting, showing literacy charity work, high quality professional photography with warm lighting and clear details, minimalist background",
    },
    {
      id: 10,
      name: "Community Gardens Initiative",
      description:
        "Creating sustainable food sources through community gardens in urban food deserts.",
      category: "food",
      imagePrompt:
        "A professional photograph of diverse people working together in a thriving community garden with vegetables and flowers, showing sustainable food initiatives, high quality professional photography with natural lighting and vibrant colors, minimalist background",
    },
    {
      id: 11,
      name: "Shelter for the Homeless",
      description:
        "Providing safe shelter, meals, and support services to individuals experiencing homelessness.",
      category: "health",
      imagePrompt:
        "A professional photograph of a clean, welcoming shelter facility with beds and common areas, showing homeless support charity work, high quality professional photography with warm lighting and clear details, minimalist background",
    },
    {
      id: 12,
      name: "Endangered Species Protection",
      description:
        "Working to protect critically endangered species through conservation and anti-poaching efforts.",
      category: "animals",
      imagePrompt:
        "A professional photograph of endangered wildlife in a protected sanctuary, showing animal conservation efforts, high quality professional photography with natural lighting and clear details, minimalist background",
    },
  ];
  // State for filters and pagination
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isPerPageDropdownOpen, setIsPerPageDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // Filter charities based on selected filters and search term
  const filteredCharities = charitiesData.filter((charity) => {
    return (
      (selectedCategory === "all" || charity.category === selectedCategory) &&
      (searchTerm === "" ||
        charity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        charity.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });
  // Sort charities based on selected sort option
  const sortedCharities = [...filteredCharities].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return b.id - a.id;
      case "az":
        return a.name.localeCompare(b.name);
      case "za":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });
  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCharities = sortedCharities.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(sortedCharities.length / itemsPerPage);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory("all");
    setSortBy("newest");
    setSearchTerm("");
    setCurrentPage(1);
  };
  // Check if any filter is active
  const isFilterActive = selectedCategory !== "all" || searchTerm !== "";
  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  // Get visible page numbers (show 5 at a time)
  const getVisiblePageNumbers = () => {
    if (totalPages <= 5) {
      return pageNumbers;
    }
    if (currentPage <= 3) {
      return pageNumbers.slice(0, 5);
    }
    if (currentPage >= totalPages - 2) {
      return pageNumbers.slice(totalPages - 5);
    }
    return pageNumbers.slice(currentPage - 3, currentPage + 2);
  };
  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      {/* Header Section */}
      <header className="bg-[#002366] py-16 px-4 text-white text-center">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore Charities
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover and support verified charities making a difference around
            the world.
          </p>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter & Sort Controls */}
        <div className="sticky top-0 z-10 bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Search Bar */}
            <div className="relative w-full md:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search charities..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setCurrentPage(1);
                  }}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                >
                  <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              {/* Category Filter */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                    setIsSortDropdownOpen(false);
                  }}
                  className="!rounded-button whitespace-nowrap flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  <i className="fas fa-tag text-blue-500"></i>
                  <span>
                    Category:{" "}
                    {
                      categories.find((cat) => cat.id === selectedCategory)
                        ?.name
                    }
                  </span>
                  <i className="fas fa-chevron-down text-gray-500 text-xs"></i>
                </button>
                {isCategoryDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                    <ul className="py-2 max-h-60 overflow-y-auto">
                      {categories.map((category) => (
                        <li
                          key={category.id}
                          onClick={() => {
                            setSelectedCategory(category.id);
                            setIsCategoryDropdownOpen(false);
                            setCurrentPage(1);
                          }}
                          className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${selectedCategory === category.id ? "bg-blue-50 text-blue-600" : ""}`}
                        >
                          {category.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {/* Clear Filters Button */}
              {isFilterActive && (
                <button
                  onClick={clearFilters}
                  className="!rounded-button whitespace-nowrap flex items-center gap-2 bg-[#f9f9f9] px-4 py-2 rounded-lg text-[#000111] hover:bg-[#a7a7a7] cursor-pointer"
                >
                  <i className="fas fa-times text-gray-500"></i>
                  <span>Clear Filters</span>
                </button>
              )}
            </div>
            {/* Sort Controls */}
            <div className="relative ml-auto">
              <button
                onClick={() => {
                  setIsSortDropdownOpen(!isSortDropdownOpen);
                  setIsCategoryDropdownOpen(false);
                }}
                className="!rounded-button whitespace-nowrap flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                <i className="fas fa-sort text-blue-500"></i>
                <span>
                  Sort:{" "}
                  {sortOptions.find((option) => option.id === sortBy)?.name}
                </span>
                <i className="fas fa-chevron-down text-gray-500 text-xs"></i>
              </button>
              {isSortDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  <ul className="py-2">
                    {sortOptions.map((option) => (
                      <li
                        key={option.id}
                        onClick={() => {
                          setSortBy(option.id);
                          setIsSortDropdownOpen(false);
                        }}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${sortBy === option.id ? "bg-blue-50 text-blue-600" : ""}`}
                      >
                        {option.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-[#000111]">
            Showing{" "}
            <span className="font-semibold">{filteredCharities.length}</span>{" "}
            charities
            {isFilterActive && " with selected filters"}
          </p>
        </div>
        {/* Charity Grid */}
        {currentCharities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentCharities.map((charity) => (
              <div
                key={charity.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:transform hover:scale-[1.02] border border-[#97c9ea]"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={`https://readdy.ai/api/search-image?query=$%7Bcharity.imagePrompt%7D&width=600&height=400&seq=${charity.id}&orientation=landscape`}
                    alt={charity.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-5">
                  <div className="mb-4">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        charity.category === "education"
                          ? "bg-[#97c9ea] text-[#002366]"
                          : charity.category === "health"
                            ? "bg-[#97c9ea] text-[#002366]"
                            : charity.category === "environment"
                              ? "bg-[#97c9ea] text-[#002366]"
                              : charity.category === "food"
                                ? "bg-[#97c9ea] text-[#002366]"
                                : charity.category === "animals"
                                  ? "bg-[#97c9ea] text-[#002366]"
                                  : "bg-[#97c9ea] text-[#002366]"
                      }`}
                    >
                      {
                        categories.find((cat) => cat.id === charity.category)
                          ?.name
                      }
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#000111] mb-2 line-clamp-2">
                    {charity.name}
                  </h3>
                  <p className="text-[#000111] mb-4 line-clamp-3">
                    {charity.description}
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <button className="!rounded-button whitespace-nowrap bg-[#002366] hover:bg-[#001133] text-white py-2 px-4 rounded-lg transition-colors duration-300 cursor-pointer">
                      View Details
                    </button>
                    <button className="!rounded-button whitespace-nowrap bg-[#97c9ea] hover:bg-[#7ab9e0] text-[#002366] py-2 px-4 rounded-lg transition-colors duration-300 cursor-pointer">
                      Donate
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <i className="fas fa-search text-5xl text-[#a7a7a7] mb-4"></i>
            <h3 className="text-xl font-semibold text-[#000111] mb-2">
              No charities found
            </h3>
            <p className="text-[#000111] mb-4">
              Try adjusting your filters to find more results.
            </p>
            <button
              onClick={clearFilters}
              className="!rounded-button whitespace-nowrap bg-[#002366] hover:bg-[#001133] text-white py-2 px-6 rounded-lg transition-colors duration-300 cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}
        {/* Pagination */}
        {filteredCharities.length > 0 && (
          <div className="mt-12 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-[#000111]">
                Showing {indexOfFirstItem + 1}-
                {Math.min(indexOfLastItem, filteredCharities.length)} of{" "}
                {filteredCharities.length} results
              </p>
            </div>
            <div className="flex items-center">
              <nav className="flex items-center">
                <button
                  onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`!rounded-button whitespace-nowrap mr-2 px-3 py-2 rounded-lg ${
                    currentPage === 1
                      ? "bg-[#a7a7a7] text-white cursor-not-allowed"
                      : "bg-white border border-[#97c9ea] text-[#000111] hover:bg-[#f9f9f9] cursor-pointer"
                  }`}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <div className="hidden md:flex">
                  {getVisiblePageNumbers().map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`!rounded-button whitespace-nowrap mx-1 px-4 py-2 rounded-lg ${
                        currentPage === number
                          ? "bg-[#002366] text-white"
                          : "bg-white border border-[#97c9ea] text-[#000111] hover:bg-[#f9f9f9]"
                      } cursor-pointer`}
                    >
                      {number}
                    </button>
                  ))}
                </div>
                <div className="md:hidden">
                  <span className="mx-2 text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
                <button
                  onClick={() =>
                    currentPage < totalPages && paginate(currentPage + 1)
                  }
                  disabled={currentPage === totalPages}
                  className={`!rounded-button whitespace-nowrap ml-2 px-3 py-2 rounded-lg ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                  }`}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </nav>
              <div className="relative ml-4">
                <button
                  onClick={() =>
                    setIsPerPageDropdownOpen(!isPerPageDropdownOpen)
                  }
                  className="!rounded-button whitespace-nowrap flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  <span>{itemsPerPage} per page</span>
                  <i className="fas fa-chevron-down text-gray-500 text-xs"></i>
                </button>
                {isPerPageDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                    <ul className="py-2">
                      {[8, 12, 16, 24].map((number) => (
                        <li
                          key={number}
                          onClick={() => {
                            setItemsPerPage(number);
                            setIsPerPageDropdownOpen(false);
                            setCurrentPage(1);
                          }}
                          className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${itemsPerPage === number ? "bg-blue-50 text-blue-600" : ""}`}
                        >
                          {number} per page
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
export default Charities;
