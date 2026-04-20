# 🚀 FolioForge — Portfolio Builder

> Create, customize, and share stunning personal portfolio websites in minutes.

A full-stack MERN application with JWT authentication, live-preview portfolio editor, public shareable URLs, and 5 custom themes.

---

## ✨ Features

- **Secure Auth** — Signup/Login with JWT + bcrypt-hashed passwords
- **Portfolio Editor** — Split-screen editor with live real-time preview
- **5 Themes** — Aurora, Midnight, Slate, Forest, Crimson
- **Public Portfolio Page** — `/portfolio/:username` — no login required
- **Profile Completion Score** — Track how polished your portfolio is
- **Auto-save** — Saves changes automatically while typing
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

---

## 📁 Project Structure


portfolio-builder/
├── backend/
└── frontend/


---

## 🚀 Local Setup

### Backend

```bash
cd backend
npm install

Create .env:

PORT=5001
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret

Run:

node server.js
Frontend
cd frontend
npm install
npm run dev
🔌 API Reference
Auth
POST /api/auth/signup
POST /api/auth/login
GET /api/auth/me
Portfolio
GET /api/portfolio
POST /api/portfolio
PUT /api/portfolio
GET /api/portfolio/:username
📄 License

MIT License

👩‍💻 Author

Aditi Singh
GitHub: https://github.com/aditiisingh0


---

# ✅ अब क्या करो

```bash
git add README.md
git commit -m "Updated README"
git push