import React from 'react';

export default function Input({ 
  label, 
  type = 'text', 
  placeholder, 
  register, 
  error, 
  className = '' 
}) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className="w-full bg-slate-950/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300 shadow-inner"
      />
      {error && (
        <span className="text-xs font-semibold text-red-450 mt-1">
          {error.message || error}
        </span>
      )}
    </div>
  );
}
