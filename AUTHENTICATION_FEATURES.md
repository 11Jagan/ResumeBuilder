# Authentication Features

## Overview
The Resume Builder now includes a complete authentication system that allows users to:
- Create resumes without signing in (public creation)
- Sign up and log in to manage their resumes
- Edit and delete only their own resumes (requires authentication)

## Backend Implementation

### Authentication Endpoints
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get current user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Resume Endpoints
- `GET /api/resumes` - Get all resumes (filtered for authenticated users)
- `GET /api/resumes/:id` - Get resume by ID (public)
- `POST /api/resumes` - Create new resume (public - no auth required)
- `PUT /api/resumes/:id` - Update resume (requires authentication)
- `DELETE /api/resumes/:id` - Delete resume (requires authentication)

### Security Features
- JWT token-based authentication
- Password hashing with bcrypt
- User ownership validation for resume editing
- Automatic token expiration (7 days)

## Frontend Implementation

### Components
- `AuthModal.jsx` - Login/Register modal
- `Header.jsx` - Navigation with auth status
- `UserContext.jsx` - Global authentication state management

### User Experience
1. **Public Resume Creation**: Users can create resumes without signing in
2. **Authentication Required for Editing**: Users must sign in to edit/delete resumes
3. **Personal Resume Management**: Authenticated users only see their own resumes
4. **Seamless Authentication**: Token persistence across browser sessions

## Usage Flow

### For New Users
1. Visit the resume builder
2. Create a resume (no sign-in required)
3. Save the resume (creates anonymous resume)
4. Sign up to claim and manage the resume
5. Edit/delete resumes after authentication

### For Existing Users
1. Sign in through the header
2. View only your saved resumes
3. Edit and delete your resumes
4. Create new resumes that are automatically linked to your account

## Technical Details

### Database Schema
```json
{
  "users": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "password": "hashed_password",
      "name": "User Name",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  ],
  "resumes": [
    {
      "id": "uuid",
      "userId": "user_id_or_null",
      "personalInfo": {...},
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  ]
}
```

### Authentication Flow
1. User submits login/register form
2. Backend validates credentials
3. JWT token generated and returned
4. Frontend stores token in localStorage
5. Token included in subsequent API calls
6. Backend validates token for protected routes

### Security Considerations
- Passwords are hashed using bcrypt
- JWT tokens expire after 7 days
- Users can only edit their own resumes
- Anonymous resumes can be viewed but not edited without authentication 