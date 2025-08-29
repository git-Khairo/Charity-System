
import { useState } from 'react';
import usePut from "../../../services/API/usePut";
import {Beneficiary} from "../entity/Beneficiary";

export const useBeneficiaryEdit = (id) => {
    const { put, loading, error } = usePut();
    const [validationErrors, setValidationErrors] = useState({});

    const updateBeneficiary = async (formData) => {
        const beneficiary = new Beneficiary(formData,{skipPasswordValidation: true});
      /*  const errors = beneficiary.validate();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return { success: false };
        }
*/
        try {
            await put(`/api/beneficiary/update/${id}`, formData);
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

    return { updateBeneficiary, loading, error, validationErrors };
};
