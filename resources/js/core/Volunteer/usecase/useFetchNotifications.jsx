import { useState } from 'react';
import useGet from '../../../services/API/useGet';
import {useParams} from "react-router-dom";

export const useFetchNotifications = () => {
    const { id } = useParams();
    const { get, loading, error } = useGet();
    const [notifications, setNotifications] = useState([]);
    const [fetchError, setFetchError] = useState(null);

    const fetchNotifications = async () => {
        try {
            const result = await get(`/api/volunteer/${id}/notification`); // your notifications endpoint

            //console.log(result);
            if (result && result["user notification"]) {
                setNotifications(result["user notification"]);
                setFetchError(null);
            } else {
                setNotifications([]);
                setFetchError('No notifications found');
            }
        } catch (err) {
            setNotifications([]);
            setFetchError(err.message);
        }
    };

    return { fetchNotifications, notifications, loading, error: fetchError || error };
};
