import React, { useState } from 'react';
import api from '../services/api';

const UploadListForm = ({ onUploadSuccess, agentCount }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file to upload.');
            return;
        }
        if (agentCount < 5) {
            setError('You must create at least 5 agents before uploading a list.');
            return;
        }

        setError('');
        setSuccess('');
        setIsLoading(true);

        const formData = new FormData();
        formData.append('list', file);

        try {
            await api.post('/lists/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setSuccess('File uploaded and tasks distributed successfully!');
            onUploadSuccess();
        } catch (err) {
            setError(err.response?.data?.message || 'File upload failed.');
        } finally {
            setIsLoading(false);
            e.target.reset();
            setFile(null);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload & Distribute List</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-sm text-gray-600">
                    <p>Upload a CSV file with headers: `FirstName`, `Phone`, `Notes`</p>
                </div>
                <div>
                     <input type="file" onChange={handleFileChange} accept=".csv,.xlsx,.xls" required className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
                </div>
                <button type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed">
                    {isLoading ? 'Uploading...' : 'Upload & Distribute'}
                </button>
            </form>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
        </div>
    );
};

export default UploadListForm;