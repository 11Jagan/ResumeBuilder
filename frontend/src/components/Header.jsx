import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import AuthModal from './AuthModal';
import FlashNotification from './FlashNotification';
import { FiDownload, FiEye, FiArrowLeft, FiFileText, FiEdit3 } from 'react-icons/fi';

const Header = ({ 
  currentView, 
  onBackToLanding, 
  isPreviewMode, 
  setIsPreviewMode, 
  saveResume,
  onStartCreating,
  isEditing,
  clearForm,
  onLogout
}) => {
  const { user, isAuthenticated, logout } = useUser();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [flashNotification, setFlashNotification] = useState({
    isVisible: false,
    message: '',
    type: 'success'
  });

  const handleLoginClick = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleRegisterClick = () => {
    setAuthMode('register');
    setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    // Show login success notification
    setFlashNotification({
      isVisible: true,
      message: `Welcome back, ${user?.name || 'User'}!`,
      type: 'success'
    });
  };

  const handleLogout = () => {
    const userName = user?.name || 'User';
    logout();
    // Clear form when user logs out
    if (onLogout) {
      onLogout();
    }
    // Show logout notification
    setFlashNotification({
      isVisible: true,
      message: `Goodbye, ${userName}! You have been logged out.`,
      type: 'logout'
    });
  };

  const closeFlashNotification = () => {
    setFlashNotification(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <>
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            {/* Left side - Logo and Back button */}
            <div className="flex items-center space-x-4">
              {currentView === 'builder' && (
                <button
                  onClick={onBackToLanding}
                  className="btn-secondary flex items-center space-x-2 text-sm px-3 py-2"
                >
                  <FiArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </button>
              )}
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <FiFileText className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                </div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">ResumeGen</h1>
              </div>
            </div>

            {/* Right side - Actions and Authentication */}
            <div className="flex items-center space-x-4">
              {/* Resume Builder Actions */}
              {currentView === 'builder' && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsPreviewMode(!isPreviewMode)}
                    className="btn-secondary flex items-center space-x-2 text-sm px-3 py-2"
                  >
                    <FiEye className="w-4 h-4" />
                    <span>{isPreviewMode ? 'Edit Mode' : 'Preview Mode'}</span>
                  </button>
                                                       {isAuthenticated ? (
                    <button
                      onClick={saveResume}
                      className="btn-primary flex items-center space-x-2 text-sm px-3 py-2"
                    >
                      <FiDownload className="w-4 h-4" />
                      <span>{isEditing ? 'Update Resume' : 'Save Resume'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowAuthModal(true)}
                      className="bg-gray-300 text-gray-700 flex items-center space-x-2 text-sm px-3 py-2 rounded-md hover:bg-gray-400 transition duration-200"
                      title="Sign in to save your resume"
                    >
                      <FiDownload className="w-4 h-4" />
                      <span>Sign In to Save</span>
                    </button>
                  )}
                   <button
                     onClick={clearForm}
                     className="btn-secondary flex items-center space-x-2 text-sm px-3 py-2"
                   >
                     <FiEdit3 className="w-4 h-4" />
                     <span>New Resume</span>
                   </button>
                </div>
              )}

              {/* Create Resume Button (for landing and templates) */}
              {currentView !== 'builder' && (
                <button
                  onClick={onStartCreating}
                  className="btn-primary flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-3"
                >
                  <FiEdit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Create Resume</span>
                </button>
              )}

                             {/* Authentication */}
               {isAuthenticated ? (
                 <div className="flex items-center space-x-4">
                   <button
                     onClick={handleLogout}
                     className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition duration-200"
                   >
                     Logout
                   </button>
                 </div>
               ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleLoginClick}
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={handleRegisterClick}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-200"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

             <AuthModal
         isOpen={showAuthModal}
         onClose={() => setShowAuthModal(false)}
         onLogin={handleAuthSuccess}
         onRegister={handleAuthSuccess}
         mode={authMode}
       />
       
       <FlashNotification
         isVisible={flashNotification.isVisible}
         message={flashNotification.message}
         type={flashNotification.type}
         onClose={closeFlashNotification}
       />
     </>
   );
 };

export default Header; 