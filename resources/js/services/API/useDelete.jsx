// src/hooks/useDelete.js
import { useState } from 'react';

const useDelete = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const remove = async (url) => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const res = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (!res.ok) throw new Error('Delete request failed');

      const result = await res.json();
      setResponse(result);
      setError("");
      return result;
    } catch (err) {
      setError(err.message);
      setResponse(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { remove, response, error, loading };
};

export default useDelete;
