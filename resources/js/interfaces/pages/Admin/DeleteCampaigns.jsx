import { useEffect, useState } from "react";
import { useCampaign } from "../../../core/Campaigns/usecase/useCampaign";
import Pagination from "../../components/Pagination";
import { useGetVolunteerEvents } from "../../../core/Volunteer/usecase/UseGetVolunteerEvents";
import { useOutletContext } from "react-router-dom";
import useDelete from "../../../services/API/useDelete";
import {useFetchCampaignByCharity} from "../../../core/Campaigns/usecase/useFetchCampaignByCharity";


const DeleteCampaigns = () => {

    const { remove, loading: deleteLoading, error: deleteError } = useDelete();
    const [selectedCampaign, setSelectedCampaign] = useState(null); // campaign being deleted
    const { authUser ,charity} = useOutletContext();
    const id=charity.id;
    const { fetchCampaigns, campaigns, loading, error } = useFetchCampaignByCharity({id});

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

    console.log(campaigns);

    const handleDelete = async (campaign) => {
        if (!window.confirm(`Are you sure you want to delete "${campaign.title}"?`)) return;

        try {
            setSelectedCampaign(campaign);
            await remove(`/api/event/delete/${campaign.id}`);
            alert("Event deleted successfully");
            fetchCampaigns(); // refresh the list
        } catch (err) {
            alert("Failed to delete event: " + err.message);
        } finally {
            setSelectedCampaign(null);
        }
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
                {error && <p className="text-red-500">Failed to load campaigns. Please try again.</p>}
                {deleteError && <p className="text-red-500">Delete error: {deleteError}</p>}

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
                                    onClick={() => handleDelete(campaign)}
                                    disabled={deleteLoading && selectedCampaign?.id === campaign.id}
                                    className="px-4 py-2 text-sm font-medium text-white
                             bg-red-600 hover:bg-red-700 rounded-lg shadow-sm disabled:opacity-50"
                                >
                                    {deleteLoading && selectedCampaign?.id === campaign.id
                                        ? "Deleting..."
                                        : "Delete"}
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
                            paginate={paginate}
                            nextPage={nextPage}
                            prevPage={prevPage}
                            filteredData={campaigns}
                        />
                    </div>
                )}
            </main>
        </div>
    );
};

export default DeleteCampaigns;
