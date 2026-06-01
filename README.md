<div align="center">

# 🎧 SupportIQ  
### 🤖 AI Customer Support Ticketing System

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=26&duration=2500&pause=800&color=4F46E5&center=true&vCenter=true&width=950&lines=AI-Powered+Customer+Support+Ticketing;MERN+Stack+%7C+Socket.io+%7C+AI+Triage;SLA+Tracking+%7C+Audit+Logs+%7C+Admin+Analytics;Built+for+Full+Stack+%7C+AI+Engineer+Portfolios" alt="Typing SVG" />

<br/>

![React](https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-Realtime-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![AI](https://img.shields.io/badge/AI-Triage-4F46E5?style=for-the-badge)

<br/>

**A production-style SaaS customer support platform with AI ticket triage, SLA tracking, real-time comments, attachments, notifications, audit logs, and role-based dashboards.**

<img src="https://capsule-render.vercel.app/api?type=waving&color=4F46E5&height=95&section=header" width="100%" />

</div>

---

## 📸 Project Preview

<div align="center">

<img src="screenshots/supportiq-preview.png" alt="SupportIQ Project Preview" width="100%" />

</div>

---

## 🚀 Overview

**SupportIQ** is an AI-powered MERN customer support ticketing system. Customers create tickets, AI classifies priority/category/sentiment, agents resolve tickets with real-time comments, and admins monitor SLA breaches, analytics, agents, notifications, and audit logs.

## ✨ Features

- 👤 Customer / 🧑‍💻 Agent / 🛡️ Admin roles
- 🔐 JWT auth + bcrypt password hashing
- 🤖 AI triage: priority, category, sentiment, summary, tags
- 🎫 Ticket workflow: Open → In Progress → Waiting Customer → Resolved → Closed
- 💬 Real-time comments with Socket.io
- 📎 Attachments with validation
- ⏱️ SLA due dates and breach checks
- 🔔 Notifications
- 📜 Audit logs
- 📊 Dashboards and analytics
- 🧩 Clean responsive SaaS UI

## 🧠 AI Triage Rules

| Output | Examples |
|---|---|
| Category | Billing, Account Access, Bug Report |
| Priority | Low, Medium, High, Critical |
| Sentiment | Positive, Neutral, Negative, Angry, Urgent |
| Tags | login, billing, bug, refund, api |

Critical keywords include: `account hacked`, `security issue`, `data loss`, `system down`, `production outage`, `cannot access account`.

## ⏱️ SLA Rules

| Priority | First Response | Resolution |
|---|---:|---:|
| Critical | 1 hour | 6 hours |
| High | 4 hours | 24 hours |
| Medium | 12 hours | 48 hours |
| Low | 24 hours | 72 hours |

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS, React Router, Axios, Recharts, Lucide React |
| Realtime | Socket.io |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| Security | Helmet, CORS, express-rate-limit, express-validator |
| AI | Node rule-based fallback + optional FastAPI service |

## 🏗️ Architecture

```text
React Frontend
   |
   | REST API + JWT + Socket.io
   v
Express Backend
   |
   | Mongoose ODM
   v
MongoDB
   |
   | Optional HTTP JSON
   v
FastAPI AI Service / Node Rule-Based AI Fallback
```

## 📁 Project Structure

```text
supportiq-ai-ticketing-system/
├── frontend/
├── backend/
├── ai-service/
├── docs/
├── screenshots/
├── docker-compose.yml
├── README.md
└── .gitignore
```

## ⚙️ Run Locally

```bash
docker compose up -d mongo
```

```bash
cd ai-service
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

URLs:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:5000
AI:       http://localhost:8000
```

## 🔑 Demo Accounts

```text
Admin:    admin@example.com / Admin12345
Agent:    agent@example.com / Agent12345
Customer: customer@example.com / Customer12345
```

## 📌 CV Bullet

> Developed SupportIQ, an AI-powered MERN customer support ticketing system with role-based dashboards, ticket workflows, AI priority/category/sentiment detection, real-time comments, SLA tracking, file attachments, notifications, audit logs, and admin analytics.

<div align="center">

### ⭐ If you like this project, give it a star!
<img src="https://capsule-render.vercel.app/api?type=waving&color=4F46E5&height=120&section=footer" width="100%" />

</div>
