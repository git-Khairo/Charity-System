import React, { useState, useEffect } from "react";
import usePut from "../../../services/API/usePut";

const EventPhotoEditModal = ({ eventId, initialData, onClose }) => {
    const [files, setFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [error, setError] = useState(null);

    const { put, loading } = usePut();

    // ✅ Parse initialData images
    useEffect(() => {
        if (initialData?.images?.length > 0) {
            try {
                // Backend sends like: ["[\"/storage/events/event1.jpeg\",\"/storage/events/event2.jpeg\"]"]
                const parsed = JSON.parse(initialData.images[0]);
                setExistingImages(parsed || []);
            } catch (e) {
                console.error("Failed to parse images:", e);
                setExistingImages([]);
            }
        }
    }, [initialData]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
        setPreviewUrls(selectedFiles.map((file) => URL.createObjectURL(file)));
    };

    const handleRemoveExisting = (url) => {
        setExistingImages((prev) => prev.filter((img) => img !== url));
    };

    const handleUpdate = async () => {
        if (files.length === 0 && existingImages.length === 0) {
            setError("Please keep at least one photo.");
            return;
        }
        setError(null);

        try {
            const uploadedUrls = [];

            for (const file of files) {
                const formData = new FormData();
                formData.append("image", file);
                formData.append("filename", file.name);
                formData.append("directory", "events");

                const res = await fetch("http://127.0.0.1:8000/api/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!res.ok) throw new Error("Upload failed");
                const data = await res.json();

                uploadedUrls.push(data.url);
            }

            // ✅ Final images = existing kept ones + newly uploaded
            const updatedImages = [...existingImages, ...uploadedUrls];

            // ✅ Store in required format: ["[\"/storage/events/1.jpeg\",\"/storage/events/2.jpeg\"]"]
            const formattedImages = [JSON.stringify(updatedImages)];

            await put(`/api/event/update/${eventId}`, { images: formattedImages });

            onClose();
        } catch (err) {
            setError(err?.response?.data?.message || err.message || "Something went wrong.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-[#f9f9f9] w-full max-w-lg rounded-lg shadow-lg p-6 relative">
                <h2 className="text-[#002366] text-xl font-bold text-center mb-6">
                    Update Event Photos
                </h2>

                {error && <div className="text-red-600 mb-4 text-center font-semibold">{error}</div>}

                <input type="file" multiple onChange={handleFileChange} className="mb-4 w-full" />

                {/* Previews of new uploads */}
                {previewUrls.length > 0 && (
                    <>
                        <h3 className="text-sm font-semibold mb-2">New Photos:</h3>
                        <div className="grid grid-cols-3 gap-2 mb-4">
                            {previewUrls.map((url, idx) => (
                                <img
                                    key={idx}
                                    src={url}
                                    alt="preview"
                                    className="w-full h-24 object-cover rounded"
                                />
                            ))}
                        </div>
                    </>
                )}

                {/* Existing images with remove option */}
                {existingImages.length > 0 && (
                    <>
                        <h3 className="text-sm font-semibold mb-2">Existing Photos:</h3>
                        <div className="grid grid-cols-3 gap-2 mb-4">
                            {existingImages.map((url, idx) => (
                                <div key={idx} className="relative">
                                    <img
                                        src={url}
                                        alt="existing"
                                        className="w-full h-24 object-cover rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveExisting(url)}
                                        className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="bg-gray-200 text-[#000111] px-5 py-2 rounded hover:bg-gray-300 transition"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdate}
                        disabled={loading}
                        className="bg-[#002366] text-white px-6 py-2 rounded hover:bg-[#3751a5] transition disabled:opacity-50"
                    >
                        {loading ? "Updating..." : "Update"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventPhotoEditModal;
