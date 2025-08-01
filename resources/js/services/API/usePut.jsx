import { useState } from 'react';

const usePut = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const put = async (url, body) => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem('token');
            const res = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const result = await res.json();

            if (!res.ok) {
                // Throw a detailed error object
                throw {
                    status: res.status,
                    data: result, // This could include validation errors from Laravel
                };
            }

            setResponse(result);
            setError("");
            return result;
        } catch (err) {
            setError(err.message || "Unknown error");
            setResponse(null);
            throw err; // Re-throw the full error object
        } finally {
            setLoading(false);
        }
    };

    return { put, response, error, loading };
};

export default usePut;
