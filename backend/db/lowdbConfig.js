const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

// Create database file path
const dbPath = path.join(__dirname, 'db.json');
const adapter = new FileSync(dbPath);

// Initialize database
const db = low(adapter);

// Set default data structure
db.defaults({ resumes: [], users: [] }).write();

module.exports = db; 