import { useEffect } from "react";
import Pagination from "../components/Pagination";
import useCharity from "../../core/Charity/usecase/useCharity";
import CharityFilters from "../components/Charity/CharityFilters";
import CharityCard from "../components/Charity/CharityCard";
import { useFetchCharities } from "../../core/Charity/usecase/useFetchCharities";

const Charities = () => {
  const { fetchCharities, charities, loading, error } = useFetchCharities();

  useEffect(() => {
    fetchCharities();
  }, []);

  // Charity categories
  const categories = [
    { id: "all", name: "All Categories" },
    { id: "education", name: "Education" },
    { id: "health", name: "Health" },
    { id: "environment", name: "Environment" },
    { id: "food", name: "Food & Hunger" },
    { id: "shelter", name: "Shelter" },
    { id: "disaster relief", name: "Disaster Relief" },
  ];

  console.log(charities);

  // Sort options
  const sortOptions = [
    { id: "newest", name: "Newest First" },
    { id: "az", name: "Name (A-Z)" },
    { id: "za", name: "Name (Z-A)" },
  ];

  const {
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    isCategoryDropdownOpen,
    setIsCategoryDropdownOpen,
    isSortDropdownOpen,
    setIsSortDropdownOpen,
    searchTerm,
    setSearchTerm,
    filteredCharities,
    currentCharities,
    totalPages,
    clearFilters,
    isFilterActive,
  } = useCharity(charities || []); // Fallback to empty array

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
        {!loading && !error && (
          <CharityFilters
            categories={categories}
            sortOptions={sortOptions}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isCategoryDropdownOpen={isCategoryDropdownOpen}
            setIsCategoryDropdownOpen={setIsCategoryDropdownOpen}
            isSortDropdownOpen={isSortDropdownOpen}
            setIsSortDropdownOpen={setIsSortDropdownOpen}
            clearFilters={clearFilters}
            isFilterActive={isFilterActive}
            setCurrentPage={setCurrentPage}
          />
        )}

        {!loading && !error && (
          <div className="mb-6">
            <p className="text-[#000111]">
              Showing <span className="font-semibold">{filteredCharities.length}</span> charities
              {isFilterActive && " with selected filters"}
            </p>
          </div>
        )}

        {!loading && !error && currentCharities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentCharities.map((charity) => (
              <CharityCard
                key={charity.id}
                charity={charity}
                categories={categories}
              />
            ))}
          </div>
        ) : !loading && !error ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <i className="fas fa-search text-5xl text-[#a7a7a7] mb-4"></i>
            <h3 className="text-xl font-semibold text-[#旁的#000111] mb-2">
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
        ) : null}

        {/* Pagination */}
        {!loading && !error && filteredCharities.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
            setItemsPerPage={setItemsPerPage}
            filteredData={filteredCharities}
          />
        )}
      </main>
    </div>
  );
};

export default Charities;