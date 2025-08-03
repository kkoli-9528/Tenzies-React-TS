# 🎲 Tenzies Game - Fullstack (React + TS + MongoDB)

This is a personal project where I rebuilt the classic Tenzies dice game using React and TypeScript — but I didn’t stop at the UI. I added a complete backend using Express and MongoDB to store game session data, track performance, and explore real-world full-stack practices.

---

## 👨‍💻 Why I built this

I’ve worked on a lot of frontend apps, but most of them lived only in the browser. I wanted to learn how to plan and build backend systems that work with a frontend — REST APIs, database models, authentication, and data persistence. Tenzies was simple enough to not get bogged down in logic, but still complex enough to explore real-world integration.

---

## 🧠 Day-by-Day Workflow

### 🗓️ Day 1–2: Frontend Setup

- Scaffold a new Vite + React + TypeScript project
- Built `Die` component with props (value, isHeld, onClick)
- Built `App.tsx` with core game logic: `generateDice()`, `rollDice()`, `holdDice()`
- Added win detection and confetti effect

### 🗓️ Day 3–4: Backend Setup (MongoDB + API)

- Set up Express server using TypeScript
- Connected to MongoDB Atlas
- Created `GameSession` model and `/api/game` POST route to store session stats

### 🗓️ Day 5–6: Frontend ↔ Backend Integration

- Used `fetch` to POST game session data after a win
- Added a `/api/games/top` route to fetch stats
- Displayed basic leaderboard / high score UI

### 🗓️ Day 7–8: Authentication (Optional)

- Added `User` model and JWT-based login system
- Secured API routes with token-based middleware
- Stored token in `localStorage`, attached to headers

---

## 🗂️ Project Structure

```
root/
├── Solo project - Typed Tenzies/        # React frontend (Vite + TS)
└── Solo-project-Typed-Tenzies-Backend/        # Express backend (Node + TS)
```

---

## 🛠️ Tech Stack

| Layer     | Tool                      |
| --------- | ------------------------- |
| Frontend  | React + Vite + TypeScript |
| Backend   | Express + TypeScript      |
| Database  | MongoDB Atlas             |
| ORM       | Mongoose                  |
| Auth      | JWT + bcrypt              |
| Dev Tools | dotenv, nodemon, Postman  |

---

## 📦 Backend API Routes

| Method | Route            | Purpose                 |
| ------ | ---------------- | ----------------------- |
| POST   | `/api/game`      | Save game session       |
| GET    | `/api/games/top` | Fetch leaderboard stats |
| POST   | `/api/register`  | Register user           |
| POST   | `/api/login`     | Authenticate user       |

---

## 💾 Game Session Model (Mongoose)

```ts
interface GameSession {
  userId?: string;
  rolls: number;
  duration: number;
  date: Date;
  won: boolean;
}
```

---

## 🌐 Environment Setup

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm run dev
```

### .env File

```
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

---

## 🔐 Auth Notes (Optional)

- Passwords hashed with `bcrypt`
- JWT stored in `localStorage`
- Authorization header sent in protected requests

---

## 🔧 Known Limitations

- No realtime multiplayer (yet)
- Basic styling and transitions
- Auth lacks password reset or OAuth

## 🚀 Future Ideas

- Add persistent personal bests per user
- Dark mode / theme switcher
- Improve leaderboard logic with pagination
- Make it a PWA

---

## ✅ Final Thoughts

This project taught me how to build and connect both frontend and backend systems, work with MongoDB schemas, and reason through user auth flows. The game logic is simple — but the architecture behind it taught me a lot about what it means to ship something full-stack.

PRs and suggestions welcome!

