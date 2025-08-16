// src/core/Charity/usecase/fetchCharitiesUseCase.js
import { useState, useEffect } from 'react';
import useGet from '../../../services/API/useGet';
import { Charity } from '../entity/Charity';

export const useFetchCharities = () => {
  const { get, loading, error } = useGet();
  const [charities, setCharities] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  const fetchCharities = async () => {
    try {
      const result = await get('/api/charities');
      if (result && result.charities) {
        // Map API data to Charity entities
        const validatedCharities = result.charities.map((item) => {
          try {
            return new Charity({
              id: item.id,
              name: item.name,
              description: item.description,
              images: item.images,
            });
          } catch (err) {
            console.warn(`Skipping invalid charity: ${err.message}`);
            return null;
          }
        }).filter(charity => charity !== null); // Remove invalid charities
        setCharities(validatedCharities);
        setFetchError(null);
      } else {
        setCharities([]);
        setFetchError('No charities found in response');
      }
    } catch (err) {
      setCharities([]);
      setFetchError(err.message);
    }
  };

  return { fetchCharities, charities, loading, error: fetchError || error };
};
