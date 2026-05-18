import React from 'react';
import { motion } from 'framer-motion';

const TeacherDashboard = () => {
  return (
    <div className="flex flex-col gap-8 px-4 py-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card flex justify-between items-center bg-gradient-to-r from-surface to-secondary/10"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Teacher Dashboard</h1>
          <p className="text-slate-400">Welcome back, Dr. Smith</p>
        </div>
        <div className="flex gap-4">
          <button className="btn-primary">Create Notice</button>
          <button className="px-6 py-2 rounded-xl glass text-white font-medium hover:bg-white/5 transition-colors">
            New Quiz
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card">
          <h2 className="text-xl font-semibold mb-4 text-primary">Your Announcements</h2>
          <ul className="space-y-3 text-slate-300">
            <li className="flex justify-between border-b border-white/10 pb-2">
              <span>Mid-term exam schedule updated</span>
              <span className="text-xs text-slate-500">2h ago</span>
            </li>
            <li className="flex justify-between border-b border-white/10 pb-2">
              <span>Assignment 3 Deadline</span>
              <span className="text-xs text-slate-500">1d ago</span>
            </li>
          </ul>
        </motion.div>
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card">
          <h2 className="text-xl font-semibold mb-4 text-secondary">Manage Quizzes</h2>
          <p className="text-slate-400 mb-4">You have 2 active quizzes running today.</p>
          <button className="btn-primary w-full bg-secondary/80 hover:bg-secondary">View Leaderboard</button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card">
          <h2 className="text-xl font-semibold mb-4 text-accent">Student Performance</h2>
          <div className="h-32 flex items-center justify-center border border-dashed border-white/20 rounded-xl mb-4">
            <span className="text-slate-500 text-sm">Chart Placeholder</span>
          </div>
          <button className="text-accent text-sm hover:underline w-full text-center">View Full Analytics</button>
        </motion.div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
