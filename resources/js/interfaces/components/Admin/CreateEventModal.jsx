"use client";

import { useState } from "react";
import usePost from "../../../services/API/usePost";
import { RxIconjarLogo } from "react-icons/rx";

export default function CreateEventModal({ isOpen, onClose, charityId }) {
    const [step, setStep] = useState(1);
    const [eventData, setEventData] = useState({
        titleEn: "",
        descriptionEn: "",
        locationEn: "",
        capacity: "",
        date: "",
        titleAr: "",
        descriptionAr: "",
        locationAr: "",
        numOfVolunteers: "",
    });
    const [imageFiles, setImageFiles] = useState([]);
    const [errors, setErrors] = useState({});
    const [uploading, setUploading] = useState(false);
    const { post, loading } = usePost();

    const englishRegex = /^[A-Za-z0-9\s.,'-]+$/;
    const arabicRegex = /^[\u0600-\u06FF\s]+$/;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setImageFiles([...e.target.files]);
    };

    const validateStep = (currentStep) => {
        const stepErrors = {};
        if (currentStep === 1) {
            if (!eventData.titleEn || !englishRegex.test(eventData.titleEn))
                stepErrors.titleEn = "Enter a valid English title";
            if (!eventData.descriptionEn || !englishRegex.test(eventData.descriptionEn))
                stepErrors.descriptionEn = "Enter a valid English description";
            if (!eventData.locationEn || !englishRegex.test(eventData.locationEn))
                stepErrors.locationEn = "Enter a valid English location";
            if (!eventData.capacity || Number(eventData.capacity) < 1)
                stepErrors.capacity = "Capacity must be at least 1";
            if (!eventData.date) stepErrors.date = "Date is required";
            else {
                const selectedDate = new Date(eventData.date);
                const minDate = new Date();
                minDate.setDate(minDate.getDate() + 15);
                if (selectedDate < minDate)
                    stepErrors.date = "Event date must be at least 15 days from today";
            }
            if (imageFiles.length === 0)
                stepErrors.images = "Please upload at least one image";
        } else if (currentStep === 2) {
            if (!eventData.titleAr || !arabicRegex.test(eventData.titleAr))
                stepErrors.titleAr = "أدخل عنوانًا صحيحًا";
            if (!eventData.descriptionAr || !arabicRegex.test(eventData.descriptionAr))
                stepErrors.descriptionAr = "أدخل وصفًا صحيحًا";
            if (!eventData.locationAr || !arabicRegex.test(eventData.locationAr))
                stepErrors.locationAr = "أدخل موقعًا صحيحًا";
        }

        setErrors(stepErrors);
        return Object.keys(stepErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(step)) setStep(step + 1);
    };

    const handleBack = () => setStep(step - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep(step)) return;

        try {
            setUploading(true);

            // Upload images to Laravel
            const uploadedImages = [];
            for (const file of imageFiles) {
                const formData = new FormData();
                formData.append("image", file);
                formData.append("filename", `event_${Date.now()}`);
                formData.append("directory","events")

                const res = await fetch("http://127.0.0.1:8000/api/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!res.ok) {
                    const errData = await res.json();
                    console.error("Upload error:", errData);
                    setErrors({ images: "Image upload failed. Try again." });
                    setUploading(false);
                    return;
                }

                const data = await res.json();
                uploadedImages.push(data.url);
            }

            const payload = {
                charity_id: charityId,
                title: { en: eventData.titleEn, ar: eventData.titleAr },
                description: { en: eventData.descriptionEn, ar: eventData.descriptionAr },
                location: { en: eventData.locationEn, ar: eventData.locationAr },
                images: uploadedImages,
                status: "active",
                capacity: Number(eventData.capacity),
                NumOfVolunteer: Number(eventData.numOfVolunteers) || 0,
                date: eventData.date,
            };

            await post("/api/event/create", payload);
            setUploading(false);
            onClose();
        } catch (err) {
            console.error("Error creating event:", err);
            setUploading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    <RxIconjarLogo className="h-5 w-5" />
                </button>

                <h2 className="text-xl font-semibold mb-2">Create Event</h2>
                <p className="text-gray-500 mb-4">Fill all required fields.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {step === 1 && (
                        <>
                            <input
                                type="text"
                                name="titleEn"
                                placeholder="Title (English)"
                                value={eventData.titleEn}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.titleEn && <p className="text-red-500 text-sm">{errors.titleEn}</p>}

                            <textarea
                                name="descriptionEn"
                                placeholder="Description (English)"
                                value={eventData.descriptionEn}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.descriptionEn && <p className="text-red-500 text-sm">{errors.descriptionEn}</p>}

                            <input
                                type="text"
                                name="locationEn"
                                placeholder="Location (English)"
                                value={eventData.locationEn}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.locationEn && <p className="text-red-500 text-sm">{errors.locationEn}</p>}

                            <input
                                type="number"
                                name="capacity"
                                placeholder="Capacity"
                                value={eventData.capacity}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.capacity && <p className="text-red-500 text-sm">{errors.capacity}</p>}

                            <input
                                type="number"
                                name="numOfVolunteers"
                                placeholder="Number of volunteers"
                                value={eventData.numOfVolunteers}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />

                            <input
                                type="date"
                                name="date"
                                value={eventData.date}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}

                            <input
                                type="file"
                                multiple
                                onChange={handleImageChange}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <input
                                type="text"
                                name="titleAr"
                                placeholder="العنوان"
                                value={eventData.titleAr}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.titleAr && <p className="text-red-500 text-sm">{errors.titleAr}</p>}

                            <textarea
                                name="descriptionAr"
                                placeholder="الوصف"
                                value={eventData.descriptionAr}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.descriptionAr && <p className="text-red-500 text-sm">{errors.descriptionAr}</p>}

                            <input
                                type="text"
                                name="locationAr"
                                placeholder="الموقع"
                                value={eventData.locationAr}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.locationAr && <p className="text-red-500 text-sm">{errors.locationAr}</p>}
                        </>
                    )}

                    <div className="flex justify-between mt-4">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={handleBack}
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Back
                            </button>
                        )}
                        {step < 2 && (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Next
                            </button>
                        )}
                        {step === 2 && (
                            <button
                                type="submit"
                                disabled={loading || uploading}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
                            >
                                {loading || uploading ? "Creating..." : "Create"}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
