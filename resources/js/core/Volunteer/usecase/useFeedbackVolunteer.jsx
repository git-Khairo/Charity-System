import { useState, useContext } from "react";
import useGet from "../../../services/API/useGet";
import { AuthContext } from "../../../interfaces/components/AuthContext";
import { formatDistanceToNow } from "date-fns";

export const useFeedbackVolunteer = () => {
    const { get, loading, error } = useGet();
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);
    const [feedbackModels, setFeedbackModels] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const { login } = useContext(AuthContext);

    const fetchFeedbackVolunteer = async () => {
        try {
            // Fetch user feedback data
            const response = await get(`/api/myFeedbacks`);

            //console.log(response);

            // Assuming your JSON has "user Feedbacks" (with a space) — better to access safely:
            const userFeedbacks = response["user Feedbacks"];

            // Prepare user data with parsed skills
            const mappedUser = {
                id: userFeedbacks.id,
                name: userFeedbacks.name,
                email: userFeedbacks.email,
                phoneNumber: userFeedbacks.phoneNumber,
                study: userFeedbacks.study,
                address: userFeedbacks.address,
                skills: JSON.parse(userFeedbacks.skills),
                email_verified_at: userFeedbacks.email_verified_at,
                qr_code_path: userFeedbacks.qr_code_path,
                created_at: userFeedbacks.created_at,
                updated_at: userFeedbacks.updated_at,
            };

            // Roles array
            const mappedRoles = userFeedbacks.roles.map(role => ({
                id: role.id,
                name: role.name,
                guard_name: role.guard_name,
                created_at: role.created_at,
                updated_at: role.updated_at,
                pivot: role.pivot,
            }));

            // Feedback mapped with date formatting and avatar url
            const mappedFeedbacks = userFeedbacks.feedback.map(fb => ({
                id: fb.id,
                title: fb.title,
                description: fb.description,
                date: formatDistanceToNow(new Date(fb.created_at), { addSuffix: true }),
                author: userFeedbacks.name,
                email: userFeedbacks.email,
                avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(userFeedbacks.name)}&background=0D8ABC&color=fff`,
            }));

            setUser(mappedUser);
            setRoles(mappedRoles);
            setFeedbackModels(mappedFeedbacks);
            setFetchError(null);
        } catch (err) {
            console.error('Error fetching volunteer feedback data:', err);
            setUser(null);
            setRoles([]);
            setFeedbackModels([]);
            setFetchError(err.message);
        }
    };

    return { fetchFeedbackVolunteer, user, roles, feedbackModels, loading, error: fetchError || error };
};
