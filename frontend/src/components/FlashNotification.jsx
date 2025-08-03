import React, { useEffect } from 'react';
import { FiCheckCircle, FiLogOut } from 'react-icons/fi';

const FlashNotification = ({ message, type = 'success', isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto-hide after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="w-5 h-5" />;
      case 'logout':
        return <FiLogOut className="w-5 h-5" />;
      default:
        return <FiCheckCircle className="w-5 h-5" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'logout':
        return 'bg-blue-500';
      default:
        return 'bg-green-500';
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
      <div className={`${getBgColor()} text-white px-4 sm:px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 max-w-xs sm:max-w-sm mx-4`}>
        {getIcon()}
        <span className="font-medium text-sm sm:text-base">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 sm:ml-4 text-white hover:text-gray-200 transition duration-200 flex-shrink-0"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default FlashNotification; 