import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { mockActivities } from '../mock/activities';
import { api, checkServerHealth } from '../api';
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
  Activity,
  FileText,
  HelpCircle,
  Briefcase,
  Megaphone
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { toast } from 'sonner';

export default function Dashboard() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('announcement');

  // FORM STATES FOR ANNOUNCEMENT
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementContent, setAnnouncementContent] = useState('');
  const [announcementType, setAnnouncementType] = useState('notice');

  // FORM STATES FOR OPPORTUNITY
  const [opportunityTitle, setOpportunityTitle] = useState('');
  const [opportunityCompany, setOpportunityCompany] = useState('');
  const [opportunityType, setOpportunityType] = useState('internship');
  const [opportunityLink, setOpportunityLink] = useState('');
  const [opportunityDesc, setOpportunityDesc] = useState('');

  // FORM STATES FOR QUIZ CREATOR
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [quizQuestionText, setQuizQuestionText] = useState('');
  const [quizOptionA, setQuizOptionA] = useState('');
  const [quizOptionB, setQuizOptionB] = useState('');
  const [quizOptionC, setQuizOptionC] = useState('');
  const [quizOptionD, setQuizOptionD] = useState('');
  const [quizCorrectIndex, setQuizCorrectIndex] = useState('0');

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

  const badgeMap = {
    "Alpha Coder": { color: "from-blue-500 to-indigo-500", desc: "Maintained active 7+ day coding streak" },
    "Quiz Master": { color: "from-purple-500 to-pink-500", desc: "Aced 100% correct in MCQ Decryption" },
    "Team Lead": { color: "from-emerald-500 to-teal-500", desc: "Mentored 3 junior project profiles" },
    "Rookie": { color: "from-slate-600 to-slate-400", desc: "Successfully registered and instantiated node" }
  };

  // BROADCAST ANNOUNCEMENT TO DATABASE
  const handlePublishAnnouncement = async (e) => {
    e.preventDefault();
    if (!announcementTitle || !announcementContent) return;

    try {
      const online = await checkServerHealth();
      if (online) {
        toast.loading("Broadcasting notice payload to MongoDB...", { id: "ann" });
        await api.announcements.create(
          announcementTitle,
          announcementContent,
          announcementType,
          user.id
        );
        toast.success("Notice broadcasted successfully! 📢", { id: "ann" });
      } else {
        toast.success("Notice broadcasted locally (Offline mock mode) 📣");
      }
      setAnnouncementTitle('');
      setAnnouncementContent('');
    } catch (err) {
      toast.error("Failed to broadcast notice: server network error");
    }
  };

  // BROADCAST PLACEMENT OPPORTUNITY TO DATABASE
  const handlePublishOpportunity = async (e) => {
    e.preventDefault();
    if (!opportunityTitle || !opportunityCompany || !opportunityLink) return;

    try {
      const online = await checkServerHealth();
      if (online) {
        toast.loading("Publishing placement listing...", { id: "opp" });
        await api.opportunities.create({
          title: opportunityTitle,
          company: opportunityCompany,
          description: opportunityDesc || "Placement internship opportunity node details",
          type: opportunityType,
          link: opportunityLink,
          authorId: user.id
        });
        toast.success("Placement listing successfully synchronized! 💼", { id: "opp" });
      } else {
        toast.success("Listing published locally (Offline mock mode) 🔗");
      }
      setOpportunityTitle('');
      setOpportunityCompany('');
      setOpportunityLink('');
      setOpportunityDesc('');
    } catch (err) {
      toast.error("Failed to publish placement details");
    }
  };

  // BROADCAST Timed MCQ QUIZ TO DATABASE
  const handlePublishQuiz = async (e) => {
    e.preventDefault();
    if (!quizTitle || !quizQuestionText || !quizOptionA || !quizOptionB) return;

    try {
      const online = await checkServerHealth();
      if (online) {
        toast.loading("Creating MCQ questionnaire...", { id: "qz" });
        await api.quizzes.create({
          title: quizTitle,
          description: quizDescription || "Technical quiz decrypted assessment",
          type: "daily",
          duration: 90,
          xpReward: 300,
          questions: [{
            questionText: quizQuestionText,
            options: [quizOptionA, quizOptionB, quizOptionC || 'N/A', quizOptionD || 'N/A'],
            correctAnswer: quizCorrectIndex
          }],
          authorId: user.id
        });
        toast.success("MCQ quiz constructed successfully! 🎯", { id: "qz" });
      } else {
        toast.success("Quiz created locally (Offline mock mode) ⏳");
      }
      setQuizTitle('');
      setQuizQuestionText('');
      setQuizOptionA('');
      setQuizOptionB('');
      setQuizOptionC('');
      setQuizOptionD('');
    } catch (err) {
      toast.error("Failed to construct MCQ questionnaire model");
    }
  };

  const isEducator = user?.role === 'teacher' || user?.role === 'admin';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 select-none"
    >
      {/* HEADER WELCOME ROW */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            System Dashboard
          </h1>
          <p className="text-sm text-slate-400">
            Welcome back, {user?.name}. {isEducator ? 'Educator telemetry node instanced.' : 'Simulated kernel logs fully synchronized.'}
          </p>
        </div>
        
        <div className="flex items-center gap-2 bg-slate-950/40 border border-white/5 px-4 py-2 rounded-xl text-xs font-mono text-slate-300">
          <Terminal className="h-4 w-4 text-primary" />
          <span>CONNECTED: campusx_{user?.role}_node_26</span>
        </div>
      </div>

      {/* STATS HIGHLIGHT GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card glow="blue" className="p-5 flex flex-col justify-between h-28">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">GLOBAL RANK</span>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-extrabold text-white">#{user?.rank || 12}</span>
            <Trophy className="h-6 w-6 text-primary shadow-glow-blue" />
          </div>
        </Card>

        <Card glow="green" className="p-5 flex flex-col justify-between h-28">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">ACTIVE STREAK</span>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-extrabold text-white">{user?.streak || 1} DAYS</span>
            <Flame className="h-6 w-6 text-accent fill-accent shadow-glow-green" />
          </div>
        </Card>

        <Card glow="purple" className="p-5 flex flex-col justify-between h-28">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">TOTAL SCORE</span>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-extrabold text-white">{user?.xp || 0} XP</span>
            <Zap className="h-6 w-6 text-secondary fill-secondary shadow-glow-purple" />
          </div>
        </Card>

        <Card className="p-5 flex flex-col justify-between h-28">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">ACHIEVEMENTS</span>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-extrabold text-white">{user?.badges?.length || 0} BADGES</span>
            <Award className="h-6 w-6 text-slate-400" />
          </div>
        </Card>
      </div>

      {/* EDUCATOR WORKSPACE PANEL OR CHART GALLERY */}
      {isEducator ? (
        <Card className="glass relative overflow-hidden p-6">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
          
          <h3 className="text-lg font-extrabold text-white flex items-center gap-2 mb-6">
            <Terminal className="h-5 w-5 text-primary" />
            Educator Administrative Terminal
          </h3>

          {/* WORKSPACE TAB SWITCHER */}
          <div className="flex gap-2 border-b border-white/5 pb-4 mb-6">
            <Button 
              variant={activeTab === 'announcement' ? 'primary' : 'secondary'}
              onClick={() => setActiveTab('announcement')}
              className="text-xs font-bold py-2 flex items-center gap-1.5"
            >
              <Megaphone className="h-4.5 w-4.5" /> Broadcast Notice
            </Button>
            
            <Button 
              variant={activeTab === 'quiz' ? 'primary' : 'secondary'}
              onClick={() => setActiveTab('quiz')}
              className="text-xs font-bold py-2 flex items-center gap-1.5"
            >
              <HelpCircle className="h-4.5 w-4.5" /> Assemble MCQ Quiz
            </Button>

            <Button 
              variant={activeTab === 'opportunity' ? 'primary' : 'secondary'}
              onClick={() => setActiveTab('opportunity')}
              className="text-xs font-bold py-2 flex items-center gap-1.5"
            >
              <Briefcase className="h-4.5 w-4.5" /> Publish Placements
            </Button>
          </div>

          {/* TAB 1: ANNOUNCEMENT */}
          {activeTab === 'announcement' && (
            <form onSubmit={handlePublishAnnouncement} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input 
                  label="Notice Heading title"
                  placeholder="E.g. Technical Seminar Session on Web3"
                  value={announcementTitle}
                  onChange={(e) => setAnnouncementTitle(e.target.value)}
                />
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-400 mb-2 uppercase tracking-wider">Notice Category Type</label>
                  <select 
                    value={announcementType}
                    onChange={(e) => setAnnouncementType(e.target.value)}
                    className="w-full bg-slate-950/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-colors"
                  >
                    <option value="notice">Routine Announcement</option>
                    <option value="event">Official College Event</option>
                    <option value="alert">Critical High Alert</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 mb-2 uppercase tracking-wider font-mono">Notice details content</label>
                <textarea 
                  placeholder="Provide complete description and telemetry links for the announcement..."
                  value={announcementContent}
                  onChange={(e) => setAnnouncementContent(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-950/60 border border-white/15 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <Button type="submit" className="font-extrabold text-xs">Transmit Notice Packet</Button>
            </form>
          )}

          {/* TAB 2: Timed MCQ Quiz Creator */}
          {activeTab === 'quiz' && (
            <form onSubmit={handlePublishQuiz} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input 
                  label="MCQ Quiz Title"
                  placeholder="E.g. Computer Networks MCQ Check"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                />
                <Input 
                  label="Description metadata"
                  placeholder="E.g. Evaluate routing algorithms knowledge"
                  value={quizDescription}
                  onChange={(e) => setQuizDescription(e.target.value)}
                />
              </div>
              <Input 
                label="Question text content"
                placeholder="E.g. What is the standard port index allocation for HTTP secure websockets?"
                value={quizQuestionText}
                onChange={(e) => setQuizQuestionText(e.target.value)}
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Input label="Option A" placeholder="Port 443" value={quizOptionA} onChange={(e) => setQuizOptionA(e.target.value)} />
                <Input label="Option B" placeholder="Port 80" value={quizOptionB} onChange={(e) => setQuizOptionB(e.target.value)} />
                <Input label="Option C" placeholder="Port 8080" value={quizOptionC} onChange={(e) => setQuizOptionC(e.target.value)} />
                <Input label="Option D" placeholder="Port 3000" value={quizOptionD} onChange={(e) => setQuizOptionD(e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 mb-2 uppercase tracking-wider font-mono">Specify correct answer index</label>
                <select 
                  value={quizCorrectIndex}
                  onChange={(e) => setQuizCorrectIndex(e.target.value)}
                  className="w-full bg-slate-950/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-primary/50 transition-colors"
                >
                  <option value="0">Option A is Correct</option>
                  <option value="1">Option B is Correct</option>
                  <option value="2">Option C is Correct</option>
                  <option value="3">Option D is Correct</option>
                </select>
              </div>
              <Button type="submit" className="font-extrabold text-xs">AssembleTimed MCQ Deck</Button>
            </form>
          )}

          {/* TAB 3: PLACEMENTS PUBLISHER */}
          {activeTab === 'opportunity' && (
            <form onSubmit={handlePublishOpportunity} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input 
                  label="Opportunity Title Role"
                  placeholder="E.g. Associate Devops Engineer"
                  value={opportunityTitle}
                  onChange={(e) => setOpportunityTitle(e.target.value)}
                />
                <Input 
                  label="Company Name"
                  placeholder="E.g. Oracle Corp India"
                  value={opportunityCompany}
                  onChange={(e) => setOpportunityCompany(e.target.value)}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-400 mb-2 uppercase tracking-wider">Opportunity category</label>
                  <select 
                    value={opportunityType}
                    onChange={(e) => setOpportunityType(e.target.value)}
                    className="w-full bg-slate-950/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-primary/50 transition-colors"
                  >
                    <option value="placement">Full-time Placement</option>
                    <option value="internship">Summer Internship</option>
                    <option value="hackathon">Engineering Hackathon</option>
                    <option value="scholarship">Academic Scholarship</option>
                  </select>
                </div>
                <Input 
                  label="Direct Apply Registration URL"
                  placeholder="https://oracle.com/careers"
                  value={opportunityLink}
                  onChange={(e) => setOpportunityLink(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 mb-2 uppercase tracking-wider">Role description details</label>
                <textarea 
                  placeholder="Describe technical requirements, eligibility criteria, and stack details..."
                  value={opportunityDesc}
                  onChange={(e) => setOpportunityDesc(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-950/60 border border-white/15 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <Button type="submit" className="font-extrabold text-xs">Publish Career Opportunity</Button>
            </form>
          )}
        </Card>
      ) : (
        /* STUDENT CHART GROWTH ROW */
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div className="lg:col-span-2">
            <Card className="glass h-96 flex flex-col justify-between relative">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-secondary" />
              
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  XP Growth Progress
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
                      
                      <div className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <span className="text-[9px] text-slate-400 leading-normal">{badgeInfo.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-[10px] text-slate-500 font-mono text-center pt-2 border-t border-white/5">
              🚀 ACE TIMED MCQ DECKS TO UNLOCK GOLDEN ACADEMIC BADGES
            </div>
          </Card>
        </div>
      )}

      {/* TIMELINE ACTIVITY LOG */}
      <motion.div>
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
