import { useState } from 'react';
import usePost from "../../../services/API/usePost";

const useVolunteerForm = () => {
    const [formData, setFormData] = useState({
        national_number: '',
        gender: '',
        why_charity: '',
        freeDays: [],
        freeTimes: { from: '', to: '' },
        skills: [],
        availability_for_volunteering: '',
        preferred_time: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const { post, response, error: apiError, loading } = usePost();

    const skillsList = [
        'Developmental',
        'Child_care',
        'Training',
        'Shelter_and_relief',
        'Events_and_conferences',
        'Awareness_campaigns',
        'Elderly_care',
        'Supporting_women',
        'Maintenance_technician',
        'field_media_photography',
        'Administrative_field',
    ];

    const validate = () => {
        const newErrors = {};
        if (!formData.national_number.trim()) newErrors.national_number = 'National number is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.why_charity.trim()) newErrors.why_charity = 'Please explain your motivation';
        if (!formData.availability_for_volunteering.trim()) newErrors.availability_for_volunteering = 'Enter availability';
        if (!formData.preferred_time.trim()) newErrors.preferred_time = 'Enter preferred time';
        if (formData.skills.length === 0) newErrors.skills = 'Select at least one skill';
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            skills: checked
                ? [...prev.skills, name]
                : prev.skills.filter((s) => s !== name),
        }));
    };

    const mapToApiFormat = () => {
        const skillsObj = {};
        skillsList.forEach((skill) => {
            skillsObj[skill] = formData.skills.includes(skill) ? 1 : 0;
        });

        return {
            national_number: formData.national_number,
            gender: formData.gender,
            why_charity: formData.why_charity,
            availability_for_volunteering: formData.availability_for_volunteering,
            preferred_time: formData.preferred_time,
            ...skillsObj,
            signup_date: new Date().toISOString().split('T')[0],
            status: 'pending',
        };
    };

    const handleSubmit = async (eventId) => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            throw new Error('Validation failed');
        }
        setErrors({}); // Clear previous errors

        const body = mapToApiFormat();
        try {
            await post(`/api/events/${eventId}/apply`, body);

            // Reset server errors on success
            setErrors({});
            setSubmitted(true);
            return response;
        } catch (err) {
            // Capture server-side error
            const serverMessage =
                err?.response?.data?.message || err?.message || 'Something went wrong';
            setErrors({ server: serverMessage }); // Add server error under 'server' key
            throw new Error(serverMessage);
        }
    };

    return {
        formData,
        setFormData,
        submitted,
        setSubmitted,
        skillsList,
        errors,
        handleChange,
        handleCheckboxChange,
        handleSubmit,
        loading,
        apiError,
        response,
    };
};

export default useVolunteerForm;
