

import React from "react";

export default function Notifications({ notifications, showNotifications, unreadCount, toggleShowNotifications }) {
return (
<div className="relative">
<button onClick={toggleShowNotifications} aria-label="Notifications" className="relative focus:outline-none" >
<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
</svg>
{unreadCount > 0 && (
<span className="absolute -top-1 -right-1 bg-red-600 rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold animate-pulse">
{unreadCount}
</span>
)}
</button>

  {showNotifications && (
    <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-auto bg-white border border-gray-300 rounded shadow-lg z-50 animate-fadeIn">
      <h3 className="font-bold text-lg p-3 border-b border-gray-200">Notifications</h3>
      {notifications.length === 0 ? (
        <p className="p-3 text-center text-gray-500">No notifications</p>
      ) : (
        <ul>
          {notifications.map((n) => (
            <li
              key={n.id}
              className={`flex items-start p-3 cursor-pointer hover:${
                n.read ? "bg-gray-100" : "bg-blue-100"
              }`}
            >
              <div className="text-xl mr-3">
                {n.type === "Application Accepted" ? "✅" : "🔔"}
              </div>
              <div>
                <p className={`text-sm ${n.read ? "text-gray-500" : "font-semibold text-black"}`}>
                  {n.text}
                </p>
                <p className="text-xs text-gray-400">{n.date}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )}
</div>

);
}