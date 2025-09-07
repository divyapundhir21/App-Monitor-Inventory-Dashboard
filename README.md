# App-Monitor-Inventory-Dashboard
A web-based dashboard built with JavaScript, Node.js, and MongoDB to monitor and manage applications. The system allows users to check whether applications are up and running, while admins can manage application details seamlessly.

---

## 🚀 Features
- ✅ Dashboard with live **App Status**  
- ✅ **Search** apps by App ID or Technical Owner (backend-powered)  
- ✅ **App Details Modal** (owners, URLs, domains, vendor info, etc.)  
- ✅ **Admin Panel** to add, update, delete apps  
- ✅ **MongoDB storage** for persistent data  
- ✅ **Auth middleware** for admin routes  
- ✅ Clean, responsive **React frontend** (Bootstrap UI)  

---

## 🛠️ Tech Stack
- **Frontend:** React, Bootstrap, Axios  
- **Backend:** Node.js, Express  
- **Database:** MongoDB (local or Atlas)  
- **Auth:** JWT-based admin authentication  

---

## 📂 Project Structure
project-root/
├── backend/
│ ├── models/App.js
│ ├── routes/apps.js
│ ├── middleware/auth.js
│ ├── seed.js
│ └── server.js
│
├── frontend/
│ ├── public/index.html
│ └── src/
│ ├── App.js
│ ├── api.js
│ ├── index.js
│ └── components/
│ ├── Dashboard.js
│ ├── AppCard.js
│ ├── AppDetailsModal.js
│ └── AdminPanel.js
│
└── README.md

---
## API Endpoints
Apps

GET /api/apps → fetch all apps

GET /api/apps/search?query=xyz → search by App ID / Technical Owner

GET /api/apps/:id → get app by DB ID

POST /api/apps → create new app (admin only)

PUT /api/apps/:id → update app (admin only)

DELETE /api/apps/:id → delete app (admin only)
## ⚙️ Setup Instructions

### 1️⃣ Backend Setup
```bash
cd backend
npm install

MONGO_URI=mongodb://127.0.0.1:27017/appmonitor
JWT_SECRET=supersecretkey
PORT=5000

