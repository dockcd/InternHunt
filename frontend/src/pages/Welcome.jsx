// import React from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import Cookies from 'js-cookie';

// export default function Welcome() {
//   const navigate = useNavigate();
//   const email = Cookies.get('email');

//   const handleLogout = () => {
//     Cookies.remove('token');
//     Cookies.remove('role');
//     Cookies.remove('email');
//     navigate('/');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-blue-800">
//       {/* Header */}
//       <header className="bg-white/90 dark:bg-slate-800/90 border-b border-slate-300 dark:border-slate-700 px-8 py-4 shadow-sm backdrop-blur-sm">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
//             InternHunt Dashboard
//           </h1>
//           <button
//             onClick={handleLogout}
//             className="px-6 py-2.5 bg-slate-800 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
//             aria-label="Logout"
//           >
//             Logout
//           </button>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-8 py-12">
//         {/* Welcome Section */}
//         <div className="mb-16">
//           <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
//             Welcome back,{' '}
//             <span className="text-blue-500 dark:text-blue-400">{email}</span>
//           </h2>
//           <p className="text-xl text-slate-700 dark:text-slate-400 max-w-xl leading-relaxed">
//             Manage your internship journey from your personalized dashboard.
//           </p>
//         </div>

//         {/* Navigation Cards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
//           {/* My Details Card */}
//           <button
//             onClick={() => navigate('/my-details')}
//             className="group bg-white dark:bg-slate-700 rounded-xl p-8 border border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 shadow-sm hover:shadow-md transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           >
//             <div className="flex items-start justify-between mb-4">
//               <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
//                 <svg
//                   className="w-6 h-6 text-blue-600 dark:text-blue-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                   />
//                 </svg>
//               </div>
//               <svg
//                 className="w-5 h-5 text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
//               My Details
//             </h3>
//             <p className="text-slate-700 dark:text-slate-400 leading-relaxed">
//               View and update your personal information and profile settings.
//             </p>
//           </button>

//           {/* My Internships Card */}
//           <button
//             onClick={() => navigate('/my-internships')}
//             className="group bg-white dark:bg-slate-700 rounded-xl p-8 border border-slate-300 dark:border-slate-600 hover:border-emerald-400 dark:hover:border-emerald-500 shadow-sm hover:shadow-md transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//           >
//             <div className="flex items-start justify-between mb-4">
//               <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/50 transition-colors">
//                 <svg
//                   className="w-6 h-6 text-emerald-600 dark:text-emerald-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                   />
//                 </svg>
//               </div>
//               <svg
//                 className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
//               My Internships
//             </h3>
//             <p className="text-slate-700 dark:text-slate-400 leading-relaxed">
//               Track your applications, view status updates, and manage opportunities.
//             </p>
//           </button>

//           {/* Manage Documents Card */}
//           <button
//             onClick={() => navigate('/manage-documents')}
//             className="group bg-white dark:bg-slate-700 rounded-xl p-8 border border-slate-300 dark:border-slate-600 hover:border-violet-400 dark:hover:border-violet-500 shadow-sm hover:shadow-md transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
//           >
//             <div className="flex items-start justify-between mb-4">
//               <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/20 rounded-lg flex items-center justify-center group-hover:bg-violet-200 dark:group-hover:bg-violet-800/50 transition-colors">
//                 <svg
//                   className="w-6 h-6 text-violet-600 dark:text-violet-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                   />
//                 </svg>
//               </div>
//               <svg
//                 className="w-5 h-5 text-slate-400 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors">
//               Manage Documents
//             </h3>
//             <p className="text-slate-700 dark:text-slate-400 leading-relaxed">
//               Upload, organize and manage all your application documents securely.
//             </p>
//           </button>
//         </div>

//         {/* Announcements Section */}
//         <div className="bg-white dark:bg-slate-700 rounded-xl border border-slate-300 dark:border-slate-600 overflow-hidden">
//           <Link
//             to="/announcements"
//             className="group block p-8 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset"
//           >
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-4">
//                 <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/20 rounded-lg flex items-center justify-center group-hover:bg-teal-200 dark:group-hover:bg-teal-800/50 transition-colors">
//                   <svg
//                     className="w-6 h-6 text-teal-600 dark:text-teal-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
//                     />
//                   </svg>
//                 </div>
//                 <div>
//                   <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
//                     Announcements
//                   </h3>
//                   <p className="text-slate-700 dark:text-slate-400">
//                     Stay updated with the latest campus news, deadlines, and important notices.
//                   </p>
//                 </div>
//               </div>
//               <svg
//                 className="w-6 h-6 text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </div>
//           </Link>
//         </div>
//       </main>
//     </div>
//   );
// }


//---------------------------------------------------------------------------------------------------------------------------------------------

// import React from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import Cookies from 'js-cookie';

// export default function Welcome() {
//   const navigate = useNavigate();
//   const email = Cookies.get('email');

//   const handleLogout = () => {
//     Cookies.remove('token');
//     Cookies.remove('role');
//     Cookies.remove('email');
//     navigate('/');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-blue-800">
//       {/* Header */}
//       <header className="bg-white/90 dark:bg-slate-800/90 border-b border-slate-300 dark:border-slate-700 px-8 py-4 shadow-sm backdrop-blur-sm">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
//             InternHunt Dashboard
//           </h1>
//           <button
//             onClick={handleLogout}
//             className="px-6 py-2.5 bg-slate-800 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
//             aria-label="Logout"
//           >
//             Logout
//           </button>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-8 py-12">
//         {/* Welcome Section */}
//         <div className="mb-16">
//           <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
//             Welcome back,{' '}
//             <span className="text-blue-500 dark:text-blue-400">{email}</span>
//           </h2>
//           <p className="text-xl text-slate-700 dark:text-slate-400 max-w-xl leading-relaxed">
//             Manage your internship journey from your personalized dashboard.
//           </p>
//         </div>

//         {/* Navigation Cards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
//           {/* My Details Card */}
//           <button
//             onClick={() => navigate('/my-details')}
//             className="group bg-white dark:bg-slate-700 rounded-xl p-8 border border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 shadow-sm hover:shadow-md transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           >
//             <div className="flex items-start justify-between mb-4">
//               <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
//                 <svg
//                   className="w-6 h-6 text-blue-600 dark:text-blue-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                   />
//                 </svg>
//               </div>
//               <svg
//                 className="w-5 h-5 text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
//               My Details
//             </h3>
//             <p className="text-slate-700 dark:text-slate-400 leading-relaxed">
//               View and update your personal information and profile settings.
//             </p>
//           </button>

//           {/* My Internships Card */}
//           <button
//             onClick={() => navigate('/my-internships')}
//             className="group bg-white dark:bg-slate-700 rounded-xl p-8 border border-slate-300 dark:border-slate-600 hover:border-emerald-400 dark:hover:border-emerald-500 shadow-sm hover:shadow-md transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//           >
//             <div className="flex items-start justify-between mb-4">
//               <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/50 transition-colors">
//                 <svg
//                   className="w-6 h-6 text-emerald-600 dark:text-emerald-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                   />
//                 </svg>
//               </div>
//               <svg
//                 className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
//               My Internships
//             </h3>
//             <p className="text-slate-700 dark:text-slate-400 leading-relaxed">
//               Track your applications, view status updates, and manage opportunities.
//             </p>
//           </button>

//           {/* Manage Documents Card */}
//           <button
//             onClick={() => navigate('/manage-documents')}
//             className="group bg-white dark:bg-slate-700 rounded-xl p-8 border border-slate-300 dark:border-slate-600 hover:border-violet-400 dark:hover:border-violet-500 shadow-sm hover:shadow-md transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
//           >
//             <div className="flex items-start justify-between mb-4">
//               <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/20 rounded-lg flex items-center justify-center group-hover:bg-violet-200 dark:group-hover:bg-violet-800/50 transition-colors">
//                 <svg
//                   className="w-6 h-6 text-violet-600 dark:text-violet-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                   />
//                 </svg>
//               </div>
//               <svg
//                 className="w-5 h-5 text-slate-400 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors">
//               Manage Documents
//             </h3>
//             <p className="text-slate-700 dark:text-slate-400 leading-relaxed">
//               Upload, organize and manage all your application documents securely.
//             </p>
//           </button>

//           {/* Resume Scanner Card (new) */}
//           <div
//             onClick={() => navigate('/resume-scanner')}
//             className="cursor-pointer group bg-white dark:bg-slate-700 rounded-xl p-8 border border-slate-300 dark:border-slate-600 hover:border-indigo-500 shadow-sm hover:shadow-md transition-all duration-200 text-left"
//             role="button"
//             tabIndex={0}
//             onKeyDown={e => { if(e.key === 'Enter') navigate('/resume-scanner') }}
//           >
//             <h3 className="text-xl font-semibold text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">
//               Resume Scanner
//             </h3>
//             <p className="text-slate-700 dark:text-slate-400 mt-2">
//               Upload and analyze resumes easily.
//             </p>
//           </div>

//           {/* Guide Dashboard Card */}
//           <button
//             onClick={() => navigate('/guide-dashboard')}
//             className="group bg-white dark:bg-slate-700 rounded-xl p-8 border border-slate-300 dark:border-slate-600 hover:border-purple-400 dark:hover:border-purple-500 shadow-sm hover:shadow-md transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//           >
//             <div className="flex items-start justify-between mb-4">
//               <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors">
//                 <svg
//                   className="w-6 h-6 text-purple-600 dark:text-purple-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3v4M8 3v4m-6 7h16"
//                   />
//                 </svg>
//               </div>
//               <svg
//                 className="w-5 h-5 text-slate-400 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors">
//               Guide Dashboard
//             </h3>
//             <p className="text-slate-700 dark:text-slate-400 leading-relaxed">
//               For faculty to manage their students and internships.
//             </p>
//           </button>

//           {/* Student Management Card */}
//           <button
//             onClick={() => navigate('/guide/student-management')}
//             className="group bg-white dark:bg-slate-700 rounded-xl p-8 border border-slate-300 dark:border-slate-600 hover:border-cyan-400 dark:hover:border-cyan-500 shadow-sm hover:shadow-md transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
//           >
//             <div className="flex items-start justify-between mb-4">
//               <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/20 rounded-lg flex items-center justify-center group-hover:bg-cyan-200 dark:group-hover:bg-cyan-800/50 transition-colors">
//                 <svg
//                   className="w-6 h-6 text-cyan-600 dark:text-cyan-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 4v16m8-8H4"
//                   />
//                 </svg>
//               </div>
//               <svg
//                 className="w-5 h-5 text-slate-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
//               Student Management
//             </h3>
//             <p className="text-slate-700 dark:text-slate-400 leading-relaxed">
//               Manage student info and internship approvals.
//             </p>
//           </button>
//         </div>

//         {/* Announcements Section */}
//         <div className="bg-white dark:bg-slate-700 rounded-xl border border-slate-300 dark:border-slate-600 overflow-hidden">
//           <Link
//             to="/announcements"
//             className="group block p-8 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset"
//           >
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-4">
//                 <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/20 rounded-lg flex items-center justify-center group-hover:bg-teal-200 dark:group-hover:bg-teal-800/50 transition-colors">
//                   <svg
//                     className="w-6 h-6 text-teal-600 dark:text-teal-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
//                     />
//                   </svg>
//                 </div>
//                 <div>
//                   <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
//                     Announcements
//                   </h3>
//                   <p className="text-slate-700 dark:text-slate-400">
//                     Stay updated with the latest campus news, deadlines, and important notices.
//                   </p>
//                 </div>
//               </div>
//               <svg
//                 className="w-6 h-6 text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </div>
//           </Link>
//         </div>
//       </main>
//     </div>
//   );
// }









import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Welcome() {
  const navigate = useNavigate();
  const email = Cookies.get('email');
  const role = Cookies.get('role'); // get user role from cookie

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('role');
    Cookies.remove('email');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-blue-800">
      {/* Header */}
      <header className="bg-white/90 dark:bg-slate-800/90 border-b border-slate-300 dark:border-slate-700 px-8 py-4 shadow-sm backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            InternHunt Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="px-6 py-2.5 bg-slate-800 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            aria-label="Logout"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Welcome back,{' '}
            <span className="text-blue-500 dark:text-blue-400">{email}</span>
          </h2>
          <p className="text-xl text-slate-700 dark:text-slate-400 max-w-xl leading-relaxed">
            Manage your internship journey from your personalized dashboard.
          </p>
        </div>

        {/* Navigation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* My Details Card - common to all roles */}
          <button
            onClick={() => navigate('/my-details')}
            className="group bg-white dark:bg-slate-700 rounded-xl p-8 border border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 shadow-sm hover:shadow-md transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <svg
                className="w-5 h-5 text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
              My Details
            </h3>
            <p className="text-slate-700 dark:text-slate-400 leading-relaxed">
              View and update your personal information and profile settings.
            </p>
          </button>

          {/* Role-based student cards */}
          {role === 'student' && (
            <>
              {/* My Internships Card */}
              <button
                onClick={() => navigate('/my-internships')}
                className="group bg-white dark:bg-slate-700 rounded-xl p-8 border border-slate-300 dark:border-slate-600 hover:border-emerald-400 dark:hover:border-emerald-500 shadow-sm hover:shadow-md transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/50 transition-colors">
                    <svg
                      className="w-6 h-6 text-emerald-600 dark:text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <svg
                    className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                  My Internships
                </h3>
                <p className="text-slate-700 dark:text-slate-400 leading-relaxed">
                  Track your applications, view status updates, and manage opportunities.
                </p>
              </button>

              {/* Manage Documents Card */}
              <button
                onClick={() => navigate('/manage-documents')}
                className="group bg-white dark:bg-slate-700 rounded-xl p-8 border border-slate-300 dark:border-slate-600 hover:border-violet-400 dark:hover:border-violet-500 shadow-sm hover:shadow-md transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/20 rounded-lg flex items-center justify-center group-hover:bg-violet-200 dark:group-hover:bg-violet-800/50 transition-colors">
                    <svg
                      className="w-6 h-6 text-violet-600 dark:text-violet-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <svg
                    className="w-5 h-5 text-slate-400 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors">
                  Manage Documents
                </h3>
                <p className="text-slate-700 dark:text-slate-400 leading-relaxed">
                  Upload, organize and manage all your application documents securely.
                </p>
              </button>
            </>
          )}

          {/* Resume Scanner Card - visible to all logged in users */}
          {/* <div
            onClick={() => navigate('/resume-scanner')}
            className="cursor-pointer group bg-white dark:bg-slate-700 rounded-xl p-8 border border-slate-300 dark:border-slate-600 hover:border-indigo-500 shadow-sm hover:shadow-md transition-all duration-200 text-left"
            role="button"
            tabIndex={0}
            onKeyDown={e => { if(e.key === 'Enter') navigate('/resume-scanner') }}
          >
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">
              Resume Scanner
            </h3>
            <p className="text-slate-700 dark:text-slate-400 mt-2">
              Upload and analyze resumes easily.
            </p>
          </div> */}
          {/* Resume Scanner Card styled like Announcements */}

          {/* Resume Scanner Card styled like Announcements and full width on lg */}
<div
  onClick={() => navigate('/resume-scanner')}
  className="group block p-8 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset lg:col-span-3"
  role="button"
  tabIndex={0}
  onKeyDown={e => { if(e.key === 'Enter') navigate('/resume-scanner') }}
>
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/50 transition-colors">
        <svg
          className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          Resume Scanner
        </h3>
        <p className="text-slate-700 dark:text-slate-400 max-w-md leading-relaxed">
          Upload and analyze resumes easily.
        </p>
      </div>
    </div>
    <svg
      className="w-6 h-6 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </div>
</div>



          {/* Role-based Guide (faculty) cards */}
          {role === 'faculty' && (
            <>
              {/* Guide Dashboard Card */}
              <button
                onClick={() => navigate('/guide-dashboard')}
                className="group bg-white dark:bg-slate-700 rounded-xl p-8 border border-slate-300 dark:border-slate-600 hover:border-purple-400 dark:hover:border-purple-500 shadow-sm hover:shadow-md transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors">
                    <svg
                      className="w-6 h-6 text-purple-600 dark:text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3v4M8 3v4m-6 7h16"
                      />
                    </svg>
                  </div>
                  <svg
                    className="w-5 h-5 text-slate-400 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors">
                  Guide Dashboard
                </h3>
                <p className="text-slate-700 dark:text-slate-400 leading-relaxed">
                  For faculty to manage their students and internships.
                </p>
              </button>

              {/* Student Management Card */}
              <button
                onClick={() => navigate('/guide/student-management')}
                className="group bg-white dark:bg-slate-700 rounded-xl p-8 border border-slate-300 dark:border-slate-600 hover:border-cyan-400 dark:hover:border-cyan-500 shadow-sm hover:shadow-md transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/20 rounded-lg flex items-center justify-center group-hover:bg-cyan-200 dark:group-hover:bg-cyan-800/50 transition-colors">
                    <svg
                      className="w-6 h-6 text-cyan-600 dark:text-cyan-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <svg
                    className="w-5 h-5 text-slate-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                  Student Management
                </h3>
                <p className="text-slate-700 dark:text-slate-400 leading-relaxed">
                  Manage student info and internship approvals.
                </p>
              </button>
            </>
          )}
        </div>

        {/* Announcements Section */}
        <div className="bg-white dark:bg-slate-700 rounded-xl border border-slate-300 dark:border-slate-600 overflow-hidden">
          <Link
            to="/announcements"
            className="group block p-8 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/20 rounded-lg flex items-center justify-center group-hover:bg-teal-200 dark:group-hover:bg-teal-800/50 transition-colors">
                  <svg
                    className="w-6 h-6 text-teal-600 dark:text-teal-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    Announcements
                  </h3>
                  <p className="text-slate-700 dark:text-slate-400">
                    Stay updated with the latest campus news, deadlines, and important notices.
                  </p>
                </div>
              </div>
              <svg
                className="w-6 h-6 text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}