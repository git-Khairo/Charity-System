import { useState } from 'react';
import useGet from '../../../services/API/useGet';
import { useParams } from 'react-router-dom';

export const useFetchBeneficiaryRequest = ({id}) => {
    const { get, loading, error } = useGet();
    const [participationData, setParticipationData] = useState([]);
    const [fetchError, setFetchError] = useState(null);

    const fetchBeneficiaryRequests = async () => {
        try {
            const result = await get(`/api/admin/requests/${id}`); // endpoint for participation requests


            if (result && result["request"]) {
                setParticipationData(result["request"]);
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

    return { fetchBeneficiaryRequests, participationData, loading, error: fetchError || error };
};
