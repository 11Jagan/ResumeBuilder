# ResumeGen - Professional Resume Builder

A modern, full-stack resume builder application that helps users create professional, ATS-friendly resumes with an intuitive interface.

## 🚀 Features

### Core Features
- **Professional Templates**: Multiple ATS-optimized resume templates
- **Real-time Preview**: Live preview as you type
- **PDF Export**: Download your resume as a professional PDF
- **User Authentication**: Secure sign-up/sign-in system
- **Save & Edit**: Save your progress and edit anytime
- **Responsive Design**: Works perfectly on all devices

### Technical Features
- **ATS Optimized**: Templates designed to pass Applicant Tracking Systems
- **Modern UI/UX**: Clean, professional interface with smooth animations
- **Secure Backend**: JWT authentication with bcrypt password hashing
- **Data Persistence**: Save and manage multiple resumes
- **Form Validation**: Smart validation with user-friendly error messages

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Beautiful icon library
- **React-to-Print** - PDF export functionality

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web application framework
- **LowDB** - Lightweight JSON database
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
Resume/
├── frontend/                 # React frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── context/         # React context providers
│   │   └── index.js         # Entry point
│   └── package.json
├── backend/                  # Node.js backend server
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Authentication middleware
│   ├── models/             # Data models
│   ├── routes/             # API routes
│   ├── db/                 # Database files
│   └── server.js           # Server entry point
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/resume-builder.git
   cd resume-builder
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```
   The backend will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm start
   ```
   The frontend will run on `http://localhost:3000`

3. **Open your browser**
   Navigate to `http://localhost:3000` to use the application

## 📖 Usage

1. **Create Account**: Sign up for a new account or sign in
2. **Choose Template**: Browse and select from professional templates
3. **Fill Information**: Enter your personal, professional, and educational details
4. **Preview**: See your resume in real-time as you edit
5. **Export**: Download your resume as a professional PDF
6. **Save**: Your progress is automatically saved

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### Resumes
- `GET /api/resumes` - Get user's resumes
- `POST /api/resumes` - Create new resume
- `GET /api/resumes/:id` - Get specific resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume

## 🎨 Templates

The application includes multiple professional templates:
- **Template One**: Classic professional layout
- **Template Two**: Modern clean design
- More templates coming soon!

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt password encryption
- **Input Validation**: Comprehensive form validation
- **CORS Protection**: Cross-origin request protection
- **Rate Limiting**: API request rate limiting

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Developed by [Jagan Mohan](https://konthamjagan.netlify.app/)**

Visit my portfolio: [konthamjagan.netlify.app](https://konthamjagan.netlify.app/)

## 🙏 Acknowledgments

- React.js community for the amazing framework
- Tailwind CSS for the beautiful styling system
- All contributors and users of this project

---

**Made with ❤️ by Jagan Mohan** 