# 📄 Resume Generator

A full-stack Resume Generator web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) following the MVC (Model-View-Controller) pattern on the backend.

## 🚀 Features

### Frontend (React + Tailwind CSS)
- **Interactive Form**: Complete resume form with all necessary fields
- **Live Preview**: Real-time preview as you type
- **Two Templates**: Choose between two professional resume designs
- **PDF Export**: Export resume as PDF using react-to-print
- **Responsive Design**: Works perfectly on all devices
- **Auto-scroll**: Preview automatically scrolls as user types
- **Save & Load**: Save resumes and load them later

### Backend (Node.js + Express + LowDB)
- **MVC Architecture**: Clean separation of concerns
- **RESTful API**: Complete CRUD operations
- **JSON Database**: Uses LowDB for simple data storage
- **Data Validation**: Input validation and error handling
- **No Authentication**: Open for guest users

### Resume Sections
- **Personal Information**: Name, email, phone, location, LinkedIn
- **Professional Summary**: Compelling career overview
- **Education**: Multiple education entries with dates, GPA, field
- **Work Experience**: Detailed job history with descriptions
- **Skills**: Comma-separated skills with visual tags
- **Projects**: Portfolio projects with technologies and links
- **Achievements**: Awards and accomplishments

## 🛠️ Tech Stack

### Frontend
- **React.js** - Component-based UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **react-to-print** - PDF export functionality
- **react-icons** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **LowDB** - JSON file database
- **CORS** - Cross-origin resource sharing
- **UUID** - Unique identifier generation

## 📁 Project Structure

```
resume-generator/
├── backend/
│   ├── controllers/
│   │   └── resumeController.js       ← Request handling logic
│   ├── models/
│   │   └── resumeModel.js            ← Data model & validation
│   ├── routes/
│   │   └── resumeRoutes.js           ← API endpoints
│   ├── db/
│   │   └── lowdbConfig.js            ← LowDB configuration
│   └── server.js                     ← Express server setup
│
├── frontend/
│   ├── public/
│   │   └── index.html                ← Main HTML file
│   ├── src/
│   │   ├── components/
│   │   │   ├── ResumeForm.jsx        ← Form component
│   │   │   ├── ResumePreview.jsx     ← Preview component
│   │   │   ├── TemplateOne.jsx       ← Template 1 design
│   │   │   └── TemplateTwo.jsx       ← Template 2 design
│   │   ├── App.jsx                   ← Main app component
│   │   └── index.js                  ← React entry point
│   └── tailwind.config.js           ← Tailwind configuration
│
├── package.json                     ← Root package.json
└── README.md                        ← This file
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd resume-generator
```

### Step 2: Install Dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Return to root
cd ..
```

### Step 3: Start the Application

#### Option A: Run Both Frontend and Backend Together
```bash
npm run dev
```

#### Option B: Run Separately
```bash
# Terminal 1 - Start Backend
cd backend
npm run dev

# Terminal 2 - Start Frontend
cd frontend
npm start
```

### Step 4: Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 📋 API Endpoints

### Resume Management
- `GET /api/resumes` - Get all resumes
- `POST /api/resumes` - Create new resume
- `GET /api/resumes/:id` - Get resume by ID
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume

### Health Check
- `GET /api/health` - API status check

## 🎨 Templates

### Template 1 (Modern)
- Clean, professional design
- Blue accent colors
- Left-aligned layout
- Skill tags with background colors

### Template 2 (Classic)
- Traditional serif font
- Centered header
- Two-column layout
- Dark accent colors

## 💡 Usage Guide

### Creating a Resume
1. **Fill Personal Information**: Enter your name, email, phone, location
2. **Write Summary**: Add a compelling professional summary
3. **Add Education**: Include your academic background
4. **Add Experience**: List your work history
5. **Add Skills**: Enter your technical and soft skills
6. **Add Projects**: Showcase your portfolio projects
7. **Add Achievements**: Include awards and accomplishments

### Customizing Your Resume
- **Switch Templates**: Use the template buttons to change designs
- **Live Preview**: See changes instantly as you type
- **Save Resume**: Click "Save Resume" to store your work
- **Load Resume**: Access saved resumes from the bottom section
- **Export PDF**: Click "Export PDF" to download your resume

### Tips for Best Results
- **Be Specific**: Use concrete examples and metrics
- **Keep it Concise**: Aim for 1-2 pages maximum
- **Use Action Verbs**: Start bullet points with strong verbs
- **Proofread**: Check for spelling and grammar errors
- **Customize**: Tailor content for specific job applications

## 🔧 Development

### Adding New Templates
1. Create a new template component in `frontend/src/components/`
2. Follow the existing template structure
3. Add the template to the switch statement in `ResumePreview.jsx`
4. Add a template button in `App.jsx`

### Modifying the Database
The application uses LowDB (JSON file) for simplicity. For production:
- Replace LowDB with MongoDB or PostgreSQL
- Add user authentication
- Implement data encryption
- Add backup and recovery features

### Styling Customization
- Modify `frontend/src/index.css` for global styles
- Update `frontend/tailwind.config.js` for theme changes
- Edit individual template components for layout changes

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Kill process on port 3000
npx kill-port 3000

# Kill process on port 5000
npx kill-port 5000
```

**Module Not Found Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Tailwind CSS Not Working**
```bash
# Rebuild Tailwind
cd frontend
npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch
```

**PDF Export Issues**
- Ensure the browser allows popups
- Check that all fonts are loaded
- Try a different browser if issues persist

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you encounter any issues or have questions:
- Check the troubleshooting section above
- Review the API documentation
- Open an issue on GitHub

## 🎯 Roadmap

### Future Enhancements
- [ ] User authentication and accounts
- [ ] More resume templates
- [ ] Resume scoring and suggestions
- [ ] ATS optimization features
- [ ] Dark/Light mode toggle
- [ ] Resume sharing functionality
- [ ] Mobile app version
- [ ] Integration with job boards

---

**Happy Resume Building! 🚀** 