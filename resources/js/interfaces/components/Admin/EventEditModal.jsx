import React, { useState, useEffect } from 'react';
import usePut from '../../../services/API/usePut';

const EventEditModal = ({ eventId, onClose, initialData }) => {
    const [locationEn, setLocationEn] = useState('');
    const [locationAr, setLocationAr] = useState('');
    const [status, setStatus] = useState('active');
    const [capacity, setCapacity] = useState('');
    const [updateDate, setUpdateDate] = useState('');
    const [error, setError] = useState(null);

    const { put, loading } = usePut();

    // Prefill initial data
    useEffect(() => {
        if (initialData) {
            setLocationEn(initialData.location?.en || '');
            setLocationAr(initialData.location?.ar || '');
            setStatus(initialData.status || 'active');
            setCapacity(initialData.capacity?.toString() || '');
            setUpdateDate(initialData.date || ''); // Only prefill if exists
        }
    }, [initialData]);

    const handleUpdate = async () => {
        const updatedData = {};

        if (locationEn || locationAr) {
            updatedData.location = {};
            if (locationEn) updatedData.location.en = locationEn;
            if (locationAr) updatedData.location.ar = locationAr;
        }

        if (status) updatedData.status = status;

        if (capacity) {
            const capNum = parseInt(capacity);
            if (!isNaN(capNum) && capNum >= 0) updatedData.capacity = capNum;
        }

        // Only include date if user selected a value
        if (updateDate) {
            const dateObj = new Date(updateDate);
            const todayPlus3 = new Date();
            todayPlus3.setDate(todayPlus3.getDate() + 3);

            if (dateObj < todayPlus3) {
                setError('Update date must be at least 3 days from today.');
                return;
            }

            updatedData.date = updateDate;
        }

        try {
            await put(`/api/event/update/${eventId}`, updatedData);
            onClose();
        } catch (err) {
            setError(err?.response?.data?.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div
                className="bg-[#f9f9f9] w-full max-w-lg rounded-lg shadow-lg p-6 relative"
                style={{ fontFamily: 'sans-serif', color: '#000111' }}
            >
                <h2 className="text-[#002366] text-xl font-bold text-center mb-6">
                    Edit Event Details
                </h2>

                {error && (
                    <div className="text-red-600 mb-4 text-center font-semibold">{error}</div>
                )}

                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-sm mb-1 text-right">: الموقع</label>
                        <input
                            type="text"
                            dir="rtl"
                            value={locationAr}
                            onChange={(e) => setLocationAr(e.target.value)}
                            placeholder="أدخل الموقع"
                            className="w-full border border-[#a7a7a7] rounded px-3 py-2 focus:outline-[#97c9ea] text-right"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Location :</label>
                        <input
                            type="text"
                            value={locationEn}
                            onChange={(e) => setLocationEn(e.target.value)}
                            placeholder="Enter location"
                            className="w-full border border-[#a7a7a7] rounded px-3 py-2 focus:outline-[#97c9ea]"
                        />
                    </div>
                </div>

                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-sm mb-1">Event Status:</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full border border-[#a7a7a7] rounded px-3 py-2 focus:outline-[#97c9ea]"
                        >
                            <option value="active">Active</option>
                            <option value="ended">Ended</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Capacity:</label>
                        <input
                            type="number"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            className="w-full border border-[#a7a7a7] rounded px-3 py-2 focus:outline-[#97c9ea]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Update Date:</label>
                        <input
                            type="date"
                            value={updateDate}
                            onChange={(e) => setUpdateDate(e.target.value)}
                            className="w-full border border-[#a7a7a7] rounded px-3 py-2 focus:outline-[#97c9ea]"
                            min={new Date(new Date().setDate(new Date().getDate() + 3))
                                .toISOString()
                                .split('T')[0]}
                        />
                        <small className="text-gray-500 text-xs">
                            Leave empty if you do not want to change the date
                        </small>
                    </div>
                </div>

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
                        {loading ? 'Updating...' : 'Update'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventEditModal;
