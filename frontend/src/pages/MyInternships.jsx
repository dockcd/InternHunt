import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function MyInternships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = Cookies.get('token');

  useEffect(() => {
    async function fetchInternships() {
      try {
        const res = await axios.get('http://localhost:5000/api/students/internships/my', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInternships(res.data.internships);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch internships');
      } finally {
        setLoading(false);
      }
    }
    fetchInternships();
  }, [token]);

  const getStatusColor = status => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'completed':
        return 'bg-emerald-100 text-emerald-700 border-emerald-300';
      case 'pending':
      case 'in progress':
        return 'bg-amber-100 text-amber-700 border-amber-300';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 dark:from-gray-800 dark:via-slate-800 dark:to-blue-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 dark:border-slate-400 mx-auto"></div>
          <div className="mt-4 text-lg font-medium text-blue-600 dark:text-blue-400">Loading your internships...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 dark:from-gray-800 dark:via-slate-800 dark:to-blue-800 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white/90 dark:bg-slate-700 backdrop-blur-sm rounded-xl border border-red-300 dark:border-red-600 p-10 shadow-xl text-center">
          <div className="w-16 h-16 mx-auto mb-5 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Error Loading Internships</h3>
          <p className="text-slate-700 dark:text-slate-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 dark:from-gray-800 dark:via-slate-800 dark:to-blue-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12">
        {/* Header */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="mb-6 sm:mb-0">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2">
              My Internships
            </h1>
            <p className="text-blue-600 dark:text-blue-300">
              Manage and track your internship experiences
            </p>
          </div>
          <button
            onClick={() => navigate('/my-internships/add')}
            className="inline-flex items-center px-6 py-3 rounded-md shadow-sm text-white bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
          >
            <svg className="w-5 h-5 mr-2 stroke-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add New Internship
          </button>
        </div>

        {/* Content */}
        {internships.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-slate-200 rounded-full flex items-center justify-center dark:bg-slate-700">
                <svg className="w-12 h-12 text-slate-400 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-200 mb-2">No internships recorded</h3>
              <p className="text-slate-700 dark:text-slate-400 mb-8">
                Start building your professional portfolio by adding your first internship experience.
              </p>
              <button
                onClick={() => navigate('/my-internships/add')}
                className="inline-flex items-center px-6 py-3 rounded-md shadow-sm text-white bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
              >
                Add Your First Internship
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {internships.map(internship => (
              <div
                key={internship.id}
                className="bg-white dark:bg-slate-700 rounded-xl border border-slate-300 dark:border-slate-600 p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-1 leading-tight">
                      {internship.role}
                    </h3>
                    <p className="text-lg text-slate-700 dark:text-slate-300 font-medium">{internship.company_name}</p>
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      internship.status
                    )}`}
                  >
                    {internship.status}
                  </span>
                </div>

                {/* Company Information */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <dt className="text-sm font-medium text-slate-500 w-20 flex-shrink-0">Domain</dt>
                    <dd className="text-sm text-slate-900 dark:text-slate-200 ml-4">{internship.company_domain}</dd>
                  </div>
                  <div className="flex items-start">
                    <dt className="text-sm font-medium text-slate-500 w-20 flex-shrink-0">Location</dt>
                    <dd className="text-sm text-slate-900 dark:text-slate-200 ml-4">{internship.location}</dd>
                  </div>
                  <div className="flex items-start">
                    <dt className="text-sm font-medium text-slate-500 w-20 flex-shrink-0">Type</dt>
                    <dd className="text-sm text-slate-900 dark:text-slate-200 ml-4">{internship.work_type}</dd>
                  </div>
                </div>

                {/* Description */}
                {internship.description && (
                  <div className="mb-6">
                    <dt className="text-sm font-medium text-slate-500 mb-2">Description</dt>
                    <dd className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800 rounded-md p-3 border border-slate-200 dark:border-slate-700">
                      {internship.description}
                    </dd>
                  </div>
                )}

                {/* Approval Status */}
                {internship.acceptance && internship.acceptance.trim() !== '' && (
                  <div className="mb-4 p-4 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 rounded-md">
                    <dt className="text-sm font-medium text-emerald-800 dark:text-emerald-300 mb-1">Approval Status</dt>
                    <dd className="text-sm text-emerald-700 dark:text-emerald-400">{internship.acceptance}</dd>
                  </div>
                )}

                {/* Faculty Remarks */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <dt className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Faculty Remarks</dt>
                  <dd className="text-sm text-slate-600 dark:text-slate-400 italic">
                    {internship.remarks || 'No remarks provided'}
                  </dd>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}