import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
    EventIcon,
    VisibilityIcon,
    PollIcon,
    AccessibilityIcon,
    SyncIcon,
    SecurityIcon,
    DesignServicesIcon,
} from '../../components/Volunteer/SharedComponents';
import FeedbackModal from '../../components/Volunteer/FeedbackModal';
import Pagination from '../../components/Pagination';
import { usePagination } from '../../../services/Hooks/usePagination';

const Feedback = () => {
    const { feedbacks, darkMode } = useOutletContext();
    const [selectedFeedback, setSelectedFeedback] = useState(null);

    // Pagination
    const {
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        totalPages,
        paginatedData,
    } = usePagination(feedbacks || [], 5); // 5 feedbacks per page

    useEffect(() => {
        setCurrentPage(1); // Reset page when feedbacks change
    }, [feedbacks]);

    // Icon selector
    const getIcon = (title = '') => {
        const lower = title.toLowerCase();
        if (lower.includes('event')) return <EventIcon className="w-5 h-5 mr-2" />;
        if (lower.includes('poll')) return <PollIcon className="w-5 h-5 mr-2" />;
        if (lower.includes('design')) return <DesignServicesIcon className="w-5 h-5 mr-2" />;
        if (lower.includes('security')) return <SecurityIcon className="w-5 h-5 mr-2" />;
        if (lower.includes('access')) return <AccessibilityIcon className="w-5 h-5 mr-2" />;
        return <SyncIcon className="w-5 h-5 mr-2" />;
    };

    return (
        <section
            className="rounded-xl shadow p-6"
            style={{
                backgroundColor: darkMode ? '#1e293b' : 'white',
                color: darkMode ? '#f1f5f9' : '#1f2937',
            }}
        >
            <h2 className="text-2xl font-bold mb-6">My Feedback</h2>

            <div className="flex flex-col gap-6">
                {paginatedData.length === 0 ? (
                    <p className="text-gray-500 text-center">No feedbacks available.</p>
                ) : (
                    paginatedData.map((feedback, index) => (
                        <div
                            key={feedback.id || index}
                            className={`rounded-2xl p-6 flex flex-col justify-between shadow-lg hover:shadow-xl transition duration-300 border ${
                                darkMode
                                    ? 'bg-[#1f2937] border-gray-700 text-gray-100'
                                    : 'bg-white border-gray-200 text-gray-800'
                            }`}
                        >
                            <div>
                                <p className="text-sm font-medium text-blue-600 mb-2 flex items-center">
                                    {getIcon(feedback.title)}
                                    {feedback.title || 'Untitled Feedback'}
                                </p>

                                <h3 className="text-xl font-semibold mb-2">{feedback.title}</h3>
                                <p className="text-sm opacity-80 mb-4">{feedback.description}</p>
                                {feedback.date && (
                                    <p className="text-xs text-gray-400">{feedback.created_at}</p>
                                )}
                            </div>

                            <div className="mt-6">
                                <button
                                    onClick={() => setSelectedFeedback(feedback)}
                                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl px-4 py-2 text-sm font-medium hover:scale-105 hover:shadow-lg transition-transform duration-150 flex items-center justify-center gap-2"
                                >
                                    <VisibilityIcon className="w-5 h-5" />
                                    View Full
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-6 flex justify-center">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        itemsPerPage={itemsPerPage}
                        setCurrentPage={setCurrentPage}
                        setItemsPerPage={setItemsPerPage}
                        filteredData={feedbacks}
                    />
                </div>
            )}

            <FeedbackModal
                isOpen={!!selectedFeedback}
                onClose={() => setSelectedFeedback(null)}
                feedback={selectedFeedback}
            />
        </section>
    );
};

export default Feedback;
