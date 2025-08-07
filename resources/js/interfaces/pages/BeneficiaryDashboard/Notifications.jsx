import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { NotificationIcon } from '../../components/Volunteer/SharedComponents';
import NotificationModal from '../../components/Volunteer/NotificationModal';
import { formatDistanceToNow } from 'date-fns';

const Notifications = () => {
    const { notifications, darkMode } = useOutletContext(); // Get darkMode too
    const [selectedNotification, setSelectedNotification] = useState(null);

    return (
        <section
            className="rounded-xl shadow p-6"
            style={{
                backgroundColor: darkMode ? "#1e293b" : "white",
                color: darkMode ? "#f1f5f9" : "#1f2937",
            }}
        >
            <h2 className="text-2xl font-bold mb-6">My Notifications</h2>

            <div className="flex flex-col gap-6">
                {notifications?.length === 0 ? (
                    <p className="text-center text-gray-500">No notifications available</p>
                ) : (
                    notifications.map((notification, index) => (
                        <div
                            key={index}
                            className={`rounded-2xl p-6 flex flex-col justify-between shadow-lg hover:shadow-xl transition duration-300 border ${
                                darkMode
                                    ? "bg-[#1f2937] border-gray-700 text-gray-100"
                                    : "bg-white border-gray-200 text-gray-800"
                            }`}
                        >
                            <div>
                                <p className="text-sm font-medium text-blue-600 mb-2 flex items-center">
                                    <NotificationIcon className="w-5 h-5 mr-2" />
                                    Notification
                                </p>
                                <h3 className="text-xl font-semibold mb-2">{notification.title}</h3>
                                <p className="text-sm opacity-80 mb-4">
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
                                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl px-4 py-2 text-sm font-medium hover:scale-105 hover:shadow-lg transition-transform duration-150 flex items-center justify-center gap-2"
                                >
                                    <NotificationIcon className="w-5 h-5" />
                                    View
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <NotificationModal
                isOpen={!!selectedNotification}
                onClose={() => setSelectedNotification(null)}
                notification={selectedNotification}
            />
        </section>
    );
};

export default Notifications;
