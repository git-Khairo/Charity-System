import { useEffect, useState } from "react";
import { useCampaign } from "../../../core/Campaigns/usecase/useCampaign";
import Pagination from "../../components/Pagination";
 // fixed path
import { useGetVolunteerEvents } from "../../../core/Volunteer/usecase/UseGetVolunteerEvents";
import { useOutletContext } from "react-router-dom";
import FeedbackModal from "../../components/Benficiry/FeedbackModal";



const MyCampaigns = () => {
    const { fetchCampaigns, campaigns, loading, error } = useGetVolunteerEvents();
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const { authUser } = useOutletContext();



    useEffect(() => {
        fetchCampaigns();
    }, []);

    const {
        searchTerm,
        setSearchTerm,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        currentCampaigns,
        totalPages,
        clearFilters,
    } = useCampaign(campaigns || []);

    const handleFeedbackSuccess = (data) => {
        console.log("Feedback submitted successfully:", data);
        setSelectedCampaign(null); // close modal after success
    };

    return (
        <div className="bg-white rounded-lg shadow border border-gray-200 min-h-screen">
            <main className="max-w-4xl mx-auto px-4 py-8">

                {/* Search */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search campaigns..."
                        aria-label="Search campaigns"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Loading & Error */}
                {loading && <p className="text-gray-500">Loading campaigns...</p>}
                {error && (
                    <p className="text-red-500">
                        Failed to load campaigns. Please try again.
                    </p>
                )}

                {/* Campaign List */}
                {!loading && !error && currentCampaigns.length > 0 ? (
                    <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
                        {currentCampaigns.map((campaign) => (
                            <div
                                key={campaign.id}
                                className="flex justify-between items-center px-6 py-4 hover:bg-gray-50 transition"
                            >
                                <div>
                                    <h2 className="text-base font-semibold text-gray-900">
                                        {campaign.title}
                                    </h2>
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        {campaign.description}
                                    </p>
                                    <span className="text-xs text-gray-400">
                    {campaign.updated_at
                        ? new Date(campaign.updated_at).toLocaleString()
                        : "Recently added"}
                  </span>
                                </div>
                                <button
                                    onClick={() => setSelectedCampaign(campaign)}
                                    className="px-4 py-2 text-sm font-medium text-white
                             bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
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
                            <i className="fas fa-search text-5xl text-gray-400 mb-4"></i>
                            <h3 className="text-xl font-semibold mb-2">No campaigns found</h3>
                            <p className="text-gray-600 mb-4">
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
                {!loading && !error && currentCampaigns.length > 0 && (
                    <div className="mt-6">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            itemsPerPage={itemsPerPage}
                            setCurrentPage={setCurrentPage}
                            setItemsPerPage={setItemsPerPage}
                            filteredData={campaigns}
                        />
                    </div>
                )}
            </main>

            {/* Feedback Modal */}
            {selectedCampaign && (
                <FeedbackModal
                    isOpen={!!selectedCampaign}
                    onClose={() => setSelectedCampaign(null)}
                    eventId={selectedCampaign.id}
                    beneficiaryId={authUser?.id}
                    url="/api/feedback"
                    onSuccess={handleFeedbackSuccess}
                />
            )}
        </div>
    );
};

export default MyCampaigns;
