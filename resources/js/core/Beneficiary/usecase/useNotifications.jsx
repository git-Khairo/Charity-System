import { useState, useEffect } from "react";
import {notificationsSample} from "./BeneficiaryData";


export function useNotifications() {
  const [notifications, setNotifications] = useState(notificationsSample);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (showNotifications) {
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, read: true }))
      );
    }
  }, [showNotifications]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newNotif = {
        id: Date.now(),
        type: "New Alert",
        text: "Your application status at Al-Ber Association was updated",
        date: new Date().toISOString().slice(0, 16).replace("T", " "),
        read: false,
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }, 30000);

    return () => clearTimeout(timer);
  }, [notifications]);

  return {
    notifications,
    showNotifications,
    setShowNotifications,
    unreadCount,
  };
}
