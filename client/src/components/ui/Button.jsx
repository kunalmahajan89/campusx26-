import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  type = 'button', 
  className = '', 
  disabled = false 
}) {
  const baseStyle = "relative px-6 py-2.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none select-none flex items-center justify-center gap-2 overflow-hidden group";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white shadow-glow-blue hover:shadow-glow-purple",
    secondary: "glass border border-white/10 text-slate-300 hover:text-white hover:bg-white/10",
    accent: "bg-accent text-slate-950 font-extrabold shadow-glow-green hover:brightness-110",
    danger: "bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white hover:shadow-glow-red"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {/* Laser overlay animation on hover */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      {children}
    </button>
  );
}
