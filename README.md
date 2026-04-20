# FolioForge — Portfolio Builder

> Create, customize, and share stunning personal portfolio websites in minutes.

A full-stack MERN application with JWT authentication, live-preview portfolio editor, public shareable URLs, and 5 custom themes.

---

## ✨ Features

- **Secure Auth** — Signup/Login with JWT + bcrypt-hashed passwords
- **Portfolio Editor** — Split-screen editor with live real-time preview
- **5 Themes** — Aurora, Midnight, Slate, Forest, Crimson
- **Public Portfolio Page** — `/portfolio/:username` — no login required
- **Profile Completion Score** — Track how polished your portfolio is
- **Auto-save** — Debounced saves every 2.5s as you type
- **Skills & Projects** — Add skills as chips, projects with tags and links
- **Social Links** — GitHub, LinkedIn, Twitter, Website, Email
- **Responsive** — Works on mobile and desktop

---

## 🛠 Tech Stack

| Layer     | Tech                              |
|-----------|-----------------------------------|
| Frontend  | React 18, Vite, Tailwind CSS      |
| Backend   | Node.js, Express.js               |
| Database  | MongoDB Atlas + Mongoose          |
| Auth      | JWT + bcryptjs                    |
| Deploy FE | Vercel                            |
| Deploy BE | Render                            |
| Fonts     | Syne (display), DM Sans (body), DM Mono |

---

## 📁 Project Structure

```
portfolio-builder/
├── backend/
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js   # signup, login, getMe
│   │   └── portfolioController.js
│   ├── middleware/
│   │   └── auth.js             # JWT protect middleware
│   ├── models/
│   │   ├── User.js             # User schema
│   │   └── Portfolio.js        # Portfolio schema
│   ├── routes/
│   │   ├── auth.js
│   │   └── portfolio.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── PortfolioPreview.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── LandingPage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── SignupPage.jsx
    │   │   ├── DashboardPage.jsx
    │   │   ├── EditorPage.jsx
    │   │   └── PublicPortfolioPage.jsx
    │   ├── utils/
    │   │   ├── api.js          # Axios instance + interceptors
    │   │   └── helpers.js      # calcCompletion, THEMES, formatDate
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── vercel.json
    └── package.json
```

---

## 🚀 Local Setup

### Prerequisites
- Node.js >= 18
- MongoDB Atlas account (free tier works)

### 1. Clone

```bash
git clone https://github.com/yourusername/portfolio-builder.git
cd portfolio-builder
```

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/portfolio-builder?retryWrites=true&w=majority
JWT_SECRET=a_very_long_random_secret_string_here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### 3. Frontend setup

```bash
cd ../frontend
npm install
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 🔌 API Reference

### Auth

| Method | Endpoint            | Auth     | Description        |
|--------|---------------------|----------|--------------------|
| POST   | `/api/auth/signup`  | Public   | Register new user  |
| POST   | `/api/auth/login`   | Public   | Login, get JWT     |
| GET    | `/api/auth/me`      | 🔒 JWT  | Get current user   |

**Signup body:**
```json
{
  "name": "Alex Johnson",
  "email": "alex@example.com",
  "password": "securepass123",
  "username": "alexj"
}
```

**Login body:**
```json
{
  "email": "alex@example.com",
  "password": "securepass123"
}
```

### Portfolio

| Method | Endpoint                    | Auth     | Description              |
|--------|-----------------------------|----------|--------------------------|
| GET    | `/api/portfolio`            | 🔒 JWT  | Get my portfolio         |
| POST   | `/api/portfolio`            | 🔒 JWT  | Create portfolio         |
| PUT    | `/api/portfolio`            | 🔒 JWT  | Update portfolio         |
| GET    | `/api/portfolio/:username`  | Public   | Get public portfolio     |

**Update portfolio body (all optional):**
```json
{
  "name": "Alex Johnson",
  "bio": "Full-stack dev from NYC",
  "tagline": "Building things that matter",
  "skills": ["React", "Node.js", "MongoDB"],
  "projects": [
    {
      "title": "My Project",
      "description": "What it does",
      "link": "https://github.com/...",
      "tags": ["React", "Firebase"]
    }
  ],
  "socialLinks": {
    "github": "https://github.com/alexj",
    "linkedin": "https://linkedin.com/in/alexj",
    "twitter": "",
    "website": "",
    "email": "alex@example.com"
  },
  "theme": "aurora",
  "isPublic": true
}
```

---

## ☁️ Deployment

### Backend → Render

1. Push `backend/` to GitHub (or a subdirectory)
2. Create a new **Web Service** on [render.com](https://render.com)
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `npm start`
5. Add environment variables (same as `.env`)
6. Deploy — you'll get a URL like `https://portfolio-builder-api.onrender.com`

### Frontend → Vercel

1. Push `frontend/` to GitHub
2. Import to [vercel.com](https://vercel.com)
3. Framework: **Vite**
4. Add environment variable:
   ```
   VITE_API_URL=https://portfolio-builder-api.onrender.com/api
   ```
5. Deploy — Vercel handles the SPA routing via `vercel.json`

---

## 🗄️ Database Schemas

### User
```js
{
  name:     String (required),
  email:    String (unique, required),
  password: String (bcrypt hashed),
  username: String (unique, 3-30 chars, alphanumeric/_/-)
}
```

### Portfolio
```js
{
  userId:      ObjectId (ref: User),
  username:    String (unique),
  name:        String,
  bio:         String (max 500),
  tagline:     String (max 150),
  skills:      [String],
  projects:    [{ title, description, link, tags }],
  socialLinks: { github, linkedin, twitter, website, email },
  theme:       Enum ['aurora','midnight','slate','forest','crimson'],
  avatar:      String (URL),
  isPublic:    Boolean
}
```

---

## 🎨 Themes

| Theme    | Accent    | Vibe                  |
|----------|-----------|-----------------------|
| Aurora   | `#a78bfa` | Purple, cosmic        |
| Midnight | `#60a5fa` | Blue, deep space      |
| Slate    | `#94a3b8` | Grey, minimal         |
| Forest   | `#34d399` | Green, organic        |
| Crimson  | `#fb7185` | Pink-red, bold        |

---

## 📸 Screenshots

_Add screenshots of: Landing → Signup → Dashboard → Editor → Public Portfolio_

---

## 📄 License

MIT — free to use, modify, and deploy.
