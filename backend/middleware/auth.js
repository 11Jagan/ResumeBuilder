const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Access token required'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        error: 'Invalid or expired token'
      });
    }

    // Get full user data from database
    const fullUser = UserModel.getUserById(user.id);
    if (!fullUser) {
      return res.status(403).json({
        success: false,
        error: 'User not found'
      });
    }

    req.user = fullUser;
    next();
  });
};

// Middleware to check if user owns the resume
const authorizeResumeAccess = (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  // Get resume from database
  const ResumeModel = require('../models/resumeModel');
  const resume = ResumeModel.getResumeById(id);

  if (!resume) {
    return res.status(404).json({
      success: false,
      error: 'Resume not found'
    });
  }

  // Check if resume belongs to user
  if (resume.userId && resume.userId !== userId) {
    return res.status(403).json({
      success: false,
      error: 'Access denied. You can only edit your own resumes.'
    });
  }

  req.resume = resume;
  next();
};

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email,
      name: user.name 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

module.exports = {
  authenticateToken,
  authorizeResumeAccess,
  generateToken
}; 