import { useEffect, useState } from "react";
import useGet from "../../services/API/useGet";
import Pagination from "../components/Pagination";
import useFilter from "../../services/Hooks/useFilter";
import useSort from "../../services/Hooks/useSort";

const Charities = () => {
  const { get, data, loading, error } = useGet();

  useEffect(() => {
    get('/api/charities');
  }, []);

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

  // Use charities array from data or empty array as fallback
  const charitiesData = data?.charities || [];

  // Filter and sort states
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  // Use filter and sort logic hooks
  const { filteredData, isFilterActive } = useFilter({
    data: charitiesData,
    selectedCategory,
    searchTerm,
  });
  const { sortedData } = useSort({
    data: filteredData,
    sortBy,
  });

  // Initialize and update filtered and sorted data
  const [filteredCharities, setFilteredCharities] = useState(filteredData);
  const [sortedCharities, setSortedCharities] = useState(sortedData);

  useEffect(() => {
    setFilteredCharities(filteredData);
    setSortedCharities(sortedData);
    setCurrentPage(1); // Reset to first page on filter/sort change
  }, [selectedCategory, searchTerm, sortBy, charitiesData]);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCharities = sortedCharities.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(sortedCharities.length / itemsPerPage);

  // Clear all filters and reset sort
  const handleClearFilters = () => {
    setSelectedCategory("all");
    setSearchTerm("");
    setSortBy("newest");
    setCurrentPage(1);
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
                }}
                placeholder="Search charities..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
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
                  onClick={handleClearFilters}
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
                className="!rounded-button whitespace-nowrap flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-grey-700 hover:bg-grey-50 cursor-pointer"
              >
                <i className="fas fa-sort text-blue-500"></i>
                <span>
                  Sort:{" "}
                  {sortOptions.find((option) => option.id === sortBy)?.name}
                </span>
                <i className="fas fa-chevron-down text-grey-500 text-xs"></i>
              </button>
              {isSortDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-grey-200 rounded-lg shadow-lg z-20">
                  <ul className="py-2">
                    {sortOptions.map((option) => (
                      <li
                        key={option.id}
                        onClick={() => {
                          setSortBy(option.id);
                          setIsSortDropdownOpen(false);
                        }}
                        className={`px-4 py-2 cursor-pointer hover:bg-grey-100 ${sortBy === option.id ? "bg-blue-50 text-blue-600" : ""}`}
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

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <i className="fas fa-spinner fa-spin text-4xl text-[#002366] mb-4"></i>
            <p className="text-[#000111] text-lg">Loading charities...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <i className="fas fa-exclamation-circle text-5xl text-red-500 mb-4"></i>
            <h3 className="text-xl font-semibold text-[#000111] mb-2">
              Error loading charities
            </h3>
            <p className="text-[#000111] mb-4">{error.message}</p>
            <button
              onClick={() => get('/api/charities')}
              className="!rounded-button whitespace-nowrap bg-[#002366] hover:bg-[#001133] text-white py-2 px-6 rounded-lg transition-colors duration-300 cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Results Count */}
        {!loading && !error && (
          <div className="mb-6">
            <p className="text-[#000111]">
              Showing{" "}
              <span className="font-semibold">{filteredCharities.length}</span>{" "}
              charities
              {isFilterActive && " with selected filters"}
            </p>
          </div>
        )}

        {/* Charity Grid */}
        {!loading && !error && currentCharities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentCharities.map((charity) => (
              <div
                key={charity.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:transform hover:scale-[1.02] border border-[#97c9ea]"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={charity.images ? JSON.parse(charity.images)[0] : "https://via.placeholder.com/600x400"}
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
                          ?.name || "Other"
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
          !loading &&
          !error && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <i className="fas fa-search text-5xl text-[#a7a7a7] mb-4"></i>
              <h3 className="text-xl font-semibold text-[#000111] mb-2">
                No charities found
              </h3>
              <p className="text-[#000111] mb-4">
                Try adjusting your filters to find more results.
              </p>
              <button
                onClick={handleClearFilters}
                className="!rounded-button whitespace-nowrap bg-[#002366] hover:bg-[#001133] text-white py-2 px-6 rounded-lg transition-colors duration-300 cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          )
        )}

        {/* Pagination */}
        {!loading && !error && filteredCharities.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
            setItemsPerPage={setItemsPerPage}
            filteredCharities={filteredCharities}
          />
        )}
      </main>
    </div>
  );
};

export default Charities;