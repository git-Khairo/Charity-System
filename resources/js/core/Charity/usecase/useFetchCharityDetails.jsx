import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useGet from '../../../services/API/useGet';
import { Campaign } from '../../Campaigns/entity/Campaign';

export const useFetchCharityDetails = () => {
    const { id } = useParams(); // expects /charity/:id
    const { get, loading, error } = useGet();

    const [charity, setCharity] = useState(null);
    const [events, setEvents] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [fetchError, setFetchError] = useState(null);

    const fetchCharityData = async () => {
        try {
            const [charityRes, eventsRes, feedbacksRes] = await Promise.all([
                get(`/api/charity/${id}`),
                get(`/api/charity/events/${id}`),
                get(`/api/charity-feedback/${id}`)
            ]);
            // Set charity
            if (charityRes?.charity) {
                setCharity({
                    name: charityRes.charity.name,
                    address: charityRes.charity.address,
                    description: charityRes.charity.description,
                    images: charityRes.charity.images,
                    phonenumber: charityRes.charity.phonenumber,
                    email: charityRes.charity.email,
                    categoryName: charityRes.charity.categoryName
                });
            } else {
                setCharity(null);
            }

            // Set all events
            const validatedEvents = eventsRes.events.map((item) => {
                try{
                    console.log(item);
                    return new Campaign({
                        id:item.id,
                        charity_id: item.charity_id,
                        title: item.title,
                        location: item.location,
                        status: item.status,
                        categoryName: item.categoryName,
                        images: JSON.parse(item.images[0]),
                        description : item.description,
                        capacity: item.capacity,
                        NumOfVolunteer: item.NumOfVolunteer
                    })
                }catch (err) {
                    console.log(`Skipping invalid campaign: ${err.message}`);
                    return null;
                }
            })
            setEvents(validatedEvents);

            // Set all feedbacks
            setFeedbacks(Array.isArray(feedbacksRes?.feedback) ? feedbacksRes.feedback : []);

            setFetchError(null);
        } catch (err) {
            console.error(err);
            setCharity(null);
            setEvents([]);
            setFeedbacks([]);
            setFetchError(err.message);
        }
    };



    return {
        fetchCharityData,
        charity,
        events,
        feedbacks,
        loading,
        error: fetchError || error,
    };
};
