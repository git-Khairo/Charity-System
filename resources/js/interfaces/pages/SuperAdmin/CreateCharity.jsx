import React, { useState, useEffect } from "react";
import useGet from "../../../services/API/useGet";
import { usePagination } from "../../../services/Hooks/usePagination";
import CreateCharityModal from "../../components/SuperaAdmin/CreateCharityModal";

const CreateCharity = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { get, loading, error } = useGet();
  const [charities, setCharities] = useState([]);
  const [filteredCharities, setFilteredCharities] = useState([]);

  // Use the provided usePagination hook
  const { currentPage, totalPages, paginatedData, paginate, nextPage, prevPage } = usePagination(
    filteredCharities,
    6
  );

  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const response = await get("/api/charities");
        if (!response?.charities) {
          throw new Error("No charity data received");
        }
        setCharities(response.charities);
        setFilteredCharities(response.charities);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchCharities();
  }, []);

  console.log(charities);

  useEffect(() => {
    const filtered = charities.filter(
      (charity) =>
        charity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (charity.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        charity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (charity.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredCharities(filtered);
  }, [searchTerm, charities]);

  const openCreateModal = () => setIsCreateOpen(true);
  const closeCreateModal = () => {
    setIsCreateOpen(false);
    // Refresh charity list after creation
    const fetchCharities = async () => {
      try {
        const response = await get("/api/charities");
        if (!response?.data) {
          throw new Error("No charity data received");
        }
        setCharities(response.data);
        setFilteredCharities(response.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchCharities();
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilteredCharities(charities);
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 min-h-screen">
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Create New Charity Button */}
        <div className="mb-6 text-right">
          <button
            onClick={openCreateModal}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-sm"
          >
            Create New Charity
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search charities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Loading & Error */}
        {loading && <p className="text-gray-500">Loading charities...</p>}
        {error && <p className="text-red-500">Failed to load charities.</p>}

        {/* Charity List */}
        {!loading && !error && paginatedData.length > 0 ? (
          <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
            {paginatedData.map((charity) => (
              <div
                key={charity.id}
                className="flex justify-between items-center px-6 py-4 hover:bg-gray-50 transition"
              >
                <div>
                  <h2 className="text-base font-semibold text-gray-900">{charity.name}</h2>
                  <p className="text-sm text-gray-600 line-clamp-2">{charity.description}</p>
                  <span className="text-xs text-gray-400">
                    {charity.created_at
                      ? new Date(charity.updated_at).toLocaleString()
                      : "Recently added"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading &&
          !error && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No charities found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or clear filters.</p>
              <button
                onClick={clearFilters}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition"
              >
                Clear Filters
              </button>
            </div>
          )
        )}

        {/* Pagination */}
        {!loading && !error && paginatedData.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Previous
            </button>
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => paginate(page)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </main>

      {/* Create Charity Modal */}
      {isCreateOpen && <CreateCharityModal isOpen={isCreateOpen} onClose={closeCreateModal} />}
    </div>
  );
};

export default CreateCharity;