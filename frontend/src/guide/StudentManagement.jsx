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

  if (loading) return <p>Loading students...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Student Management</h2>
      <table className="min-w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Department</th>
            <th className="p-2 border">Reg No</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Current Guide</th>
            <th className="p-2 border">Select</th>
          </tr>
        </thead>
        <tbody>
          {students.map(({ department, register_number, name, current_guide }) => (
            <tr key={register_number} className="text-center border">
              <td className="p-2 border">{department}</td>
              <td className="p-2 border">{register_number}</td>
              <td className="p-2 border">{name}</td>
              <td className="p-2 border">{current_guide || 'None'}</td>
              <td className="p-2 border">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  onClick={() => assignGuide(register_number)}
                >
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
