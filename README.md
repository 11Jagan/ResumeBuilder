# ResumeGen - Professional Resume Builder

A modern, full-stack resume builder application that helps users create professional, ATS-friendly resumes with an intuitive interface.

##Live Demo: https://resume-builder-sigma-rust.vercel.app/

## 🚀 Features

- **Professional Templates**: Multiple ATS-optimized resume templates
- **Real-time Preview**: Live preview as you type
- **PDF Export**: Download your resume as a professional PDF
- **User Authentication**: Secure sign-up/sign-in system
- **Save & Edit**: Save your progress and edit anytime
- **Responsive Design**: Works perfectly on all devices

## 🛠️ Tech Stack

### Frontend
- React.js, Tailwind CSS, React Icons, React-to-Print

### Backend
- Node.js, Express.js, LowDB, JWT, bcryptjs

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/11Jagan/ResumeBuilder.git
   cd ResumeBuilder
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
   Backend runs on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm start
   ```
   Frontend runs on `http://localhost:3000`

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

### Resumes
- `GET /api/resumes` - Get user's resumes
- `POST /api/resumes` - Create new resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume

## 🎨 Templates

- **Template One**: Classic professional layout
- **Template Two**: Modern clean design

## 🔒 Security Features

- JWT Authentication
- Password Hashing with bcrypt
- Input Validation
- CORS Protection

## 👨‍💻 Developer

**Developed by [Jagan Mohan](https://konthamjagan.netlify.app/)**

Visit my portfolio: [konthamjagan.netlify.app](https://konthamjagan.netlify.app/)

---

**Made with ❤️ by Jagan Mohan** 
