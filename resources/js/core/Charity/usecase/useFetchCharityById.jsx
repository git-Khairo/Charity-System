import { useState } from 'react';
import useGet from '../../../services/API/useGet';
import { useParams } from 'react-router-dom';

export const useFetchCharityById = () => {
    const { get, loading, error } = useGet();
    const [charity, setCharity] = useState(null);
    const [fetchError, setFetchError] = useState(null);

    const fetchCharity = async (id) => {
        try {
            const result = await get(`/api/charity/${id}`);
            if (result) {
                setCharity(result.charity);
                setFetchError(null);
            } else {
                setCharity(null);
                setFetchError('Charity not found');
            }
        } catch (err) {
            setCharity(null);
            setFetchError(err.message);
        }
    };

    return { fetchCharity, charity, charityLoading:loading, charityError: fetchError || error };
};
