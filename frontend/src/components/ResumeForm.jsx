import React from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import RichTextEditor from './RichTextEditor';

const ResumeForm = ({ resumeData, onInputChange, onAddItem, onRemoveItem }) => {
  const renderPersonalInfo = () => (
    <div className="section-card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            value={resumeData.personalInfo.name}
            onChange={(e) => onInputChange('personalInfo', 'name', e.target.value)}
            className="input-field"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={resumeData.personalInfo.email}
            onChange={(e) => onInputChange('personalInfo', 'email', e.target.value)}
            className="input-field"
            placeholder="john.doe@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            value={resumeData.personalInfo.phone}
            onChange={(e) => onInputChange('personalInfo', 'phone', e.target.value)}
            className="input-field"
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            value={resumeData.personalInfo.location}
            onChange={(e) => onInputChange('personalInfo', 'location', e.target.value)}
            className="input-field"
            placeholder="City, State"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
          <input
            type="url"
            value={resumeData.personalInfo.linkedin}
            onChange={(e) => onInputChange('personalInfo', 'linkedin', e.target.value)}
            className="input-field"
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>
      </div>
    </div>
  );

  const renderSummary = () => (
    <div className="section-card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Summary</h3>
      <RichTextEditor
        value={resumeData.summary}
        onChange={(value) => onInputChange('summary', null, value)}
        placeholder="Write a compelling summary of your professional background, key skills, and career objectives... Use Ctrl+B to make text bold."
      />
    </div>
  );

  const renderEducation = () => (
    <div className="section-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Education</h3>
        <button
          onClick={() => onAddItem('education')}
          className="btn-secondary flex items-center space-x-1 text-sm"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>
      {resumeData.education.map((edu, index) => (
        <div key={edu.id} className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-medium text-gray-900">Education #{index + 1}</h4>
            {resumeData.education.length > 1 && (
              <button
                onClick={() => onRemoveItem('education', index)}
                className="text-red-600 hover:text-red-800"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
          <input
            type="text"
            value={edu.institution}
            onChange={(e) => onInputChange('education', 'institution', e.target.value, index)}
            className="input-field"
            placeholder="University Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
          <input
            type="text"
            value={edu.degree}
            onChange={(e) => onInputChange('education', 'degree', e.target.value, index)}
            className="input-field"
            placeholder="Bachelor's Degree"
          />
        </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
              <input
                type="text"
                value={edu.field}
                onChange={(e) => onInputChange('education', 'field', e.target.value, index)}
                className="input-field"
                placeholder="Computer Science"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GPA</label>
              <input
                type="text"
                value={edu.gpa}
                onChange={(e) => onInputChange('education', 'gpa', e.target.value, index)}
                className="input-field"
                placeholder="3.8/4.0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="month"
                value={edu.startDate}
                onChange={(e) => onInputChange('education', 'startDate', e.target.value, index)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="month"
                value={edu.endDate}
                onChange={(e) => onInputChange('education', 'endDate', e.target.value, index)}
                className="input-field"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderExperience = () => (
    <div className="section-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
        <button
          onClick={() => onAddItem('experience')}
          className="btn-secondary flex items-center space-x-1 text-sm"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>
      {resumeData.experience.map((exp, index) => (
        <div key={exp.id} className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-medium text-gray-900">Experience #{index + 1}</h4>
            {resumeData.experience.length > 1 && (
              <button
                onClick={() => onRemoveItem('experience', index)}
                className="text-red-600 hover:text-red-800"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            )}
          </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => onInputChange('experience', 'company', e.target.value, index)}
                  className="input-field"
                  placeholder="Google"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => onInputChange('experience', 'position', e.target.value, index)}
                  className="input-field"
                  placeholder="Software Engineer"
                />
              </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="month"
                value={exp.startDate}
                onChange={(e) => onInputChange('experience', 'startDate', e.target.value, index)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="month"
                value={exp.endDate}
                onChange={(e) => onInputChange('experience', 'endDate', e.target.value, index)}
                className="input-field"
                placeholder="Present"
              />
            </div>
                         <div className="md:col-span-2">
               <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
               <RichTextEditor
                 value={exp.description}
                 onChange={(value) => onInputChange('experience', 'description', value, index)}
                 placeholder="Enter your responsibilities and achievements as bullet points. Use Ctrl+B to make text bold."
                 className=""
               />
             </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSkills = () => (
    <div className="section-card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Skills</h3>
      <textarea
        value={resumeData.skills}
        onChange={(e) => onInputChange('skills', null, e.target.value)}
        className="input-field h-32 resize-none"
        placeholder="Enter your technical skills in categories (e.g., Frontend: HTML, CSS, JavaScript, React&#10;Backend: Node.js, Express, MongoDB&#10;Tools: Git, Docker, AWS...)"
      />
    </div>
  );

  const renderProjects = () => (
    <div className="section-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
        <button
          onClick={() => onAddItem('projects')}
          className="btn-secondary flex items-center space-x-1 text-sm"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>
      {resumeData.projects.map((project, index) => (
        <div key={project.id} className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-medium text-gray-900">Project #{index + 1}</h4>
            {resumeData.projects.length > 1 && (
              <button
                onClick={() => onRemoveItem('projects', index)}
                className="text-red-600 hover:text-red-800"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
              <input
                type="text"
                value={project.name}
                onChange={(e) => onInputChange('projects', 'name', e.target.value, index)}
                className="input-field"
                placeholder="Project Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Technologies</label>
              <input
                type="text"
                value={project.technologies}
                onChange={(e) => onInputChange('projects', 'technologies', e.target.value, index)}
                className="input-field"
                placeholder="React, Node.js, MongoDB"
              />
            </div>
                         <div className="md:col-span-2">
               <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
               <RichTextEditor
                 value={project.description}
                 onChange={(value) => onInputChange('projects', 'description', value, index)}
                 placeholder="Describe the project as bullet points. Use Ctrl+B to make text bold."
                 className=""
               />
             </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Link</label>
              <input
                type="url"
                value={project.link}
                onChange={(e) => onInputChange('projects', 'link', e.target.value, index)}
                className="input-field"
                placeholder="https://github.com/username/project"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderAchievements = () => (
    <div className="section-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Achievements & Awards</h3>
        <button
          onClick={() => onAddItem('achievements')}
          className="btn-secondary flex items-center space-x-1 text-sm"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add Achievement</span>
        </button>
      </div>
      {resumeData.achievements.map((achievement, index) => (
        <div key={achievement.id} className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-medium text-gray-900">Achievement #{index + 1}</h4>
            {resumeData.achievements.length > 1 && (
              <button
                onClick={() => onRemoveItem('achievements', index)}
                className="text-red-600 hover:text-red-800"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={achievement.title}
                onChange={(e) => onInputChange('achievements', 'title', e.target.value, index)}
                className="input-field"
                placeholder="Award or Achievement Title"
              />
            </div>
                         <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
               <RichTextEditor
                 value={achievement.description}
                 onChange={(value) => onInputChange('achievements', 'description', value, index)}
                 placeholder="Describe the achievement as bullet points. Use Ctrl+B to make text bold."
                 className=""
               />
             </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {renderPersonalInfo()}
      {renderSummary()}
      {renderEducation()}
      {renderExperience()}
      {renderSkills()}
      {renderProjects()}
      {renderAchievements()}
    </div>
  );
};

export default ResumeForm; 