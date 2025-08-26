import React, { useState } from "react";
import {
    FiX, FiMail, FiPhone, FiMapPin, FiClock,
    FiUsers, FiCheckCircle, FiXCircle, FiInfo, FiHome, FiBriefcase
} from "react-icons/fi";
import usePost from "../../../services/API/usePost";

const RequestCard = ({ isOpen, onClose, request }) => {
    const [status, setStatus] = useState(request.status);
    const { post, loading } = usePost();
    const [popup, setPopup] = useState({ open: false, success: false, message: "" });

    if (!isOpen) return null;

    const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

    const updateStatus = async (newStatus) => {
        try {
            const payload = {
                request_id: request.id,
                charity_id: request.charity_id,
                beneficiary_id: request.beneficiary_id,
                status: newStatus,
            };

            const result = await post(`/api/event/accept_beneficiary`, payload);

            if (result) {
                setStatus(newStatus);
                setPopup({
                    open: true,
                    success: true,
                    message: `${request.full_name}'s request has been ${newStatus.toLowerCase()}!`,
                });
            }
        } catch (err) {
            setPopup({
                open: true,
                success: false,
                message: `Failed to update request to ${newStatus}. Please try again.`,
            });
        }
    };

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 backdrop-blur-sm">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative animate-fadeIn overflow-y-auto max-h-[90vh]">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                    >
                        <FiX size={24} />
                    </button>

                    {/* Header */}
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">
                        {request.full_name}
                    </h2>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                        <p className="flex items-center gap-2"><FiMail /> {request.email}</p>
                        <p className="flex items-center gap-2"><FiPhone /> {request.phonenumber}</p>
                        <p className="flex items-center gap-2"><FiMapPin /> {request.address}</p>
                        <p className="flex items-center gap-2"><FiClock /> Applied: {formatDate(request.created_at)}</p>
                        <p className="flex items-center gap-2"><FiBriefcase /> Work: {request.workStatus}</p>
                        <p className="flex items-center gap-2"><FiUsers /> FamilyMembers: {request.numOfMembers}</p>
                        <p className="flex items-center gap-2"><FiHome /> Marital: {request.maritalStatus}</p>
                        <p className="flex items-center gap-2"><FiInfo /> Needs: {request.needs}</p>
                    </div>

                    {/* Details */}
                    <div className="mt-4 bg-gray-50 p-4 rounded-lg border text-gray-800">
                        <h3 className="font-semibold mb-2">Details</h3>
                        <p className="text-sm leading-relaxed">{request.details}</p>
                    </div>

                    {/* Status */}
                    <div className="mt-4">
                        <p className="text-gray-600"><strong>Status:</strong>
                            <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium
                ${status === "Accepted" ? "bg-green-100 text-green-700" :
                                status === "Rejected" ? "bg-red-100 text-red-700" :
                                    "bg-yellow-100 text-yellow-700"}`}>
                {status}
              </span>
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex gap-4">
                        <button
                            onClick={() => updateStatus("Accepted")}
                            disabled={loading || status === "Accepted" || status === "Rejected"}
                            className={`flex-1 py-3 rounded-lg shadow transition ${
                                status === "Accepted" || status === "Rejected"
                                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
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
                                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                    : "bg-red-600 text-white hover:bg-red-700"
                            }`}
                        >
                            {loading ? "Processing..." : status === "Rejected" ? "Rejected" : "Reject"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Popup */}
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
                                window.location.reload(); // 🔄 refresh the page
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

export default RequestCard;
