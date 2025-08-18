import React, { useState } from "react";
import {
    FiX, FiMail, FiPhone, FiMapPin, FiClock,
    FiHeart, FiBook, FiUsers, FiStar, FiCamera, FiTool, FiCalendar,
    FiCheckCircle, FiXCircle
} from "react-icons/fi";
import usePost from "../../../services/API/usePost";


// Field icons
const fieldIcons = {
    Developmental: <FiStar />,
    Child_care: <FiUsers />,
    Training: <FiBook />,
    Shelter_and_relief: <FiHeart />,
    Events_and_conferences: <FiCalendar />,
    Awareness_campaigns: <FiStar />,
    Elderly_care: <FiUsers />,
    Supporting_women: <FiHeart />,
    Maintenance_technician: <FiTool />,
    field_media_photography: <FiCamera />,
    Administrative_field: <FiStar />,
};

// Field labels
const fieldLabels = {
    Developmental: "Developmental",
    Child_care: "Child Care",
    Training: "Training",
    Shelter_and_relief: "Shelter & Relief",
    Events_and_conferences: "Events & Conferences",
    Awareness_campaigns: "Awareness Campaigns",
    Elderly_care: "Elderly Care",
    Supporting_women: "Supporting Women",
    Maintenance_technician: "Maintenance Technician",
    field_media_photography: "Field Media & Photography",
    Administrative_field: "Administrative Field",
};

// Field categories for color coding
const fieldCategories = {
    Developmental: "education",
    Child_care: "care",
    Training: "education",
    Shelter_and_relief: "care",
    Events_and_conferences: "events",
    Awareness_campaigns: "events",
    Elderly_care: "care",
    Supporting_women: "care",
    Maintenance_technician: "technical",
    field_media_photography: "technical",
    Administrative_field: "technical",
};

// Colors by category
const categoryColors = {
    education: "bg-yellow-100 text-yellow-800",
    care: "bg-pink-100 text-pink-800",
    events: "bg-purple-100 text-purple-800",
    technical: "bg-green-100 text-green-800",
};

const ParticipationCard = ({ isOpen, onClose, request }) => {
    const [status, setStatus] = useState(request.status);
    const { post, loading } = usePost();

    const [popup, setPopup] = useState({ open: false, success: false, message: "" });

    if (!isOpen) return null;

    const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

    const preferredFields = Object.entries(request)
        .filter(([key, value]) => fieldLabels[key] && value === 1)
        .map(([key]) => key);

    const updateStatus = async (newStatus) => {
        try {
            const payload = {
                event_id: request.event_id,
                volunteer_id: request.volunteer_id,
                participation_id: request.id,
                status: newStatus,
            };

            const result = await post(`/api/event/accept_volunteer`, payload);

            if (result) {
                setStatus(newStatus);
                setPopup({
                    open: true,
                    success: true,
                    message: `${request.full_name} has been successfully ${newStatus.toLowerCase()}!`,
                });
            }
        } catch (err) {
            setPopup({
                open: true,
                success: false,
                message: `Something went wrong while updating the request to ${newStatus}. Please try again.`,
            });
        }
    };

    return (
        <>
            {/* Main card */}
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-6 relative animate-fadeIn overflow-y-auto max-h-[90vh]">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                    >
                        <FiX size={24} />
                    </button>

                    <h2 className="text-2xl font-bold mb-4 text-gray-900">{request.full_name}</h2>

                    <div className="space-y-2 text-gray-700">
                        <p className="flex items-center gap-2"><FiMail /> {request.email}</p>
                        <p className="flex items-center gap-2"><FiPhone /> {request.phone_number}</p>
                        <p className="flex items-center gap-2"><FiMapPin /> {request.address}</p>
                        <p><strong>Study:</strong> {request.study}</p>
                        <p><strong>National Number:</strong> {request.national_number}</p>
                        <p><strong>Gender:</strong> {request.gender}</p>
                        <p><strong>Why Charity:</strong> {request.why_charity}</p>
                        <p className="flex items-center gap-2"><FiClock /> <strong>Availability:</strong> {request.availability_for_volunteering}, {request.preferred_time}</p>
                        <p><strong>Status:</strong> {status}</p>
                        <p><strong>Created At:</strong> {formatDate(request.created_at)}</p>
                    </div>

                    {/* Preferred Fields */}
                    <div className="mt-6">
                        <h3 className="font-semibold text-gray-800 mb-3">Preferred Fields</h3>
                        {preferredFields.length > 0 ? (
                            <div className="grid grid-cols-2 gap-4">
                                {preferredFields.map((field, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center gap-2 p-3 rounded-lg shadow-sm hover:scale-105 transition transform ${categoryColors[fieldCategories[field]]}`}
                                    >
                                        <div className="text-xl">{fieldIcons[field]}</div>
                                        <span className="font-medium">{fieldLabels[field]}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No preferred fields selected.</p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex gap-4">
                        <button
                            onClick={() => alert(`Finding ${request.full_name}...`)}
                            className="flex-1 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                        >
                            Find Me
                        </button>

                        <button
                            onClick={() => updateStatus("Accepted")}
                            disabled={loading || status === "Accepted" || status === "Rejected"}
                            className={`flex-1 py-3 rounded-lg shadow transition ${
                                status === "Accepted" || status === "Rejected"
                                    ? "bg-gray-400 text-white cursor-not-allowed"
                                    : "bg-green-600 text-white hover:bg-green-700"
                            }`}
                        >
                            {loading ? "Processing..." : status === "Accepted" ? "Accepted" : "Accept"}
                        </button>

                        <button
                            onClick={() => updateStatus("Rejected")}
                            disabled={loading || status === "Rejected" || status === "Accepted"}
                            className={`flex-1 py-3 rounded-lg shadow transition ${
                                status === "Rejected" || status === "Accepted"
                                    ? "bg-gray-400 text-white cursor-not-allowed"
                                    : "bg-red-600 text-white hover:bg-red-700"
                            }`}
                        >
                            {loading ? "Processing..." : status === "Rejected" ? "Rejected" : "Reject"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Success/Error Popup */}
            {popup.open && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 text-center animate-fadeIn">
                        {popup.success ? (
                            <FiCheckCircle className="text-green-600 text-6xl mx-auto mb-4" />
                        ) : (
                            <FiXCircle className="text-red-600 text-6xl mx-auto mb-4" />
                        )}

                        <h2 className="text-2xl font-bold mb-2">
                            {popup.success ? "Success!" : "Error"}
                        </h2>
                        <p className="text-gray-700 mb-6">{popup.message}</p>

                        <button
                            onClick={() => {
                                setPopup({ ...popup, open: false });
                                window.location.reload();
                            }}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ParticipationCard;
