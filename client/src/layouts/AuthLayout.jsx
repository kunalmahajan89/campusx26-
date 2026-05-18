import React from 'react';
import { Sparkles } from 'lucide-react';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12 relative overflow-hidden select-none">
      {/* Blurred decorative glowing grids */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/20 blur-[120px] pointer-events-none -z-10" />

      {/* Main branding */}
      <div className="flex items-center gap-2 mb-8 animate-fade-in">
        <Sparkles className="h-8 w-8 text-primary animate-pulse" />
        <h1 className="text-4xl font-extrabold tracking-tight text-gradient">CAMPUSX</h1>
      </div>

      {/* Glow Glass Container */}
      <div className="w-full max-w-md glass p-8 rounded-2xl border border-white/5 shadow-2xl relative">
        {/* Colorful accent line at the top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-t-2xl" />
        {children}
      </div>
    </div>
  );
}
