import React, { useState } from 'react';
import usePut from "../../../services/API/usePut";


const UpdateCharity = ({ onClose, charityId, show }) => { // changed 'showPopup' to 'show'
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        nameEn: '',
        addressEn: '',
        descEn: '',
        nameAr: '',
        addressAr: '',
        descAr: '',
    });
    const [errors, setErrors] = useState({});
    const [popup, setPopup] = useState({ message: '', type: '' });
    const { put, loading } = usePut();

    const englishRegex = /^[A-Za-z0-9\s.,'-]*$/;
    const arabicRegex = /^[\u0600-\u06FF\s.,'-]*$/;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        if (name.endsWith('En')) {
            if (value && !englishRegex.test(value)) {
                setErrors((prev) => ({ ...prev, [name]: 'Must be in English' }));
            } else {
                setErrors((prev) => {
                    const { [name]: removed, ...rest } = prev;
                    return rest;
                });
            }
        } else if (name.endsWith('Ar')) {
            if (value && !arabicRegex.test(value)) {
                setErrors((prev) => ({ ...prev, [name]: 'يجب أن يكون بالعربية' }));
            } else {
                setErrors((prev) => {
                    const { [name]: removed, ...rest } = prev;
                    return rest;
                });
            }
        }
    };

    const handleSubmit = async () => {
        if (Object.keys(errors).length > 0) return;

        const payload = { name: {}, address: {}, description: {} };

        if (form.nameEn) payload.name.en = form.nameEn;
        if (form.nameAr) payload.name.ar = form.nameAr;
        if (form.addressEn) payload.address.en = form.addressEn;
        if (form.addressAr) payload.address.ar = form.addressAr;
        if (form.descEn) payload.description.en = form.descEn;
        if (form.descAr) payload.description.ar = form.descAr;

        try {
            await put(`/api/charity/update/${charityId}`, payload);
            setPopup({ message: 'Charity updated successfully!', type: 'success' });
            setTimeout(() => onClose(), 1500);
        } catch (err) {
            if (err.data && err.data.errors) {
                const validationErrors = {};
                for (const key in err.data.errors) {
                    validationErrors[key] = err.data.errors[key][0];
                }
                setErrors(validationErrors);
                setPopup({ message: 'Please fix the validation errors.', type: 'error' });
            } else {
                setPopup({ message: err.message || 'Unknown error', type: 'error' });
            }
        }
    };

    if (!show) return null; // <-- only render modal when 'show' is true

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-xl rounded-lg shadow-lg p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-secondary text-2xl font-bold hover:text-primary"
                >
                    &times;
                </button>

                {step === 2 && (
                    <button
                        onClick={() => setStep(1)}
                        className="absolute top-3 left-4 text-secondary hover:text-primary text-xl font-bold"
                    >
                        ←
                    </button>
                )}

                <h2 className="text-primary text-xl font-bold text-center mb-4">
                    Modify Charity Details
                </h2>

                <div className="flex justify-center items-center space-x-2 mb-6">
                    <span className={`w-2 h-2 rounded-full ${step === 1 ? 'bg-primary' : 'bg-secondary'}`}></span>
                    <span className={`w-2 h-2 rounded-full ${step === 2 ? 'bg-primary' : 'bg-secondary'}`}></span>
                </div>

                {step === 1 ? (
                    <div className="space-y-4 text-text">
                        <div>
                            <label className="block mb-1 text-sm">Name :</label>
                            <input
                                type="text"
                                name="nameEn"
                                value={form.nameEn}
                                onChange={handleChange}
                                className="w-full border border-secondary rounded px-3 py-2 focus:outline-accent"
                                placeholder="Name Association"
                            />
                            {errors.nameEn && <p className="text-red-500 text-sm">{errors.nameEn}</p>}
                        </div>
                        <div>
                            <label className="block mb-1 text-sm">Title :</label>
                            <input
                                type="text"
                                name="addressEn"
                                value={form.addressEn}
                                onChange={handleChange}
                                className="w-full border border-secondary rounded px-3 py-2 focus:outline-accent"
                                placeholder="Title Association"
                            />
                            {errors.addressEn && <p className="text-red-500 text-sm">{errors.addressEn}</p>}
                        </div>
                        <div>
                            <label className="block mb-1 text-sm">Description :</label>
                            <textarea
                                name="descEn"
                                value={form.descEn}
                                onChange={handleChange}
                                rows="3"
                                className="w-full border border-secondary rounded px-3 py-2 focus:outline-accent"
                                placeholder="Describe the association..."
                            />
                            {errors.descEn && <p className="text-red-500 text-sm">{errors.descEn}</p>}
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setStep(2)}
                                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4 text-text text-right">
                        <div>
                            <label className="block mb-1 text-sm">: اسم الجمعية</label>
                            <input
                                type="text"
                                name="nameAr"
                                value={form.nameAr}
                                onChange={handleChange}
                                className="w-full border border-secondary rounded px-3 py-2 focus:outline-accent text-right"
                                placeholder="اسم الجمعية"
                            />
                            {errors.nameAr && <p className="text-red-500 text-sm">{errors.nameAr}</p>}
                        </div>
                        <div>
                            <label className="block mb-1 text-sm">: العنوان</label>
                            <input
                                type="text"
                                name="addressAr"
                                value={form.addressAr}
                                onChange={handleChange}
                                className="w-full border border-secondary rounded px-3 py-2 focus:outline-accent text-right"
                                placeholder="عنوان الجمعية"
                            />
                            {errors.addressAr && <p className="text-red-500 text-sm">{errors.addressAr}</p>}
                        </div>
                        <div>
                            <label className="block mb-1 text-sm">: الوصف</label>
                            <textarea
                                name="descAr"
                                value={form.descAr}
                                onChange={handleChange}
                                rows="3"
                                className="w-full border border-secondary rounded px-3 py-2 focus:outline-accent text-right"
                                placeholder="وصف الجمعية"
                            />
                            {errors.descAr && <p className="text-red-500 text-sm">{errors.descAr}</p>}
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={onClose}
                                className="bg-gray-200 text-gray-700 px-5 py-2 rounded hover:bg-gray-300 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={Object.keys(errors).length > 0 || loading}
                                className={`px-6 py-2 rounded text-white transition-colors duration-200 ${
                                    loading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >
                                {loading ? 'Updating...' : 'Update'}
                            </button>
                        </div>
                    </div>
                )}

                {popup.message && (
                    <div
                        className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg text-white ${
                            popup.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                    >
                        {popup.message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpdateCharity;
