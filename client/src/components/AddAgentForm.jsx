import React, { useState } from 'react';
import api from '../services/api';

const AddAgentForm = ({ onAgentAdded }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await api.post('/agents/add', { name, email, mobile, password });
            setSuccess(`Agent "${name}" created successfully!`);
            setName('');
            setEmail('');
            setMobile('');
            setPassword('');
            onAgentAdded();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create agent.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Agent</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                 <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                 <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                 <input type="text" value={mobile} onChange={e => setMobile(e.target.value)} placeholder="Mobile (with country code)" required className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                 <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Add Agent
                </button>
            </form>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
        </div>
    );
};

export default AddAgentForm;