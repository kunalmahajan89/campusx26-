import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { mockActivities } from '../mock/activities';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Trophy, 
  Flame, 
  Zap, 
  Award, 
  Sparkles, 
  TrendingUp, 
  Terminal,
  Activity
} from 'lucide-react';
import Card from '../components/ui/Card';

export default function Dashboard() {
  const { user } = useAuthStore();

  // MOCK WEEKLY CHART DATA
  const chartData = [
    { name: 'Mon', xp: 400 },
    { name: 'Tue', xp: 850 },
    { name: 'Wed', xp: 1200 },
    { name: 'Thu', xp: 1350 },
    { name: 'Fri', xp: 1900 },
    { name: 'Sat', xp: 2100 },
    { name: 'Sun', xp: user?.xp || 2450 }
  ];

  // MOCK AVAILABLE BADGES
  const badgeMap = {
    "Alpha Coder": { color: "from-blue-500 to-indigo-500", desc: "Maintained active 7+ day coding streak" },
    "Quiz Master": { color: "from-purple-500 to-pink-500", desc: "Aced 100% correct in MCQ Decryption" },
    "Team Lead": { color: "from-emerald-500 to-teal-500", desc: "Mentored 3 junior project profiles" },
    "Rookie": { color: "from-slate-600 to-slate-400", desc: "Successfully registered and instantiated node" }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 select-none"
    >
      {/* WELCOME BACK ROW */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            System Dashboard
          </h1>
          <p className="text-sm text-slate-400">Welcome back, {user?.name}. Simulated kernel logs fully synchronized.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-slate-950/40 border border-white/5 px-4 py-2 rounded-xl text-xs font-mono text-slate-300">
          <Terminal className="h-4 w-4 text-primary" />
          <span>CONNECTED PORT: campusx_student_node_26</span>
        </div>
      </div>

      {/* STATS HIGHLIGHT GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* RANK */}
        <motion.div variants={cardVariants}>
          <Card glow="blue" className="p-5 flex flex-col justify-between h-28">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">GLOBAL RANK</span>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-extrabold text-white">#{user?.rank || 12}</span>
              <Trophy className="h-6 w-6 text-primary shadow-glow-blue" />
            </div>
          </Card>
        </motion.div>

        {/* STREAK */}
        <motion.div variants={cardVariants}>
          <Card glow="green" className="p-5 flex flex-col justify-between h-28">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">ACTIVE STREAK</span>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-extrabold text-white">{user?.streak || 1} DAYS</span>
              <Flame className="h-6 w-6 text-accent fill-accent shadow-glow-green" />
            </div>
          </Card>
        </motion.div>

        {/* TOTAL XP */}
        <motion.div variants={cardVariants}>
          <Card glow="purple" className="p-5 flex flex-col justify-between h-28">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">TOTAL SCORE</span>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-extrabold text-white">{user?.xp || 0} XP</span>
              <Zap className="h-6 w-6 text-secondary fill-secondary shadow-glow-purple" />
            </div>
          </Card>
        </motion.div>

        {/* BADGE COUNT */}
        <motion.div variants={cardVariants}>
          <Card className="p-5 flex flex-col justify-between h-28">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">ACHIEVEMENTS</span>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-extrabold text-white">{user?.badges?.length || 0} BADGES</span>
              <Award className="h-6 w-6 text-slate-400" />
            </div>
          </Card>
        </motion.div>
      </div>

      {/* CHART & BADGES BLOCK */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* CHART: XP GROWTH */}
        <motion.div variants={cardVariants} className="lg:col-span-2">
          <Card className="glass h-96 flex flex-col justify-between relative">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-secondary" />
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                XP Decryption Progress
              </h3>
              <span className="text-[10px] font-mono text-slate-500">WEEKLY METRIC LOG</span>
            </div>

            <div className="flex-1 w-full min-h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(17, 24, 39, 0.95)', 
                      border: '1px solid rgba(255, 255, 255, 0.05)', 
                      borderRadius: '12px' 
                    }}
                    labelStyle={{ color: '#94a3b8', fontSize: '10px', fontFamily: 'monospace' }}
                    itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="xp" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorXp)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* BADGES GALLERY GRID */}
        <motion.div variants={cardVariants}>
          <Card className="glass h-96 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                <Award className="h-5 w-5 text-secondary" />
                Specialist Badges
              </h3>
              
              <div className="grid grid-cols-2 gap-3 max-h-[280px] overflow-y-auto pr-1">
                {user?.badges?.map((badgeName) => {
                  const badgeInfo = badgeMap[badgeName] || { color: "from-slate-600 to-slate-400", desc: "Unlocked via milestones" };
                  return (
                    <div 
                      key={badgeName}
                      className="bg-slate-950/30 border border-white/5 rounded-xl p-3 flex flex-col items-center text-center gap-2 relative overflow-hidden group hover:border-white/10 transition-colors"
                    >
                      <div className={`h-10 w-10 rounded-full bg-gradient-to-tr ${badgeInfo.color} flex items-center justify-center font-bold text-xs text-white shadow-lg`}>
                        {badgeName[0]}
                      </div>
                      <span className="text-[10px] font-bold text-white truncate w-full">{badgeName}</span>
                      
                      {/* Tooltip detail hover */}
                      <div className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <span className="text-[9px] text-slate-400 leading-normal">{badgeInfo.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-[10px] text-slate-500 font-mono text-center pt-2 border-t border-white/5">
              🚀 ACE MORE MCQ DECKS TO UNLOCK GOLDEN SKILLS
            </div>
          </Card>
        </motion.div>
      </div>

      {/* SIMULATED TIMELINE ACTIVITY ACTIVITY LOG */}
      <motion.div variants={cardVariants}>
        <Card className="glass">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
            <Activity className="h-5 w-5 text-accent animate-pulse" />
            Activity Kernel Logs
          </h3>

          <div className="space-y-4">
            {mockActivities.map((act) => (
              <div key={act.id} className="flex justify-between items-start border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-none mb-1.5">{act.title}</h4>
                    <p className="text-xs text-slate-400">{act.detail}</p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 font-mono shrink-0">{act.timestamp}</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

    </motion.div>
  );
}
