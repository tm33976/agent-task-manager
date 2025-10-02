# MERN Task Distribution & Agent Management App

This is a full-stack MERN application designed for an administrator to manage a team of agents and automatically distribute tasks to them by uploading a CSV file. The application features a secure admin login, agent creation, and a robust task distribution logic.



## Features

- **Secure Admin Login:** Authentication is handled using JSON Web Tokens (JWT) to ensure secure access to the dashboard.
- **Agent Management:** Admins can create and view a list of agents who will be assigned tasks.
- **CSV Task Upload:** Admins can upload a .csv file containing a list of tasks (e.g., leads, contacts).
- **Automatic Task Distribution:** The core feature of the application. Tasks from the uploaded CSV are automatically and equally distributed among the 5 available agents. The logic also handles remainders for lists not perfectly divisible by 5.
- **Modern & Responsive UI:** The user interface is built with Vite, React, and Tailwind CSS for a stunning, fast, and fully responsive experience on all devices.

## Tech Stack

### Frontend:
- React.js (v18): A JavaScript library for building user interfaces.
- Vite: A lightning-fast frontend build tool.
- Tailwind CSS: A utility-first CSS framework for rapid, modern UI development.
- React Router: For handling client-side routing and navigation.
- Axios: For making HTTP requests to the backend API.

### Backend:
- Node.js: A JavaScript runtime environment.
- Express.js: A web application framework for Node.js.
- MongoDB: A NoSQL database for storing application data.
- Mongoose: An ODM library for MongoDB and Node.js.
- JSON Web Token (JWT): For handling user authentication.
- Bcrypt.js: For hashing user passwords securely.
- Multer: For handling file uploads (CSV files).

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (v18 or later recommended)
- npm (comes with Node.js)
- A MongoDB database instance (local or a cloud service like MongoDB Atlas)

## Setup and Installation

Follow these steps to get the project running locally.

### 1. Clone the Repository

```bash
git clone https://github.com/tm33976/agent-task-manager.git
cd agent-task-manager
```

### 2. Backend Setup (server)

```bash
# Navigate to the server directory
cd server
# Install dependencies
npm install
```

Create a `.env` file in the `/server` directory and add the following variables:

```env
# Your MongoDB connection string from MongoDB Atlas
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database_name>?retryWrites=true&w=majority

# A strong, secret key for signing JWTs
JWT_SECRET=YOUR_SECRET_KEY

# PORT
PORT=5001
```

### 3. Frontend Setup (client)

```bash
# Navigate to the client directory from the root
cd client
# Install dependencies
npm install
```

Create a `.env.local` file in the `/client` directory and add the following:

```env
# The base URL for your backend API
VITE_API_BASE_URL=http://localhost:5001/api
```

## Running the Application

You need to run both the backend and frontend servers simultaneously in two separate terminals.

### 1. Start the Backend Server

```bash
# In a terminal, navigate to the server directory
cd server
npm start
# The server will be running on http://localhost:5001
```

### 2. Start the Frontend Server

```bash
# In a NEW terminal, navigate to the client directory
cd client
npm run dev
# The application will open in your browser, usually at http://localhost:5173
```

## Usage / Application Workflow

### 1. Create the First Admin User

The database is initially empty. To log in, you must first create an admin user via the API.

For Git Bash, macOS, or Linux terminals:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"email":"admin@example.com", "password":"password123"}' http://localhost:5001/api/admin/register
```

For Windows PowerShell terminal:

```powershell
Invoke-WebRequest -Uri http://localhost:5001/api/admin/register -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"email":"admin@example.com", "password":"password123"}'
```

### 2. Log In

Go to the application in your browser. Use the credentials you just created (`admin@example.com` / `password123`) to log in.

### 3. Create Agents

On the dashboard, create at least 5 agents. The task distribution logic relies on having 5 agents.

### 4. Upload Tasks

Upload a CSV file with the following exact headers:

```
FirstName, Phone, Notes
```

The tasks will be automatically distributed among the 5 agents you created, and the dashboard will update to show the results.


---

## Author

👨‍💻 **Tushar Mishra**  
📧 Email: [tm3390782@gmail.com](mailto:tm3390782@gmail.com)
