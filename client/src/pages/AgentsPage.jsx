import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import AddAgentForm from '../components/AddAgentForm';
import AgentList from '../components/AgentList';

const AgentsPage = () => {
    const [agents, setAgents] = useState([]);
    const [key, setKey] = useState(0); // Used to force re-renders

    const refreshData = () => {
        setKey(prevKey => prevKey + 1);
    };

    const fetchAgents = useCallback(async () => {
        try {
            const res = await api.get('/agents');
            setAgents(res.data);
        } catch (error) {
            console.error("Failed to fetch agents:", error);
        }
    }, []);

    useEffect(() => {
        fetchAgents();
    }, [fetchAgents, key]);

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Manage Agents</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <AddAgentForm onAgentAdded={refreshData} />
                </div>
                <div>
                    <AgentList agents={agents} />
                </div>
            </div>
        </div>
    );
};

export default AgentsPage;