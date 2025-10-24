import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts and Pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardLayout from './layouts/DashboardLayout'; // <-- Import the new layout

// These will be our new dashboard pages
import DashboardOverview from './pages/DashboardOverview';
import AgentsPage from './pages/AgentsPage';
import UploadPage from './pages/UploadPage';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/" />;
};

function App() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Private Dashboard Routes */}
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <DashboardLayout />
                    </PrivateRoute>
                }
            >
                {/* These are the child routes that will render inside the <Outlet /> */}
                <Route index element={<DashboardOverview />} />
                <Route path="agents" element={<AgentsPage />} />
                <Route path="upload" element={<UploadPage />} />
            </Route>
        </Routes>
    );
}

export default App;