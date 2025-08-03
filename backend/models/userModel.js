const db = require('../db/lowdbConfig');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

class UserModel {
  // Initialize users collection if it doesn't exist
  static initializeUsers() {
    if (!db.has('users').value()) {
      db.set('users', []).write();
    }
  }

  // Get all users (for admin purposes)
  static getAllUsers() {
    return db.get('users').value();
  }

  // Get user by ID
  static getUserById(id) {
    return db.get('users').find({ id }).value();
  }

  // Get user by email
  static getUserByEmail(email) {
    return db.get('users').find({ email }).value();
  }

  // Create new user
  static async createUser(userData) {
    const { email, password, name } = userData;

    // Check if user already exists
    const existingUser = this.getUserByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
      id: uuidv4(),
      email,
      password: hashedPassword,
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.get('users').push(newUser).write();
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  // Validate user credentials
  static async validateUser(email, password) {
    const user = this.getUserByEmail(email);
    if (!user) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return null;
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // Update user
  static updateUser(id, userData) {
    const updatedUser = {
      ...userData,
      id,
      updatedAt: new Date().toISOString()
    };

    db.get('users')
      .find({ id })
      .assign(updatedUser)
      .write();

    return updatedUser;
  }

  // Delete user
  static deleteUser(id) {
    const deletedUser = db.get('users').find({ id }).value();
    db.get('users').remove({ id }).write();
    return deletedUser;
  }

  // User schema validation
  static validateUserData(data) {
    const errors = [];

    if (!data.email || !data.email.includes('@')) {
      errors.push('Valid email is required');
    }

    if (!data.password || data.password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    }

    if (!data.name || data.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Initialize users collection
UserModel.initializeUsers();

module.exports = UserModel; 