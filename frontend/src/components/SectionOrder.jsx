import React from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

const SectionOrder = ({ sectionOrder, onMoveUp, onMoveDown }) => {
  const getSectionDisplayName = (section) => {
    const names = {
      'summary': 'Professional Summary',
      'experience': 'Work Experience',
      'education': 'Education',
      'skills': 'Technical Skills',
      'projects': 'Projects',
      'achievements': 'Achievements & Awards'
    };
    return names[section] || section;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Section Order</h3>
      <div className="space-y-2">
        {sectionOrder.map((section, index) => (
          <div key={section} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
            <span className="text-sm font-medium text-gray-700">
              {index + 1}. {getSectionDisplayName(section)}
            </span>
            <div className="flex space-x-1">
              <button
                onClick={() => onMoveUp(index)}
                disabled={index === 0}
                className={`p-1 rounded ${
                  index === 0 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
                title="Move Up"
              >
                <FiChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => onMoveDown(index)}
                disabled={index === sectionOrder.length - 1}
                className={`p-1 rounded ${
                  index === sectionOrder.length - 1 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
                title="Move Down"
              >
                <FiChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Use the arrows to reorder sections in your resume
      </p>
    </div>
  );
};

export default SectionOrder; 