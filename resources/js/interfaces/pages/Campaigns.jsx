import { useEffect, useState } from "react";
import useGet from "../../services/API/useGet";
import Pagination from "../components/Pagination";
import useFilter from "../../services/Hooks/useFilter";
import useSort from "../../services/Hooks/useSort";

const Campaigns = () => {
  const { get, data, loading, error } = useGet();

  useEffect(() => {
    get('/api/events');
  }, []);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

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
  const sortOptions = ["Newest", "Most Funded", "Ending Soon"];

  // Use campaigns array from data or empty array as fallback
  const campaignsData = data?.events || [];

  
  // Use filter and sort logic hooks
  const { filteredData, isFilterActive } = useFilter({
    data: campaignsData,
    selectedCategory,
    searchTerm,
    statusFilter,
  });
  const { sortedData } = useSort({
    data: filteredData,
    sortBy,
  });

  // Initialize and update filtered and sorted data
  const [filteredCampaigns, setFilteredCampaigns] = useState(filteredData);
  const [sortedCampaigns, setSortedCampaigns] = useState(sortedData);

  // Update filtered and sorted data on state changes
  useEffect(() => {
    setFilteredCampaigns(filteredData);
    setSortedCampaigns(sortedData);
    setCurrentPage(1); // Reset to first page on filter/sort change
  }, [campaignsData, selectedCategory, searchTerm, statusFilter, sortBy]);

  // Calculate pagination
  const indexOfLastCampaign = currentPage * itemsPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - itemsPerPage;
  const currentCampaigns = sortedCampaigns.slice(
    indexOfFirstCampaign,
    indexOfLastCampaign,
  );
  const totalPages = Math.ceil(sortedCampaigns.length / itemsPerPage);

  // Clear all filters and reset sort
  const handleClearFilters = () => {
    setSelectedCategory("All");
    setStatusFilter("All");
    setSearchTerm("");
    setSortBy("Newest");
    setCurrentPage(1);
  };


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
        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <i className="fas fa-spinner fa-spin text-4xl text-blue-500 mb-4"></i>
            <p className="text-gray-900 text-lg">Loading campaigns...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <i className="fas fa-exclamation-circle text-5xl text-red-500 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Error loading campaigns
            </h3>
            <p className="text-gray-900 mb-4">{error.message}</p>
            <button
              onClick={() => get('/api/events')}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Filters and Search */}
        {!loading && !error && (
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
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  >
                    <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
                  </button>
                )}
              </div>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative inline-block text-left">
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md cursor-pointer"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
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
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    {sortOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {isFilterActive && (
                  <button
                    onClick={handleClearFilters}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 px-4 rounded-md transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer"
                  >
                    <i className="fas fa-times text-gray-500 mr-2"></i>
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Campaign Results */}
        {!loading && !error && (
          <div className="mb-10">
            <div className="mb-6">
              <p className="text-gray-900">
                Showing{" "}
                <span className="font-semibold">{filteredCampaigns.length}</span>{" "}
                campaigns
                {isFilterActive && " with selected filters"}
              </p>
            </div>

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
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  itemsPerPage={itemsPerPage}
                  setCurrentPage={setCurrentPage}
                  setItemsPerPage={setItemsPerPage}
                  filteredCharities={filteredCampaigns}
                />
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
                <button
                  onClick={handleClearFilters}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Campaigns;