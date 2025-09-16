// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// export default function Announcements() {
//   const [announcements, setAnnouncements] = useState([]);
//   const [newTitle, setNewTitle] = useState('');
//   const [newContent, setNewContent] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);
//   const role = Cookies.get('role');
//   const token = Cookies.get('token');

//   useEffect(() => {
//     async function fetchAnnouncements() {
//       try {
//         const res = await axios.get('http://localhost:5000/api/announcements', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         // Sort announcements by date ascending (oldest first)
//         const sorted = res.data.announcements.sort(
//           (a, b) => new Date(a.posted_at) - new Date(b.posted_at)
//         );
//         setAnnouncements(sorted);
//       } catch {
//         setError('Failed to fetch announcements');
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchAnnouncements();
//   }, [token]);

//   // Post new announcement (faculty only)
//   async function postAnnouncement(e) {
//     e.preventDefault();
//     if (!newTitle.trim() || !newContent.trim()) return;

//     try {
//       const res = await axios.post(
//         'http://localhost:5000/api/announcements',
//         { title: newTitle, content: newContent },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setAnnouncements((prev) => [...prev, res.data.announcement]);
//       setNewTitle('');
//       setNewContent('');
//       setError('');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to post announcement');
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-blue-800">
//         <p className="text-blue-600 dark:text-blue-400 text-lg font-semibold">Loading announcements...</p>
//       </div>
//     );
//   }

//   if (error && announcements.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-blue-800 px-4">
//         <p className="text-red-600 text-lg font-semibold">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-blue-800 flex flex-col items-center py-10 px-6 sm:px-8 lg:px-10">
//       <div
//         className="flex flex-col bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg max-w-3xl w-full"
//         style={{ height: 'calc(100vh - 4rem)' }} // Eyes on viewport height minus estimated header/footer
//       >
//         <h1 className="text-3xl font-extrabold mb-6 text-slate-900 dark:text-white select-none p-8">
//           Announcements
//         </h1>

//         {/* Scrollable announcements */}
//         <div className="flex-1 overflow-y-auto space-y-6 px-8 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-900 shadow-inner rounded-b-2xl">
//           {announcements.length === 0 && (
//             <p className="text-center text-slate-700 dark:text-slate-400 select-none">No announcements yet.</p>
//           )}
//           {announcements.map(({ id, title, content, posted_by, posted_at }) => (
//             <div key={id} className="flex flex-col space-y-2 max-w-[75%]">
//               <div className="bg-blue-100 dark:bg-blue-900/30 rounded-xl p-6 shadow-sm">
//                 <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
//                 <p className="whitespace-pre-wrap text-slate-800 dark:text-slate-300">{content}</p>
//               </div>
//               <div className="text-xs text-gray-500 ml-6 dark:text-gray-400 select-none">
//                 — {posted_by} &bull; {new Date(posted_at).toLocaleString()}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Input form */}
//         {role === 'faculty' && (
//           <form onSubmit={postAnnouncement} className="p-8 space-y-5 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 rounded-b-2xl">
//             <input
//               type="text"
//               value={newTitle}
//               onChange={(e) => setNewTitle(e.target.value)}
//               placeholder="Announcement title"
//               className="w-full p-5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//               required
//             />
//             <textarea
//               value={newContent}
//               onChange={(e) => setNewContent(e.target.value)}
//               placeholder="Announcement content"
//               rows={4}
//               className="w-full p-5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//               required
//             />
//             {error && <div className="text-red-600 font-medium select-none">{error}</div>}
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition focus:outline-none focus:ring-4 focus:ring-blue-500"
//             >
//               Post Announcement
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }






import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const role = Cookies.get('role');
  const token = Cookies.get('token');

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const res = await axios.get('http://localhost:5000/api/announcements', {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Sort announcements by date ascending (oldest first)
        const sorted = res.data.announcements.sort(
          (a, b) => new Date(a.posted_at) - new Date(b.posted_at)
        );
        setAnnouncements(sorted);
      } catch {
        setError('Failed to fetch announcements');
      } finally {
        setLoading(false);
      }
    }
    fetchAnnouncements();
  }, [token]);

  async function postAnnouncement(e) {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    try {
      const res = await axios.post(
        'http://localhost:5000/api/announcements',
        { title: newTitle, content: newContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAnnouncements((prev) => [...prev, res.data.announcement]);
      setNewTitle('');
      setNewContent('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post announcement');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-blue-800">
        <p className="text-blue-600 dark:text-blue-400 text-lg font-semibold">Loading announcements...</p>
      </div>
    );
  }

  if (error && announcements.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-blue-800 px-4">
        <p className="text-red-600 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-blue-800 flex flex-col items-center py-10 px-6 sm:px-8 lg:px-10">
      <div
        className="flex flex-col bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg max-w-3xl w-full"
        style={{ height: 'calc(100vh - 4rem)' }}
      >
        <h1 className="text-3xl font-extrabold mb-4 text-slate-900 dark:text-white select-none px-8 pt-4 pb-2">
          Announcements
        </h1>

        {/* Scrollable announcements */}
        <div className="flex-1 overflow-y-auto space-y-6 px-8 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-900 shadow-inner rounded-b-2xl">
          {announcements.length === 0 && (
            <p className="text-center text-slate-700 dark:text-slate-400 select-none">No announcements yet.</p>
          )}
          {announcements.map(({ id, title, content, posted_by, posted_at }) => (
            <div key={id} className="flex flex-col space-y-2 max-w-[75%]">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
                <p className="whitespace-pre-wrap text-slate-800 dark:text-slate-300">{content}</p>
              </div>
              <div className="text-xs text-gray-500 ml-6 dark:text-gray-400 select-none">
                — {posted_by} &bull; {new Date(posted_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* Input form */}
        {role === 'faculty' && (
          <form onSubmit={postAnnouncement} className="px-8 py-4 space-y-5 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 rounded-b-2xl">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Announcement title"
              className="w-full p-5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Announcement content"
              rows={4}
              className="w-full p-5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
            {error && <div className="text-red-600 font-medium select-none">{error}</div>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition focus:outline-none focus:ring-4 focus:ring-blue-500"
            >
              Post Announcement
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
