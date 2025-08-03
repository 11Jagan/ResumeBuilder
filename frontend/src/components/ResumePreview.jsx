import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import TemplateOne from './TemplateOne';
import TemplateTwo from './TemplateTwo';

const ResumePreview = ({ resumeData, template, sectionOrder, selectedFont }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${resumeData.personalInfo.name || 'Resume'}_${new Date().toISOString().split('T')[0]}`,
    onAfterPrint: () => console.log('Print completed'),
  });

  const handleExport = () => {
    // Only export PDF, don't save to database
    handlePrint();
  };

  const renderTemplate = () => {
    switch (template) {
      case 1:
        return <TemplateOne resumeData={resumeData} sectionOrder={sectionOrder} selectedFont={selectedFont} />;
      case 2:
        return <TemplateTwo resumeData={resumeData} sectionOrder={sectionOrder} selectedFont={selectedFont} />;
      default:
        return <TemplateOne resumeData={resumeData} sectionOrder={sectionOrder} selectedFont={selectedFont} />;
    }
  };

  return (
    <div className="sticky top-4">

      <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Resume Preview</h3>
                     <button
             onClick={handleExport}
             className="btn-primary flex items-center space-x-2"
           >
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
             </svg>
             <span>Export</span>
           </button>
        </div>
        
                 <div className="text-sm text-gray-600 mb-4">
           <p>• Live preview updates as you type</p>
           <p>• Click "Export" to download PDF</p>
           <p>• Switch between templates using the buttons above</p>
         </div>
      </div>

      {/* Resume Content */}
      <div 
        ref={componentRef}
        className="bg-white rounded-lg shadow-lg overflow-hidden print:bg-white print:shadow-none print:rounded-none print:border-0"
        style={{ minHeight: '800px' }}
      >
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview; 