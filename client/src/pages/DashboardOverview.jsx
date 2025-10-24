import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import DistributedLists from '../components/DistributedLists';

const DashboardOverview = () => {
    const [distributedLists, setDistributedLists] = useState([]);

    const fetchDistributedLists = useCallback(async () => {
        try {
            const res = await api.get('/lists');
            setDistributedLists(res.data);
        } catch (error) {
            console.error("Failed to fetch distributed lists:", error);
        }
    }, []);

    useEffect(() => {
        fetchDistributedLists();
    }, [fetchDistributedLists]);

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-6">All Distributed Tasks</h1>
            <DistributedLists lists={distributedLists} />
        </div>
    );
};

export default DashboardOverview;