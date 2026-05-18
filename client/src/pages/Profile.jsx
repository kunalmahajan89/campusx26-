import React from 'react';
import { motion } from 'framer-motion';

const Profile = () => {
  return (
    <div className="flex justify-center px-4 py-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card w-full max-w-3xl flex flex-col items-center text-center"
      >
        <div className="relative mb-6">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary to-secondary p-1">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center border-4 border-slate-900">
              <span className="text-4xl text-white font-bold">K</span>
            </div>
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-slate-800 rounded-full border border-white/10 hover:bg-slate-700 transition-colors">
            ✏️
          </button>
        </div>

        <h1 className="text-3xl font-extrabold text-white mb-1">Kunal</h1>
        <p className="text-primary font-medium mb-6">Computer Science (3rd Year)</p>

        <div className="grid grid-cols-3 w-full gap-4 mb-8">
          <div className="glass p-4 rounded-xl">
            <p className="text-2xl font-bold text-accent">1,250</p>
            <p className="text-slate-400 text-sm">Points Earned</p>
          </div>
          <div className="glass p-4 rounded-xl">
            <p className="text-2xl font-bold text-secondary">#5</p>
            <p className="text-slate-400 text-sm">Global Rank</p>
          </div>
          <div className="glass p-4 rounded-xl">
            <p className="text-2xl font-bold text-green-400">12</p>
            <p className="text-slate-400 text-sm">Badges</p>
          </div>
        </div>

        <div className="w-full text-left">
          <h2 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">Achievements</h2>
          <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-2">
            <div className="min-w-[120px] glass p-4 rounded-xl text-center bg-yellow-500/10 border-yellow-500/30">
              <span className="text-3xl block mb-2">🏆</span>
              <p className="text-yellow-500 text-xs font-bold">Hackathon Winner</p>
            </div>
            <div className="min-w-[120px] glass p-4 rounded-xl text-center bg-blue-500/10 border-blue-500/30">
              <span className="text-3xl block mb-2">💡</span>
              <p className="text-blue-400 text-xs font-bold">Quiz Master</p>
            </div>
            <div className="min-w-[120px] glass p-4 rounded-xl text-center bg-purple-500/10 border-purple-500/30">
              <span className="text-3xl block mb-2">✍️</span>
              <p className="text-purple-400 text-xs font-bold">Top Writer</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
