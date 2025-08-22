# 📚 Book Library Management System

A complete full-stack book library management system with user authentication, built with React frontend and FastAPI backend.

## 🚀 Features

### Authentication System
- ✅ **User Registration**: Create new accounts with username and password
- ✅ **User Login**: Secure authentication with JWT tokens
- ✅ **Protected Routes**: All book management features require authentication
- ✅ **Session Management**: Automatic token handling and cleanup
- ✅ **Logout Functionality**: Secure logout with redirect to login

### Book Management
- ✅ **Create Books**: Add new books with title, author, description, and year
- ✅ **View Books**: See your personal book collection
- ✅ **Update Books**: Edit existing books with pre-filled forms
- ✅ **Delete Books**: Remove books with confirmation dialog
- ✅ **Search & Sort**: Advanced filtering and sorting capabilities

### User Experience
- ✅ **Responsive Design**: Works perfectly on mobile and desktop
- ✅ **Modern UI**: Beautiful gradients and smooth animations
- ✅ **Loading States**: Visual feedback during operations
- ✅ **Error Handling**: Clear error messages and user feedback
- ✅ **Navigation**: Smart navbar with breadcrumb navigation

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with gradients and animations

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - Database ORM
- **SQLite** - Lightweight database
- **JWT** - JSON Web Tokens for authentication
- **Pydantic** - Data validation
- **CORS** - Cross-origin resource sharing

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd book-library-backend
   ```

2. **Install Python dependencies:**
   ```bash
   pip install fastapi uvicorn sqlalchemy pydantic python-jose[cryptography] passlib[bcrypt] python-multipart
   ```

3. **Start the backend server:**
   ```bash
   python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

4. **Verify backend is running:**
   ```bash
   curl http://localhost:8000/
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd library_app
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## 🔐 Authentication Flow

1. **First Visit**: User sees login page
2. **Signup**: New users create account → redirected to login
3. **Login**: Users authenticate → redirected to home page
4. **Protected Access**: All book features require authentication
5. **Book Management**: Users can create, read, update, delete their books
6. **Logout**: Users can logout → redirected to login page

## 📡 API Endpoints

### Authentication
- `POST /users/signup` - Register new user
- `POST /users/login` - User login
- `GET /users/me` - Get current user info

### Book Management
- `POST /users/{user_id}/books` - Create new book
- `GET /users/{user_id}/books` - Get user's books
- `GET /users/{user_id}/books/{book_id}` - Get specific book
- `PUT /users/{user_id}/books/{book_id}` - Update book
- `DELETE /users/{user_id}/books/{book_id}` - Delete book

## 🎯 Key Features

### Security
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt password hashing
- **CORS Protection**: Proper cross-origin handling
- **User Authorization**: Users can only access their own books

### User Experience
- **Responsive Design**: Mobile-first approach
- **Loading States**: Visual feedback during operations
- **Error Handling**: Comprehensive error messages
- **Navigation**: Intuitive breadcrumb navigation
- **Modern UI**: Beautiful gradients and animations

### Data Management
- **Real-time Updates**: Immediate UI updates after operations
- **Search & Filter**: Advanced book filtering capabilities
- **Pagination**: Efficient data loading for large collections
- **Form Validation**: Client and server-side validation

## 🔧 Development

### Backend Development
- **Hot Reload**: Automatic server restart on code changes
- **API Documentation**: Auto-generated with FastAPI
- **Database**: SQLite for development, easily switchable to PostgreSQL
- **Testing**: Built-in FastAPI testing capabilities

### Frontend Development
- **Hot Reload**: Instant UI updates during development
- **ESLint**: Code quality and consistency
- **Component Architecture**: Modular and reusable components
- **State Management**: React Context for authentication state

## 🚀 Deployment

### Backend Deployment
1. Set up a production server (AWS, DigitalOcean, etc.)
2. Install Python and dependencies
3. Configure environment variables
4. Set up a production database (PostgreSQL recommended)
5. Use a production ASGI server like Gunicorn

### Frontend Deployment
1. Build the production version: `npm run build`
2. Deploy to a static hosting service (Netlify, Vercel, etc.)
3. Configure environment variables for API endpoints

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Happy Reading! 📚✨**
