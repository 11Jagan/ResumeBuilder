const UserModel = require('../models/userModel');
const { generateToken } = require('../middleware/auth');

class AuthController {
  // Register new user
  static async register(req, res) {
    try {
      const { email, password, name } = req.body;

      // Validate user data
      const validation = UserModel.validateUserData({ email, password, name });
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validation.errors
        });
      }

      // Create user
      const newUser = await UserModel.createUser({ email, password, name });
      
      // Generate token
      const token = generateToken(newUser);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: newUser,
          token
        }
      });
    } catch (error) {
      console.error('Error registering user:', error);
      
      if (error.message === 'User with this email already exists') {
        return res.status(409).json({
          success: false,
          error: 'User with this email already exists'
        });
      }

      res.status(500).json({
        success: false,
        error: 'Failed to register user'
      });
    }
  }

  // Login user
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email and password are required'
        });
      }

      // Validate user credentials
      const user = await UserModel.validateUser(email, password);
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Invalid email or password'
        });
      }

      // Generate token
      const token = generateToken(user);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          user,
          token
        }
      });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to login'
      });
    }
  }

  // Get current user profile
  static async getProfile(req, res) {
    try {
      const user = req.user;
      
      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch profile'
      });
    }
  }

  // Update user profile
  static async updateProfile(req, res) {
    try {
      const { name, email } = req.body;
      const userId = req.user.id;

      // Validate input
      if (!name || name.trim().length < 2) {
        return res.status(400).json({
          success: false,
          error: 'Name must be at least 2 characters long'
        });
      }

      // Check if email is being changed and if it's already taken
      if (email && email !== req.user.email) {
        const existingUser = UserModel.getUserByEmail(email);
        if (existingUser && existingUser.id !== userId) {
          return res.status(409).json({
            success: false,
            error: 'Email is already taken'
          });
        }
      }

      // Update user
      const updatedUser = UserModel.updateUser(userId, { name, email });
      
      // Remove password from response
      const { password: _, ...userWithoutPassword } = updatedUser;

      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: userWithoutPassword
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update profile'
      });
    }
  }
}

module.exports = AuthController; 