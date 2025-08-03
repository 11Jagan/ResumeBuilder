const db = require('../db/lowdbConfig');
const { v4: uuidv4 } = require('uuid');

class ResumeModel {
  // Get all resumes
  static getAllResumes(userId = null) {
    if (userId) {
      return db.get('resumes').filter({ userId }).value();
    }
    return db.get('resumes').value();
  }

  // Get resume by ID
  static getResumeById(id) {
    return db.get('resumes').find({ id }).value();
  }

  // Create new resume
  static createResume(resumeData, userId = null) {
    const newResume = {
      id: uuidv4(),
      ...resumeData,
      userId: userId, // Link to user if provided
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.get('resumes').push(newResume).write();
    return newResume;
  }

  // Update resume
  static updateResume(id, resumeData) {
    const updatedResume = {
      ...resumeData,
      id,
      updatedAt: new Date().toISOString()
    };

    db.get('resumes')
      .find({ id })
      .assign(updatedResume)
      .write();

    return updatedResume;
  }

  // Delete resume
  static deleteResume(id) {
    const deletedResume = db.get('resumes').find({ id }).value();
    db.get('resumes').remove({ id }).write();
    return deletedResume;
  }

  // Resume schema validation
  static validateResumeData(data) {
    const errors = [];
    

    
    // Basic structure validation only - all fields are optional
    if (!data) {
      errors.push('Resume data is required');
      return { isValid: false, errors };
    }
    
    // Ensure personalInfo exists, but fields are optional
    if (!data.personalInfo) {
      data.personalInfo = {}; // Create empty object if missing
    }
    
    // Ensure arrays exist
    if (!data.education) {
      data.education = [];
    }
    
    if (!data.experience) {
      data.experience = [];
    }
    
    if (!data.projects) {
      data.projects = [];
    }
    
    if (!data.achievements) {
      data.achievements = [];
    }
    
    // Ensure string fields exist
    if (!data.summary) {
      data.summary = '';
    }
    
    if (!data.skills) {
      data.skills = '';
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

module.exports = ResumeModel; 