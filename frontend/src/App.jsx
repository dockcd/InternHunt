import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Welcome from './pages/Welcome';
import MyDetails from './pages/MyDetails';
import MyInternships from './pages/MyInternships';
import AddInternship from './pages/AddInternship';
import ManageDocuments from './pages/ManageDocuments';
import GuideDashboard from './guide/GuideDashboard';
import StudentManagement from './guide/StudentManagement';
import Announcements from './pages/Announcements';


// Placeholder imports for guide components (create these as needed)
// import GuideDashboard from './pages/GuideDashboard';
// import ManageInternships from './pages/ManageInternships';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Route accessible to any logged-in user */}
        <Route
          path="/welcome"
          element={
            <PrivateRoute>
              <Welcome />
            </PrivateRoute>
          }
        />

        {/* Student-only routes */}
        <Route
          path="/my-details"
          element={
            <PrivateRoute role="student">
              <MyDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-internships"
          element={
            <PrivateRoute role="student">
              <MyInternships />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-internships/add"
          element={
            <PrivateRoute role="student">
              <AddInternship />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-documents"
          element={
            <PrivateRoute role="student">
              <ManageDocuments />
            </PrivateRoute>
          }
        />

        {/* Guide-only routes (uncomment when you create these components) */}
        
        <Route
          path="/guide-dashboard"
          element={
            <PrivateRoute role="faculty">
              <GuideDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/guide/student-management"
          element={
            <PrivateRoute role="faculty">
              <StudentManagement />
            </PrivateRoute>
          }
        />

        <Route
          path="/announcements"
          element={
            <PrivateRoute>
              <Announcements />
            </PrivateRoute>
          }
        />

        {/*
        <Route
          path="/manage-internships"
          element={
            <PrivateRoute role="guide">
              <ManageInternships />
            </PrivateRoute>
          }
        />
        */}

        {/* Catch-all route to redirect unknown paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}