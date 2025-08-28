import { useState } from 'react';
import useGet from '../../../services/API/useGet';
import { useParams } from 'react-router-dom';

export const useFetchUserEvents = () => {
    const { id } = useParams();
    const { get, loading, error } = useGet();
    const [userEvent, setUserEvent] = useState([]);
    const [fetchError, setFetchError] = useState(null);

    const fetchUserEvent = async () => {
        try {
            const result = await get(`/api/myEvents`); // adjust endpoint if needed

            if (result && result["user events"]) {
                setUserEvent(result["user events"]);
                setFetchError(null);
            } else {
                setUserEvent(null);
                setFetchError('No event found');
            }
        } catch (err) {
            setUserEvent(null);
            setFetchError(err.message);
        }
    };

    return { fetchUserEvent, userEvent, loading, error: fetchError || error };
};
