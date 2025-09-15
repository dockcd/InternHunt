import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/users/signin', { email, password });
      Cookies.set('token', res.data.token, { expires: 1 });
      Cookies.set('role', res.data.role, { expires: 1 });
      Cookies.set('email', email, { expires: 1 });
      if (res.data.role === 'student') {
        navigate('/welcome');
      } else if (res.data.role === 'faculty') {
        navigate('/guide-dashboard');
      } else {
        navigate('/welcome');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left: Spread out Sign In, deep blue */}
      <div className="flex flex-col justify-center bg-blue-700 dark:bg-blue-900 p-12 text-white space-y-10">
        <h2 className="text-5xl font-extrabold tracking-tight mb-2 drop-shadow-lg">Sign In</h2>
        <p className="text-xl mb-8 text-blue-200 dark:text-blue-100">Welcome back. Please enter your account details.</p>
        <form onSubmit={handleLogin} className="space-y-7 max-w-xl w-full">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-6 py-4 rounded-lg bg-blue-800 text-white placeholder-blue-300 border border-blue-500 focus:ring-2 focus:ring-teal-400 focus:outline-none text-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-6 py-4 rounded-lg bg-blue-800 text-white placeholder-blue-300 border border-blue-500 focus:ring-2 focus:ring-teal-400 focus:outline-none text-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-teal-400 to-violet-500 text-white font-semibold text-lg shadow-lg hover:scale-105 transition-transform duration-200"
          >
            Sign In
          </button>
          {error && (
            <div className="mt-2 text-red-200 bg-red-700/30 rounded px-4 py-3 text-base shadow">{error}</div>
          )}
        </form>
        <p className="mt-2 text-base">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-teal-200 underline font-semibold hover:text-white transition"
          >
            Sign Up
          </Link>
        </p>
      </div>
      {/* Right: Branding, pastel violet/teal contrast */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-violet-100 via-teal-100 to-pink-50 dark:from-blue-900 dark:via-purple-900 dark:to-teal-900 text-blue-900 dark:text-white px-12">
        <h1 className="text-6xl font-extrabold leading-tight mb-12 drop-shadow-xl select-none">
          InternHunt
        </h1>
        <p className="text-2xl font-light max-w-md text-center">
          <span className="bg-gradient-to-r from-violet-400 to-teal-400 bg-clip-text text-transparent font-semibold italic">
            Find the internship that launches your future.
          </span>
        </p>
      </div>
    </div>
  );
}