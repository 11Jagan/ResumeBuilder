import React from 'react';
import { FiAlertCircle, FiX } from 'react-icons/fi';

const ValidationError = ({ errors, isVisible, onClose }) => {
  if (!isVisible || !errors || errors.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <FiAlertCircle className="w-6 h-6 text-red-500" />
            <h3 className="text-lg font-semibold text-gray-900">
              Validation Error
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition duration-200"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-3">
            Please fill in the following required fields:
          </p>
          <ul className="space-y-2">
            {errors.map((error, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-red-500 text-sm">•</span>
                <span className="text-sm text-gray-700">{error}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 text-sm font-medium"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValidationError; 