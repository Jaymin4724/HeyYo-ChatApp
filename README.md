# ChatApp Backend Template

This is a basic Node.js backend template for chat or similar applications, built with Express and MongoDB (Mongoose). It provides a solid foundation for authentication, user management, and messaging features, making it easy to reuse and extend for future projects.

## Features

- **User Authentication**: Signup, login, and logout with JWT-based authentication and secure password hashing (bcryptjs).
- **User Management**: Retrieve all users (excluding passwords), with support for user profiles and avatars.
- **Messaging System**: Send and retrieve messages between users, with conversations stored in MongoDB.
- **JWT & Cookie Security**: Tokens are stored securely in HTTP-only cookies.
- **Modular Structure**: Organized controllers, models, routes, middleware, and utility functions for easy maintenance and scalability.
- **Environment Config**: Uses dotenv for environment variables.
- **Ready for Socket.io**: Easily extendable to add real-time features with Socket.io.

## Folder Structure

```
backend/
  config/           # Database connection
  controllers/      # Route logic (auth, user, message)
  middleware/       # Authentication middleware
  models/           # Mongoose models (User, Message, Conversation)
  routes/           # Express routes
  utils/            # Utility functions (JWT token generation)
  server.js         # Main server entry point
```

## Usage

1. Clone the repository and install dependencies:
   ```sh
   npm install
   cd backend && npm install
   ```
2. Set up your `.env` file with MongoDB URI, JWT secret, and other variables.
3. Start the backend server:
   ```sh
   npm run server
   ```

## Extending

- Add Socket.io for real-time messaging.
- Integrate additional features as needed (file uploads, notifications, etc).

---

This template is ideal for quickly bootstrapping new Node.js/Express/MongoDB projects with user authentication and messaging capabilities.
