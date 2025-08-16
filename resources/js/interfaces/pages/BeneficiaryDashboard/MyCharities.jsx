import {useContext, useEffect, useState} from "react";
import { useFetchCharities } from "../../../core/Charity/usecase/useFetchCharities";
import useCharity from "../../../core/Charity/usecase/useCharity";
import Pagination from "../../components/Pagination";
import {useGetMyCharities} from "../../../core/Beneficiary/usecase/useGetMyCharities";
import {useOutletContext} from "react-router-dom";
import FeedbackModal from "../../components/Benficiry/FeedbackModal";


const MyCharities = () => {
    const { fetchCharities, charities, loading, error } = useGetMyCharities();
    const [selectedCharity, setSelectedCharity] = useState(null);
    const {authUser}=useOutletContext();

    console.log(selectedCharity);

    useEffect(() => {
        fetchCharities();
    }, []);

    const {
        searchTerm,
        setSearchTerm,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        currentCharities,
        totalPages,
        clearFilters,
    } = useCharity(charities || []);

    const handleFeedbackSuccess = (data) => {
        console.log("Feedback submitted successfully:", data);
    };

    return (
        <div className="bg-white rounded-lg shadow border border-gray-200">
            <main className="max-w-4xl mx-auto px-4 py-8">
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

                {/* Loading */}
                {loading && <p className="text-gray-500">Loading charities...</p>}
                {error && (
                    <p className="text-red-500">Failed to load charities. Please try again.</p>
                )}

                {/* Charity List */}
                {!loading && !error && currentCharities.length > 0 ? (
                    <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
                        {currentCharities.map((charity) => (
                            <div
                                key={charity.id}
                                className="flex justify-between items-center px-6 py-4 hover:bg-gray-50 transition"
                            >
                                <div>
                                    <h2 className="text-sm font-semibold text-gray-900">
                                        {charity.name}
                                    </h2>
                                    <p className="text-sm text-gray-600">{charity.description}</p>
                                    <span className="text-xs text-gray-400">
                    {charity.updated_at
                        ? new Date(charity.updated_at).toLocaleString()
                        : "Recently added"}
                  </span>
                                </div>
                                <button
                                    onClick={() => setSelectedCharity(charity)}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
                                >
                                    Give Feedback
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    !loading &&
                    !error && (
                        <div className="bg-white rounded-lg shadow-md p-8 text-center">
                            <i className="fas fa-search text-5xl text-[#a7a7a7] mb-4"></i>
                            <h3 className="text-xl font-semibold mb-2">
                                No charities found
                            </h3>
                            <p className="text-[#000111] mb-4">
                                Try adjusting your search or clear all filters.
                            </p>
                            <button
                                onClick={clearFilters}
                                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )
                )}

                {/* Pagination */}
                {!loading && !error && currentCharities.length > 0 && (
                    <div className="mt-6">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            itemsPerPage={itemsPerPage}
                            setCurrentPage={setCurrentPage}
                            setItemsPerPage={setItemsPerPage}
                            filteredData={charities}
                        />
                    </div>
                )}
            </main>

            {/* Feedback Modal */}
            {selectedCharity && (
                <FeedbackModal
                    isOpen={!!selectedCharity}
                    onClose={() => setSelectedCharity(null)}
                    charityId={selectedCharity.id}
                    beneficiaryId={authUser?.id} // Pass beneficiary_id here
                    url={`/api/beneficiary/feedback/${selectedCharity.id}`} // Dynamic URL
                    onSuccess={handleFeedbackSuccess}
                />
            )}
        </div>
    );
};

export default MyCharities;
