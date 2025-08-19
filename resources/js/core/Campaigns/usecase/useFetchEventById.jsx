import { useState } from 'react';
import useGet from '../../../services/API/useGet';
import { useParams } from 'react-router-dom';

export const useFetchEventById = () => {
    const { get, loading, error } = useGet();
    const [event, setEvent] = useState(null);
    const [fetchError, setFetchError] = useState(null);

    const fetchEvent = async (id) => {
        try {
            const result = await get(`/api/event/${id}`);
            if (result) {
                setEvent(result.event);
                setFetchError(null);
            } else {
                setEvent(null);
                setFetchError('Event not found');
            }
        } catch (err) {
            setEvent(null);
            setFetchError(err.message);
        }
    };

    return { fetchEvent, event, eventLoading:loading, eventError: fetchError || error };
};
