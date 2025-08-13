import { useState, useEffect } from 'react';
import useGet from '../../../services/API/useGet';
import {Campaign} from "../../Campaigns/entity/Campaign";


export const useGetVolunteerEvents = () => {
    const { get, loading, error } = useGet();
    const [campaigns, setCampaigns] = useState([]);
    const [fetchError, setFetchError] = useState(null);

    const fetchCampaigns = async () => {
        try {
            const result = await get('/api/volunteerEvent');
            if (result) {
                // Map API data to Campaign entities
                const validatedCampaigns = result.events.map((item) => {
                    try {
                        return new Campaign({
                            description:item.description,
                            id:item.id,
                            charity_id: item.charity_id,
                            title: item.title,
                            location: item.location,
                            status: item.status,
                            categoryName: item.categoryName
                        });
                    } catch (err) {
                        console.log(`Skipping invalid campaign: ${err.message}`);
                        return null;
                    }
                }).filter(campaign => campaign !== null); // Remove invalid campaigns
                setCampaigns(validatedCampaigns);
                setFetchError(null);
            } else {
                setCampaigns([]);
                setFetchError('No campaigns found in response');
            }
        } catch (err) {
            setCampaigns([]);
            setFetchError(err.message);
        }
    };

    return { fetchCampaigns, campaigns, loading, error: fetchError || error };
};
