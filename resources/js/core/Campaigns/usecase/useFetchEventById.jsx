import { useState } from 'react';
import useGet from '../../../services/API/useGet';
import { Campaign } from '../entity/Campaign';

export const useFetchEventById = () => {
    const { get, loading, error } = useGet();
    const [event, setEvent] = useState(null);
    const [fetchError, setFetchError] = useState(null);

    const fetchEvent = async (id) => {
        try {
            const result = await get(`/api/event/${id}`);
            if (result) {
            const validatedCampaign = new Campaign({
                    id: result.event.id,
                    charity_id: result.event.charity_id,
                    title: result.event.title,
                    location: result.event.location,
                    status: result.event.status,
                    categoryName: result.event.categoryName,
                    images: JSON.parse(result.event.images),
                    description : result.event.description,
                    capacity: result.event.capacity,
                    NumOfVolunteer: result.event.NumOfVolunteer,
                });
                setEvent(validatedCampaign);
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
