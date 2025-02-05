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
   Create a `.env.local` file in the root directory and add:
   ```env
   VITE_apiKey = your-api-key
   VITE_authDomain = your-domain
   VITE_projectId = your-project-id
   VITE_storageBucket = your-firebase-storageBucket
   VITE_messagingSenderId = your-messageSenderId
   VITE_appId = your-app-id
   VITE_measurementId = your-measurement-id

   VITE_imgBB_api = your-imgBB-api-key
   # VITE_api_url = http://localhost:3000
   VITE_api_url = your-live-link

   VITE_stripe_public_key = your-stripe-key
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
- 🔗 [Live Demo]([Live-Link](https://pay-per-tasks.web.app))
