import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBeneficiaryEdit } from "../../../core/Beneficiary/usecase/useBeneficiaryEdit";

export default function EditBeneficiaryModal({ isOpen, onClose, user }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const { updateBeneficiary, validationErrors, loading } = useBeneficiaryEdit(id);

    const [formData, setFormData] = useState({
        name: "",
        phonenumber: "",
        address: "",
    });

    // Load initial beneficiary data
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                phonenumber: user.phonenumber || "",
                address: user.address || "",
            });
        }
    }, [user]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await updateBeneficiary(formData);
        if (result.success) {
            onClose();
            navigate(`/beneficiary/${id}/profile`, { replace: true });
        }
    };

    const renderError = (field) =>
        validationErrors[field] ? (
            <div className="mt-1 space-y-1">
                {Array.isArray(validationErrors[field])
                    ? validationErrors[field].map((err, i) => (
                        <p key={i} className="text-red-500 text-sm">
                            {err}
                        </p>
                    ))
                    : (
                        <p className="text-red-500 text-sm">{validationErrors[field]}</p>
                    )}
            </div>
        ) : null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[90%] max-w-md shadow-lg relative">
                <button
                    className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-gray-400"
                    onClick={onClose}
                    type="button"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">
                    Edit Beneficiary Profile
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block mb-1 text-sm text-gray-700 dark:text-gray-200">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter full name"
                            required
                        />
                        {renderError("name")}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block mb-1 text-sm text-gray-700 dark:text-gray-200">
                            Phone
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phonenumber}
                            onChange={handleChange}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter phone number"
                            required
                        />
                        {renderError("phone")}
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block mb-1 text-sm text-gray-700 dark:text-gray-200">
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter address"
                            required
                        />
                        {renderError("address")}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
