# 🤖 Zena – AI Chatbot (Perplexity-Inspired)

> A modern, full‑stack AI assistant that blends conversational intelligence with real‑time search.

<p align="center">
  <img alt="Zena banner" src="https://placehold.co/1200x300?text=Zena+AI" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue" />
  <img src="https://img.shields.io/badge/Backend-Node.js-green" />
  <img src="https://img.shields.io/badge/Database-MongoDB-brightgreen" />
  <img src="https://img.shields.io/badge/AI-LangChain%20%7C%20Mistral%20%7C%20Gemini-purple" />
  <img src="https://img.shields.io/badge/Realtime-Socket.io-black" />
  <img src="https://img.shields.io/badge/License-MIT-yellow" />
</p>

---

## ✨ Overview

**Zena** is a Perplexity‑inspired AI chatbot that delivers fast, context‑aware answers with a clean chat UX. It combines LLM reasoning with optional internet search to provide up‑to‑date responses while maintaining conversation context.

---

## 🧭 Table of Contents

* [Features](#-features)
* [Demo](#-demo)
* [Architecture](#-architecture)
* [Tech Stack](#-tech-stack)
* [Project Structure](#-project-structure)
* [Getting Started](#-getting-started)
* [Environment Variables](#-environment-variables)
* [Scripts](#-scripts)
* [API](#-api)
* [Roadmap](#-roadmap)
* [Contributing](#-contributing)
* [License](#-license)

---

## 🚀 Features

* 💬 **Real-time chat** with Socket.io
* 🧠 **LLM responses** via Mistral & Gemini
* 🌐 **Internet search tool** (Tavily)
* 🗂️ **Persistent chats & messages** (MongoDB)
* ⚡ **Fast UI** with React + Tailwind
* 🔄 **State management** using Redux
* 🧩 **Modular architecture** (clean separation of concerns)

---

## 🎥 Demo

> Add screenshots or a short GIF here

```
assets/
 ├── chat-ui.png
 ├── conversation.gif
```

---

## 🏗️ Architecture

```
[ React + Redux ]
         │
         ▼
[ Express API ] ──► [ MongoDB ]
         │
         ├──► [ LangChain ] ─► [ Mistral / Gemini ]
         │
         └──► [ Tavily Search Tool ]
         │
         ▼
[ Socket.io (Realtime) ]
```

---

## 🛠️ Tech Stack

### Frontend

* React
* Redux Toolkit
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### AI & Tools

* LangChain
* Mistral AI
* Google Gemini
* Tavily (internet search)

---

## 📁 Project Structure

```
Backend/
 ├── config/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── service/
 │   ├── chat.api.js
 │   ├── chat.socket.js
 │   └── ai.services.js
 ├── socket/
 ├── index.js
```

---

## ⚡ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Pallavxs/fullstack-notes.git
```

### 2. Navigate to project

```bash
cd Backend/perplexity-12
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start development server

```bash
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
JWT_SECRET=your_jwt_secret

GOOGLE_CLIENT=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REFRESH_TOKEN=your_google_refresh_token
GOOGLE_USER=your_email

PORT=3000

GOOGLE_API_KEY=your_google_api_key
MISTRAL_API_KEY=your_mistral_api_key
TAVILY_API_KEY=your_tavily_api_key
```

> ⚠️ Never commit your `.env` file.

---

## 📜 Scripts

```bash
npm run dev     # start with nodemon
npm start       # production start
```

---

## 🔌 API

### Chat Routes

| Method | Endpoint        | Description            |
| ------ | --------------- | ---------------------- |
| GET    | `/api/chat`     | Get all chats          |
| GET    | `/api/chat/:id` | Get messages of a chat |
| POST   | `/api/chat`     | Create chat            |
| DELETE | `/api/chat/:id` | Delete chat            |

### AI Routes

| Method | Endpoint          | Description          |
| ------ | ----------------- | -------------------- |
| POST   | `/api/ai/message` | Generate AI response |
| POST   | `/api/ai/title`   | Generate chat title  |

---

## 🗺️ Roadmap

* 🧠 Auto tool usage (AI decides when to search)
* 📁 File upload + document Q&A
* 🗣️ Voice input/output
* 📊 Improved UI/UX & animations
* 🔍 Better context memory handling

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch (`feature/your-feature`)
3. Commit your changes
4. Open a Pull Request

If you have a feature idea, feel free to open an issue.

---

## 🔗 Project Link

[https://github.com/Pallavxs/fullstack-notes/tree/main/Backend/perplexity%20-12](https://github.com/Pallavxs/fullstack-notes/tree/main/Backend/perplexity%20-12)

---

## 📄 License

MIT License

---

✨ **More features coming soon. Stay tuned!**
