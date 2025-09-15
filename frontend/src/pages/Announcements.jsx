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
        setAnnouncements(res.data.announcements);
      } catch {
        setError('Failed to fetch announcements');
      } finally {
        setLoading(false);
      }
    }
    fetchAnnouncements();
  }, [token]);

  // Post new announcement (faculty only)
  async function postAnnouncement(e) {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    try {
      const res = await axios.post(
        'http://localhost:5000/api/announcements',
        { title: newTitle, content: newContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Add new announcement at the top
      setAnnouncements((prev) => [res.data.announcement, ...prev]);
      setNewTitle('');
      setNewContent('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post announcement');
    }
  }

  if (loading) return <p>Loading announcements...</p>;
  if (error && announcements.length === 0) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Announcements</h1>
      
      <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto p-2 border rounded shadow-sm bg-gray-50">
        {announcements.length === 0 && <p>No announcements yet.</p>}
        {announcements.map(({ id, title, content, posted_by, posted_at }) => (
          <div key={id} className="flex flex-col space-y-1">
            <div className="inline-block px-4 py-2 bg-blue-100 rounded-lg max-w-[75%] shadow-sm">
              <h3 className="font-semibold">{title}</h3>
              <p className="whitespace-pre-wrap">{content}</p>
            </div>
            <div className="text-xs text-gray-500 ml-2">
              — {posted_by} &bull; {new Date(posted_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {role === 'faculty' && (
        <form onSubmit={postAnnouncement} className="space-y-3">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Announcement title"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Announcement content"
            className="w-full p-2 border rounded resize-y"
            rows={4}
            required
          />
          {error && <div className="text-red-600">{error}</div>}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Post Announcement
          </button>
        </form>
      )}
    </div>
  );
}