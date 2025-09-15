// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { useNavigate } from 'react-router-dom';

// export default function MyInternships() {
//   const [internships, setInternships] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const token = Cookies.get('token');

//   useEffect(() => {
//     async function fetchInternships() {
//       try {
//         const res = await axios.get('http://localhost:5000/api/students/internships/my', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setInternships(res.data.internships);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to fetch internships');
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchInternships();
//   }, [token]);

//   if (loading) return <div className="p-4 text-center">Loading...</div>;
//   if (error) return <div className="p-4 text-center text-red-600">{error}</div>;

//   return (
//     <div className="min-h-screen p-8 bg-gray-100">
//       <h2 className="text-2xl font-bold mb-6">My Internships</h2>
//       <button
//         className="mb-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//         onClick={() => navigate('/my-internships/add')}
//       >
//         Add Internship
//       </button>
//       {internships.length === 0 ? (
//         <p>No internships added yet.</p>
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//           {internships.map((internship) => (
//             <div key={internship.id} className="bg-white p-4 rounded shadow">
//               <h3 className="text-lg font-semibold mb-1">{internship.role}</h3>
//               <p><strong>Company:</strong> {internship.company_name}</p>
//               <p><strong>Domain:</strong> {internship.company_domain}</p>
//               <p><strong>Location:</strong> {internship.location}</p>
//               <p><strong>Work Type:</strong> {internship.work_type}</p>
//               <p><strong>Status:</strong> {internship.status}</p>

//               <p className="mt-2 text-sm">{internship.description}</p>
              
//               {internship.acceptance && internship.acceptance.trim() !== '' && (
//                 <p className="mt-4"><strong>Approval:</strong> {internship.acceptance}</p>
//               )}
//               <p><strong>Remarks:</strong> {internship.remarks ? internship.remarks : 'No remarks yet'}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { useNavigate } from 'react-router-dom';

// export default function MyInternships() {
//   const [internships, setInternships] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const token = Cookies.get('token');

//   useEffect(() => {
//     async function fetchInternships() {
//       try {
//         const res = await axios.get('http://localhost:5000/api/students/internships/my', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setInternships(res.data.internships);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to fetch internships');
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchInternships();
//   }, [token]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-violet-100 via-teal-100 to-pink-50 dark:from-blue-900 dark:via-purple-900 dark:to-teal-900 flex items-center justify-center">
//         <div className="text-2xl font-semibold text-blue-900 dark:text-white">Loading...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-violet-100 via-teal-100 to-pink-50 dark:from-blue-900 dark:via-purple-900 dark:to-teal-900 flex items-center justify-center">
//         <div className="text-2xl font-semibold text-red-600 bg-red-100 dark:bg-red-900/30 rounded-xl px-6 py-4 shadow-lg">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-violet-100 via-teal-100 to-pink-50 dark:from-blue-900 dark:via-purple-900 dark:to-teal-900 p-8">
//       {/* Header Section */}
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12">
//           <div>
//             <h2 className="text-5xl font-extrabold text-blue-900 dark:text-white tracking-tight drop-shadow-lg mb-2">
//               My Internships
//             </h2>
//             <p className="text-xl text-blue-700 dark:text-blue-200">
//               Track and manage your internship journey
//             </p>
//           </div>
          
//           <button
//             className="mt-6 sm:mt-0 px-8 py-4 rounded-xl bg-gradient-to-r from-teal-400 to-violet-500 text-white font-semibold text-lg shadow-lg hover:scale-105 transition-transform duration-200"
//             onClick={() => navigate('/my-internships/add')}
//           >
//             + Add Internship
//           </button>
//         </div>

//         {/* Content Section */}
//         {internships.length === 0 ? (
//           <div className="text-center py-20">
//             <div className="bg-white dark:bg-blue-800/50 rounded-2xl shadow-xl p-12 max-w-md mx-auto">
//               <h3 className="text-2xl font-bold text-blue-900 dark:text-white mb-4">
//                 No internships yet
//               </h3>
//               <p className="text-blue-600 dark:text-blue-200 mb-6">
//                 Start building your portfolio by adding your first internship experience.
//               </p>
//               <button
//                 className="px-6 py-3 rounded-lg bg-gradient-to-r from-teal-400 to-violet-500 text-white font-semibold shadow-md hover:scale-105 transition-transform duration-200"
//                 onClick={() => navigate('/my-internships/add')}
//               >
//                 Get Started
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//             {internships.map((internship) => (
//               <div 
//                 key={internship.id} 
//                 className="bg-white dark:bg-blue-800/50 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20"
//               >
//                 <div className="p-8">
//                   {/* Header */}
//                   <div className="mb-6 border-b border-gray-200 dark:border-blue-600 pb-4">
//                     <h3 className="text-2xl font-bold text-blue-900 dark:text-white mb-2">
//                       {internship.role}
//                     </h3>
//                     <div className="flex items-center gap-2">
//                       <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-teal-400 to-violet-500 text-white">
//                         {internship.status}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Company Details */}
//                   <div className="space-y-3 mb-6">
//                     <div className="flex items-start gap-3">
//                       <span className="text-blue-700 dark:text-blue-300 font-semibold min-w-fit">Company:</span>
//                       <span className="text-blue-900 dark:text-white font-medium">{internship.company_name}</span>
//                     </div>
//                     <div className="flex items-start gap-3">
//                       <span className="text-blue-700 dark:text-blue-300 font-semibold min-w-fit">Domain:</span>
//                       <span className="text-blue-900 dark:text-white">{internship.company_domain}</span>
//                     </div>
//                     <div className="flex items-start gap-3">
//                       <span className="text-blue-700 dark:text-blue-300 font-semibold min-w-fit">Location:</span>
//                       <span className="text-blue-900 dark:text-white">{internship.location}</span>
//                     </div>
//                     <div className="flex items-start gap-3">
//                       <span className="text-blue-700 dark:text-blue-300 font-semibold min-w-fit">Work Type:</span>
//                       <span className="text-blue-900 dark:text-white">{internship.work_type}</span>
//                     </div>
//                   </div>

//                   {/* Description */}
//                   {internship.description && (
//                     <div className="mb-6">
//                       <h4 className="text-blue-700 dark:text-blue-300 font-semibold mb-2">Description:</h4>
//                       <p className="text-blue-800 dark:text-blue-100 text-sm leading-relaxed bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
//                         {internship.description}
//                       </p>
//                     </div>
//                   )}

//                   {/* Approval Section */}
//                   {internship.acceptance && internship.acceptance.trim() !== '' && (
//                     <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
//                       <h4 className="text-green-800 dark:text-green-300 font-semibold mb-2">Approval Status:</h4>
//                       <p className="text-green-700 dark:text-green-200 text-sm">{internship.acceptance}</p>
//                     </div>
//                   )}

//                   {/* Remarks */}
//                   <div className="border-t border-gray-200 dark:border-blue-600 pt-4">
//                     <h4 className="text-blue-700 dark:text-blue-300 font-semibold mb-2">Remarks:</h4>
//                     <p className="text-blue-800 dark:text-blue-100 text-sm italic">
//                       {internship.remarks || 'No remarks yet'}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }










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

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'pending':
      case 'in progress':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-700"></div>
          <div className="text-lg font-medium text-slate-700">Loading your internships...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-sm border border-red-200 p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Error Loading Internships</h3>
            <p className="text-slate-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-6 sm:mb-0">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">My Internships</h1>
              <p className="text-slate-600">Manage and track your internship experiences</p>
            </div>
            <button
              onClick={() => navigate('/my-internships/add')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Add New Internship
            </button>
          </div>
        </div>

        {/* Content */}
        {internships.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No internships recorded</h3>
              <p className="text-slate-600 mb-8">Start building your professional portfolio by adding your first internship experience.</p>
              <button
                onClick={() => navigate('/my-internships/add')}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200"
              >
                Add Your First Internship
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {internships.map((internship) => (
              <div 
                key={internship.id} 
                className="bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-900 mb-1 leading-tight">
                        {internship.role}
                      </h3>
                      <p className="text-lg text-slate-700 font-medium">{internship.company_name}</p>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(internship.status)}`}>
                      {internship.status}
                    </span>
                  </div>

                  {/* Company Information */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start">
                      <dt className="text-sm font-medium text-slate-500 w-20 flex-shrink-0">Domain</dt>
                      <dd className="text-sm text-slate-900 ml-4">{internship.company_domain}</dd>
                    </div>
                    <div className="flex items-start">
                      <dt className="text-sm font-medium text-slate-500 w-20 flex-shrink-0">Location</dt>
                      <dd className="text-sm text-slate-900 ml-4">{internship.location}</dd>
                    </div>
                    <div className="flex items-start">
                      <dt className="text-sm font-medium text-slate-500 w-20 flex-shrink-0">Type</dt>
                      <dd className="text-sm text-slate-900 ml-4">{internship.work_type}</dd>
                    </div>
                  </div>

                  {/* Description */}
                  {internship.description && (
                    <div className="mb-6">
                      <dt className="text-sm font-medium text-slate-500 mb-2">Description</dt>
                      <dd className="text-sm text-slate-700 leading-relaxed bg-slate-50 rounded-md p-3 border">
                        {internship.description}
                      </dd>
                    </div>
                  )}

                  {/* Approval Status */}
                  {internship.acceptance && internship.acceptance.trim() !== '' && (
                    <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-md">
                      <dt className="text-sm font-medium text-emerald-800 mb-1">Approval Status</dt>
                      <dd className="text-sm text-emerald-700">{internship.acceptance}</dd>
                    </div>
                  )}

                  {/* Faculty Remarks */}
                  <div className="pt-4 border-t border-slate-200">
                    <dt className="text-sm font-medium text-slate-500 mb-1">Faculty Remarks</dt>
                    <dd className="text-sm text-slate-600 italic">
                      {internship.remarks || 'No remarks provided'}
                    </dd>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}