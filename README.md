# 🤖 SmartTalk – AI Chatbot

A real-time chatbot powered by Google's Gemini API. Designed to generate smart, context-aware responses with a sleek UI and secure backend.

## 🌐 Live Demo

🔗 [SmartTalk Live](https://smarttalk-chatbot-ai.netlify.app/)  
📦 [GitHub Repository](https://github.com/CodeSagarrr/SmartTalk_ChatBot)

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Token)
- **AI Engine**: Gemini API
- **Deployment**: Netlify (frontend), Render (backend)

---

## ✨ Features

- ✅ Secure login with JWT
- 💬 Smart real-time chatbot using Gemini
- 🔐 Protected routes for conversation security
- 🧠 Context-aware messaging
- ⚡ Clean UI and mobile responsive



---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/CodeSagarrr/SmartTalk-ChatBot-AI.git

cd client
npm install
cd ../server
npm install

// Create .env in /server folder with:
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_key
GEMINI_API_KEY=your_gemini_api


cd server
npm run dev
