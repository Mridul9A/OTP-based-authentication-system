# OTP Authentication App

A minimal full-stack web application implementing **OTP-based authentication** using React (frontend) and Node.js + Express (backend).

---

## Tech Stack

* **Frontend:** React (Vite), Axios, React Router
* **Backend:** Node.js, Express
* **Authentication:** JWT (JSON Web Token)
* **Storage:** In-memory (for demo)

---

##  Features

* Login using **email/phone**
* OTP generation & verification
* Max **3 attempts** → block for **10 minutes**
* JWT-based authentication
* Protected route (`/welcome`)
* Token persistence using `localStorage`

---

##  Project Structure

```
project-root/
│
├── frontend/   # React app
├── backend/    # Node.js API
```

---

#  Setup Instructions

## Clone Repository

```bash
git clone https://github.com/Mridul9A/OTP-based-authentication-system.git
cd OTP-based-authentication-system
```

---

# Backend Setup

## Navigate to backend

```bash
cd backend
```

## Install dependencies

```bash
npm install
```

## Create `.env`

```env
PORT=3000
FRONTEND_URL=http://localhost:5173
```

## Run backend

```bash
npm run dev
```

 Backend runs on:

```
http://localhost:3000
```

---

# Frontend Setup

## Navigate to frontend

```bash
cd frontend
```

## Install dependencies

```bash
npm install
```

## Create `.env`

```env
VITE_API_URL=http://localhost:3000
```

## Run frontend

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# How It Works

1. Enter email/phone on login page
2. OTP is generated (printed in backend console)
3. Enter OTP on verification page
4. On success → redirected to Welcome page
5. JWT token stored in localStorage

---

# API Endpoints

### Request OTP

```
POST /auth/request-otp
```

```json
{
  "identifier": "user@example.com"
}
```

---

### Verify OTP

```
POST /auth/verify-otp
```

```json
{
  "identifier": "user@example.com",
  "otp": "123456"
}
```

---

### Get User

```
GET /auth/me
```

Header:

```
Authorization: Bearer <token>
```

---

# Assumptions

* OTP expiry: **5 minutes**
* Max attempts: **3**
* Block duration: **10 minutes**
* Token format: **JWT (1 hour expiry)**
* Users are **auto-created (no signup)**
* OTP delivery is **mocked (console log)**

---

#  Limitations

* No real SMS/email integration
* No database (in-memory store)
* No rate limiting (can be added)

---

# Future Improvements

* Redis for OTP storage (TTL)
* Rate limiting (IP-based)
* Email/SMS integration (Twilio, SendGrid)
* Better UI/UX

---

# Summary

This project demonstrates a **complete OTP-based authentication flow** with proper validation, security checks, and clean architecture.

---
