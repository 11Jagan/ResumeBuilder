import React, { useState } from 'react';
import { UserProvider } from './context/UserContext';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import ResumeBuilder from './components/ResumeBuilder';
import TemplatesPage from './components/TemplatesPage';

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'templates', or 'builder'
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleStartCreating = () => {
    setCurrentView('builder');
  };

  const handleViewTemplates = () => {
    setCurrentView('templates');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  const [saveResumeFunction, setSaveResumeFunction] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [clearFormFunction, setClearFormFunction] = useState(null);

  const handleSaveResume = () => {
    if (saveResumeFunction) {
      saveResumeFunction();
    }
  };

  const handleClearForm = () => {
    if (clearFormFunction) {
      clearFormFunction();
    }
  };

  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-50">
        <Header 
          currentView={currentView}
          onBackToLanding={handleBackToLanding}
          isPreviewMode={isPreviewMode}
          setIsPreviewMode={setIsPreviewMode}
          saveResume={handleSaveResume}
          onStartCreating={handleStartCreating}
          isEditing={isEditing}
          clearForm={handleClearForm}
          onLogout={handleClearForm}
        />
        <main>
          {currentView === 'landing' && (
            <LandingPage onStartCreating={handleStartCreating} onViewTemplates={handleViewTemplates} />
          )}
          {currentView === 'templates' && (
            <TemplatesPage onStartCreating={handleStartCreating} onBackToLanding={handleBackToLanding} />
          )}
          {currentView === 'builder' && (
            <ResumeBuilder 
              onBackToLanding={handleBackToLanding}
              isPreviewMode={isPreviewMode}
              setIsPreviewMode={setIsPreviewMode}
              setSaveResumeFunction={setSaveResumeFunction}
              setEditingState={setIsEditing}
              setClearFormFunction={setClearFormFunction}
            />
          )}
        </main>
      </div>
    </UserProvider>
  );
}

export default App; 