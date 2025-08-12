// src/hooks/useGet.js
import { useState } from 'react';

const useGet = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const get = async (url) => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
        const lang = localStorage.getItem('lang');

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-App-Lang': lang,
          'Accept': 'application/json',
        },
      });


      if (!res.ok) throw new Error('Get request failed');

      const result = await res.json();
        console.log(result);
      setData(result);
      setError("");
      return result;
    } catch (err) {
      setError(err.message);
      setData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { get, data, error, loading };
};

export default useGet;
