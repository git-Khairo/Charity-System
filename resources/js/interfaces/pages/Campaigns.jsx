import { useEffect } from "react";
import useGet from "../../services/API/useGet";
import Pagination from "../components/Pagination";
import { useCampaign } from "../../core/Campaigns/usecase/useCampaign";
import CampaignFilters from "../components/Campaign/CampaignFilters";
import CampaignCard from "../components/Campaign/CampaignCard";
import { useFetchCampaigns } from "../../core/Campaigns/usecase/useFetchCampaigns";

const Campaigns = () => {
const { fetchCampaigns, campaigns, loading, error } = useFetchCampaigns();

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "education", name: "Education" },
    { id: "health", name: "Health" },
    { id: "environment", name: "Environment" },
    { id: "food", name: "Food & Hunger" },
    { id: "shelter", name: "Shelter" },
    { id: "disaster relief", name: "Disaster Relief" },
  ];
  
  const statuses = ["All", "Active", "Completed", "Upcoming"];
  const locations = ["All", "USA", "UK", "Canada", "Global"];
  const sortOptions = ["Newest", "Most Funded", "Ending Soon"];
  const campaignsPerPage = 6;

  const {
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    locationFilter,
    setLocationFilter,
    sortOption,
    setSortOption,
    filteredCampaigns,
    currentCampaigns,
    currentPage,
    setCurrentPage,
    totalPages,
    paginate,
    nextPage,
    prevPage,
    isFilterActive,
  } = useCampaign(campaigns || []);

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
            Campaigns.
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
              onClick={() => fetchCampaigns()}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Filters */}
        {!loading && !error && (
          <>
            <CampaignFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              locationFilter={locationFilter}
              setLocationFilter={setLocationFilter}
              sortOption={sortOption}
              setSortOption={setSortOption}
              categories={categories}
              statuses={statuses}
              locations={locations}
              sortOptions={sortOptions}
            />

            {/* Campaign Count */}
            <div className="mb-6">
              <p className="text-gray-900">
                Showing <span className="font-semibold">{filteredCampaigns.length}</span> campaigns
                {isFilterActive && " with selected filters"}
              </p>
            </div>
          </>
        )}

        {/* Campaign Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentCampaigns.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center col-span-full">
                <i className="fas fa-search text-5xl text-gray-400 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No campaigns found
                </h3>
                <p className="text-gray-900 mb-4">
                  Try adjusting your filters to find more results.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setCategoryFilter("All");
                    setStatusFilter("All");
                    setLocationFilter("All");
                    setCurrentPage(1);
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              currentCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))
            )}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && filteredCampaigns.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={campaignsPerPage}
            setCurrentPage={setCurrentPage}
            paginate={paginate}
            nextPage={nextPage}
            prevPage={prevPage}
            filteredData={currentCampaigns}
          />
        )}
      </main>
    </div>
  );
};

export default Campaigns;