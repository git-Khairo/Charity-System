import React, { useState } from "react";
import { FiX, FiMail, FiPhone, FiMapPin, FiClock, FiHeart, FiBook, FiUsers, FiStar, FiCamera, FiTool, FiCalendar } from "react-icons/fi";

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

const ParticipationCard = () => {
    const [isOpen, setIsOpen] = useState(false);

    const request = {
        id: 1,
        full_name: "Jane Doe",
        phone_number: "1234567890",
        address: "123 Main Street, Springfield",
        email: "janedoe@example.com",
        study: "Bachelor of Science in Nursing",
        national_number: "A1234567",
        gender: "male",
        why_charity: "I love helping people.",
        availability_for_volunteering: "Weekends",
        preferred_time: "Morning",
        Developmental: 0,
        Child_care: 1,
        Training: 1,
        Shelter_and_relief: 0,
        Events_and_conferences: 0,
        Awareness_campaigns: 1,
        Elderly_care: 0,
        Supporting_women: 0,
        Maintenance_technician: 0,
        field_media_photography: 0,
        Administrative_field: 0,
        status: "pending",
        created_at: "2025-08-15T21:16:45.000000Z",
    };

    const formatDate = (dateString) =>
        new Date(dateString).toLocaleDateString();

    const preferredFields = Object.entries(request)
        .filter(([key, value]) => fieldLabels[key] && value === 1)
        .map(([key]) => key);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <button
                onClick={() => setIsOpen(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            >
                View Participation Details
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-6 relative animate-fadeIn overflow-y-auto max-h-[90vh]">
                        <button
                            onClick={() => setIsOpen(false)}
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
                            <p><strong>Status:</strong> {request.status}</p>
                            <p><strong>Created At:</strong> {formatDate(request.created_at)}</p>
                        </div>

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

                        <button
                            onClick={() => alert(`Finding ${request.full_name}...`)}
                            className="mt-6 w-full py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                        >
                            Find Me #
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ParticipationCard;
