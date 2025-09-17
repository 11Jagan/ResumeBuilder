import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useUser } from '../context/UserContext';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
import SectionOrder from './SectionOrder';
import ValidationError from './ValidationError';
import SuccessNotification from './SuccessNotification';
import { FiEdit3 } from 'react-icons/fi';

const ResumeBuilder = ({ onBackToLanding, isPreviewMode, setIsPreviewMode, setSaveResumeFunction, setEditingState, setClearFormFunction }) => {
  const { isAuthenticated, apiCall } = useUser();
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: ''
    },
    summary: '',
    education: [
      {
        id: 1,
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: ''
      }
    ],
    experience: [
      {
        id: 1,
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ],
    skills: '',
    projects: [
      {
        id: 1,
        name: '',
        description: '',
        technologies: '',
        link: ''
      }
    ],
    achievements: [
      {
        id: 1,
        title: '',
        description: ''
      }
    ]
  });

  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [selectedFont, setSelectedFont] = useState('Times New Roman');
  const [savedResumes, setSavedResumes] = useState([]);
  const [validationError, setValidationError] = useState({
    isVisible: false,
    errors: []
  });
  const [successNotification, setSuccessNotification] = useState({
    isVisible: false,
    message: ''
  });
  const [editingResumeId, setEditingResumeId] = useState(null);
  const [isLoadingResume, setIsLoadingResume] = useState(false);
  const editingResumeIdRef = useRef(null);
  const [sectionOrder, setSectionOrder] = useState([
    'summary',
    'experience', 
    'education',
    'skills',
    'projects',
    'achievements'
  ]);

  // Font options
  const fontOptions = [
    { value: 'Times New Roman', label: 'Times New Roman', family: 'Times New Roman, serif' },
    { value: 'Segoe UI', label: 'Segoe UI', family: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' },
    { value: 'Georgia', label: 'Georgia', family: 'Georgia, Times, serif' },
    { value: 'Arial', label: 'Arial', family: 'Arial, Helvetica, sans-serif' },
    { value: 'Verdana', label: 'Verdana', family: 'Verdana, Geneva, sans-serif' },
    { value: 'Calibri', label: 'Calibri', family: 'Calibri, Candara, Segoe, Optima, Arial, sans-serif' },
    { value: 'Cambria', label: 'Cambria', family: 'Cambria, Georgia, serif' },
    { value: 'Tahoma', label: 'Tahoma', family: 'Tahoma, Geneva, Verdana, sans-serif' }
  ];

  // Define fetchSavedResumes function first
  const [serverError, setServerError] = useState(null);
  
  const fetchSavedResumes = useCallback(async () => {
    try {
      setServerError(null);
      
      // Only fetch resumes if the user is authenticated
      if (!isAuthenticated) {
        setSavedResumes([]);
        return;
      }
      
      // Add cache-busting parameter to ensure fresh data
      const timestamp = Date.now();
      
      const response = await apiCall(`/api/resumes?t=${timestamp}`);
      
      if (!response.ok) {
        console.error('Server returned error:', response.status);
        setSavedResumes([]);
        return;
      }
      
      const data = await response.json();
      if (data.success) {
        setSavedResumes(data.data);
      } else {
        console.error('API returned error:', data.error);
        setSavedResumes([]);
      }
    } catch (error) {
      console.error('Error fetching saved resumes:', error);
      setSavedResumes([]);
      
      if (error.message.includes('server') || error.message.includes('timeout')) {
        setServerError(error.message);
      } else if (error.message === 'Authentication required') {
        // User is not authenticated
        setSavedResumes([]);
      }
    }
  }, [apiCall, isAuthenticated]);

  // Load saved resumes on component mount and when authentication changes
  useEffect(() => {
    // Add a small delay to prevent rapid successive calls
    const timer = setTimeout(() => {
      fetchSavedResumes();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [isAuthenticated, fetchSavedResumes]);

  // Pass editing state to parent component
  useEffect(() => {
    if (setEditingState) {
      setEditingState(editingResumeId);
    }
  }, [editingResumeId, setEditingState]);



  useEffect(() => {
    editingResumeIdRef.current = editingResumeId;
  }, [editingResumeId]);

  const handleInputChange = (section, field, value, index = null) => {
    setResumeData(prev => {
      const newData = { ...prev };
      
      if (index !== null) {
        // Handle array fields (education, experience, projects, achievements)
        newData[section] = [...prev[section]];
        newData[section][index] = { ...newData[section][index], [field]: value };
      } else if (section === 'personalInfo') {
        newData.personalInfo = { ...newData.personalInfo, [field]: value };
      } else {
        newData[section] = value;
      }
      
      return newData;
    });
  };

  const addArrayItem = (section) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], getDefaultItem(section)]
    }));
  };

  const removeArrayItem = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const getDefaultItem = (section) => {
    const defaults = {
      education: { id: Date.now(), institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' },
      experience: { id: Date.now(), company: '', position: '', startDate: '', endDate: '', description: '' },
      projects: { id: Date.now(), name: '', description: '', technologies: '', link: '' },
      achievements: { id: Date.now(), title: '', description: '' }
    };
    return defaults[section];
  };

  // Define clearForm function first
  const clearForm = useCallback(() => {
    setResumeData({
      personalInfo: {
        name: '',
        email: '',
        phone: '',
        location: '',
        linkedin: ''
      },
      summary: '',
      education: [
        {
          id: 1,
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          gpa: ''
        }
      ],
      experience: [
        {
          id: 1,
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: ''
        }
      ],
      skills: '',
      projects: [
        {
          id: 1,
          name: '',
          description: '',
          technologies: '',
          link: ''
        }
      ],
      achievements: [
        {
          id: 1,
          title: '',
          description: ''
        }
      ]
    });
    setSelectedTemplate(1);
    setSelectedFont('Times New Roman');
    setSectionOrder([
      'summary',
      'experience', 
      'education',
      'skills',
      'projects',
      'achievements'
    ]);
    setEditingResumeId(null);
    editingResumeIdRef.current = null;
  }, []);

  // Pass clear form function to parent component (after clearForm is defined)
  useEffect(() => {
    if (setClearFormFunction) {
      setClearFormFunction(() => clearForm);
    }
  }, [setClearFormFunction, clearForm]);

  // Define saveResume function first
  const saveResume = useCallback(async () => {
    try {
      // Check if resume is still loading
      if (isLoadingResume) {
        return;
      }
      
      // Use ref value if state is null (React timing issue)
      const currentEditingId = editingResumeId || editingResumeIdRef.current;
       
      // If we're editing but the editingResumeId is null, something went wrong
      if (currentEditingId === null && resumeData.personalInfo.name) {
        // Try to find the resume in savedResumes and set the editing ID
        const matchingResume = savedResumes.find(r => 
          r.personalInfo.name === resumeData.personalInfo.name &&
          r.personalInfo.email === resumeData.personalInfo.email
        );
        if (matchingResume) {
          setEditingResumeId(matchingResume.id);
          editingResumeIdRef.current = matchingResume.id;
          // Wait a moment for the state to update
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      
      // If we're editing but the data is empty, wait a bit more
      if (currentEditingId && (!resumeData.personalInfo.name || !resumeData.summary)) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      const dataToSend = {
        ...resumeData,
        template: selectedTemplate,
        font: selectedFont,
        sectionOrder: sectionOrder
      };

      let response;
      let successMessage;

      if (currentEditingId) {
        // Update existing resume
        response = await apiCall(`/api/resumes/${currentEditingId}`, {
          method: 'PUT',
          body: JSON.stringify(dataToSend),
        });
        successMessage = 'Resume updated successfully!';
      } else {
        // Create new resume
        response = await apiCall('/api/resumes', {
          method: 'POST',
          body: JSON.stringify(dataToSend),
        });
        successMessage = 'Resume saved successfully!';
      }

      const data = await response.json();
      if (data.success) {
        setSuccessNotification({
          isVisible: true,
          message: successMessage
        });
        setEditingResumeId(null); // Clear editing state
        editingResumeIdRef.current = null; // Clear ref
        fetchSavedResumes();
      } else {
        // Show custom validation error
        if (data.error === 'Validation failed' && data.details && Array.isArray(data.details)) {
          setValidationError({
            isVisible: true,
            errors: data.details
          });
        } else {
          // For other errors, still use alert
          const errorMessage = data.error || data.message || 'Unknown error occurred';
          alert(`Error ${currentEditingId ? 'updating' : 'saving'} resume: ${errorMessage}`);
        }
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      const currentEditingId = editingResumeId || editingResumeIdRef.current;
      alert(`Error ${currentEditingId ? 'updating' : 'saving'} resume. Please try again.`);
    }
     }, [editingResumeId, resumeData, selectedTemplate, selectedFont, sectionOrder, isLoadingResume, savedResumes, apiCall, fetchSavedResumes]);

  // Avoid parent-child update loops by exposing a stable save function
  const saveResumeRef = useRef(saveResume);
  useEffect(() => {
    saveResumeRef.current = saveResume;
  }, [saveResume]);

  // Set stable wrapper once
  useEffect(() => {
    if (setSaveResumeFunction) {
      setSaveResumeFunction(() => (...args) => saveResumeRef.current(...args));
    }
    // Intentionally run once to keep stable function in parent
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSaveResumeFunction]);

  const loadResume = (resume) => {
    // Only allow loading resumes if the user is authenticated or if it's their resume
    if (!isAuthenticated && resume.userId) {
      setValidationError({
        isVisible: true,
        errors: ['Please sign in to load this resume.']
      });
      return;
    }
    // If we're currently editing, don't clear the editing state
    if (editingResumeId) {
      return;
    }
    
    // Ensure the data structure is correct and all required fields exist
    const normalizedResume = {
      personalInfo: {
        name: resume.personalInfo?.name || '',
        email: resume.personalInfo?.email || '',
        phone: resume.personalInfo?.phone || '',
        location: resume.personalInfo?.location || '',
        linkedin: resume.personalInfo?.linkedin || ''
      },
      summary: resume.summary || '',
      education: resume.education && resume.education.length > 0 ? resume.education : [
        {
          id: 1,
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          gpa: ''
        }
      ],
      experience: resume.experience && resume.experience.length > 0 ? resume.experience : [
        {
          id: 1,
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: ''
        }
      ],
      skills: resume.skills || '',
      projects: resume.projects && resume.projects.length > 0 ? resume.projects : [
        {
          id: 1,
          name: '',
          description: '',
          technologies: '',
          link: ''
        }
      ],
      achievements: resume.achievements && resume.achievements.length > 0 ? resume.achievements : [
        {
          id: 1,
          title: '',
          description: ''
        }
      ]
    };
    
    setResumeData(normalizedResume);
    if (resume.template) setSelectedTemplate(resume.template);
    if (resume.font) setSelectedFont(resume.font);
    if (resume.sectionOrder) setSectionOrder(resume.sectionOrder);
    // Clear editing state when loading a resume for viewing
    setEditingResumeId(null);
  };

  const loadResumeForEditing = (resume) => {
    
    // Set loading state
    setIsLoadingResume(true);
    
    // Ensure the data structure is correct and all required fields exist
    const normalizedResume = {
      personalInfo: {
        name: resume.personalInfo?.name || '',
        email: resume.personalInfo?.email || '',
        phone: resume.personalInfo?.phone || '',
        location: resume.personalInfo?.location || '',
        linkedin: resume.personalInfo?.linkedin || ''
      },
      summary: resume.summary || '',
      education: resume.education && resume.education.length > 0 ? resume.education : [
        {
          id: 1,
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          gpa: ''
        }
      ],
      experience: resume.experience && resume.experience.length > 0 ? resume.experience : [
        {
          id: 1,
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: ''
        }
      ],
      skills: resume.skills || '',
      projects: resume.projects && resume.projects.length > 0 ? resume.projects : [
        {
          id: 1,
          name: '',
          description: '',
          technologies: '',
          link: ''
        }
      ],
      achievements: resume.achievements && resume.achievements.length > 0 ? resume.achievements : [
        {
          id: 1,
          title: '',
          description: ''
        }
      ]
    };
    

    
    // Set the data and other states
    setResumeData(normalizedResume);
    if (resume.template) setSelectedTemplate(resume.template);
    if (resume.font) setSelectedFont(resume.font);
    if (resume.sectionOrder) setSectionOrder(resume.sectionOrder);
    
    // Clear loading state after a short delay
    setTimeout(() => {
      setIsLoadingResume(false);
    }, 100);
    
    // Don't clear editing state when loading for editing
  };

  const updateResume = async (resumeId) => {
    if (!isAuthenticated) {
      alert('Please sign in to edit your resumes.');
      return;
    }

    // First, load the resume data into the form
    const resumeToUpdate = savedResumes.find(resume => resume.id === resumeId);
    if (resumeToUpdate) {
       
       // Set editing ID first
       setEditingResumeId(resumeId);
       editingResumeIdRef.current = resumeId;
      
      // Then load the resume data
      loadResumeForEditing(resumeToUpdate);
      
      // Wait a moment for the state to update
      setTimeout(() => {
        setSuccessNotification({
          isVisible: true,
          message: 'Resume loaded for editing. Make your changes and click "Update Resume" to save changes.'
        });
      }, 200);
    } else {
      alert('Resume not found for editing.');
    }
  };

  const deleteResume = async (resumeId) => {
    if (!isAuthenticated) {
      setValidationError({
        isVisible: true,
        errors: ['Please sign in to delete your resumes.']
      });
      return;
    }

    if (!window.confirm('Are you sure you want to delete this resume?')) {
      return;
    }

    try {

      const response = await apiCall(`/api/resumes/${resumeId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        console.error('Server returned error on delete:', response.status);
        setValidationError({
          isVisible: true,
          errors: [`Server error: ${response.status}. Please try again.`]
        });
        return;
      }

      const data = await response.json();
      if (data.success) {
        setSuccessNotification({
          isVisible: true,
          message: 'Resume deleted successfully!'
        });
        
        // Update the local state immediately and then fetch fresh data
        setSavedResumes(prev => prev.filter(resume => resume.id !== resumeId));
        
        // Fetch fresh data from server after a short delay
        setTimeout(() => {
          fetchSavedResumes();
        }, 200);
      } else {
        setValidationError({
          isVisible: true,
          errors: [data.error || 'Unknown error occurred while deleting resume']
        });
      }
    } catch (error) {
      console.error('Error deleting resume:', error);
      if (error.message === 'Authentication required') {
        setValidationError({
          isVisible: true,
          errors: ['Please sign in to delete your resumes.']
        });
      } else {
        setValidationError({
          isVisible: true,
          errors: ['Network error while deleting resume. Please try again.']
        });
      }
    }
  };

  const reorderSection = (fromIndex, toIndex) => {
    const newOrder = [...sectionOrder];
    const [movedItem] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, movedItem);
    setSectionOrder(newOrder);
  };

  const moveSectionUp = (index) => {
    if (index > 0) {
      reorderSection(index, index - 1);
    }
  };

  const moveSectionDown = (index) => {
    if (index < sectionOrder.length - 1) {
      reorderSection(index, index + 1);
    }
  };

  const closeValidationError = () => {
    setValidationError({
      isVisible: false,
      errors: []
    });
  };

  const closeSuccessNotification = () => {
    setSuccessNotification({
      isVisible: false,
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ValidationError
        errors={validationError.errors}
        isVisible={validationError.isVisible}
        onClose={closeValidationError}
      />
      <SuccessNotification
        message={successNotification.message}
        isVisible={successNotification.isVisible}
        onClose={closeSuccessNotification}
      />

      {/* Template and Font Selection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
          <span className="text-sm font-medium text-gray-700">Template:</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTemplate(1)}
              className={`px-3 sm:px-4 py-2 rounded-lg border text-sm sm:text-base ${
                selectedTemplate === 1
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Professional
            </button>
            <button
              onClick={() => setSelectedTemplate(2)}
              className={`px-3 sm:px-4 py-2 rounded-lg border text-sm sm:text-base ${
                selectedTemplate === 2
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Modern
            </button>
          </div>
        </div>

        {/* Font Selection */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
          <span className="text-sm font-medium text-gray-700">Font:</span>
          <select
            value={selectedFont}
            onChange={(e) => setSelectedFont(e.target.value)}
            className="px-3 sm:px-4 py-2 rounded-lg border border-gray-300 text-sm sm:text-base bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {fontOptions.map((font) => (
              <option key={font.value} value={font.value} style={{ fontFamily: font.family }}>
                {font.label}
              </option>
            ))}
          </select>
        </div>
        
        {/* Section Order */}
        <SectionOrder 
          sectionOrder={sectionOrder}
          onMoveUp={moveSectionUp}
          onMoveDown={moveSectionDown}
        />
      </div>

             {/* Main Content */}
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
         {isLoadingResume && (
           <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
             <p className="text-sm text-blue-800">
               🔄 Loading resume data...
             </p>
           </div>
         )}
         <div className={`${isPreviewMode ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'} grid gap-4 sm:gap-6 lg:gap-8`}>
          {/* Form Section */}
          <div className={`${isPreviewMode ? 'hidden' : ''}`}>
            <ResumeForm
              resumeData={resumeData}
              onInputChange={handleInputChange}
              onAddItem={addArrayItem}
              onRemoveItem={removeArrayItem}
            />
          </div>

          {/* Preview Section */}
          <div className={`${!isPreviewMode ? 'hidden lg:block' : ''}`}>
            <ResumePreview
              resumeData={resumeData}
              template={selectedTemplate}
              sectionOrder={sectionOrder}
              selectedFont={selectedFont}
            />
          </div>
        </div>

                          {/* Saved Resumes */}
         {savedResumes.length > 0 ? (
           <div className="mt-6 sm:mt-8">
             <div className="flex justify-between items-center mb-3 sm:mb-4">
               <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                 {isAuthenticated ? 'Your Saved Resumes' : 'Saved Resumes'}
               </h2>
               <div className="flex space-x-4">
                 <button
                   onClick={fetchSavedResumes}
                   className="text-sm text-blue-600 hover:text-blue-800 underline"
                 >
                   Refresh List
                 </button>
                 <button
                   onClick={() => {
                     localStorage.removeItem('resumeCache');
                     fetchSavedResumes();
                   }}
                   className="text-sm text-red-600 hover:text-red-800 underline"
                 >
                   Clear Cache
                 </button>
               </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
               {savedResumes.map((resume) => (
                 <div key={resume.id} className="section-card">
                   <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                     {resume.personalInfo?.name || 'Untitled Resume'}
                   </h3>
                   <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                     {resume.personalInfo?.email || 'No email'}
                   </p>
                   <div className="flex space-x-2">
                                           <button
                        onClick={() => loadResume(resume)}
                        disabled={editingResumeId !== null || (!isAuthenticated && resume.userId)}
                        className={`btn-secondary flex items-center space-x-1 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 ${
                          editingResumeId !== null || (!isAuthenticated && resume.userId) ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <FiEdit3 className="w-3 h-3" />
                        <span>Load</span>
                      </button>
                     {isAuthenticated && resume.userId && (
                       <>
                                                   <button
                            onClick={() => updateResume(resume.id)}
                            className="btn-primary flex items-center space-x-1 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                          >
                            <FiEdit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                         <button
                           onClick={() => deleteResume(resume.id)}
                           className="bg-red-600 text-white flex items-center space-x-1 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 rounded-md hover:bg-red-700 transition duration-200"
                         >
                           <span>Delete</span>
                         </button>
                       </>
                     )}
                   </div>
                   {!isAuthenticated && resume.userId && (
                     <p className="text-xs text-gray-500 mt-2">
                       Sign in to edit this resume
                     </p>
                   )}
                 </div>
               ))}
             </div>
             {!isAuthenticated && (
               <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                 <p className="text-sm text-blue-800">
                   💡 <strong>Tip:</strong> Sign in to edit and manage your saved resumes.
                 </p>
               </div>
             )}
           </div>
         ) : (
                     <div className="mt-6 sm:mt-8">
            <div className="p-6 bg-blue-50 border border-blue-200 rounded-md">
              <h2 className="text-lg sm:text-xl font-semibold text-blue-900 mb-2">
                {isAuthenticated ? "No Saved Resumes" : "Sign In to See Your Saved Resumes"}
              </h2>
              
              {serverError ? (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                  <h3 className="text-md font-semibold text-red-800 mb-1">Server Connection Error</h3>
                  <p className="text-sm text-red-700">
                    {serverError}
                  </p>
                  <div className="mt-3">
                    <button 
                      onClick={fetchSavedResumes}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                    >
                      Retry Connection
                    </button>
                  </div>
                </div>
              ) : isAuthenticated ? (
                <p className="text-sm text-blue-800">
                  You don't have any saved resumes yet. Create your first resume by filling out the form above and clicking "Save Resume".
                </p>
              ) : (
                <p className="text-sm text-blue-800">
                  Please sign in to view, edit, and manage your saved resumes. Your resumes are private and only visible to you.
                </p>
              )}
              
              {isAuthenticated && (
                <p className="text-sm text-blue-700 mt-2">
                  💡 <strong>Note:</strong> Your resumes are private and only visible to you.
                </p>
              )}
            </div>
          </div>
         )}
      </div>
    </div>
  );
};

export default ResumeBuilder; 