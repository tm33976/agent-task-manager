import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const DashboardLayout = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const activeLinkStyle = {
        backgroundColor: '#4f46e5', // indigo-700
        color: 'white',
    };

    const SidebarContent = () => (
        <>
            <div className="p-6 text-2xl font-bold border-b border-slate-700">
                Admin Panel
            </div>
            <nav className="flex-grow p-4 space-y-2">
                <NavLink
                    to="/dashboard" end
                    style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                    className="block px-4 py-2 rounded-md hover:bg-slate-700"
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="/dashboard/agents"
                    style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                    className="block px-4 py-2 rounded-md hover:bg-slate-700"
                >
                    Manage Agents
                </NavLink>
                <NavLink
                    to="/dashboard/upload"
                    style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                    className="block px-4 py-2 rounded-md hover:bg-slate-700"
                >
                    Upload Tasks
                </NavLink>
            </nav>
            <div className="p-4 border-t border-slate-700">
                 <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 rounded-md hover:bg-red-500 hover:text-white"
                >
                    Logout
                </button>
            </div>
        </>
    );

    return (
        // v-- Key change here: Set height to screen and hide parent overflow --v
        <div className="relative h-screen flex overflow-hidden bg-slate-50">
            {/* Mobile menu overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar (no changes needed here, its logic is already responsive) */}
            <aside 
                className={`w-64 bg-slate-800 text-slate-100 flex flex-col fixed inset-y-0 left-0 z-30
                           transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                           transition-transform duration-300 ease-in-out
                           md:relative md:translate-x-0`}
            >
                <SidebarContent />
            </aside>
            
            {/* v-- This is the new structure for the main content area --v */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header for Mobile */}
                <header className="p-4 bg-white shadow-sm md:hidden">
                    <button onClick={() => setSidebarOpen(true)} className="text-slate-800">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </header>

                {/* Scrollable Main Content */}
                <main className="flex-1 p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
             {/* ^-- End of new main content structure --^ */}
        </div>
    );
};

export default DashboardLayout;