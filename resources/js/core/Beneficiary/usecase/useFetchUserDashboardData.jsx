import { useState } from 'react';
import useGet from '../../../services/API/useGet';
import { useParams } from 'react-router-dom';

export const useFetchUserDashboardData = () => {
    const { id } = useParams();
    const { get, loading, error } = useGet();

    const [notifications, setNotifications] = useState([]);
    const [applications, setApplications] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [userData, setUserData] = useState(null);
    const [fetchError, setFetchError] = useState(null);

    const fetchDashboardData = async () => {
        try {
            const [notifRes, appsRes, userRes,feedRes] = await Promise.all([
                get('/api/myNotification'),
                get('/api/myApplication'),
                get(`/api/beneficiary/${id}`),
                get(`/api/beneficiaryFeedback`)

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
            console.log(feedRes.Feedbacks);
            if (feedRes && Array.isArray(feedRes.Feedbacks) ) {
                setFeedbacks(feedRes.Feedbacks);
            } else {
                setFeedbacks([]);
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
        feedbacks,
        userData,
        loading,
        error: fetchError || error,
    };
};
