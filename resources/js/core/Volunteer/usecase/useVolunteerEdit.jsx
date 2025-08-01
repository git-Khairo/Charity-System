// src/hooks/useVolunteerEdit.js


import { useState } from 'react';
import {Volunteer} from "../entity/Volunteer";
import usePut from "../../../services/API/usePut";

export const useVolunteerEdit = (id) => {
    const { put, loading, error } = usePut();
    const [validationErrors, setValidationErrors] = useState({});

    const updateVolunteer = async (formData) => {
        const volunteer = new Volunteer(formData,{skipPasswordValidation: true});
        const errors = volunteer.validate();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return { success: false };
        }

        try {
            await put(`/api/volunteer/update`, formData);
            setValidationErrors({});
            return { success: true };
        } catch (err) {
            if (err?.response?.status === 422 && err.response.data?.errors) {
                setValidationErrors(err.response.data.errors);
            } else {
                console.error("Unexpected error:", err);
            }
            return { success: false };
        }
    };

    return { updateVolunteer, loading, error, validationErrors };
};
