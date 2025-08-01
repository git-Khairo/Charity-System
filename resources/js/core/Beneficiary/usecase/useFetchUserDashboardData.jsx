import { useState } from 'react';
import useGet from '../../../services/API/useGet';
import { useParams } from 'react-router-dom';

export const useFetchUserDashboardData = () => {
    const { id } = useParams();
    const { get, loading, error } = useGet();

    const [notifications, setNotifications] = useState([]);
    const [applications, setApplications] = useState([]);
    const [userData, setUserData] = useState(null);
    const [fetchError, setFetchError] = useState(null);

    const fetchDashboardData = async () => {
        try {
            const [notifRes, appsRes, userRes] = await Promise.all([
                get('/api/myNotification'),
                get('/api/myApplication'),
                get(`/api/beneficiary/${id}`)
            ]);

            if (notifRes && Array.isArray(notifRes.notifications)) {
                setNotifications(notifRes.notifications);
            } else {
                setNotifications([]);
            }
            console.log(appsRes.applications);
            if (appsRes && Array.isArray(appsRes.applications) ) {
                setApplications(appsRes.applications);
            } else {
                setApplications([]);
            }

            if (userRes && userRes.beneficiary) {
                setUserData(userRes.beneficiary);
            } else {
                setUserData(null);
            }

            setFetchError(null);
        } catch (err) {
            setNotifications([]);
            setApplications([]);
            setUserData(null);
            setFetchError(err.message);
        }
    };

    return {
        fetchDashboardData,
        notifications,
        applications,
        userData,
        loading,
        error: fetchError || error,
    };
};
