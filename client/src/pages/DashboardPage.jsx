import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

import AddAgentForm from '../components/AddAgentForm';
import AgentList from '../components/AgentList';
import UploadListForm from '../components/UploadListForm';
import DistributedLists from '../components/DistributedLists';

const DashboardPage = () => {
    const [agents, setAgents] = useState([]);
    const [distributedLists, setDistributedLists] = useState([]);
    const [key, setKey] = useState(0);
    const navigate = useNavigate();

    const fetchAgents = useCallback(async () => {
        try {
            const res = await api.get('/agents');
            setAgents(res.data);
        } catch (error) {
            console.error("Failed to fetch agents:", error);
        }
    }, []);

    const fetchDistributedLists = useCallback(async () => {
        try {
            const res = await api.get('/lists');
            setDistributedLists(res.data);
        } catch (error) {
            console.error("Failed to fetch distributed lists:", error);
        }
    }, []);

    useEffect(() => {
        fetchAgents();
        fetchDistributedLists();
    }, [fetchAgents, fetchDistributedLists, key]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };
    
    const refreshData = () => {
        setKey(prevKey => prevKey + 1);
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Logout
                    </button>
                </div>
            </header>
            
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Responsive grid: 1 column on small screens, 3 on larger screens */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Column 1: Agent Management */}
                    <div className="lg:col-span-1 space-y-8">
                        <AddAgentForm onAgentAdded={refreshData} />
                        <AgentList agents={agents} />
                    </div>

                    {/* Column 2 & 3: Task Management */}
                    <div className="lg:col-span-2 space-y-8">
                        <UploadListForm onUploadSuccess={refreshData} agentCount={agents.length} />
                        <DistributedLists lists={distributedLists} />
                    </div>

                </div>
            </main>
        </div>
    );
};

export default DashboardPage;