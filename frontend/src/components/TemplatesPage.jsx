import React, { useState } from 'react';
import { FiArrowLeft, FiEdit3, FiEye } from 'react-icons/fi';
import TemplateOne from './TemplateOne';
import TemplateTwo from './TemplateTwo';

const TemplatesPage = ({ onStartCreating, onBackToLanding }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Sample resume data for template previews
  const sampleResumeData = {
    personalInfo: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      linkedin: 'linkedin.com/in/johndoe'
    },
    summary: 'Experienced software developer with 5+ years in full-stack development. Proficient in React, Node.js, and Python. Led multiple successful projects and mentored junior developers.',
    education: [
      {
        id: 1,
        institution: 'University of Technology',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2018-09-01',
        endDate: '2022-05-01',
        gpa: '3.8'
      }
    ],
    experience: [
      {
        id: 1,
        company: 'Tech Solutions Inc.',
        position: 'Senior Software Developer',
        startDate: '2022-06-01',
        endDate: '2024-01-01',
        description: 'Led development of React-based web applications\nImplemented RESTful APIs using Node.js and Express\nMentored 3 junior developers and conducted code reviews\nImproved application performance by 40% through optimization'
      }
    ],
    skills: 'Frontend: React, JavaScript, HTML, CSS, TypeScript\nBackend: Node.js, Python, Express.js, Django\nDatabase: MongoDB, PostgreSQL, MySQL\nTools: Git, Docker, AWS, Jenkins',
    projects: [
      {
        id: 1,
        name: 'E-commerce Platform',
        description: 'Built a full-stack e-commerce platform with React frontend and Node.js backend\nImplemented user authentication, payment processing, and inventory management\nDeployed on AWS with CI/CD pipeline using Docker',
        technologies: 'React, Node.js, MongoDB, Stripe',
        link: 'https://github.com/johndoe/ecommerce'
      }
    ],
    achievements: [
      {
        id: 1,
        title: 'Best Developer Award 2023',
        description: 'Recognized for outstanding contributions to team projects and innovative problem-solving approaches'
      }
    ]
  };

  const sectionOrder = ['summary', 'experience', 'education', 'skills', 'projects', 'achievements'];

  // Template data array
  const templates = [
    {
      id: 1,
      name: 'Template One',
      description: 'A timeless, professional resume template designed for traditional industries and corporate environments. Features clean typography with Times New Roman font and clear section separation. Perfect for finance, healthcare, education, and government sectors where professionalism is paramount.',
      badges: [
        { text: 'ATS Friendly', color: 'bg-blue-100 text-blue-800' },
        { text: 'Professional', color: 'bg-green-100 text-green-800' },
        { text: 'Traditional', color: 'bg-gray-100 text-gray-800' }
      ],
      component: TemplateOne
    },
    {
      id: 2,
      name: 'Template Two',
      description: 'A modern, visually appealing resume template perfect for creative professionals and tech industry roles. Features elegant typography and contemporary design that showcases your skills in an engaging way. Ideal for software developers, designers, and anyone looking to stand out in innovative industries.',
      badges: [
        { text: 'Modern Design', color: 'bg-purple-100 text-purple-800' },
        { text: 'ATS Optimized', color: 'bg-green-100 text-green-800' },
        { text: 'Creative', color: 'bg-pink-100 text-pink-800' }
      ],
      component: TemplateTwo
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <button
              onClick={onBackToLanding}
              className="btn-secondary flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base px-3 sm:px-4 py-2"
            >
              <FiArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Back to Home</span>
            </button>
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
              📋 Resume Templates
            </h1>
            <button
              onClick={onStartCreating}
              className="btn-primary flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base px-3 sm:px-4 py-2"
            >
              <FiEdit3 className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Start Creating</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Templates Section */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Choose Your Perfect Template
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Select from our professionally designed templates. Each template is optimized for ATS systems and can be customized with different fonts to match your style.
            </p>
          </div>

          {/* Template Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
            {templates.map((template, index) => (
              <div key={template.id} className="relative group cursor-pointer" onClick={() => setSelectedTemplate(index)}>
                {/* Template Card */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer">
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 sm:p-4 border-b border-gray-100">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 text-center">{template.name}</h3>
                  </div>
                  {/* Card Content */}
                  <div className="p-3 sm:p-5">
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3 sm:mb-4 text-center">{template.description}</p>
                    {/* Badges */}
                    <div className="flex items-center justify-center flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                      {template.badges.map((badge, badgeIndex) => (
                        <span key={badgeIndex} className={`inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold ${badge.color}`}>{badge.text}</span>
                      ))}
                    </div>
                    {/* Preview Button */}
                    <div className="text-center">
                      <div className="inline-flex items-center space-x-1 sm:space-x-2 text-blue-600 font-medium text-xs sm:text-sm">
                        <FiEye className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Click to Preview</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Full Resume Preview Modal */}
          {selectedTemplate !== null && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedTemplate(null)}>
              <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex-1 pr-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{templates[selectedTemplate].name}</h3>
                    <p className="text-sm sm:text-base text-gray-600 mt-1">{templates[selectedTemplate].description}</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); setSelectedTemplate(null); }} className="text-gray-400 hover:text-gray-600 transition-colors p-1 flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                {/* Full Resume content */}
                <div className="p-3 sm:p-6">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                    {React.createElement(templates[selectedTemplate].component, { resumeData: sampleResumeData, sectionOrder: sectionOrder, selectedFont: 'Times New Roman' })}
                  </div>
                </div>
                {/* Modal Footer */}
                <div className="p-4 sm:p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                  <button onClick={(e) => { e.stopPropagation(); setSelectedTemplate(null); }} className="px-3 sm:px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base">Close</button>
                  <button onClick={onStartCreating} className="btn-primary flex items-center justify-center space-x-1 sm:space-x-2 text-sm sm:text-base px-3 sm:px-4 py-2">
                    <FiEdit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Use This Template</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center mt-6 sm:mt-8">
            <button onClick={onStartCreating} className="btn-primary text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-center space-x-1 sm:space-x-2 mx-auto">
              <FiEdit3 className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Start Creating Your Resume</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TemplatesPage; 