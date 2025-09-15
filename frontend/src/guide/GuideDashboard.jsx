import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function GuideDashboard() {
  const navigate = useNavigate();
  const email = Cookies.get('email');

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
            InternHunt Guide Dashboard
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
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Welcome back,{' '}
            <span className="text-blue-500 dark:text-blue-400">{email}</span>
          </h2>
          <p className="text-xl text-slate-700 dark:text-slate-400 max-w-xl leading-relaxed">
            Manage your internship journey from your personalized guide dashboard.
          </p>
        </div>

        {/* Navigation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <button
            onClick={() => navigate('/guide/student-management')}
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
              Student Management
            </h3>
            <p className="text-slate-700 dark:text-slate-400 leading-relaxed">
              Manage student assignments and guides.
            </p>
          </button>

          <button
            onClick={() => navigate('/announcements')}
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
              Announcements
            </h3>
            <p className="text-slate-700 dark:text-slate-400 leading-relaxed">
              View and post campus announcements.
            </p>
          </button>

          <button
            onClick={() => navigate('/guide/manage-internships')}
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
              Manage Internships
            </h3>
            <p className="text-slate-700 dark:text-slate-400 leading-relaxed">
              View and update internships of your students.
            </p>
          </button>
        </div>
      </main>
    </div>
  );
}
