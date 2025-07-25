import React, { useEffect, useState } from 'react';
import {useOutletContext, useParams} from 'react-router-dom';
import { NotificationIcon } from '../../components/Volunteer/SharedComponents';
import NotificationModal from '../../components/Volunteer/NotificationModal';
import { formatDistanceToNow } from 'date-fns';
import useGet from "../../../services/API/useGet";
import {useFetchNotifications} from "../../../core/Volunteer/usecase/useFetchNotifications";


const NotificationsPage = () => {
    const {user,authUser} = useOutletContext();
    const { id } = useParams();
    const [selectedNotification, setSelectedNotification] = useState(null);
    const { fetchNotifications, notifications, loading, error } = useFetchNotifications();


    useEffect(() => {
        fetchNotifications();
    }, []);

    console.log(authUser.id===parseInt(id) );

    if (authUser.id!==parseInt(id) || authUser.roles.some(role => role.name !== 'Volunteer')){
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <p>Fuck off.....</p>
            </div>
        );
    }

   if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <p>Loading profile...</p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-red-500">
                <p>Error loading profile: {error}</p>
            </div>
        );
    }

    // If user is null (just in case)
    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <p>No user data available.</p>
            </div>
        );
    }

    return (
        <main className="container mx-auto flex-1 px-4 py-8 sm:px-6 lg:px-8">
            {loading && <p className="text-white">Loading notifications...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            <div className="flex flex-col gap-6">
                {notifications?.map((notification, index) => (
                    <div
                        key={index}
                        className="bg-[#111111] rounded-lg shadow-md p-6 transition-transform duration-150 hover:shadow-lg flex flex-col h-full"
                    >
                        <div className="flex-grow">
                            <p className="text-sm font-medium text-blue-600 mb-2 flex items-center">
                                <NotificationIcon className="w-5 h-5 mr-2" />
                                Notification
                            </p>
                            <h3 className="text-xl font-semibold text-white mb-2">
                                {notification.title}
                            </h3>
                            <p className="text-sm text-gray-400 line-clamp-3 mb-4">
                                {notification.message.slice(0, 100)}
                                {notification.message.length > 100 && '...'}
                            </p>
                            {notification.created_at && (
                                <p className="text-xs text-gray-400">
                                    {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                                </p>
                            )}
                        </div>
                        <div className="mt-6">
                            <button
                                onClick={() => setSelectedNotification(notification)}
                                className="w-mid bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl px-4 py-2 text-sm font-medium hover:scale-105 hover:shadow-lg transition-transform duration-150 flex items-center justify-center gap-2"
                            >
                                <NotificationIcon className="w-5 h-5" />
                                View
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <NotificationModal
                isOpen={!!selectedNotification}
                onClose={() => setSelectedNotification(null)}
                notification={selectedNotification}
            />
        </main>
    );
};

export default NotificationsPage;
