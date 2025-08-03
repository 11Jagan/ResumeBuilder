const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const resumeRoutes = require('./routes/resumeRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://resume-builder-sigma-rust.vercel.app', 'https://resume-builder-sigma-rust.vercel.app/', 'https://resumebuilder-ih9k.onrender.com'] 
    : ['http://localhost:3000'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
console.log('Loading routes...');
app.use('/api/resumes', resumeRoutes);
app.use('/api/auth', authRoutes);
console.log('Routes loaded successfully');

// Root endpoint
app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'Resume Generator API is running' });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Resume Generator API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
}); 