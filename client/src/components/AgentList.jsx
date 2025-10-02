import React from 'react';

const AgentList = ({ agents }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Agents ({agents.length})</h3>
            <ul className="space-y-3">
                {agents.length > 0 ? (
                    agents.map(agent => (
                        <li key={agent._id} className="p-3 bg-slate-50 rounded-md border border-slate-200">
                            <p className="font-medium text-slate-800">{agent.name}</p>
                            <p className="text-sm text-slate-500">{agent.email}</p>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500">No agents have been created yet.</p>
                )}
            </ul>
        </div>
    );
};

export default AgentList;