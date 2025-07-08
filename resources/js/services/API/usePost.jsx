// src/hooks/usePost.js
import { useState } from 'react';

const usePost = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const post = async (url, body) => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('Post request failed');

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

  return { post, response, error, loading };
};

export default usePost;
