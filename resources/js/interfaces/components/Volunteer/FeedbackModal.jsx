import React from 'react';
import { CloseIcon } from './SharedComponents';

const FeedbackModal = ({ isOpen, onClose, feedback }) => {
    if (!isOpen || !feedback) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
            <div className="bg-light-background rounded-2xl p-8 shadow-2xl w-full max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-black">{feedback.title}</h2>
                    <button
                        onClick={onClose}
                        aria-label="Close modal"
                        className="text-black hover:text-white"
                    >
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="mb-6">
                    {/* Using description here since fullDescription doesn't exist */}
                    <p className="text-lg text-white">{feedback.description}</p>
                </div>
                <div className="border-t border-gray-700 pt-4">
                    <div className="flex items-center justify-between text-sm text-gray-400">
                        {/* relatedEvent is not in model, so "N/A" */}
                        <p>
                            <strong>Related Event:</strong> N/A
                        </p>
                        <p>
                            <strong>Date:</strong> {feedback.date || 'N/A'}
                        </p>
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                            style={{ backgroundImage: `url("${feedback.avatarUrl}")` }}
                        />
                        <div>
                            <p className="font-semibold text-white">{feedback.author}</p>
                            <p className="text-sm text-gray-400">{feedback.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackModal;
