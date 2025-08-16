import React, { useEffect, useState } from "react";
import { usePagination } from "../../../services/Hooks/usePagination";
import Pagination from "../../components/Pagination";
import ParticipationCard from "../../components/Admin/ParticipationCard";

import { useOutletContext } from "react-router-dom";
import {useFetchParticipationRequests} from "../../../core/Admin/usecase/ useFetchParticipationRequests";

const ParticipationRequests = () => {
    const { charity } = useOutletContext();
    const id = charity.id;

    const { fetchParticipationRequests, participationData, loading, error } =
        useFetchParticipationRequests({ id });

    useEffect(() => {
        fetchParticipationRequests();
    }, [id]);

    const {
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        totalPages,
        paginatedData,
    } = usePagination(participationData, 6);

    const [selectedRequest, setSelectedRequest] = useState(null);

    const openCard = (request) => setSelectedRequest(request);
    const closeCard = () => setSelectedRequest(null);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Function to refresh the list
    const refreshRequests = () => {
        fetchParticipationRequests();
    };

    return (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
                    Participation Requests
                </h1>

                <div className="bg-white rounded-lg shadow">
                    <div className="divide-y divide-gray-200">
                        {paginatedData.map((request) => (
                            <div
                                key={request.id}
                                className="p-6 flex items-start justify-between space-x-4"
                            >
                                <div className="flex-1">
                                    <p className="text-base font-bold text-gray-900">
                                        {request.full_name}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Study: {request.study}
                                    </p>
                                    <p className="text-sm text-gray-600">Email: {request.email}</p>
                                    <p className="text-xs text-gray-400 mt-2">
                                        {formatDate(request.created_at)}
                                    </p>
                                </div>

                                <button
                                    onClick={() => openCard(request)}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pagination Component */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    itemsPerPage={itemsPerPage}
                    setCurrentPage={setCurrentPage}
                    setItemsPerPage={setItemsPerPage}
                    filteredData={participationData}
                />
            </div>

            {/* Participation Card Modal */}
            {selectedRequest && (
                <ParticipationCard
                    isOpen={!!selectedRequest}
                    onClose={closeCard}
                    request={selectedRequest}
                    onRefresh={refreshRequests}
                />
            )}
        </div>
    );
};

export default ParticipationRequests;
