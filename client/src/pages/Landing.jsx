import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  BookOpen, 
  MessageSquare, 
  Zap, 
  ArrowRight, 
  Sparkles, 
  Heart,
  ChevronDown,
  Award,
  ShieldCheck,
  UserCheck,
  TrendingUp,
  Cpu,
  Bookmark
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function Landing() {
  // INTERACTIVE FEATURE TAB
  const [activeDemo, setActiveDemo] = useState('arena');

  // FAQ COLLAPSIBLE STATE
  const [openFAQ, setOpenFAQ] = useState(null);

  // MOCK WIDGET STATE: MCQ Arena Quiz
  const [selectedMCQ, setSelectedMCQ] = useState(null);
  const [quizStatus, setQuizStatus] = useState('idle'); // 'idle' | 'success' | 'failed'

  // MOCK WIDGET STATE: Community Feed likes
  const [feedLikes, setFeedLikes] = useState(42);
  const [hasLiked, setHasLiked] = useState(false);

  // MOCK WIDGET STATE: Placements apply
  const [appliedEmail, setAppliedEmail] = useState('');
  const [applySuccess, setApplySuccess] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90 } }
  };

  const faqs = [
    {
      q: "What is the core purpose of CAMPUSX?",
      a: "CAMPUSX acts as a gamified digital ecosystem designed for engineering colleges. It bridges the gap between students and educators by combining timed MCQ practice, direct socket-based messaging, verified leaderboard rankings, and a centralized portal for placements and internships."
    },
    {
      q: "How does the gamified XP and Badge system work?",
      a: "As students participate in daily decryption MCQs, they crack core computer engineering concepts (DSA, Operating Systems, Networks) and earn XP. Solving decks with perfect accuracy unlocks premium achievements (like 'Alpha Coder' or 'Quiz Master') that form a verified academic portfolio."
    },
    {
      q: "Can educators host custom MCQs and Placements?",
      a: "Yes! Educators log in with special teacher keys to unlock the Administrative Terminal. From there, they can publish real-time notices, compose custom MCQ quizzes with custom XP values, and listing verified job portals."
    },
    {
      q: "Is the platform offline sandbox-friendly?",
      a: "Absolutely. CAMPUSX features dual-telemetry layers. If the backend database node is offline, the interface seamlessly switches to local sandboxed memory so students can practice and experience all core modules without network disruptions."
    }
  ];

  const handleLike = () => {
    if (!hasLiked) {
      setFeedLikes(prev => prev + 1);
      setHasLiked(true);
    } else {
      setFeedLikes(prev => prev - 1);
      setHasLiked(false);
    }
  };

  const handleMockApply = (e) => {
    e.preventDefault();
    if (appliedEmail.trim()) {
      setApplySuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background text-slate-800 dark:text-slate-100 relative overflow-hidden flex flex-col justify-between transition-all duration-300">
      {/* Background Soft tech clusters */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 dark:bg-primary/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-slate-200/50 dark:bg-secondary/5 blur-[150px] pointer-events-none -z-10" />

      {/* PUBLIC NAVBAR */}
      <header className="sticky top-0 z-50 glass border-b border-slate-200 dark:border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-2xl font-extrabold text-gradient">CAMPUSX</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
            Login
          </Link>
          <Link to="/login">
            <Button variant="primary" className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm">
              Launch App
            </Button>
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid md:grid-cols-2 gap-12 items-center relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 text-left"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full text-primary">
            <Zap className="h-4 w-4 fill-primary" />
            <span className="text-xs font-bold tracking-wider uppercase">Gamifying Engineering Labs</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none text-slate-900 dark:text-white">
            Unleash Your <br />
            <span className="text-gradient">Engineering Potential</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
            The next-generation digital ecosystem engineered for Tier-3 colleges in India. Crack coding concepts, climb rankings, share community updates, and discover placement opportunities with a simple, classy tech workspace.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
            <Link to="/login">
              <Button variant="primary" className="px-8 py-3 rounded-xl gap-2 font-extrabold shadow-md">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#playground">
              <Button variant="secondary" className="px-8 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                Try Interactive Demo
              </Button>
            </a>
          </motion.div>
        </motion.div>

        {/* Custom High-Fidelity Vector Graphic Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative hidden md:block"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500 rounded-2xl blur-3xl opacity-10 dark:opacity-20 pointer-events-none" />
          <div className="glass border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-2xl relative overflow-hidden">
            {/* Soft decorative header dots */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/5 mb-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">campusx_telemetry_vector</span>
            </div>

            {/* Generated High-Fidelity Tech Graphic Image */}
            <img 
              src="./assets/hero_illustration.png" 
              alt="Futuristic CampusX Telemetry Showcase" 
              className="w-full h-auto rounded-xl border border-slate-200 dark:border-slate-800 object-cover max-h-[360px] bg-slate-950/20"
            />
          </div>
        </motion.div>
      </main>

      {/* TELEMETRY IMPACT STATS GRID */}
      <section className="max-w-7xl mx-auto px-6 py-8 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-center rounded-2xl shadow-sm">
            <h3 className="text-3xl font-extrabold text-primary">4,800+</h3>
            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mt-1">Students Registered</p>
          </Card>
          
          <Card className="p-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-center rounded-2xl shadow-sm">
            <h3 className="text-3xl font-extrabold text-emerald-500">142k+</h3>
            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mt-1">Quizzes Decrypted</p>
          </Card>

          <Card className="p-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-center rounded-2xl shadow-sm">
            <h3 className="text-3xl font-extrabold text-indigo-500">94.2%</h3>
            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mt-1">Placement Response</p>
          </Card>

          <Card className="p-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-center rounded-2xl shadow-sm">
            <h3 className="text-3xl font-extrabold text-amber-500">1.2M+</h3>
            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mt-1">XP Points Awarded</p>
          </Card>
        </div>
      </section>

      {/* NEW SECTION: INTERACTIVE WIDGET PLAYGROUND */}
      <section id="playground" className="max-w-7xl mx-auto px-6 py-16 w-full border-t border-slate-200 dark:border-white/5">
        <div className="text-center max-w-lg mx-auto mb-10 space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Interactive Feature Sandbox</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Click the tabs below to test and experience the real-time systems integrated inside CAMPUSX:
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* TAB BUTTONS (LEFT SIDE) */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 shrink-0">
            <button
              onClick={() => setActiveDemo('arena')}
              className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all shrink-0 w-full ${
                activeDemo === 'arena'
                  ? 'border-primary bg-primary/10 text-primary dark:text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 text-slate-600 dark:text-slate-450'
              }`}
            >
              <BookOpen className="h-5 w-5 shrink-0" />
              <div>
                <span className="block font-bold text-xs">Timed MCQ Decrypter</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Solve daily Technical MCQ concepts</span>
              </div>
            </button>

            <button
              onClick={() => setActiveDemo('podium')}
              className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all shrink-0 w-full ${
                activeDemo === 'podium'
                  ? 'border-primary bg-primary/10 text-primary dark:text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 text-slate-600 dark:text-slate-450'
              }`}
            >
              <Trophy className="h-5 w-5 shrink-0" />
              <div>
                <span className="block font-bold text-xs">Academic Leaderboard</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Track XP and verify college ranks</span>
              </div>
            </button>

            <button
              onClick={() => setActiveDemo('feed')}
              className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all shrink-0 w-full ${
                activeDemo === 'feed'
                  ? 'border-primary bg-primary/10 text-primary dark:text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 text-slate-600 dark:text-slate-450'
              }`}
            >
              <MessageSquare className="h-5 w-5 shrink-0" />
              <div>
                <span className="block font-bold text-xs">Community Dev Feed</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Simulate peer news and updates</span>
              </div>
            </button>

            <button
              onClick={() => setActiveDemo('placement')}
              className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all shrink-0 w-full ${
                activeDemo === 'placement'
                  ? 'border-primary bg-primary/10 text-primary dark:text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 text-slate-600 dark:text-slate-450'
              }`}
            >
              <Award className="h-5 w-5 shrink-0" />
              <div>
                <span className="block font-bold text-xs">Placements Registry</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Browse placements & scholarships</span>
              </div>
            </button>
          </div>

          {/* INTERACTIVE DEMO CONTAINER (RIGHT SIDE) */}
          <div className="lg:col-span-8 w-full min-h-[320px]">
            <AnimatePresence mode="wait">
              {activeDemo === 'arena' && (
                <motion.div
                  key="arena"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4"
                >
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-white/5">
                    <span className="text-xs font-mono font-bold text-slate-500 flex items-center gap-1.5">
                      <Cpu className="h-4 w-4 text-primary" /> TOPIC: SYSTEM CONCURRENCY
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">+300 XP AVAILABLE</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                    Which of the following guarantees describes a lock-free data structure concurrency guarantee?
                  </h3>

                  <div className="space-y-2">
                    <button
                      onClick={() => { setSelectedMCQ(0); setQuizStatus('success'); }}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold flex justify-between items-center transition-all ${
                        selectedMCQ === 0
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                          : 'border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-950/20 hover:border-slate-350 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <span>A. At least one thread is guaranteed to make progress globally.</span>
                      {selectedMCQ === 0 && <span className="text-[10px] font-mono font-bold text-emerald-600">CORRECT!</span>}
                    </button>

                    <button
                      onClick={() => { setSelectedMCQ(1); setQuizStatus('failed'); }}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold flex justify-between items-center transition-all ${
                        selectedMCQ === 1
                          ? 'border-red-500 bg-red-500/10 text-red-700 dark:text-red-300'
                          : 'border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-950/20 hover:border-slate-350 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <span>B. All participating threads are guaranteed to make progress.</span>
                      {selectedMCQ === 1 && <span className="text-[10px] font-mono font-bold text-red-500">INCORRECT</span>}
                    </button>

                    <button
                      onClick={() => { setSelectedMCQ(2); setQuizStatus('failed'); }}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold flex justify-between items-center transition-all ${
                        selectedMCQ === 2
                          ? 'border-red-500 bg-red-500/10 text-red-700 dark:text-red-300'
                          : 'border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-950/20 hover:border-slate-350 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <span>C. No thread is blocked by another thread's lock operations.</span>
                      {selectedMCQ === 2 && <span className="text-[10px] font-mono font-bold text-red-500">INCORRECT</span>}
                    </button>
                  </div>

                  {quizStatus === 'success' && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-emerald-500" />
                      Handshake complete: Core decryption cracked! +300 XP queued for sync!
                    </div>
                  )}

                  {quizStatus === 'failed' && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-[11px] text-red-700 dark:text-red-300 font-semibold flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-red-500" />
                      Telemetry warning: Decryption key mismatch. Try choice A!
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-[9px] text-slate-400 font-mono">SIMULATION KERNEL V1</span>
                    <button
                      onClick={() => { setSelectedMCQ(null); setQuizStatus('idle'); }}
                      className="text-[10px] font-mono text-slate-450 hover:text-primary transition-colors uppercase font-bold"
                    >
                      Reset State
                    </button>
                  </div>
                </motion.div>
              )}

              {activeDemo === 'podium' && (
                <motion.div
                  key="podium"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-6"
                >
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-white/5">
                    <span className="text-xs font-mono font-bold text-slate-500 flex items-center gap-1.5">
                      <Trophy className="h-4 w-4 text-primary" /> SYSTEM PODIUM
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Weekly Standings</span>
                  </div>

                  {/* Podium Renders */}
                  <div className="grid grid-cols-3 gap-3 items-end pt-4 min-h-[140px]">
                    <div className="text-center space-y-2">
                      <span className="text-[10px] font-bold text-slate-500 block truncate">Kunal M.</span>
                      <div className="h-16 bg-slate-200 dark:bg-slate-800/80 rounded-t-xl border-t border-x border-slate-350 dark:border-slate-700 flex flex-col items-center justify-center font-mono">
                        <span className="text-slate-600 dark:text-slate-400 font-bold">#2</span>
                        <span className="text-[8px] text-slate-400">2,850 XP</span>
                      </div>
                    </div>

                    <div className="text-center space-y-2">
                      <CrownIcon className="h-5 w-5 text-amber-500 mx-auto fill-amber-500 animate-pulse" />
                      <span className="text-xs font-extrabold text-slate-800 dark:text-white block truncate">Sneha S.</span>
                      <div className="h-24 bg-blue-500/10 dark:bg-blue-500/20 rounded-t-xl border-t border-x border-primary/30 flex flex-col items-center justify-center font-mono relative overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-1 bg-primary" />
                        <span className="text-primary dark:text-blue-400 font-extrabold text-lg">#1</span>
                        <span className="text-[8px] text-primary/70 dark:text-blue-400/80 font-bold">3,450 XP</span>
                      </div>
                    </div>

                    <div className="text-center space-y-2">
                      <span className="text-[10px] font-bold text-slate-500 block truncate">Rahul V.</span>
                      <div className="h-12 bg-slate-200 dark:bg-slate-800/80 rounded-t-xl border-t border-x border-slate-350 dark:border-slate-700 flex flex-col items-center justify-center font-mono">
                        <span className="text-slate-600 dark:text-slate-400 font-bold">#3</span>
                        <span className="text-[8px] text-slate-400">2,200 XP</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center py-2 bg-slate-50 dark:bg-slate-950/20 border border-slate-200 dark:border-white/5 rounded-xl">
                    <span className="text-[10px] text-slate-500 font-semibold">Hover over students inside the dashboard to view unlocked Badges!</span>
                  </div>
                </motion.div>
              )}

              {activeDemo === 'feed' && (
                <motion.div
                  key="feed"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4"
                >
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-white/5">
                    <span className="text-xs font-mono font-bold text-slate-500 flex items-center gap-1.5">
                      <MessageSquare className="h-4 w-4 text-primary" /> DEV CONSOLE ANNOUNCEMENT
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">2h ago</span>
                  </div>

                  <div className="flex gap-3">
                    <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
                      KM
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Kunal Mahajan <span className="text-[9px] bg-primary/10 text-primary px-1 rounded ml-1 font-mono uppercase tracking-wider font-bold">STUDENT</span></h4>
                      <p className="text-[10px] text-slate-400 font-mono">Branch: Information Technology</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-350 leading-relaxed font-semibold">
                    "Finally verified the light/dark responsive theme changes live on GitHub pages! Everything synchronizes beautifully using relative base paths. Let me know if you see any layout anomalies on mobile!"
                  </p>

                  <div className="flex items-center gap-4 pt-2 border-t border-slate-200 dark:border-white/5">
                    <button
                      onClick={handleLike}
                      className={`flex items-center gap-1.5 text-xs font-bold transition-all px-3 py-1.5 rounded-full ${
                        hasLiked
                          ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                          : 'bg-slate-100 dark:bg-white/5 text-slate-500 border border-slate-200 dark:border-white/5 hover:text-slate-800 dark:hover:text-white'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${hasLiked ? 'fill-red-500' : ''}`} />
                      <span>{feedLikes} Likes</span>
                    </button>
                    
                    <span className="text-[10px] text-slate-400 font-mono">🚀 Click the heart icon to simulate telemetry reaction!</span>
                  </div>
                </motion.div>
              )}

              {activeDemo === 'placement' && (
                <motion.div
                  key="placement"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4"
                >
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-white/5">
                    <span className="text-xs font-mono font-bold text-slate-500 flex items-center gap-1.5">
                      <Award className="h-4 w-4 text-primary" /> OPPORTUNITY ASSIGNMENT
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">VERIFIED PLACEMENT</span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Associate Software Developer</h3>
                    <p className="text-xs text-primary font-bold">Oracle Cloud Infrastructure (OCI) India</p>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Qualifications: Undergrad IT/CSE, basic command of Unix commands, shell script structures, and data structure arrays. XP threshold target: 2,500+ XP.
                  </p>

                  {applySuccess ? (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-emerald-500" />
                      Application simulation successful! Telemetry package delivered to recruiter node.
                    </div>
                  ) : (
                    <form onSubmit={handleMockApply} className="flex gap-2">
                      <input
                        type="email"
                        required
                        placeholder="your_node@college.edu"
                        value={appliedEmail}
                        onChange={(e) => setAppliedEmail(e.target.value)}
                        className="flex-1 bg-slate-50 dark:bg-slate-950/60 border border-slate-250 dark:border-white/10 rounded-xl px-4 py-2 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary/50"
                      />
                      <Button type="submit" variant="primary" className="py-2 px-4 text-xs font-bold shrink-0">
                        Apply Now
                      </Button>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* NEW SECTION: "HOW IT WORKS" 4-STEP PIPELINE MAP */}
      <section className="max-w-7xl mx-auto px-6 py-16 w-full border-t border-slate-200 dark:border-white/5 bg-slate-100/10 dark:bg-slate-950/10">
        <div className="text-center max-w-lg mx-auto mb-16 space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">How CampusX Works</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Discover the streamlined, gamified workflow cycle that matches student accomplishments directly to hiring platforms:
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <div className="space-y-4 text-left relative group">
            <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center font-extrabold text-lg text-primary">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <UserCheck className="h-4.5 w-4.5 text-primary" /> Register Profile
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Setup your technical node profile. Sign up as a Student or log in as an Educator using institutional credentials.
            </p>
          </div>

          {/* Step 2 */}
          <div className="space-y-4 text-left relative group">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-extrabold text-lg text-emerald-500">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <BookOpen className="h-4.5 w-4.5 text-emerald-500" /> Crack timed MCQs
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Unlock daily timed questionnaires on core subjects. Solve arrays, algorithm complexity, and scheduler assess blocks to accumulate score metrics.
            </p>
          </div>

          {/* Step 3 */}
          <div className="space-y-4 text-left relative group">
            <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-extrabold text-lg text-indigo-500">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <TrendingUp className="h-4.5 w-4.5 text-indigo-500" /> Climb Leaderboard
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Gain verified XP points and climb the active daily college standings. Complete perfect marks to unlock specialist profile badges.
            </p>
          </div>

          {/* Step 4 */}
          <div className="space-y-4 text-left relative group">
            <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-extrabold text-lg text-amber-500">
              4
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Award className="h-4.5 w-4.5 text-amber-500" /> Unlock Placement
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Apply to real placement and hackathon listings directly inside your console. Recruiter nodes match profiles using your verified XP badges.
            </p>
          </div>
        </div>
      </section>

      {/* CORE FEATURES ANCHOR GRID */}
      <section className="max-w-7xl mx-auto px-6 py-20 w-full border-t border-slate-200 dark:border-white/5">
        <div className="text-center max-w-lg mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Engineered for Competitive Learning</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            CAMPUSX bundles multiple features into a single, cohesive developer workspace.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="flex flex-col gap-4 text-left group border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-slate-900/40 p-6 rounded-2xl">
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 w-fit group-hover:scale-105 transition-transform duration-300">
              <MessageSquare className="h-6 w-6 text-slate-700 dark:text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">Dev Community Feed</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Simulated after dev feeds. Discuss complex engineering labs, open-source work, and placement referrals with seniors.
            </p>
          </Card>

          <Card className="flex flex-col gap-4 text-left group border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-slate-900/40 p-6 rounded-2xl">
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 w-fit group-hover:scale-105 transition-transform duration-300">
              <BookOpen className="h-6 w-6 text-slate-700 dark:text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">Interactive MCQ Arena</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Practice DSA complexity checks and OS scheduling simulations with built-in speed timers and XP payouts.
            </p>
          </Card>

          <Card className="flex flex-col gap-4 text-left group border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-slate-900/40 p-6 rounded-2xl">
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 w-fit group-hover:scale-105 transition-transform duration-300">
              <Trophy className="h-6 w-6 text-slate-700 dark:text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">Gamified Leaderboards</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Compete with peers at Tier-3 colleges. Win status ranks, unlock badges, and highlight accomplishments to placement agents.
            </p>
          </Card>
        </div>
      </section>

      {/* NEW SECTION: INTERACTIVE FAQ ACCORDIONS */}
      <section className="max-w-4xl mx-auto px-6 py-16 w-full border-t border-slate-200 dark:border-white/5">
        <div className="text-center max-w-lg mx-auto mb-12 space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Everything you need to know about the CampusX college connection telemetry platform:
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFAQ === index;
            return (
              <div 
                key={index}
                className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  onClick={() => setOpenFAQ(isOpen ? null : index)}
                  className="w-full flex justify-between items-center p-5 text-left font-bold text-sm text-slate-800 dark:text-white hover:text-primary transition-colors focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-slate-450 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="p-5 pt-0 border-t border-slate-100 dark:border-white/5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* NEW CTA SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-10 w-full">
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 md:p-12 text-center border border-slate-800 shadow-2xl flex flex-col items-center justify-center space-y-6">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-500/10 pointer-events-none" />
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Cpu className="h-64 w-64 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold max-w-xl leading-tight">
            Ready to Connect Your College Workspace?
          </h2>
          <p className="text-xs md:text-sm text-slate-350 max-w-lg leading-relaxed">
            Register your institutional profile, test daily timed MCQs, collaborate on development updates, and match with recruiters.
          </p>
          
          <Link to="/login" className="pt-2">
            <Button variant="primary" className="px-10 py-3.5 rounded-xl font-bold uppercase tracking-wider gap-2">
              Get Started Now <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 text-center border-t border-slate-200 dark:border-white/5 text-xs text-slate-500 font-mono">
        © {new Date().getFullYear()} CAMPUSX Platform. Engineered with absolute premium, classy technical mechanics.
      </footer>
    </div>
  );
}

// Minimal Crown icon replacement to prevent importing missing library packages
function CrownIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
      <path d="M5 20h14" />
    </svg>
  );
}
