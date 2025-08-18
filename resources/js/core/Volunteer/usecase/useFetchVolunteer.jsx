import { useState } from 'react';
import useGet from '../../../services/API/useGet';

export const useFetchVolunteer = ({ id }) => {
    const { get, loading, error } = useGet();
    const [volunteerData, setVolunteerData] = useState(null);
    const [fetchError, setFetchError] = useState(null);

    const fetchVolunteer = async () => {
        try {
            const result = await get(`/api/volunteer/${id}`);

            if (result && result.user) {
                setVolunteerData(result.user);
                setFetchError(null);
            } else {
                setVolunteerData(null);
                setFetchError('Volunteer not found');
            }
        } catch (err) {
            setVolunteerData(null);
            setFetchError(err.message);
        }
    };

    return { fetchVolunteer, volunteerData, loading, error: fetchError || error };
};
