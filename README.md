# IncidentFlow

Multi-Tenant Incident Response Platform built as part of the DMimpact Full Stack Developer Coding Challenge.

---

# Project Overview

IncidentFlow is a multi-tenant SaaS incident management platform where organizations can securely manage incidents, alerts, assignments, comments, and response workflows with strict tenant isolation.

The platform supports:

* JWT Authentication
* Role-Based Access Control
* Incident Lifecycle Management
* Tenant-Aware Data Isolation
* Activity Tracking
* Responsive Dashboard UI
* REST API Architecture

---

# Features

## Authentication & Authorization

* JWT-based authentication
* Secure login system
* Role-based access control
* Roles:

  * Admin
  * Manager
  * User

---

## Incident Management

* Create incidents
* Update incidents
* Resolve incidents
* Incident status tracking
* Priority management
* Incident detail view
* Search functionality
* Responsive dashboard

---

## Multi-Tenant Architecture

Each organization acts as an isolated tenant.

Every user, incident, comment, and activity log is linked using:

```js
tenantId
```

Backend queries are tenant-scoped to prevent cross-tenant data leaks.


# Tech Stack

## Frontend

* React
* Vite
* Bootstrap 5
* React Router DOM
* Axios

---

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs

---

# Folder Structure

```bash
IncidentFlow/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│
└── README.md
```

---

# Database Design

## Tenant

```js
{
  name,
}
```

---

## User

```js
{
  name,
  email,
  password,
  role,
  tenantId,
}
```

---

## Incident

```js
{
  title,
  description,
  status,
  priority,
  tenantId,
  assignedTo,
  createdBy,
}
```

---

## Comment

```js
{
  incidentId,
  userId,
  tenantId,
  message,
}
```

---

## ActivityLog

```js
{
  incidentId,
  userId,
  tenantId,
  action,
}
```

---

# API Endpoints

## Authentication

### Login

```bash
POST /api/auth/login
```

---

## Incidents

### Get All Incidents

```bash
GET /api/incidents
```

### Get Single Incident

```bash
GET /api/incidents/:id
```

### Create Incident

```bash
POST /api/incidents
```

### Update Incident

```bash
PUT /api/incidents/:id
```

---

# Frontend Setup

## Clone Repository

```bash
git clone <repository-url>
```

---

## Navigate to Frontend

```bash
cd frontend
```

---

## Install Dependencies

```bash
npm install
```

---

## Run Frontend

```bash
npm run dev
```

---

# Backend Setup

## Navigate to Backend

```bash
cd backend
```

---

## Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## Run Backend

```bash
npm run dev
```

---

# Security Practices

* JWT-based authentication
* Password hashing using bcryptjs
* Tenant-aware queries
* Protected routes
* Role-based authorization
* Environment variable protection

---

# Tenant Isolation Strategy

Strict tenant isolation is implemented using:

* `tenantId` on every entity
* JWT payload containing tenantId
* Middleware-based authentication
* Tenant-scoped database queries

Example:

```js
Incident.find({
  tenantId: req.user.tenantId,
});
```

This prevents accidental or malicious cross-tenant access.

---

# Scalability Considerations

The platform is designed with scalability in mind.

## Planned scalability improvements:

* Database indexing on tenantId
* Pagination for incidents
* WebSocket support for real-time updates
* Horizontal backend scaling
* Caching layer using Redis
* Queue-based notification processing

---

# Concurrent Update Strategy

Current MVP implementation follows:

```text
Last Write Wins
```

Future improvement:

* Optimistic locking
* Version control strategy

---

# UI/UX Considerations

* Responsive Bootstrap UI
* Mobile-friendly layouts
* Loading states
* Error handling states
* Empty state handling
* Simple and clean dashboard

---

# Deployment

## Frontend Deployment

Deployed using:

urlVercel https://incidentflow-eta.vercel.app/

---

## Backend Deployment

Deployed using:

urlRender https://incidentflow.onrender.com

---

# Assumptions & Tradeoffs

* Focused on MVP architecture and engineering clarity
* Simplified notification workflow
* Basic activity timeline implementation
* Minimal RBAC restrictions for faster delivery
* Optimized for readability and maintainability

---

# Future Improvements

* Real-time notifications
* WebSocket integration
* Email alerts
* File attachments
* Advanced filtering
* Audit analytics dashboard
* Notification engine
* Team collaboration features

---

# Author

Developed for DMimpact Engineering Evaluation.
