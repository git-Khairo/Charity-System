import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useFetchCampaignByCharity } from "../../../core/Campaigns/usecase/useFetchCampaignByCharity";
import { useCampaign } from "../../../core/Campaigns/usecase/useCampaign";
import Pagination from "../../components/Pagination";
import CreateEventModal from "../../components/Admin/CreateEventModal";

const CreateCampaign = () => {
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const { charity } = useOutletContext();
    const charityId = charity.id;

    const { fetchCampaigns, campaigns, loading, error } = useFetchCampaignByCharity({ id: charityId });

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
        paginate,
        nextPage,
        prevPage,
    } = useCampaign(campaigns || []);

    const openCreateModal = () => setIsCreateOpen(true);
    const closeCreateModal = () => {
        setIsCreateOpen(false);
        fetchCampaigns(); // refresh list after creating new campaign
    };

    return (
        <div className="bg-white rounded-lg shadow border border-gray-200 min-h-screen">
            <main className="max-w-4xl mx-auto px-4 py-8">
                {/* Create New Campaign Button */}
                <div className="mb-6 text-right">
                    <button
                        onClick={openCreateModal}
                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-sm"
                    >
                        Create New Campaign
                    </button>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search campaigns..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Loading & Error */}
                {loading && <p className="text-gray-500">Loading campaigns...</p>}
                {error && <p className="text-red-500">Failed to load campaigns.</p>}

                {/* Campaign List */}
                {!loading && !error && currentCampaigns.length > 0 ? (
                    <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
                        {currentCampaigns.map((campaign) => (
                            <div
                                key={campaign.id}
                                className="flex justify-between items-center px-6 py-4 hover:bg-gray-50 transition"
                            >
                                <div>
                                    <h2 className="text-base font-semibold text-gray-900">{campaign.title}</h2>
                                    <p className="text-sm text-gray-600 line-clamp-2">{campaign.description}</p>
                                    <span className="text-xs text-gray-400">
                                        {campaign.updated_at
                                            ? new Date(campaign.updated_at).toLocaleString()
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
                            <h3 className="text-xl font-semibold mb-2">No campaigns found</h3>
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
                {!loading && !error && currentCampaigns.length > 0 && (
                    <div className="mt-6">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            itemsPerPage={itemsPerPage}
                            setCurrentPage={setCurrentPage}
                            setItemsPerPage={setItemsPerPage}
                            paginate={paginate}
                            nextPage={nextPage}
                            prevPage={prevPage}
                            filteredData={campaigns}
                        />
                    </div>
                )}
            </main>

            {/* Create Event Modal */}
            {isCreateOpen && (
                <CreateEventModal
                    charityId={charityId}
                    onClose={closeCreateModal}
                    isOpen={isCreateOpen}
                />
            )}
        </div>
    );
};

export default CreateCampaign;
