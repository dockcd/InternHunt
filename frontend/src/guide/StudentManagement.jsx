import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const guideEmail = Cookies.get('email');
  const token = Cookies.get('token');

  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await axios.get('http://localhost:5000/api/guide/students', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(res.data.students);
      } catch (err) {
        setError('Failed to fetch students');
      } finally {
        setLoading(false);
      }
    }
    fetchStudents();
  }, [token]);

  async function assignGuide(studentRegNo) {
    try {
      await axios.post(
        'http://localhost:5000/api/guide/assign-student',
        { studentRegNo, guideEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStudents((prev) =>
        prev.map((stud) =>
          stud.register_number === studentRegNo
            ? { ...stud, current_guide: guideEmail }
            : stud
        )
      );
    } catch {
      alert('Failed to assign guide');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-blue-900">
        <p className="text-blue-600 dark:text-blue-400 text-lg font-medium">Loading students...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-blue-900">
        <p className="text-red-600 text-lg font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-blue-900 p-8">
      <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Student Management</h2>
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-slate-800">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Department</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Reg No</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Current Guide</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">Select</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
            {students.map(({ department, register_number, name, current_guide }) => (
              <tr key={register_number} className="text-slate-900 dark:text-slate-200">
                <td className="px-4 py-3 whitespace-nowrap">{department}</td>
                <td className="px-4 py-3 whitespace-nowrap">{register_number}</td>
                <td className="px-4 py-3 whitespace-nowrap">{name}</td>
                <td className="px-4 py-3 whitespace-nowrap">{current_guide || 'None'}</td>
                <td className="px-4 py-3 text-center whitespace-nowrap">
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    onClick={() => assignGuide(register_number)}
                    aria-label={`Assign guide to student ${name} (${register_number})`}
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
