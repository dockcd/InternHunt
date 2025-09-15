import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const DOCUMENT_TYPES = [
  { key: 'bonafide', label: 'Bonafide Letter', dbKey: 'bonafide_letter_url' },
  { key: 'offer', label: 'Offer Letter', dbKey: 'internship_offer_letter_url' },
  { key: 'completion', label: 'Completion Certificate', dbKey: 'internship_completion_letter_url' },
  { key: 'report', label: 'Internship Report', dbKey: 'internship_report_url' },
];

export default function ManageDocuments() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploadStatus, setUploadStatus] = useState({});
  const [docInfo, setDocInfo] = useState({}); // { internshipId: { docType: url/null, ... } }

  const token = Cookies.get('token');
  const email = Cookies.get('email');

  // Fetch internships
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

  // Fetch uploaded status per internship
  useEffect(() => {
    async function fetchDocs() {
      for (const internship of internships) {
        try {
          const url = `http://localhost:5000/api/documents/${email}/${internship.id}`;
          const res = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
          setDocInfo(prev => ({ ...prev, [internship.id]: res.data }));
        } catch {
          setDocInfo(prev => ({ ...prev, [internship.id]: {} }));
        }
      }
    }
    if (internships.length > 0) fetchDocs();
  }, [internships, email, token]);

  // Handle file upload
  async function handleFileUpload(event, internshipId, docType, dbKey) {
    const file = event.target.files[0];
    if (!file) return;

    const statusKey = `${internshipId}_${docType}`;
    setUploadStatus(prev => ({ ...prev, [statusKey]: 'Uploading...' }));

    const formData = new FormData();
    formData.append('file', file);

    try {
      const url = `http://localhost:5000/api/documents/upload/${email}/${internshipId}/${docType}`;
      await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setUploadStatus(prev => ({ ...prev, [statusKey]: 'Success' }));

      // Refetch document info for this internship to update status
      try {
        const docRes = await axios.get(
          `http://localhost:5000/api/documents/${email}/${internshipId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDocInfo(prev => ({ ...prev, [internshipId]: docRes.data }));
      } catch {}
    } catch (err) {
      setUploadStatus(prev => ({ ...prev, [statusKey]: 'Error uploading file' }));
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 dark:from-gray-800 dark:via-slate-800 dark:to-blue-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-blue-500 dark:text-blue-300 font-medium">Loading your internships...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 dark:from-gray-800 dark:via-slate-800 dark:to-blue-800 flex items-center justify-center px-8">
        <div className="max-w-lg bg-white/90 dark:bg-slate-700 backdrop-blur-sm rounded-xl border border-slate-300 dark:border-slate-600 p-12 shadow-xl text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600/40 dark:to-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Error Loading Internships</h3>
          <p className="text-slate-600 dark:text-slate-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 dark:from-gray-800 dark:via-slate-800 dark:to-blue-800 px-8 py-12">
      <header className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Manage Documents
        </h1>
        <p className="text-blue-500 dark:text-blue-300 mt-2">
          Upload and track your internship-related documents securely.
        </p>
      </header>

      {internships.length === 0 ? (
        <p className="max-w-4xl mx-auto text-center text-slate-600 dark:text-slate-400 font-medium">
          No internships found. Please add internships first.
        </p>
      ) : (
        <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {internships.map((internship) => (
            <div
              key={internship.id}
              className="bg-white dark:bg-slate-700 rounded-xl border border-slate-300 dark:border-slate-600 p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                {internship.role}
              </h3>
              <p className="mb-6 text-slate-600 dark:text-slate-300">
                <strong className="font-medium text-slate-800 dark:text-slate-200">Company:</strong>{' '}
                {internship.company_name}
              </p>

              {DOCUMENT_TYPES.map(({ key, label, dbKey }) => {
                const statusKey = `${internship.id}_${key}`;
                const uploaded = docInfo[internship.id]?.[dbKey];
                const statusText = uploadStatus[statusKey]
                  ? uploadStatus[statusKey]
                  : uploaded
                  ? 'Uploaded'
                  : 'No file chosen';

                const statusColor =
                  uploadStatus[statusKey] === 'Error uploading file'
                    ? 'text-red-500'
                    : uploaded || uploadStatus[statusKey] === 'Success'
                    ? 'text-emerald-500'
                    : 'text-slate-500 dark:text-slate-400';

                return (
                  <div key={key} className="mb-5">
                    <label className="block mb-1 font-semibold text-slate-800 dark:text-slate-200">
                      {label}
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload(e, internship.id, key, dbKey)}
                      className="block w-full text-sm text-slate-800 dark:text-slate-300
                        file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold
                        file:bg-blue-100 file:text-blue-600 hover:file:bg-blue-200 dark:file:bg-blue-800/60 dark:file:text-blue-300 dark:hover:file:bg-blue-800/80
                        transition-colors cursor-pointer"
                      aria-label={`Upload ${label} for ${internship.role} at ${internship.company_name}`}
                    />
                    <small className={`block mt-1 text-sm font-medium ${statusColor}`}>
                      {statusText}
                    </small>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
