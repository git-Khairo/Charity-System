import React from 'react';
import { CloseIcon, NotificationIcon } from './SharedComponents';
import {formatDistanceToNow} from "date-fns";


const NotificationModal = ({ isOpen, onClose, notification }) => {
  if (!isOpen || !notification) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-[#111111] rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100 opacity-100">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Notification Details</h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-900 text-blue-600 rounded-full p-2">
                <NotificationIcon className="w-6 h-6" />
              </div>
              <p className="text-lg font-semibold text-white">{notification.title}</p>
            </div>
            <span className="text-sm text-gray-400">
                 {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
            </span>
          </div>
          <p className="text-base text-gray-400 leading-relaxed">{notification.message}</p>
        </div>

      </div>
    </div>
  );
};

export default NotificationModal;
