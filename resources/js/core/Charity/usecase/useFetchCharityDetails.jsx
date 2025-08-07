import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useGet from '../../../services/API/useGet';

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

            console.log(feedbacksRes);
            // Set charity
            if (charityRes?.charity) {
                let parsedImages = [];
                try {
                    parsedImages = JSON.parse(charityRes.charity.images || '[]');
                } catch (parseErr) {
                    console.warn('Failed to parse images:', parseErr);
                }

                setCharity({
                    name: charityRes.charity.name,
                    address: charityRes.charity.address,
                    description: charityRes.charity.description,
                    images: parsedImages,
                    phonenumber: charityRes.charity.phonenumber,
                    email: charityRes.charity.email,
                    categoryName: charityRes.charity.categoryName
                });
            } else {
                setCharity(null);
            }

            // Set all events
            setEvents(Array.isArray(eventsRes?.events) ? eventsRes.events : []);

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
