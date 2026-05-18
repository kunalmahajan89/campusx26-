import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Feed from './pages/Feed';
import Quiz from './pages/Quiz';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';

// Auth Guard
import { useAuthStore } from './store/authStore';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthStore();
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <HashRouter>
      <Toaster 
        theme="dark" 
        position="top-right" 
        toastOptions={{
          style: {
            background: 'rgba(17, 24, 39, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            color: '#f3f4f6',
            backdropFilter: 'blur(16px)'
          }
        }}
      />
      
      <Routes>
        {/* PUBLIC LANDING */}
        <Route path="/" element={<Landing />} />

        {/* AUTHENTICATION (wrapped in AuthLayout) */}
        <Route 
          path="/login" 
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          } 
        />

        {/* GAMIFIED PLATFORM PORTAL (wrapped in DashboardLayout) */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/feed" 
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Feed />
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/quiz" 
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Quiz />
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/leaderboard" 
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Leaderboard />
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />

        {/* Catch-all redirection */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
