import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gradient">
          {isLogin ? 'Welcome Back' : 'Join College Connect'}
        </h2>
        <form className="flex flex-col gap-4">
          {!isLogin && (
            <input 
              type="text" 
              placeholder="Full Name" 
              className="px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-primary"
            />
          )}
          <input 
            type="email" 
            placeholder="Email Address" 
            className="px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-primary"
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-primary"
          />
          <button type="button" className="btn-primary mt-2">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-6 text-center text-slate-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:underline font-medium"
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
