import { useState } from "react";
import usePost from "../../../services/API/usePost";


const useMakeFeedback = (url) => {
    const { post, response, error, loading } = usePost();
    const [successMessage, setSuccessMessage] = useState(null);


    console.log(url);

    const submitFeedback = async (formData) => {
        // Basic validation
        if (!formData.title?.trim() || !formData.description?.trim() || !formData.rating) {
            throw { message: "Please fill all fields and select a rating." };
        }

        if (!url) throw { message: "Feedback URL is not defined." };

        try {
            const data = await post(url, formData);
            setSuccessMessage("Feedback submitted successfully!");
            return data;
        } catch (err) {
            setSuccessMessage(null);
            throw err;
        }
    };

    const resetSuccess = () => setSuccessMessage(null);

    return {
        submitFeedback,
        loading,
        error,
        response,
        successMessage,
        resetSuccess,
    };
};

export default useMakeFeedback;
