// import React from 'react';
// import { Link } from 'react-router-dom';

// export default function GuideDashboard() {
//   return (
//     <div className="min-h-screen p-8 bg-gray-100">
//       <h1 className="text-3xl font-bold mb-8">Guide Dashboard</h1>

//       {/* Clickable card for Student Management using Link */}
//       <Link
//         to="/guide/student-management"
//         className="block bg-white p-6 rounded shadow mb-8 hover:shadow-lg"
//       >
//         <h2 className="text-xl font-semibold">Student Management</h2>
//         <p className="mt-2 text-gray-600">Manage student assignments and guides</p>
//       </Link>

//       {/* Add more clickable options below as needed */}
//     </div>
//   );
// }








import React from 'react';
import { Link } from 'react-router-dom';

export default function GuideDashboard() {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Guide Dashboard</h1>

      {/* Clickable card for Student Management using Link */}
      <Link
        to="/guide/student-management"
        className="block bg-white p-6 rounded shadow mb-8 hover:shadow-lg"
      >
        <h2 className="text-xl font-semibold">Student Management</h2>
        <p className="mt-2 text-gray-600">Manage student assignments and guides</p>
      </Link>

      {/* Clickable card for Announcements using Link */}
      <Link
        to="/announcements"
        className="block bg-white p-6 rounded shadow mb-8 hover:shadow-lg"
      >
        <h2 className="text-xl font-semibold">Announcements</h2>
        <p className="mt-2 text-gray-600">View and post campus announcements</p>
      </Link>

      {/* Add more clickable options below as needed */}
    </div>
  );
}