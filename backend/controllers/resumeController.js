const ResumeModel = require('../models/resumeModel');
const jwt = require('jsonwebtoken');

class ResumeController {
  // Get all resumes (only for authenticated users, showing only their own resumes)
  static async getAllResumes(req, res) {
    try {
      // Set cache-control headers to prevent caching
      res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });

      // Since authenticateToken middleware is applied, req.user will always be available
      const userId = req.user.id;
      
      // Only get resumes belonging to this user
      const resumes = ResumeModel.getAllResumes(userId);
      
      res.status(200).json({
        success: true,
        data: resumes,
        count: resumes.length
      });
    } catch (error) {
      console.error('Error fetching resumes:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch resumes'
      });
    }
  }

  // Get resume by ID
  static async getResumeById(req, res) {
    try {
      const { id } = req.params;
      const resume = ResumeModel.getResumeById(id);

      if (!resume) {
        return res.status(404).json({
          success: false,
          error: 'Resume not found'
        });
      }

      res.status(200).json({
        success: true,
        data: resume
      });
    } catch (error) {
      console.error('Error fetching resume:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch resume'
      });
    }
  }

  // Create new resume (requires authentication)
  static async createResume(req, res) {
    try {
      const resumeData = req.body;
      

      
      // Since we're using authenticateToken middleware, req.user will always be available
      const userId = req.user.id;

      // Validate resume data
      const validation = ResumeModel.validateResumeData(resumeData);
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validation.errors
        });
      }

      const newResume = ResumeModel.createResume(resumeData, userId);
      
      res.status(201).json({
        success: true,
        message: 'Resume created successfully',
        data: newResume
      });
    } catch (error) {
      console.error('Error creating resume:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create resume'
      });
    }
  }

  // Update resume
  static async updateResume(req, res) {
    try {
      const { id } = req.params;
      const resumeData = req.body;

      // Check if resume exists
      const existingResume = ResumeModel.getResumeById(id);
      if (!existingResume) {
        return res.status(404).json({
          success: false,
          error: 'Resume not found'
        });
      }

      // Validate resume data
      const validation = ResumeModel.validateResumeData(resumeData);
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validation.errors
        });
      }

      const updatedResume = ResumeModel.updateResume(id, resumeData);
      
      res.status(200).json({
        success: true,
        message: 'Resume updated successfully',
        data: updatedResume
      });
    } catch (error) {
      console.error('Error updating resume:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update resume'
      });
    }
  }

  // Delete resume
  static async deleteResume(req, res) {
    try {
      const { id } = req.params;
      
      // Check if resume exists
      const existingResume = ResumeModel.getResumeById(id);
      if (!existingResume) {
        return res.status(404).json({
          success: false,
          error: 'Resume not found'
        });
      }

      const deletedResume = ResumeModel.deleteResume(id);
      
      res.status(200).json({
        success: true,
        message: 'Resume deleted successfully',
        data: deletedResume
      });
    } catch (error) {
      console.error('Error deleting resume:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete resume'
      });
    }
  }
}

module.exports = ResumeController; 