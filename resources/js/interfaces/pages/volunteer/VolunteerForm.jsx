import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useVolunteerForm from "../../../core/Volunteer/usecase/useVolunteerForm";



const VolunteerForm = ({ eventId, onSuccess, onClose, isOpen }) => {
    const { formData, handleChange, handleCheckboxChange, handleSubmit, errors, loading } =
        useVolunteerForm();
    const [message, setMessage] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        setMessage(null);

        try {
            await handleSubmit(eventId);
            setMessage({
                type: "success",
                text: "Your volunteer request was submitted successfully!",
            });

            if (onSuccess) {
                setTimeout(() => onSuccess(), 2000);
            }
        } catch (err) {
            setMessage({
                type: "error",
                text: err?.message || errors?.server || "Something went wrong. Please try again.",
            });
        }
    };

    // Auto-clear messages after 5 seconds
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const skillsList = [
        "Developmental",
        "Child_care",
        "Training",
        "Shelter_and_relief",
        "Events_and_conferences",
        "Awareness_campaigns",
        "Elderly_care",
        "Supporting_women",
        "Maintenance_technician",
        "field_media_photography",
        "Administrative_field",
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:w-[600px] max-h-[95vh] overflow-y-auto absolute bottom-0 sm:relative sm:bottom-auto"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
                        >
                            ✕
                        </button>

                        {/* Toast Messages */}
                        <AnimatePresence>
                            {message && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-lg shadow-lg text-white ${
                                        message.type === "success" ? "bg-green-500" : "bg-red-500"
                                    }`}
                                >
                                    {message.text}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form
                            onSubmit={submitHandler}
                            className="space-y-6 p-6 sm:p-10 flex flex-col"
                        >
                            <h2 className="text-2xl sm:text-3xl font-bold text-[#002366] text-center mb-6">
                                Volunteer Registration
                            </h2>

                            {/* National Number */}
                            <div>
                                <label htmlFor="national_number" className="block text-sm font-medium mb-1">
                                    National Number
                                </label>
                                <input
                                    type="text"
                                    id="national_number"
                                    name="national_number"
                                    value={formData.national_number}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#002366] focus:outline-none"
                                />
                            </div>

                            {/* Gender */}
                            <div>
                                <label htmlFor="gender" className="block text-sm font-medium mb-1">
                                    Gender
                                </label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#002366] focus:outline-none"
                                >
                                    <option value="">-- Select --</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            {/* Why Charity */}
                            <div>
                                <label htmlFor="why_charity" className="block text-sm font-medium mb-1">
                                    Why Charity?
                                </label>
                                <textarea
                                    id="why_charity"
                                    name="why_charity"
                                    value={formData.why_charity}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#002366] focus:outline-none"
                                />
                            </div>

                            {/* Availability */}
                            <div>
                                <label htmlFor="availability_for_volunteering" className="block text-sm font-medium mb-1">
                                    Availability for Volunteering
                                </label>
                                <input
                                    type="text"
                                    id="availability_for_volunteering"
                                    name="availability_for_volunteering"
                                    value={formData.availability_for_volunteering}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#002366] focus:outline-none"
                                />
                            </div>

                            {/* Preferred Time */}
                            <div>
                                <label htmlFor="preferred_time" className="block text-sm font-medium mb-1">
                                    Preferred Time
                                </label>
                                <input
                                    type="text"
                                    id="preferred_time"
                                    name="preferred_time"
                                    value={formData.preferred_time}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#002366] focus:outline-none"
                                />
                            </div>

                            {/* Skills */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Skills / Interests
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                                    {skillsList.map((skill) => {
                                        const isChecked = formData.skills.includes(skill);
                                        return (
                                            <label
                                                key={skill}
                                                htmlFor={skill}
                                                className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition text-sm ${
                                                    isChecked
                                                        ? "bg-blue-100 border-blue-500 text-blue-900"
                                                        : "bg-white border-gray-300"
                                                }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    id={skill}
                                                    name={skill}
                                                    checked={isChecked}
                                                    onChange={handleCheckboxChange}
                                                    className="sr-only"
                                                />
                                                <span className="w-4 h-4 flex items-center justify-center border rounded bg-white">
                          {isChecked && <span className="w-2 h-2 bg-blue-600 rounded-sm"></span>}
                        </span>
                                                {skill.replace(/_/g, " ")}
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#002366] hover:bg-[#001a4d] text-white py-3 px-6 rounded-lg font-semibold transition mt-4"
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default VolunteerForm;
