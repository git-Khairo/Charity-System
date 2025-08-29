import { useState } from 'react';
import useGet from '../../../services/API/useGet';
import { useParams } from 'react-router-dom';

export const useFetchParticipationRequests = ({id}) => {
    const { get, loading, error } = useGet();
    const [participationData, setParticipationData] = useState([]);
    const [fetchError, setFetchError] = useState(null);

    const fetchParticipationRequests = async () => {
        try {
            const result = await get(`/api/admin/participation/${id}`); // endpoint for participation requests


            if (result && result["participation"]) {
                setParticipationData(result["participation"]);
                setFetchError(null);
            } else {
                setParticipationData([]);
                setFetchError('No participation requests found');
            }
        } catch (err) {
            setParticipationData([]);
            setFetchError(err.message);
        }
    };

    return { fetchParticipationRequests, participationData, loading, error: fetchError || error };
};
