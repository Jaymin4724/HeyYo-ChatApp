# HeyYo - ChatApp

A real-time chat application built with the MERN stack and Socket.IO, enabling users to communicate instantly with a modern, responsive UI.

## Live Demo
**url** : https://drive.google.com/file/d/1nu07xvc15WTZzmKxIv2xajI54ZLmTCw8/view?usp=sharing

## Tech Stack
- **Frontend:** React, Vite, Zustand, CSS 
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** Json Web Tokens (JWT)
- **Real-time:** Socket.IO

## Features
- User authentication (signup/login)
- Real-time messaging
- Online/offline status
- Responsive design for desktop and mobile
- Contact list and chat history
- Logout functionality

## Project Structure
```
HeyYo-ChatApp/
│
├── backend/
│   ├── config/           # Database configuration
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # Express routes
│   ├── socket/           # Socket.IO logic
│   ├── utils/            # Utility functions
│   └── server.js         # Entry point for backend
│
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── context/      # React context providers
│   │   ├── hooks/        # Custom hooks
│   │   ├── pages/        # Page components
│   │   └── zustand/      # Zustand stores
│   ├── index.html
│   ├── main.jsx
│   └── ...
│
├── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js & npm
- MongoDB

### 1. Clone the repository
```sh
git clone https://github.com/Jaymin4724/HeyYo-ChatApp.git
cd HeyYo-ChatApp
```
### Environment Variables Setup

Create a `.env` file inside the `root` directory with the following content:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

### 2. Backend Setup
```sh
cd backend
npm install

=> change the start script under npm scripts :
"scripts": {
    ..
    "start": "node backend/server.js",
    ..
  },

npm start
```

### 3. Frontend Setup
```sh
cd ../frontend
npm install
npm start
```


