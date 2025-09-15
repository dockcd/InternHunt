import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function AddInternship() {
  const [formData, setFormData] = useState({
    company_name: '',
    company_domain: '',
    location: '',
    work_type: 'Onsite',
    role: '',
    company_address: '',
    duration: '',
    reference_contact: '',
    status: 'Ongoing',
    description: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = Cookies.get('token');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/students/internships/add', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoading(false);
      navigate('/my-internships');
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Failed to add internship');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md max-w-lg w-full space-y-4"
      >
        <h2 className="text-2xl mb-4 font-bold">Add Internship</h2>

        {error && <div className="text-red-600">{error}</div>}

        <input
          type="text"
          name="company_name"
          value={formData.company_name}
          onChange={handleChange}
          placeholder="Company Name"
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="company_domain"
          value={formData.company_domain}
          onChange={handleChange}
          placeholder="Company Domain"
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location (City)"
          required
          className="w-full p-2 border rounded"
        />

        <select
          name="work_type"
          value={formData.work_type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="Onsite">Onsite</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Role"
          required
          className="w-full p-2 border rounded"
        />

        <textarea
          name="company_address"
          value={formData.company_address}
          onChange={handleChange}
          placeholder="Company Address"
          rows={3}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Duration (e.g., 3 months)"
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="reference_contact"
          value={formData.reference_contact}
          onChange={handleChange}
          placeholder="Company Reference Contact Number"
          className="w-full p-2 border rounded"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          rows={4}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {loading ? 'Adding...' : 'Add Internship'}
        </button>
      </form>
    </div>
  );
}