# 🎥 YouTube Clone (VideoTube)

A fully functional, full-stack video sharing application built with the MERN stack (MongoDB, Express, React, Node.js). This project features a robust backend for video and user management, and a modern, responsive frontend using Tailwind CSS.

## 🚀 Tech Stack

### Frontend
- **React.js**: Library for building user interfaces.
- **Vite**: Next Generation Frontend Tooling for fast builds.
- **Tailwind CSS**: Utility-first CSS framework for rapid and responsive UI design.
- **React Router DOM**: Client-side routing.
- **Axios**: HTTP client for API requests.
- **Lucide React**: Beautiful & consistent icons.
- **React Hook Form**: Performant, flexible user input forms.

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **Cloudinary**: Cloud service for image and video management.
- **Multer**: Middleware for handling `multipart/form-data`.
- **JWT (JSON Web Tokens)**: Secure user authentication.
- **Bcrypt**: Library to salt and hash passwords.

## ✨ Features

- **User Authentication**: Secure Registration, Login, and Logout functionality.
- **Video Management**:
  - Upload videos with thumbnails.
  - Publish/Unpublish videos.
  - Delete videos.
  - View video details with playback.
- **Social Interactions**:
  - **Likes**: Like/Unlike videos.
  - **Comments**: Add and view comments on videos.
  - **Subscriptions**: Subscribe/Unsubscribe to channels.
- **Discovery**:
  - **Search**: Search for videos by title.
  - **Trending**: View top videos.
  - **History**: Track watch history.
  - **Subscriptions Feed**: View videos from subscribed channels.
- **Dashboard**: Creator dashboard to view channel stats and manage uploaded content.
- **Playlists**: Create and view playlists.
- **Responsive Design**: Mobile-first approach ensuring great experience on all devices.
- **Modern UI**: Glassmorphism effects, skeleton loaders, and smooth animations.

## 🛠️ Prerequisites

Before running this project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)
- [Cloudinary Account](https://cloudinary.com/) (For media storage)

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd YouTube
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

**Configuration**:
Create a `.env` file in the `backend` directory based on `.env.sample`.
```env
PORT=8000
CORS_ORIGIN=*
MONGODB_URI=mongodb+srv://<your-username>:<your-password>@<your-cluster>.mongodb.net/<db-name>
ACCESS_TOKEN_SECRET=<your-access-secret>
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=<your-refresh-secret>
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
```

**Start the Server**:
```bash
npm run dev
# Server will start on http://localhost:8000
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

**Configuration**:
Create a `.env` file in the `frontend` directory based on `.env.sample`.
```env
VITE_API_URL=http://localhost:8000/api/v1
```

**Start the Application**:
```bash
npm run dev
# Application will run on http://localhost:5173 (or similar port)
```

## 📁 Project Structure

```
YouTube/
├── backend/            # Express, Node.js, MongoDB backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── utils/
│   └── .env.sample
├── frontend/           # React, Vite, Tailwind frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── context/
│   └── .env.sample
└── README.md           # Project documentation
```

## 🔌 API Endpoints (Overview)

The requests are prefixed with `/api/v1`.

| Module | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | POST | `/users/register` | Register a new user |
| | POST | `/users/login` | Login user |
| | POST | `/users/logout` | Logout user |
| **Videos** | GET | `/videos` | Get all videos |
| | POST | `/videos` | Upload a video |
| | GET | `/videos/:videoId` | Get video details |
| **Comments** | POST | `/comments/:videoId` | Add a comment |
| **Likes** | POST | `/likes/toggle/v/:videoId` | Toggle video like |
| **Health** | GET | `/healthcheck` | Server health check |

## 🤝 Contributing

Contributions are welcome!
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License

This project is licensed under the ISC License.