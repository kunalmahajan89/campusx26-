import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLeaderboardStore } from '../store/leaderboardStore';
import { 
  Trophy, 
  Crown, 
  Search, 
  Award, 
  ArrowUpRight, 
  Zap 
} from 'lucide-react';
import Card from '../components/ui/Card';

export default function Leaderboard() {
  const { leaderboard, fetchLeaderboard } = useLeaderboardStore();
  const [searchQuery, setSearchQuery] = useState('');

  // DOWNLOAD GLOBAL RANKS ON MOUNT
  useEffect(() => {
    fetchLeaderboard();
  }, []);

  // Top 3 Podium Selection
  const podiumWinners = leaderboard.slice(0, 3);
  // Remaining players
  const remainingPlayers = leaderboard.slice(3);

  // Search filter
  const filteredPlayers = remainingPlayers.filter((p) => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  // Medal styling helpers
  const medalColors = [
    { text: 'text-amber-400', border: 'border-amber-400/30', bg: 'bg-amber-400/10' },
    { text: 'text-slate-300', border: 'border-slate-300/30', bg: 'bg-slate-300/10' },
    { text: 'text-amber-650', border: 'border-amber-600/30', bg: 'bg-amber-600/10' }
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 select-none"
    >
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
          Global Leaderboard
        </h1>
        <p className="text-sm text-slate-400">Compete in real-time, climb rankings, and secure specialist developer badges.</p>
      </div>

      {/* TOP 3 PODIUM DISPLAY */}
      <div className="grid md:grid-cols-3 gap-6 pt-4 items-end">
        
        {/* SECOND PLACE */}
        {podiumWinners[1] && (
          <motion.div variants={itemVariants} className="order-2 md:order-1">
            <Card glow="purple" className="p-6 text-center space-y-4 relative overflow-hidden h-64 flex flex-col justify-center border-glow-purple">
              <div className="absolute top-3 left-3 h-6 w-6 rounded-full bg-slate-400/20 border border-slate-400/30 text-slate-300 font-mono text-xs font-bold flex items-center justify-center">
                2
              </div>
              <div className="mx-auto h-16 w-16 rounded-xl bg-slate-900 border border-slate-300/20 flex items-center justify-center font-extrabold text-xl text-slate-300 shadow-lg">
                {podiumWinners[1].name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-white text-base truncate">{podiumWinners[1].name}</h4>
                <p className="text-xs text-slate-500 font-mono">Rank #2 Student</p>
              </div>
              <div className="flex items-center justify-center gap-1 text-secondary font-mono text-sm font-bold bg-secondary/10 px-3 py-1 rounded-full w-fit mx-auto">
                <Zap className="h-4 w-4 fill-secondary" />
                {podiumWinners[1].xp} XP
              </div>
            </Card>
          </motion.div>
        )}

        {/* FIRST PLACE */}
        {podiumWinners[0] && (
          <motion.div variants={itemVariants} className="order-1 md:order-2">
            <Card glow="blue" className="p-8 text-center space-y-4 relative overflow-hidden h-72 flex flex-col justify-center border-glow-blue scale-[1.03] md:scale-105 z-10">
              {/* Golden Crown */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 text-amber-400 animate-bounce">
                <Crown className="h-7 w-7 fill-amber-400" />
              </div>
              <div className="mx-auto h-20 w-20 rounded-xl bg-slate-900 border border-amber-400/40 flex items-center justify-center font-extrabold text-2xl text-amber-400 shadow-glow-blue mt-2">
                {podiumWinners[0].name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-white text-lg truncate">{podiumWinners[0].name}</h4>
                <p className="text-xs text-amber-400 font-mono font-bold tracking-wider uppercase flex items-center justify-center gap-1">
                  CORE INSTANCE LEAD
                </p>
              </div>
              <div className="flex items-center justify-center gap-1 text-primary font-mono text-base font-extrabold bg-primary/10 px-4 py-1.5 rounded-full w-fit mx-auto shadow-glow-blue border border-primary/20">
                <Zap className="h-4.5 w-4.5 fill-primary" />
                {podiumWinners[0].xp} XP
              </div>
            </Card>
          </motion.div>
        )}

        {/* THIRD PLACE */}
        {podiumWinners[2] && (
          <motion.div variants={itemVariants} className="order-3">
            <Card glow="green" className="p-6 text-center space-y-4 relative overflow-hidden h-64 flex flex-col justify-center border-glow-green">
              <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-amber-600/20 border border-amber-600/30 text-amber-600 font-mono text-xs font-bold flex items-center justify-center">
                3
              </div>
              <div className="mx-auto h-16 w-16 rounded-xl bg-slate-900 border border-amber-600/20 flex items-center justify-center font-extrabold text-xl text-amber-600 shadow-lg">
                {podiumWinners[2].name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-white text-base truncate">{podiumWinners[2].name}</h4>
                <p className="text-xs text-slate-500 font-mono">Rank #3 Student</p>
              </div>
              <div className="flex items-center justify-center gap-1 text-accent font-mono text-sm font-bold bg-accent/10 px-3 py-1 rounded-full w-fit mx-auto">
                <Zap className="h-4 w-4 fill-accent" />
                {podiumWinners[2].xp} XP
              </div>
            </Card>
          </motion.div>
        )}
      </div>

      {/* SEARCH AND RANK LIST TABLE */}
      <Card className="glass relative overflow-hidden p-6">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-secondary" />

        {/* Search header bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-lg font-bold text-white">Full Leaderboard Roster</h3>
          
          <div className="relative w-full sm:w-64 shrink-0">
            <input
              type="text"
              placeholder="Search peer profiles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/40 border border-white/5 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-colors"
            />
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-500" />
          </div>
        </div>

        {/* Dynamic table layout */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-slate-500 text-xs font-mono tracking-wider font-bold">
                <th className="py-3.5 px-4">RANK</th>
                <th className="py-3.5 px-4">STUDENT</th>
                <th className="py-3.5 px-4 hidden md:table-cell">FOCUS BADGES</th>
                <th className="py-3.5 px-4 text-right">TOTAL SCORE</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredPlayers.map((player) => (
                  <motion.tr
                    key={player.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border-b border-white/2 hover:bg-white/2 transition-colors duration-150 group"
                  >
                    {/* Rank cell */}
                    <td className="py-4 px-4 font-mono font-bold text-slate-400">
                      #{player.rank}
                    </td>

                    {/* Profile user card cell */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8.5 w-8.5 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center font-bold text-xs text-slate-400 group-hover:border-primary/30 transition-colors">
                          {player.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-bold text-slate-200 group-hover:text-white transition-colors">{player.name}</p>
                          <p className="text-[10px] text-slate-500 font-mono">Tier-3 IT Student</p>
                        </div>
                      </div>
                    </td>

                    {/* Badges inline pill cell */}
                    <td className="py-4 px-4 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1.5">
                        {player.badges.map((badge) => (
                          <span 
                            key={badge}
                            className="bg-white/5 text-[9px] font-bold text-slate-400 border border-white/5 px-2 py-0.5 rounded-full"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* XP Score cell */}
                    <td className="py-4 px-4 text-right">
                      <span className="font-mono font-extrabold text-white text-sm bg-white/5 border border-white/5 px-3 py-1 rounded-full shadow-inner inline-flex items-center gap-1 group-hover:border-primary/20 transition-colors">
                        <Zap className="h-3.5 w-3.5 fill-slate-400 text-slate-400 group-hover:text-primary group-hover:fill-primary" />
                        {player.xp}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {filteredPlayers.length === 0 && (
            <div className="text-center py-10 font-mono text-slate-500 text-xs">
              NO PEER PROFILE MATCH FOUND IN KERNEL DATABASE.
            </div>
          )}
        </div>
      </Card>
      
    </motion.div>
  );
}
