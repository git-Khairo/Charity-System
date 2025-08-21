import { useState } from 'react';

const usePost = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null); // Store full error object
  const [loading, setLoading] = useState(false);

  const post = async (url, body) => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
        const lang = localStorage.getItem('lang');

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
            'X-App-Lang': lang,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const result = await res.json();

      if (!res.ok) {
        throw result; // Throw the full error response
      }

      setResponse(result);
      setError(null);
      return result;
    } catch (err) {
      setError(err); // Store the full error object
      setResponse(null);
      throw err; // Re-throw to allow component to handle
    } finally {
      setLoading(false);
    }
  };

  return { post, response, error, loading };
};

export default usePost;
