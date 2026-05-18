import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import Chat from './pages/Chat';
import Opportunities from './pages/Opportunities';
import QuizArena from './pages/QuizArena';
import Articles from './pages/Articles';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
    <motion.h1 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-5xl md:text-7xl font-extrabold mb-6"
    >
      Welcome to <span className="text-gradient">College Connect</span>
    </motion.h1>
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-xl text-slate-400 max-w-2xl mb-10"
    >
      The next-generation digital ecosystem for students, teachers, and admins to collaborate, learn, and grow together.
    </motion.p>
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="flex gap-4"
    >
      <Link to="/login" className="btn-primary">Get Started</Link>
      <button className="px-6 py-2 rounded-xl glass text-white font-medium hover:bg-white/5 transition-colors">
        Learn More
      </button>
    </motion.div>
  </div>
);

const Navbar = ({ toggleTheme, isDarkMode }) => (
  <nav className="glass sticky top-0 z-50 px-6 py-4 flex justify-between items-center border-b-0 rounded-b-2xl mx-4 mt-2">
    <div className="text-2xl font-bold text-gradient">C-Connect</div>
    <div className="hidden md:flex gap-5 items-center text-slate-300 font-medium">
      <Link to="/" className="hover:text-white transition-colors">Home</Link>
      <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
      <Link to="/opportunities" className="hover:text-white transition-colors">Opportunities</Link>
      <Link to="/quizzes" className="hover:text-white transition-colors">Quizzes</Link>
      <Link to="/articles" className="hover:text-white transition-colors">Articles</Link>
      <Link to="/chat" className="hover:text-white transition-colors">Chat</Link>
      <Link to="/profile" className="hover:text-white transition-colors">Profile</Link>
      <button 
        onClick={toggleTheme} 
        className="p-2 rounded-full glass hover:bg-white/10 transition-colors"
        title="Toggle Theme"
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>
      <Link to="/login" className="px-4 py-1.5 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors">
        Login
      </Link>
    </div>
  </nav>
);

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (!isDarkMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <HashRouter>
      <div className="min-h-screen">
        <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <main className="container mx-auto py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/quizzes" element={<QuizArena />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
