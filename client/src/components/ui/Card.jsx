import React from 'react';

export default function Card({ 
  children, 
  glow = 'none', 
  className = '', 
  onClick 
}) {
  const glowStyles = {
    none: 'hover:border-white/10',
    blue: 'border-glow-blue hover:border-primary/50',
    purple: 'border-glow-purple hover:border-secondary/50',
    green: 'border-glow-green hover:border-accent/50'
  };

  return (
    <div
      onClick={onClick}
      className={`glass-card ${glowStyles[glow]} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
