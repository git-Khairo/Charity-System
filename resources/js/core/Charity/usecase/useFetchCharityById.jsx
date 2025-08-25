import { useState } from 'react';
import useGet from '../../../services/API/useGet';
import { Charity } from '../../Charity/entity/Charity';

export const useFetchCharityById = () => {
    const { get, loading, error } = useGet();
    const [charity, setCharity] = useState(null);
    const [fetchError, setFetchError] = useState(null);

    const fetchCharity = async (id) => {
        try {
            const result = await get(`/api/charity/${id}`);
            console.log(result);
            if (result) {
                const validatedCharity = new Charity({
                    id: result.charity.id,
                    name: result.charity.name,
                    description: result.charity.description,
                    images: result.charity.images,
                    categoryName: result.charity.categoryName
                });
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
