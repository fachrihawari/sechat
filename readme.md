# sechat

A real-time chat application built with React, Socket.io, and Express.js, featuring email-based authentication with OTP verification.

## Overview

sechat is a modern, real-time messaging platform that allows users to communicate instantly. The application uses email-based authentication with OTP (One-Time Password) verification for secure access, and Socket.io for real-time messaging capabilities.

## Architecture

The project follows a monorepo structure with separate client and server applications:

```
sechat/
├── apps/
│   ├── client/          # React frontend application
│   └── server/          # Express.js backend application
├── packages/
│   └── shared/          # Shared code between client and server
├── docker-compose.yml   # Docker orchestration
└── package.json        # Root package configuration
```

## Features

### Authentication
- **Email-based login**: Users can log in using their email address
- **OTP verification**: Secure authentication via 6-digit OTP sent to email
- **JWT tokens**: Stateless authentication using JSON Web Tokens
- **Auto-registration**: New users are automatically created on first login

### Real-time Messaging
- **Instant messaging**: Real-time chat using Socket.io
- **Online status**: Live indicators showing which users are online
- **Message history**: Persistent chat history stored in MongoDB
- **Unread indicators**: Visual indicators for new messages

### User Interface
- **User selection**: Click to select users for one-on-one conversations
- **Message bubbles**: Distinct styling for sent and received messages
- **Auto-scroll**: Automatic scrolling to latest messages

## Technology Stack

### Frontend (Client)
- **React 18** - UI framework
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **TanStack Query** - Server state management
- **Socket.io Client** - Real-time communication
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Toastify** - Toast notifications

### Backend (Server)
- **Node.js** with **Bun** runtime
- **Express.js** - Web framework
- **Socket.io** - Real-time communication
- **MongoDB** with **Mongoose** - Database and ODM
- **JWT** - Authentication tokens
- **Resend** - Email service for OTP delivery
- **CORS** - Cross-origin resource sharing

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Web server for client application
- **Traefik** - Reverse proxy and load balancer

## API Documentation

### Authentication Endpoints

#### POST /auth/login
Request OTP for email-based login.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:** `200 OK` (OTP sent to email)

#### POST /auth/verify
Verify OTP and receive access token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response:**
```json
{
  "accessToken": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "username": "user@example.com",
    "email": "user@example.com"
  }
}
```

### User Endpoints

#### GET /users
Get list of all users except the authenticated user.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
[
  {
    "_id": "user_id",
    "username": "user@example.com",
    "email": "user@example.com"
  }
]
```

### Chat Endpoints

#### GET /users/:id/chats
Get chat history between authenticated user and specified user.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
[
  {
    "_id": "chat_id",
    "message": "Hello!",
    "sender": {
      "_id": "sender_id",
      "username": "sender@example.com"
    },
    "receiver": {
      "_id": "receiver_id",
      "username": "receiver@example.com"
    }
  }
]
```

#### POST /users/:id/chats
Send a new message to specified user.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "message": "Hello there!"
}
```

## Socket.io Events

### Client to Server Events

#### `chat:new-message`
Send a new message to online user.

**Payload:**
```json
{
  "receiver": "socket_id",
  "message": "Hello!"
}
```

### Server to Client Events

#### `user:list`
List of currently online users.

**Payload:**
```json
[
  {
    "id": "socket_id",
    "user": {
      "_id": "user_id",
      "username": "user@example.com"
    }
  }
]
```

#### `chat:new-message`
New message received from another user.

**Payload:**
```json
{
  "message": "Hello!",
  "sender": {
    "_id": "sender_id"
  },
  "receiver": {
    "_id": "receiver_id"
  }
}
```

#### `user:disconnected`
User has disconnected.

**Payload:** `socket_id`

## Environment Variables

### Server Environment Variables
```bash
NODE_ENV=development
PORT=3000
MONGO_URL=mongodb://localhost:27017/sechat
CLIENT_URL=http://localhost:5173
RESEND_API_KEY=your_resend_api_key
JWT_SECRET=your_jwt_secret
EMAIL_FROM=noreply@yourdomain.com
```

### Client Environment Variables
```bash
VITE_APP_SERVER_URL=http://localhost:3000
```

## Development Setup

### Prerequisites
- [Bun](https://bun.sh/) runtime
- MongoDB database
- [Resend](https://resend.com/) account for email service

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/fachrihawari/sechat.git
   cd sechat
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Set up environment variables:**
   Create `.env` files in the root directory with the required environment variables.

4. **Start development servers:**
   ```bash
   # Start both client and server in development mode
   bun run dev
   
   # Or start individually
   bun run dev-client  # Client only
   bun run dev-server  # Server only
   ```

5. **Access the application:**
   - Client: http://localhost:5173
   - Server: http://localhost:3000

## Production Deployment

### Using Docker Compose

1. **Build and start services:**
   ```bash
   docker-compose up -d
   ```

2. **Configure reverse proxy:**
   The application is configured to work with Traefik as a reverse proxy with the following domains:
   - Client: `sechat.hawari.dev`
   - API: `sechat-api.hawari.dev`

### Manual Deployment

1. **Build client application:**
   ```bash
   cd apps/client
   bun run build
   ```

2. **Deploy client:**
   Serve the `dist` folder using Nginx or any static file server.

3. **Deploy server:**
   ```bash
   cd apps/server
   bun run start
   ```

## Database Schema

### User Model
```javascript
{
  username: String,     // User's email address (used as username)
  email: String,        // User's email address
  otp: {
    code: String,       // 6-digit OTP code
    expiry: Date        // OTP expiration time
  }
}
```

### Chat Model
```javascript
{
  message: String,      // Chat message content
  sender: ObjectId,     // Reference to User model
  receiver: ObjectId,   // Reference to User model
  createdAt: Date,      // Timestamp (auto-generated)
  updatedAt: Date       // Timestamp (auto-generated)
}
```

## Security Features

- **JWT Authentication**: Stateless authentication using JSON Web Tokens
- **OTP Verification**: Time-limited 6-digit codes for secure login
- **CORS Configuration**: Properly configured cross-origin resource sharing
- **Request Validation**: Input validation on all API endpoints
- **Socket Authentication**: Socket.io connections require valid JWT tokens

## Performance Considerations

- **Static Asset Caching**: Nginx configuration for client-side caching
- **Real-time Optimization**: Efficient Socket.io event handling
- **Build Optimization**: Vite for optimized frontend builds

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Fachri Hawari** - [fachri.hawari@gmail.com](mailto:fachri.hawari@gmail.com)

## Support

For support, email fachri.hawari@gmail.com or create an issue in the GitHub repository.