import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { useVolunteerEdit } from '../../../core/Volunteer/usecase/useVolunteerEdit';

const EditProfileModal = ({ isOpen, onClose, user }) => {
    const { id } = useParams();
    const { updateVolunteer, validationErrors, loading } = useVolunteerEdit(id);
    const navigate = useNavigate();

    console.log(user);
    const [formData, setFormData] = useState({
        id:'',
        name: '',
        email: '',
        phoneNumber: '',
        study: '',
        address: '',
        skills: '', // skills as comma-separated string
    });

    // Initialize form data on user load or change
    useEffect(() => {
        if (user) {
            let skillsString = '';
            try {
                const skillsArray = JSON.parse(user.skills);
                if (Array.isArray(skillsArray)) {
                    skillsString = skillsArray.join(', ');
                }
            } catch {
                skillsString = '';
            }
            setFormData({
                id:user.id || '',
                name: user.name || '',
                email: user.email || '',
                phoneNumber: user.phoneNumber || '',
                study: user.study || '',
                address: user.address || '',
                skills: skillsString,
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

        // Convert skills string to array for API
        const skillsArray = formData.skills
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);

        // Prepare data to send (replace skills string with array)
        const dataToSend = {
            ...formData,
            skills: skillsArray,
        };

        const result = await updateVolunteer(dataToSend);
        console.log(result);
        if (result.success){
            onClose();
            navigate(`/volunteer/${id}/profile`,{ replace: true });
            window.location.reload();
        }
    };

    const renderError = (field) =>
        validationErrors[field] ? (
            <p className="text-red-500 text-sm mt-1">{validationErrors[field]}</p>
        ) : null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-light-background rounded-2xl p-8 w-full max-w-xl shadow-xl overflow-y-auto max-h-[90vh] relative">
                <button
                    className="absolute top-4 right-4 text-black hover:text-gray-400"
                    onClick={onClose}
                    type="button"
                >
                    ✕
                </button>

                <h2 className="text-black text-[28px] font-bold text-center pb-6 pt-2">
                    Edit Profile
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {[
                        { label: 'Name', name: 'name', type: 'text' },
                        { label: 'Email', name: 'email', type: 'email' },
                        { label: 'Phone Number', name: 'phoneNumber', type: 'text' },
                        { label: 'Study', name: 'study', type: 'text' },
                    ].map(({ label, name, type }) => (
                        <div key={name}>
                            <label className="block text-black font-medium mb-2" htmlFor={name}>
                                {label}
                            </label>
                            <input
                                id={name}
                                name={name}
                                type={type}
                                value={formData[name] || ''}
                                onChange={handleChange}
                                className="w-full rounded-xl text-black placeholder:text-[#9cabba] p-4 h-14 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder={label}
                            />
                            {renderError(name)}
                        </div>
                    ))}

                    {/* Address */}
                    <div>
                        <label className="block text-white font-medium mb-2" htmlFor="address">
                            Address
                        </label>
                        <textarea
                            id="address"
                            name="address"
                            value={formData.address || ''}
                            onChange={handleChange}
                            rows="3"
                            className="w-full rounded-xl text-black placeholder:text-[#9cabba] p-4 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                            placeholder="Your Address"
                        />
                        {renderError('address')}
                    </div>

                    {/* Skills */}
                    <div>
                        <label className="block text-white font-medium mb-2" htmlFor="skills">
                            Skills (comma separated)
                        </label>
                        <input
                            id="skills"
                            name="skills"
                            type="text"
                            value={formData.skills || ''}
                            onChange={handleChange}
                            className="w-full rounded-xl text-black placeholder:text-[#9cabba] p-4 h-14 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. communication, teamwork"
                        />
                        {renderError('skills')}
                    </div>

                    <div className="flex flex-col gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#0b80ee] text-white font-bold py-3 rounded-full w-full hover:bg-blue-600 transition"
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-[#283139] text-white font-bold py-3 rounded-full w-full hover:bg-[#3a4752] transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
