// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';

// const roles = [
//   { label: 'Student', value: 'student' },
//   { label: 'Faculty', value: 'faculty' },
//   { label: 'Admin', value: 'admin' },
//   { label: 'Super Admin', value: 'super_admin' }
// ];

// export default function SignUp() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('student');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
//     try {
//       let url = '';
//       let payload = { email, password };

//       if (role === 'student') {
//         url = 'http://localhost:5000/api/users/studentsignup';
//       } else {
//         url = 'http://localhost:5000/api/users/signup';
//         payload.role = role; // include role for others
//       }

//       await axios.post(url, payload);
//       setLoading(false);
//       navigate('/');
//     } catch (err) {
//       setLoading(false);
//       setError(err.response?.data?.message || 'Sign up failed');
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
//       <div className="bg-white rounded-md shadow-md p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
//         {error && <div className="mb-4 text-red-600">{error}</div>}
//         <form onSubmit={handleSignUp}>
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full p-2 mb-4 border rounded"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full p-2 mb-4 border rounded"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <select
//             className="w-full p-2 mb-6 border rounded"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//           >
//             {roles.map((r) => (
//               <option key={r.value} value={r.value}>
//                 {r.label}
//               </option>
//             ))}
//           </select>

//           <button
//             type="submit"
//             className={`w-full p-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
//             disabled={loading}
//           >
//             {loading ? 'Signing up...' : 'Sign Up'}
//           </button>
//         </form>

//         <p className="mt-4 text-center">
//           Already have an account?{' '}
//           <Link to="/" className="text-blue-600 hover:underline">
//             Sign In
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }






import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const roles = [
  { label: 'Student', value: 'student' },
  { label: 'Faculty', value: 'faculty' },
  { label: 'Admin', value: 'admin' },
  { label: 'Super Admin', value: 'super_admin' }
];

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      let url = '';
      let payload = { email, password };
      if (role === 'student') {
        url = 'http://localhost:5000/api/users/studentsignup';
      } else {
        url = 'http://localhost:5000/api/users/signup';
        payload.role = role;
      }
      await axios.post(url, payload);
      setLoading(false);
      navigate('/');
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Sign up failed');
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left: Spread out Sign Up, deep teal */}
      <div className="flex flex-col justify-center bg-teal-700 dark:bg-teal-900 p-12 text-white space-y-10">
        <h2 className="text-5xl font-extrabold tracking-tight mb-2 drop-shadow-lg">Sign Up</h2>
        <p className="text-xl mb-8 text-teal-200 dark:text-teal-100">Create your account below to start your journey.</p>
        <form onSubmit={handleSignUp} className="space-y-7 max-w-xl w-full">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-6 py-4 rounded-lg bg-teal-800 text-white placeholder-teal-300 border border-teal-500 focus:ring-2 focus:ring-violet-400 focus:outline-none text-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-6 py-4 rounded-lg bg-teal-800 text-white placeholder-teal-300 border border-teal-500 focus:ring-2 focus:ring-violet-400 focus:outline-none text-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select
            className="w-full px-6 py-4 rounded-lg bg-teal-800 text-white border border-teal-500 focus:ring-2 focus:ring-violet-400 focus:outline-none text-lg"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            {roles.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className={`w-full px-6 py-4 rounded-xl font-semibold text-lg shadow-lg transition-transform duration-200 
              ${loading 
                ? 'bg-gray-400 cursor-not-allowed text-gray-100'
                : 'bg-gradient-to-r from-violet-400 to-teal-400 text-white hover:scale-105'
              }`}
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
          {error && (
            <div className="mt-2 text-red-200 bg-red-700/30 rounded px-4 py-3 text-base shadow">{error}</div>
          )}
        </form>
        <p className="mt-2 text-base">
          Already have an account?{' '}
          <Link
            to="/"
            className="text-violet-200 underline font-semibold hover:text-white transition"
          >
            Sign In
          </Link>
        </p>
      </div>
      {/* Right: Branding, pastel violet/teal contrast */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-violet-100 via-teal-100 to-pink-50 dark:from-teal-900 dark:via-violet-900 dark:to-blue-900 text-teal-900 dark:text-white px-12">
        <h1 className="text-6xl font-extrabold leading-tight mb-12 drop-shadow-xl select-none">
          InternHunt
        </h1>
        <p className="text-2xl font-light max-w-md text-center">
          <span className="bg-gradient-to-r from-teal-400 to-violet-400 bg-clip-text text-transparent font-semibold italic">
            Discover opportunities. Grow your future.
          </span>
        </p>
      </div>
    </div>
  );
}