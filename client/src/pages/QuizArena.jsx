import React from 'react';
import { motion } from 'framer-motion';

const QuizArena = () => {
  const quizzes = [
    { id: 1, title: 'Data Structures Daily', type: 'Daily', points: 50, duration: '10 mins', participants: 124 },
    { id: 2, title: 'Monthly Code Sprint', type: 'Monthly', points: 500, duration: '60 mins', participants: 45 },
    { id: 3, title: 'React Basics', type: 'Practice', points: 20, duration: '15 mins', participants: 89 }
  ];

  const leaderboard = [
    { rank: 1, name: 'Alice Johnson', score: 1450 },
    { rank: 2, name: 'John Doe', score: 1250 },
    { rank: 3, name: 'Emily Davis', score: 1100 },
    { rank: 4, name: 'Michael Smith', score: 950 },
  ];

  return (
    <div className="px-4 py-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-extrabold text-white mb-2">Quiz Arena</h1>
        <p className="text-slate-400 text-lg">Test your knowledge, compete with peers, and climb the leaderboard.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">Active Quizzes</h2>
          {quizzes.map((quiz, idx) => (
            <motion.div 
              key={quiz.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold text-white">{quiz.title}</h3>
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold ${quiz.type === 'Daily' ? 'bg-accent/20 text-accent' : quiz.type === 'Monthly' ? 'bg-secondary/20 text-secondary' : 'bg-slate-700 text-slate-300'}`}>
                    {quiz.type}
                  </span>
                </div>
                <div className="flex gap-4 text-sm text-slate-400">
                  <span>⏱ {quiz.duration}</span>
                  <span>🏆 {quiz.points} pts</span>
                  <span>👥 {quiz.participants} playing</span>
                </div>
              </div>
              <button className="btn-primary whitespace-nowrap">Start Quiz</button>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card h-max bg-gradient-to-b from-surface to-slate-900/50"
        >
          <h2 className="text-2xl font-bold text-center text-gradient mb-6">Global Leaderboard</h2>
          <div className="space-y-4">
            {leaderboard.map((user, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${idx === 0 ? 'bg-yellow-500/20 text-yellow-500' : idx === 1 ? 'bg-slate-300/20 text-slate-300' : idx === 2 ? 'bg-orange-500/20 text-orange-500' : 'bg-slate-800 text-slate-500'}`}>
                    #{user.rank}
                  </div>
                  <span className="font-medium text-white">{user.name}</span>
                </div>
                <span className="text-accent font-bold">{user.score}</span>
              </div>
            ))}
          </div>
          <button className="w-full text-center text-sm text-slate-400 hover:text-white mt-6 transition-colors">
            View Full Rankings
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizArena;
