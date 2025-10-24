# MERN Task Distribution & Agent Management App

This is a full-stack, multi-tenant MERN application designed for administrators to manage teams of agents and automatically distribute tasks. It features a responsive sidebar navigation, secure admin registration/login, agent management, and automatic task distribution from a CSV file.


---

## ✨ Features

### 🔐 Secure Admin Authentication
- **Admin Signup:** New admin users can create their own accounts.  
- **Admin Login:** Secure login system using JSON Web Tokens (JWT).  
- **Password Security:** All passwords are hashed and salted using bcrypt.js.  

### 🏢 Multi-Tenant Architecture
A key feature ensuring that admins can only view, create, and manage the agents and tasks that belong to their own account. Data is fully isolated between users.

### 🧭 Responsive Dashboard Layout
- Modern, responsive UI with a fixed sidebar for desktop navigation.  
- Collapsible hamburger menu for mobile.  
- Uses **React Router v6** for nested routing (Dashboard, Manage Agents, Upload Tasks).

### 👥 Agent Management
- Admins can create new agents (Name, Email, Mobile, Password).  
- View a list of all agents under the logged-in admin.  

### 📋 Flexible Task Distribution
- Upload `.csv` file with task details (`FirstName`, `Phone`, `Notes`).  
- Backend validation with **Multer** to accept spreadsheet file types only.  
- Tasks distributed equally among all available agents.  

### 💎 Modern UI/UX
- Built with **React**, **Vite**, and **Tailwind CSS**.  
- Stylish, responsive tables with hover and zebra effects.  
- Clean, focused form design.  

---

## 🧰 Tech Stack

### Frontend
- React.js (v18)
- Vite
- React Router (v6)
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Bcrypt.js
- Multer
- csv-parser

---

## ⚙️ Prerequisites
Make sure you have:
- Node.js (v18 or later)
- npm (comes with Node.js)
- MongoDB (local or Atlas)

---

## 🚀 Setup and Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/tm33976/agent-task-manager.git
cd agent-task-manager
```

### 2️⃣ Backend Setup (server)
```bash
cd server
npm install
```

Create a `.env` file in `/server`:
```bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database_name>?retryWrites=true&w=majority
JWT_SECRET=YOUR_SECRET_KEY
PORT=5001
```

### 3️⃣ Frontend Setup (client)
```bash
cd client
npm install
```

Create `.env.local` in `/client`:
```bash
VITE_API_BASE_URL=http://localhost:5001/api
```

---

## ▶️ Running the Application

Run both backend and frontend in separate terminals:

**Backend:**
```bash
cd server
npm start
# Runs on http://localhost:5001
```

**Frontend:**
```bash
cd client
npm run dev
# Opens on http://localhost:5173
```

---

## 🧭 Usage / Workflow

1. Start both servers.  
2. Open `http://localhost:5173`.  
3. Sign up as a new admin (`admin1@test.com`).  
4. Log in with your credentials.  
5. Go to **Manage Agents** → Create agents.  
6. Go to **Upload Tasks** → Upload CSV file.  
7. Go to **Dashboard** → View distributed tasks.  
8. Log out and register a second admin (`admin2@test.com`).  
   - You’ll see an empty dashboard, confirming **multi-tenancy**.  

---

## 👨‍💻 Author
**Tushar Mishra**  
📧 Email: [tm3390782@gmail.com](mailto:tm3390782@gmail.com)
