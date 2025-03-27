# GitHub User Management API

## Overview
A Full-Stack Web Application that allows users to search for GitHub profiles, view repositories, find mutual followers, and manage user data efficiently. The project follows a clean architecture and is built with Node.js, Express.js, React.js, and MongoDB.

## Features
- Fetch GitHub user details and repositories
- Search users by username and location
- Soft delete users
- Update user details
- Retrieve all users sorted by various fields
- Find mutual friends based on followers and following

## API Routes
```
GET    /api/fetchUser           - Fetch user details from database or GitHub
GET    /api/followers           - Fetch followers of a user from GitHub or DB
GET    /api/search              - Search users by username or location
DELETE /api/delete              - Soft delete a user
PUT    /api/update/:username    - Update user details
GET    /api/users               - Get all users sorted by given fields
GET    /api/mutual-friends      - Find mutual friends of a user
```

## Setup & Configuration
### Environment Variables
Create a `.env` file and configure the following:
```
MONGO_URI = 'YOUR_MONGO_URI'
PORT = 5006
GIT_API = https://api.github.com/users
FRONT_URL = http://localhost:5173
```

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/moideenshacp/DATAGIT.git
   ```
2. Navigate to the project directory:
   ```sh
   cd DATAGIT/server
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the server:
   ```sh
   npm start
   ```

## Project Folder Structure
```
DATAGIT/
│── server/
│   │── src/
│   │   │── controllers/        # Business logic for routes
│   │   │── models/             # Mongoose schemas
│   │   │── routes/             # API routes
│   │   │── services/           # GitHub API integration & business logic
│   │   │── interface/          # contains interface
│   │   │── config/             # Database connection & configurations
│   │── .env                    # Environment variables
│   │── app.ts                  # Express setup && # Server entry point
│   │── package.json            # Dependencies & scripts              
│── client/
│   │── src/
│   │   │── api/                # Contains all api 
│   │   │── components/         # Reusable UI components
│   │   │── css/                # Components css
│   │   │── interface/          # Contains Interfaces
│   │   │── redux/              # Redux set-up
│   │── public/
│   │── package.json            # Frontend dependencies
│   │── vite.config.js          # Vite configuration
│── README.md
```

## Frontend Setup
1. Navigate to the `frontend` directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend:
   ```sh
   npm run dev
   ```

## Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- GitHub API
- React (Vite)

## License
This project is licensed under the MIT License.

