# VISTAARA
Vistaara is a modern OTT streaming platform with authentication, content discovery, custom video playback, profiles, favorites, watch history, recommendations, and an admin dashboard.
## One-Line Description

A full-stack MERN OTT streaming platform built with React, Tailwind CSS, Express, MongoDB, JWT authentication, and Cloudinary media storage.

## Features

- JWT-based user authentication
- Secure password hashing with bcrypt
- Protected user and admin routes
- Netflix/Hotstar-inspired dark streaming UI
- Cinematic hero banner and horizontal content rows
- Movie details pages
- Custom video player with play, pause, seek, fullscreen, and progress tracking
- Continue watching and recently watched sections
- Favorites / My List
- Real-time movie and genre search
- Multiple user profiles
- Profile-specific watch history and favorites support on the backend
- Basic recommendation engine using watch history and favorite genres
- Admin dashboard for analytics and content management
- Cloudinary-ready image and video upload API
- Vercel-ready frontend and Render/Railway-ready backend

## Tech Stack

**Frontend**

- React.js
- Tailwind CSS
- React Router
- Redux Toolkit
- Axios
- Lucide React icons

**Backend**

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt
- Cloudinary
- Multer

## Project Structure

```text
.
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── services/
│   └── package.json
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── package.json
└── package.json
```

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Vistaara
```

### 2. Install Dependencies

```bash
npm.cmd run install:all
```

If your shell supports normal npm commands, this also works:

```bash
npm run install:all
```

### 3. Configure Environment Variables

Create environment files from the examples:

```bash
copy server\.env.example server\.env
copy client\.env.example client\.env
```

Server environment variables:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/ott-platform
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Client environment variables:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Run the App

Run frontend and backend together:

```bash
npm.cmd run dev
```

Or run them separately:

```bash
npm.cmd run dev --prefix client
npm.cmd run dev --prefix server
```

Local URLs:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:5000/api/health
```

## Demo Mode

The frontend includes demo fallback data, so the UI remains explorable even before MongoDB is connected.

Demo user:

```text
Email: viewer@vistaara.dev
Password: password
```

Demo admin:

```text
Email: admin@vistaara.dev
Password: password
```

For real backend admin access, set the user role to `admin` in MongoDB.

## Database Collections

### Users

```json
{
  "name": "",
  "email": "",
  "password": "",
  "profiles": [],
  "favorites": [],
  "watchHistory": []
}
```

### Movies

```json
{
  "title": "",
  "description": "",
  "genre": "",
  "thumbnail": "",
  "banner": "",
  "videoUrl": "",
  "duration": "",
  "year": "",
  "rating": ""
}
```

## Useful Scripts

```bash
npm.cmd run install:all
npm.cmd run dev
npm.cmd run build
npm.cmd start
```

Server-only:

```bash
npm.cmd run dev --prefix server
npm.cmd run seed --prefix server
```

Client-only:

```bash
npm.cmd run dev --prefix client
npm.cmd run build --prefix client
```

## Deployment

### Frontend: Vercel

- Root directory: `client`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_URL=<your-backend-api-url>/api`

### Backend: Render or Railway

- Root directory: `server`
- Start command: `npm start`
- Add all variables from `server/.env.example`
- Set `CLIENT_URL` to your deployed frontend URL

## Notes

- No subscription, payment, premium plan, or monetization features are included.
- All content is intended to be freely accessible to authenticated users.
- Cloudinary is used for media upload support, but demo videos/images are available for local UI testing.
