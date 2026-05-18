import React from 'react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  return (
    <div className="flex flex-col gap-8 px-4 py-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card flex flex-col md:flex-row justify-between items-start md:items-center bg-gradient-to-r from-surface to-red-900/20"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">System Admin Panel</h1>
          <p className="text-slate-400">Manage users, content, and system health.</p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <button className="btn-primary bg-red-600 hover:shadow-red-500/40">Add New User</button>
          <button className="px-6 py-2 rounded-xl glass text-white font-medium hover:bg-white/5 transition-colors">
            Generate Report
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Students', count: '1,420', color: 'text-primary' },
          { label: 'Total Teachers', count: '134', color: 'text-secondary' },
          { label: 'Active Quizzes', count: '5', color: 'text-accent' },
          { label: 'Reports Pending', count: '2', color: 'text-red-500' }
        ].map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card text-center"
          >
            <p className="text-slate-400 mb-2 font-medium">{stat.label}</p>
            <p className={`text-4xl font-bold ${stat.color}`}>{stat.count}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card">
          <h2 className="text-xl font-semibold mb-4 text-white">Recent Activity Logs</h2>
          <ul className="space-y-3 text-slate-300">
            <li className="flex justify-between border-b border-white/10 pb-2">
              <span>Dr. Smith created a new Quiz</span>
              <span className="text-xs text-slate-500">10 mins ago</span>
            </li>
            <li className="flex justify-between border-b border-white/10 pb-2">
              <span>New student registration: Jane Doe</span>
              <span className="text-xs text-slate-500">1 hr ago</span>
            </li>
            <li className="flex justify-between border-b border-white/10 pb-2 text-red-400">
              <span>Failed login attempt (IP: 192.168.1.1)</span>
              <span className="text-xs text-slate-500">3 hrs ago</span>
            </li>
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="glass-card">
          <h2 className="text-xl font-semibold mb-4 text-white">Manage Content Flags</h2>
          <p className="text-slate-400 mb-4 text-sm">Review content flagged by users or automated filters.</p>
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex justify-between items-center">
            <div>
              <p className="text-white font-medium">Inappropriate Chat Message</p>
              <p className="text-slate-400 text-xs mt-1">Reported by 3 users in Global Chat</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded bg-red-500/20 text-red-400 text-sm hover:bg-red-500/30">Delete</button>
              <button className="px-3 py-1 rounded glass text-slate-300 text-sm hover:bg-white/10">Ignore</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
