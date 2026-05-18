import React from 'react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-8 px-4 py-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Student Dashboard</h1>
          <p className="text-slate-400">Welcome back, Kunal</p>
        </div>
        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">1,250</div>
            <div className="text-sm text-slate-400">Points</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">#5</div>
            <div className="text-sm text-slate-400">Rank</div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card">
          <h2 className="text-xl font-semibold mb-4 text-primary">Recent Announcements</h2>
          <ul className="space-y-3 text-slate-300">
            <li className="border-b border-white/10 pb-2">Hackathon 2026 registrations open!</li>
            <li className="border-b border-white/10 pb-2">Guest lecture by Google Engineer tomorrow.</li>
            <li>Mid-term exam schedule updated.</li>
          </ul>
        </motion.div>
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card">
          <h2 className="text-xl font-semibold mb-4 text-secondary">Daily Quiz</h2>
          <p className="text-slate-400 mb-4">Complete today's quiz to earn +50 points!</p>
          <button className="btn-primary w-full">Start Quiz</button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card">
          <h2 className="text-xl font-semibold mb-4 text-accent">Opportunities</h2>
          <ul className="space-y-3 text-slate-300">
            <li className="flex justify-between"><span>SDE Intern at Amazon</span><span className="text-accent text-sm">Apply</span></li>
            <li className="flex justify-between"><span>Frontend Dev at Microsoft</span><span className="text-accent text-sm">Apply</span></li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
