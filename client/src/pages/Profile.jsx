import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { 
  User, 
  Mail, 
  MapPin, 
  GraduationCap, 
  Github, 
  Award, 
  Zap, 
  Flame,
  Terminal
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { toast } from 'sonner';

export default function Profile() {
  const { user } = useAuthStore();

  const handleCopyHash = () => {
    navigator.clipboard.writeText(user?.id || 'campusx_user_hash');
    toast.success("User secure hash copied to clipboard! 📋");
  };

  const badgeMap = {
    "Alpha Coder": { color: "from-blue-500 to-indigo-500", desc: "Active 7+ day coding streak milestone" },
    "Quiz Master": { color: "from-purple-500 to-pink-500", desc: "Aced 100% correct in MCQ Decryption test" },
    "Team Lead": { color: "from-emerald-500 to-teal-500", desc: "Mentored 3 junior portfolio projects" },
    "Rookie": { color: "from-slate-600 to-slate-400", desc: "Registered and instantiated user node" }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6 select-none text-slate-800 dark:text-slate-100 transition-all duration-300"
    >
      <Card className="relative overflow-hidden p-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 rounded-2xl shadow-sm">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-blue-500" />

        <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-slate-200 dark:border-white/5">
          {/* Glowing Avatar */}
          <div className="h-24 w-24 rounded-2xl bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center font-extrabold text-3xl text-white border border-slate-200 dark:border-white/10 shrink-0 shadow-sm">
            {user?.avatar || 'U'}
          </div>

          <div className="text-center md:text-left space-y-2 min-w-0 flex-1">
            <h2 className="text-3xl font-extrabold text-slate-850 dark:text-white truncate">{user?.name}</h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <span className="text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                {user?.role || 'student'}
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Terminal className="h-3 w-3" />
                SEC_HASH: {user?.id?.slice(0, 10)}...
              </span>
            </div>
          </div>

          <Button 
            onClick={handleCopyHash}
            variant="secondary" 
            className="text-xs font-bold shrink-0 border border-slate-200 dark:border-slate-800"
          >
            Copy Node Hash
          </Button>
        </div>

        {/* PROFILE CARD INFORMATION BLOCK */}
        <div className="grid md:grid-cols-2 gap-8 pt-8">
          <div className="space-y-4">
            <h3 className="text-sm font-mono font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider">Institution Details</h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-355">
                <GraduationCap className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm font-semibold truncate">{user?.college}</span>
              </div>

              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-355">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm font-semibold truncate">{user?.branch}</span>
              </div>

              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-355">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm font-semibold truncate">{user?.email}</span>
              </div>

              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-355">
                <Github className="h-5 w-5 text-primary shrink-0" />
                <a 
                  href={`https://${user?.github || 'github.com'}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-sm font-semibold hover:text-primary dark:hover:text-white transition-colors underline truncate"
                >
                  {user?.github || 'github.com/kunalmahajan89'}
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-mono font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider">Active Gamified Status</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-200 dark:border-white/5 flex items-center justify-between shadow-inner">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider font-mono">Rank Level</span>
                  <p className="text-2xl font-extrabold text-slate-850 dark:text-white mt-1">#{user?.rank || 12}</p>
                </div>
                <Award className="h-7 w-7 text-primary" />
              </div>

              <div className="bg-slate-50 dark:bg-slate-955/40 p-4 rounded-xl border border-slate-200 dark:border-white/5 flex items-center justify-between shadow-inner">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider font-mono">Streak Node</span>
                  <p className="text-2xl font-extrabold text-accent dark:text-amber-500 mt-1">{user?.streak || 1} Days</p>
                </div>
                <Flame className="h-7 w-7 text-accent fill-accent dark:text-amber-500 dark:fill-amber-500" />
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-200 dark:border-white/5 flex items-center justify-between shadow-inner">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider font-mono">Current XP Pool</span>
                  <span className="text-xs font-mono font-bold text-slate-800 dark:text-white">{user?.xp} XP</span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full" 
                    style={{ width: `${(user?.xp % 1000) / 10}%` }}
                  />
                </div>
              </div>
              <Zap className="h-7 w-7 text-secondary fill-secondary shrink-0 ml-4 animate-pulse" />
            </div>
          </div>
        </div>
      </Card>

      {/* BADGES METRICS TIMELINE */}
      <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl shadow-sm">
        <h3 className="text-sm font-mono font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-6">Earned Badges Matrix</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {user?.badges?.map((badgeName) => {
            const badgeInfo = badgeMap[badgeName] || { color: "from-slate-600 to-slate-400", desc: "Unlocked via milestones" };
            return (
              <div 
                key={badgeName}
                className="bg-slate-55/40 dark:bg-slate-950/40 border border-slate-200 dark:border-white/5 rounded-xl p-4 flex items-center gap-4 hover:border-slate-300 dark:hover:border-white/10 transition-all shadow-sm"
              >
                <div className={`h-11 w-11 rounded-full bg-gradient-to-tr ${badgeInfo.color} flex items-center justify-center font-extrabold text-sm text-white shadow-sm shrink-0`}>
                  {badgeName[0]}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-800 dark:text-white text-sm truncate">{badgeName}</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">{badgeInfo.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
