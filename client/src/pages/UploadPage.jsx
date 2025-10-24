import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import UploadListForm from '../components/UploadListForm';

const UploadPage = () => {
    const [agents, setAgents] = useState([]);
    const [key, setKey] = useState(0);

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
      
        <div className="h-full flex flex-col">
            <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center md:text-left">
                Upload & Distribute Tasks
            </h1>

            <div className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-xl">
                     <UploadListForm onUploadSuccess={refreshData} agentCount={agents.length} />
                </div>
            </div>
        </div>
    );
};

export default UploadPage;