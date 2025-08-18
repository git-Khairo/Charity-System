import React, { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { VisibilityIcon } from '../../components/Volunteer/SharedComponents';
import FeedbackModal from '../../components/Volunteer/FeedbackModal';
import { useFeedbackVolunteer } from '../../../core/Volunteer/usecase/useFeedbackVolunteer';
import Pagination from '../../components/Pagination';
import { usePagination } from '../../../services/Hooks/usePagination';

const FeedbackPage = () => {
    const { userContext, authUser } = useOutletContext();
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const { id } = useParams();
    const { fetchFeedbackVolunteer, user, roles, feedbackModels, loading, error } = useFeedbackVolunteer();

    useEffect(() => {
        fetchFeedbackVolunteer();
    }, []);

    // Pagination
    const {
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        totalPages,
        paginatedData,
    } = usePagination(feedbackModels || [], 6);

    useEffect(() => {
        setCurrentPage(1);
    }, [feedbackModels]);

    // Access control
    if (authUser.id !== parseInt(id) || authUser.roles.some(role => role.name !== 'Volunteer')) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <p>Access denied</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <p>Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-red-500">
                <p>Error loading profile: {error}</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <p>No user data available.</p>
            </div>
        );
    }

    if (!feedbackModels || feedbackModels.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <p>No feedbacks available.</p>
            </div>
        );
    }

    return (
        <main className="container mx-auto flex-1 px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6">
                {paginatedData.map((feedback, index) => (
                    <div
                        key={feedback.id || index}
                        className="bg-[#111111] rounded-lg shadow-md p-6 transition-transform duration-150 hover:shadow-lg flex flex-col h-full"
                    >
                        <div className="flex-grow">
                            <p className="text-sm font-medium text-blue-600 mb-2 flex items-center">
                                {/* Replace with a default icon */}
                                <VisibilityIcon className="w-5 h-5 mr-2" />
                                {feedback.title}
                            </p>
                            <h3 className="text-xl font-semibold text-white mb-2">{feedback.title}</h3>
                            <p className="text-sm text-gray-400 line-clamp-3 mb-4">{feedback.description}</p>
                            {feedback.date && <p className="text-xs text-gray-400">{feedback.date}</p>}
                        </div>
                        <div className="mt-6">
                            <button
                                onClick={() => setSelectedFeedback(feedback)}
                                className="w-mid bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl px-4 py-2 text-sm font-medium hover:scale-105 hover:shadow-lg transition-transform duration-150 flex items-center justify-center gap-2"
                            >
                                <VisibilityIcon className="w-5 h-5" />
                                View Full
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
                filteredData={feedbackModels}
            />

            <FeedbackModal
                isOpen={!!selectedFeedback}
                onClose={() => setSelectedFeedback(null)}
                feedback={selectedFeedback}
            />
        </main>
    );
};

export default FeedbackPage;
