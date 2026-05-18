import React from 'react';

export default function Loader({ size = 'medium' }) {
  const sizes = {
    small: 'h-6 w-6 border-2',
    medium: 'h-10 w-10 border-3',
    large: 'h-16 w-16 border-4'
  };

  return (
    <div className="flex justify-center items-center py-6">
      <div 
        className={`animate-spin rounded-full border-t-primary border-r-transparent border-b-secondary border-l-transparent shadow-glow-blue ${sizes[size]}`}
      />
    </div>
  );
}
