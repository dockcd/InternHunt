import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function GuideDashboard() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [internships, setInternships] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [loadingInternships, setLoadingInternships] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [acceptance, setAcceptance] = useState('');
  const guideEmail = Cookies.get('email');

  useEffect(() => {
    async function fetchStudents() {
      setLoadingStudents(true);
      setError('');
      try {
        if (!guideEmail) {
          setError('Guide email not found.');
          setLoadingStudents(false);
          return;
        }
        const encodedEmail = encodeURIComponent(guideEmail);
        const res = await axios.get(`http://localhost:5000/api/guidefunctions/students/${encodedEmail}`);
        setStudents(res.data.students);
      } catch {
        setError('Failed to fetch students');
      } finally {
        setLoadingStudents(false);
      }
    }
    fetchStudents();
  }, [guideEmail]);

  async function fetchInternships(studentEmail) {
    setLoadingInternships(true);
    setError('');
    try {
      const encodedEmail = encodeURIComponent(studentEmail);
      const res = await axios.get(`http://localhost:5000/api/guidefunctions/internships/${encodedEmail}`);
      setInternships(res.data.internships || []);
    } catch {
      setError('Failed to fetch internships');
      setInternships([]);
    } finally {
      setLoadingInternships(false);
    }
  }

  function handleStudentClick(student) {
    setSelectedStudent(student);
    fetchInternships(student.email);
  }

  function startEditing(internship) {
    setEditingId(internship.id);
    setRemarks(internship.remarks || '');
    setAcceptance(internship.acceptance || '');
  }

  function cancelEditing() {
    setEditingId(null);
    setRemarks('');
    setAcceptance('');
  }

  async function saveInternship(id) {
    try {
      await axios.patch(
        `http://localhost:5000/api/guidefunctions/internship/${id}`,
        { remarks, acceptance: acceptance || null }
      );
      setInternships((prev) =>
        prev.map((i) => (i.id === id ? { ...i, remarks, acceptance: acceptance || null } : i))
      );
      cancelEditing();
    } catch {
      alert('Failed to update internship');
    }
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-100 via-white to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-blue-800 p-6 space-x-8">
      {/* Sidebar: Students list */}
      <aside className="w-1/3 max-w-sm bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 overflow-auto max-h-[90vh]">
        <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white tracking-wide">
          Your Students
        </h2>
        {loadingStudents ? (
          <p className="text-lg text-blue-600 dark:text-blue-400">Loading students...</p>
        ) : students.length === 0 ? (
          <p className="text-lg text-gray-600 dark:text-gray-400">No students assigned.</p>
        ) : (
          <ul className="space-y-3">
            {students.map((student) => (
              <li
                key={student.register_number}
                onClick={() => handleStudentClick(student)}
                className={`p-4 rounded-lg cursor-pointer select-none transition-shadow ${
                  selectedStudent?.register_number === student.register_number
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-50 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-blue-700'
                }`}
              >
                {student.name}
              </li>
            ))}
          </ul>
        )}
        {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}
      </aside>

      {/* Main content: internships */}
      <main className="flex-1 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 overflow-auto max-h-[90vh]">
        <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white tracking-wide">
          {selectedStudent ? `${selectedStudent.name}'s Internships` : 'Select a student to view internships'}
        </h2>

        {loadingInternships ? (
          <p className="text-lg text-blue-600 dark:text-blue-400">Loading internships...</p>
        ) : !selectedStudent ? (
          <p className="text-lg text-gray-700 dark:text-gray-400">Please select a student from the list.</p>
        ) : internships.length === 0 ? (
          <p className="text-lg text-gray-600 dark:text-gray-400">No internships found for this student.</p>
        ) : (
          internships.map((internship) => (
            <div
              key={internship.id}
              className="mb-6 rounded-lg border border-gray-300 dark:border-gray-700 p-6 bg-gray-50 dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-2xl font-semibold mb-2 text-slate-900 dark:text-white tracking-tight">
                {internship.company_name}
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-1">
                <strong>Role:</strong> {internship.role}
              </p>
              <p className="text-slate-700 dark:text-slate-300 mb-1">
                <strong>Location:</strong> {internship.location} | <strong>Work type:</strong> {internship.work_type}
              </p>
              <p className="text-slate-700 dark:text-slate-300 mb-1">{internship.description}</p>
              <p className="text-slate-700 dark:text-slate-300 mb-1">
                <strong>Status:</strong> {internship.status}
              </p>

              {editingId === internship.id ? (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300">
                      Remarks
                    </label>
                    <textarea
                      rows={4}
                      className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      placeholder="Enter remarks..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300">
                      Acceptance
                    </label>
                    <select
                      className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={acceptance || ''}
                      onChange={(e) => setAcceptance(e.target.value)}
                    >
                      <option value="">N/A</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={() => saveInternship(internship.id)}
                      className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-slate-900 dark:text-white font-medium">
                      <strong>Remarks:</strong> {internship.remarks || 'None'}
                    </p>
                    <p className="text-slate-900 dark:text-white font-medium">
                      <strong>Acceptance:</strong> {internship.acceptance || 'N/A'}
                    </p>
                  </div>
                  <button
                    onClick={() => startEditing(internship)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))
        )}
        {error && <p className="text-red-600 mt-4 font-semibold">{error}</p>}
      </main>
    </div>
  );
}
