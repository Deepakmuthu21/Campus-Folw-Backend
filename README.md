🖥 Campu Flow – Backend
        Role-Based Academic Workflow Management System (Server Side)

        This is the backend service for Campu Flow, a Role-Based Academic Workflow Management System built using Node.js, Express.js, and MongoDB.

        The backend handles authentication, role-based authorization, workflow management, assignment evaluation, and automated email notifications.


🚀 Features

        🔐 JWT-Based Authentication

        🛡 Role-Based Access Control (RBAC)

        👥 Student, Mentor, Admin Roles

        📝 Registration & Account Approval Workflow

        📊 Assignment Evaluation Logic

        📩 Automated Email Notifications (Nodemailer)

        🌐 RESTful API Architecture

        🔒 Protected Routes with Middleware

🛠 Tech Stack

        Node.js

        Express.js

        MongoDB

        Mongoose

        JWT (jsonwebtoken)

        Bcrypt.js

        Sendgrid

        dotenv


📌 Folder Explanation

        config/ → Database connection setup

        controllers/ → Business logic handling

        middleware/ → Authentication & role protection

        models/ → Mongoose schemas

        routes/ → API route definitions

        utils/ → Helper functions (email service etc.)

        server.js → Entry point of backend

🔐 Authentication & Authorization

        Uses JWT tokens for secure login sessions

        Passwords are hashed using bcrypt

        Role-based middleware restricts access to protected routes

        Only Admin can approve accounts

        Mentor can evaluate assignments

        Student can submit assignments

📧 Email Notification System

        Automated email triggers for:

        ✅ Registration Confirmation

        ✅ Account Approval

        ✅ Assignment Status Updates

        ✅ Enquiry Submissions

        Powered by Sendfrid with secure environment configuration.

🔒 Security Features

        Password hashing (bcrypt)

        JWT token expiration

        Protected routes middleware

        Role validation checks

        Environment variable protection

🎯 Backend Highlights

        Follows layered architecture principles

        Clean separation of concerns

        Scalable REST API design

        Secure authentication & workflow control

        Production-ready structure