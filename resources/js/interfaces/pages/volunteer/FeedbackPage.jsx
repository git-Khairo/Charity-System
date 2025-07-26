import React, { useState, useEffect } from 'react';
import {useOutletContext, useParams} from 'react-router-dom';

import { EventIcon, SyncIcon, AccessibilityIcon, PollIcon, SecurityIcon, DesignServicesIcon, VisibilityIcon } from '../../components/Volunteer/SharedComponents';
import FeedbackModal from '../../components/Volunteer/FeedbackModal';
import {useFeedbackVolunteer} from "../../../core/Volunteer/usecase/useFeedbackVolunteer";

const FeedbackPage = () => {
    const {userContext,authUser} = useOutletContext();
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const { id } = useParams();
    // Assuming userContext has an id for fetching
    const { fetchFeedbackVolunteer, user,roles,feedbackModels, loading, error } = useFeedbackVolunteer();

    useEffect(() => {
            fetchFeedbackVolunteer();
    }, []);

    // Map the feedbackModels to include a default icon (since your API doesn't send eventIcon)
    // You can replace this icon with something dynamic if you have a mapping between events and icons
    //console.log(user);

    if (authUser.id!==parseInt(id) || authUser.roles.some(role => role.name !== 'Volunteer')){
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <p>Fuck off.....</p>
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

    // Error state
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-red-500">
                <p>Error loading profile: {error}</p>
            </div>
        );
    }

    // If user is null (just in case)
    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <p>No user data available.</p>
            </div>
        );
    }


    return (
        <main className="container mx-auto flex-1 px-4 py-8 sm:px-6 lg:px-8">
            {loading && <p className="text-white">Loading feedbacks...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {!loading && !error && (
                <div className="flex flex-col gap-6">
                    {feedbackModels.length === 0 && (
                        <p className="text-gray-400">No feedbacks available.</p>
                    )}
                    {feedbackModels.map((feedback, index) => (
                        <div
                            key={feedback.id || index}
                            className="bg-[#111111] rounded-lg shadow-md p-6 transition-transform duration-150 hover:shadow-lg flex flex-col h-full"
                        >
                            <div className="flex-grow">
                                <p className="text-sm font-medium text-blue-600 mb-2 flex items-center">
                                    <defaultIcon className="w-5 h-5 mr-2" />
                                    {/* Using author name as event name fallback */}
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
            )}
            <FeedbackModal
                isOpen={!!selectedFeedback}
                onClose={() => setSelectedFeedback(null)}
                feedback={selectedFeedback}
            />
        </main>
    );
};

export default FeedbackPage;
