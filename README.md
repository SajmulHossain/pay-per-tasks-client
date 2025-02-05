# Pay Per Task

## Overview
Pay Per Task is a web application that allows users to complete tasks and get paid instantly. The platform enables employers to post tasks and freelancers to complete them efficiently. The system ensures transparency, security, and ease of payment processing.


## Technologies Used
- React.js
- Tailwind CSS
- Firebase (Authentication & Database)
- Express.js (Backend API)
- MongoDB (Database)

## Core Features
- User authentication (Sign up, Login, Logout)
- Task creation and management
- Payment integration for instant payouts
- Secure database handling
- Real-time notifications
- Responsive design for all devices

## Dependencies
- React Router
- Firebase SDK
- Axios
- Express.js
- MongoDB Driver
- TailwindCSS

## How to Run the Project Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SajmulHossain/pay-per-tasks-client
   cd pay-per-task-client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_BACKEND_URL=http://localhost:5000
   ```

4. **Start the backend server:**
   ```bash
   cd backend
   npm install
   node server.js
   ```

5. **Start the frontend:**
   ```bash
   npm start
   ```

6. Open `http://localhost:3000` in your browser.

## Live Project & Resources
- 🔗 [Live Demo]([https://your-live-demo-link.com](https://pay-per-tasks.web.app))
