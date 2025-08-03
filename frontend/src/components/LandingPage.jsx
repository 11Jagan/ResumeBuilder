import React from 'react';
import { FiFileText, FiDownload, FiEdit3, FiEye, FiCheckCircle } from 'react-icons/fi';

const LandingPage = ({ onStartCreating, onViewTemplates }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

      {/* Hero Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            Create Professional
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Resumes</span>
            <br />
            in Minutes
          </h1>
          <p className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            Build stunning, ATS-friendly resumes with our intuitive editor. Choose from professional templates, 
            customize every detail, and download your perfect resume instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button
              onClick={onStartCreating}
              className="btn-primary text-sm sm:text-lg px-6 sm:px-8 py-3 sm:py-4 flex items-center justify-center space-x-1 sm:space-x-2"
            >
              <FiEdit3 className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Start Creating</span>
            </button>
                         <button 
               onClick={onViewTemplates}
               className="btn-secondary text-sm sm:text-lg px-6 sm:px-8 py-3 sm:py-4 flex items-center justify-center space-x-1 sm:space-x-2"
             >
               <FiEye className="w-4 h-4 sm:w-5 sm:h-5" />
               <span>View Templates</span>
             </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why Choose ResumeGen?
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Everything you need to create a professional resume that stands out
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Feature 1 */}
            <div className="text-center p-4 sm:p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FiEdit3 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Easy to Use</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Intuitive drag-and-drop interface with real-time preview. No technical skills required.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-4 sm:p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FiFileText className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Professional Templates</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Choose from multiple ATS-friendly templates designed by HR professionals.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-4 sm:p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FiDownload className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Instant Download</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Download your resume as PDF instantly. Perfect for job applications and interviews.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center p-4 sm:p-6 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FiCheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">ATS Optimized</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Our templates are designed to pass Applicant Tracking Systems with flying colors.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="text-center p-4 sm:p-6 rounded-xl bg-gradient-to-br from-red-50 to-red-100 border border-red-200">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FiEye className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Live Preview</h3>
              <p className="text-sm sm:text-base text-gray-600">
                See your changes in real-time as you edit. No surprises when you download.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="text-center p-4 sm:p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FiFileText className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Save & Edit</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Save your progress and come back anytime to make changes or create new versions.
              </p>
            </div>
          </div>
        </div>
      </section>

             

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Create Your Professional Resume?
          </h2>
          <p className="text-base sm:text-xl text-blue-100 mb-6 sm:mb-8">
            Join thousands of job seekers who have landed their dream jobs with ResumeGen
          </p>
          <button
            onClick={onStartCreating}
            className="bg-white text-blue-600 hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-lg flex items-center space-x-1 sm:space-x-2 mx-auto"
          >
            <FiEdit3 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Start Creating Now</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 sm:space-x-2 mb-3 sm:mb-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FiFileText className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold">ResumeGen</h3>
            </div>
            <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">
              Create professional resumes that get you hired
            </p>
            <div className="flex justify-center space-x-4 sm:space-x-6 text-xs sm:text-sm text-gray-400 mb-4">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">Contact</a>
            </div>
                         <div className="border-t border-gray-700 pt-4">
                               <p className="text-xs text-gray-400">
                  Developed by{' '}
                  <a 
                    href="https://konthamjagan.netlify.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-200 underline transition-colors duration-200"
                  >
                    Jagan Mohan
                  </a>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Visit my website:{' '}
                  <a 
                    href="https://konthamjagan.netlify.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-200 underline transition-colors duration-200"
                  >
                    konthamjagan.netlify.app
                  </a>
                </p>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 