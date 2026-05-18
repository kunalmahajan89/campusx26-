import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useUiStore } from '../store/uiStore';
import { useThemeStore } from '../store/themeStore';
import { 
  Trophy, 
  BookOpen, 
  MessageSquare, 
  LayoutDashboard, 
  User, 
  LogOut, 
  Menu, 
  Flame, 
  Zap, 
  Sparkles,
  Sun,
  Moon,
  Github
} from 'lucide-react';

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuthStore();
  const { sidebarOpen, toggleSidebar } = useUiStore();
  const { theme, toggleTheme, initTheme } = useThemeStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Community Feed', path: '/feed', icon: MessageSquare },
    { name: 'Real-time Chat', path: '/chat', icon: Sparkles },
    { name: 'Quiz Arena', path: '/quiz', icon: BookOpen },
    { name: 'Leaderboard', path: '/leaderboard', icon: Trophy },
    { name: 'Profile', path: '/profile', icon: User }
  ];

  return (
    <div className="min-h-screen flex text-slate-800 dark:text-slate-100 font-sans transition-all duration-300">
      {/* SIDEBAR */}
      <aside 
        className={`glass border-r border-slate-200 dark:border-white/5 flex flex-col justify-between transition-all duration-300 z-30 fixed md:static h-screen
          ${sidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full md:w-20 md:translate-x-0'}
        `}
      >
        <div>
          {/* Logo Branding */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-white/5">
            {sidebarOpen ? (
              <span className="text-2xl font-extrabold text-gradient flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                CAMPUSX
              </span>
            ) : (
              <Sparkles className="h-6 w-6 text-primary mx-auto" />
            )}
            <button 
              onClick={toggleSidebar} 
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 px-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative
                    ${isActive 
                      ? 'bg-primary/10 text-primary border-l-2 border-primary' 
                      : 'text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                    }
                  `}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-slate-400 group-hover:text-slate-950 dark:group-hover:text-white'}`} />
                  {sidebarOpen && <span className="font-medium text-sm">{item.name}</span>}
                  
                  {/* Tooltip for collapsed sidebar */}
                  {!sidebarOpen && (
                    <div className="absolute left-full ml-4 px-2.5 py-1.5 rounded bg-white dark:bg-surface border border-slate-200 dark:border-white/10 text-xs text-slate-800 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-md">
                      {item.name}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-slate-200 dark:border-white/5 bg-slate-100/30 dark:bg-slate-950/20">
          {user ? (
            <div className="flex flex-col gap-3">
              {sidebarOpen && (
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center font-bold text-sm text-white shadow-md">
                    {user.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold truncate text-slate-800 dark:text-slate-100">{user.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate capitalize">{user.role}</p>
                  </div>
                </div>
              )}
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
              >
                <LogOut className="h-5 w-5" />
                {sidebarOpen && <span className="text-sm font-medium">Log Out</span>}
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white font-medium hover:opacity-90 transition-opacity"
            >
              Sign In
            </Link>
          )}
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* TOP HEADER */}
        <header className="h-16 border-b border-slate-200 dark:border-white/5 glass flex items-center justify-between px-6 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            {!sidebarOpen && (
              <button 
                onClick={toggleSidebar} 
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors md:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            )}
            <h2 className="text-lg font-bold tracking-tight text-slate-800 dark:text-white capitalize">
              {navItems.find(item => item.path === location.pathname)?.name || 'Portal'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Classy Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-all duration-200 shadow-sm"
              title={theme === 'dark' ? 'Activate Light Mode' : 'Activate Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-blue-500" />}
            </button>

            {/* Gamified Stat Indicators */}
            {user && (
              <div className="flex items-center gap-4">
                {/* XP status bar */}
                <div className="hidden sm:flex items-center gap-2.5 bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/5">
                  <Zap className="h-4 w-4 text-blue-500 fill-blue-500" />
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    {user.xp} <span className="text-slate-400 font-normal">XP</span>
                  </span>
                  {/* Visual progression track */}
                  <div className="w-16 h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${(user.xp % 1000) / 10}%` }}
                    />
                  </div>
                </div>

                {/* Streak Tracker */}
                <div className="flex items-center gap-1.5 bg-accent/10 border border-accent/20 px-3 py-1.5 rounded-full text-accent">
                  <Flame className="h-4 w-4 fill-accent" />
                  <span className="text-xs font-extrabold">{user.streak} DAY STREAK</span>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* PAGE CONTENT CONTAINER */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
