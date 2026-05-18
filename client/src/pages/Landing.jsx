import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  BookOpen, 
  MessageSquare, 
  Zap, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Laptop
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function Landing() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  const features = [
    {
      icon: MessageSquare,
      title: "Dev Community Feed",
      desc: "Simulated after Discord. Discuss complex engineering labs, open-source work, and placement referrals with seniors.",
      glow: "blue"
    },
    {
      icon: BookOpen,
      title: "Interactive MCQ Arena",
      desc: "Practice DSA complexity checks and OS scheduling simulations with built-in speed timers and XP payouts.",
      glow: "purple"
    },
    {
      icon: Trophy,
      title: "Gamified Leaderboards",
      desc: "Compete with peers at Tier-3 colleges. Win status ranks, unlock badges, and highlight accomplishments to placement agents.",
      glow: "green"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col justify-between">
      {/* Background Neon Clusters */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-secondary/10 blur-[150px] pointer-events-none -z-10" />

      {/* PUBLIC NAVBAR */}
      <header className="sticky top-0 z-50 glass border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary animate-pulse" />
          <span className="text-2xl font-extrabold text-gradient">CAMPUSX</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
            Login
          </Link>
          <Link to="/login">
            <Button variant="primary" className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider">
              Launch App
            </Button>
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full text-primary shadow-glow-blue">
            <Zap className="h-4 w-4 fill-primary animate-bounce" />
            <span className="text-xs font-bold tracking-wider uppercase">Gamifying Engineering Labs</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none text-white">
            Unleash Your <br />
            <span className="text-gradient">Engineering Potential</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg text-slate-400 max-w-lg leading-relaxed">
            The next-generation, dark-cyberpunk glass ecosystem engineered for Tier-3 colleges in India. Crack coding concepts, climb rankings, and get industry-ready.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
            <Link to="/login">
              <Button variant="primary" className="px-8 py-3 rounded-xl gap-2 font-extrabold">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#features">
              <Button variant="secondary" className="px-8 py-3 rounded-xl">
                Explore Features
              </Button>
            </a>
          </motion.div>
        </motion.div>

        {/* Futuristic Dashboard Graphic Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative hidden md:block"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-3xl opacity-20 pointer-events-none" />
          <div className="glass border border-white/10 rounded-2xl p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-xs text-slate-500 font-mono">campusx_kernel_v1.0</span>
            </div>
            
            {/* Visual preview list block */}
            <div className="space-y-4">
              <div className="h-10 w-full rounded-xl bg-white/5 animate-pulse" />
              <div className="grid grid-cols-3 gap-3">
                <div className="h-20 rounded-xl bg-primary/10 border border-primary/20 flex flex-col justify-center items-center gap-1">
                  <Zap className="h-5 w-5 text-primary fill-primary" />
                  <span className="text-xs font-mono font-bold text-slate-300">2,450 XP</span>
                </div>
                <div className="h-20 rounded-xl bg-secondary/10 border border-secondary/20 flex flex-col justify-center items-center gap-1">
                  <Trophy className="h-5 w-5 text-secondary fill-secondary" />
                  <span className="text-xs font-mono font-bold text-slate-300">Rank #3</span>
                </div>
                <div className="h-20 rounded-xl bg-accent/10 border border-accent/20 flex flex-col justify-center items-center gap-1">
                  <Sparkles className="h-5 w-5 text-accent animate-pulse" />
                  <span className="text-xs font-mono font-bold text-slate-300">7 Badges</span>
                </div>
              </div>
              <div className="h-28 w-full rounded-xl bg-white/5 flex flex-col justify-center items-center border border-white/5 p-4 text-center">
                <Laptop className="h-6 w-6 text-slate-400 mb-2" />
                <p className="text-xs font-semibold text-slate-400">Simulation Kernel Connected</p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* FEATURES ANCHOR GRID */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20 w-full border-t border-white/5 bg-slate-950/20">
        <div className="text-center max-w-lg mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Engineered for Competitive Learning</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            CAMPUSX bundles multiple features into a single, cohesive developer workspace.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Card key={i} glow={feature.glow} className="flex flex-col gap-4 text-left group">
                <div className={`p-3 rounded-xl bg-white/5 border border-white/5 w-fit group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 text-center border-t border-white/5 text-xs text-slate-500 font-mono">
        © {new Date().getFullYear()} CAMPUSX Platform. Built with absolute premium front-end mechanics.
      </footer>
    </div>
  );
}
