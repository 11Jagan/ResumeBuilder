const express = require('express');
const ResumeController = require('../controllers/resumeController');
const { authenticateToken, authorizeResumeAccess } = require('../middleware/auth');

const router = express.Router();

// GET /api/resumes - Get all resumes (requires authentication, only shows user's own resumes)
router.get('/', authenticateToken, ResumeController.getAllResumes);

// GET /api/resumes/:id - Get resume by ID (requires authentication and ownership)
router.get('/:id', authenticateToken, authorizeResumeAccess, ResumeController.getResumeById);

// POST /api/resumes - Create new resume (requires authentication)
router.post('/', authenticateToken, ResumeController.createResume);

// PUT /api/resumes/:id - Update resume (requires authentication)
router.put('/:id', authenticateToken, authorizeResumeAccess, ResumeController.updateResume);

// DELETE /api/resumes/:id - Delete resume (requires authentication)
router.delete('/:id', authenticateToken, authorizeResumeAccess, ResumeController.deleteResume);

module.exports = router; 