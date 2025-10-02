import React from 'react';

const DistributedLists = ({ lists }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Distributed Tasks</h3>
            {lists.length > 0 ? (
                <div className="space-y-6">
                    {lists.map(agent => (
                        <div key={agent._id}>
                            <h4 className="font-semibold text-indigo-800 bg-indigo-100 p-2 rounded-t-md">{agent.name} <span className="font-normal text-gray-600">({agent.tasks.length} tasks)</span></h4>
                            <ul className="divide-y divide-gray-200 border border-t-0 border-gray-200 rounded-b-md">
                                {agent.tasks.length > 0 ? (
                                    agent.tasks.map(task => (
                                        <li key={task._id} className="p-3 flex justify-between items-center">
                                            <div>
                                                <p className="font-medium text-gray-800">{task.firstName}</p>
                                                <p className="text-sm text-gray-500">{task.notes}</p>
                                            </div>
                                            <p className="text-sm text-gray-600">{task.phone}</p>
                                        </li>
                                    ))
                                ) : (
                                    <li className="p-3 text-sm text-gray-500">No tasks assigned to this agent.</li>
                                )}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No lists have been distributed yet. Upload a CSV file to begin.</p>
            )}
        </div>
    );
};

export default DistributedLists;