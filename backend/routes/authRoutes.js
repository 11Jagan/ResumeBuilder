const express = require('express');
const AuthController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/register - Register new user
router.post('/register', AuthController.register);

// POST /api/auth/login - Login user
router.post('/login', AuthController.login);

// GET /api/auth/profile - Get current user profile (protected)
router.get('/profile', authenticateToken, AuthController.getProfile);

// PUT /api/auth/profile - Update user profile (protected)
router.put('/profile', authenticateToken, AuthController.updateProfile);

module.exports = router; 