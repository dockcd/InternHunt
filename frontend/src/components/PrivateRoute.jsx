import React from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children, role }) {
  const token = Cookies.get('token');
  const userRole = Cookies.get('role');

  if (!token) return <Navigate to="/" />;  // Not logged in => login page
  if (role && userRole !== role) return <Navigate to="/welcome" />; // Role mismatch => redirect to welcome page

  return children;
}
