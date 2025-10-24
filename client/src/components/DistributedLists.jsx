import React from 'react';

const DistributedLists = ({ lists }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Distributed Tasks</h3>
            {lists.length > 0 ? (
          
                <div className="rounded-lg shadow overflow-hidden border border-gray-200">
                    <table className="min-w-full">
                        <thead className="bg-slate-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Agent</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">First Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Notes</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {lists.map(agent => (
                                <React.Fragment key={agent._id}>
                                    {agent.tasks.length > 0 ? (
                                        agent.tasks.map((task, taskIndex) => (
                                            <tr key={task._id} className="even:bg-slate-50 hover:bg-indigo-50 transition-colors duration-200">
                                                {/* Agent name cell, shown only on the first row of their tasks */}
                                                {taskIndex === 0 && (
                                                    <td rowSpan={agent.tasks.length} className="px-6 py-4 align-top border-t border-gray-200">
                                                        <div className="font-bold text-indigo-600">{agent.name}</div>
                                                        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                                                            {agent.tasks.length} tasks
                                                        </span>
                                                    </td>
                                                )}
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-t border-gray-200">{task.firstName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-t border-gray-200">{task.phone}</td>
                                                <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 border-t border-gray-200">{task.notes}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        // Row for agent with no tasks
                                        <tr className="even:bg-slate-50">
                                            <td className="px-6 py-4 align-top border-t border-gray-200">
                                                 <div className="font-bold text-indigo-600">{agent.name}</div>
                                                 <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                                                    0 tasks
                                                 </span>
                                            </td>
                                            <td colSpan="3" className="px-6 py-4 text-sm text-center text-gray-400 border-t border-gray-200">No tasks assigned.</td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500">No lists have been distributed yet. Upload a CSV file to begin.</p>
            )}
        </div>
    );
};

export default DistributedLists;