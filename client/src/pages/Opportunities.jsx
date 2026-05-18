import React from 'react';
import { motion } from 'framer-motion';

const Opportunities = () => {
  const opportunities = [
    { id: 1, title: 'Software Engineering Intern', company: 'Google', type: 'Internship', date: 'Closes in 5 days' },
    { id: 2, title: 'Frontend Developer', company: 'Microsoft', type: 'Placement', date: 'Closes in 2 weeks' },
    { id: 3, title: 'Global Hackathon 2026', company: 'MLH', type: 'Hackathon', date: 'Starts in 10 days' },
    { id: 4, title: 'Women in Tech Scholarship', company: 'TechFoundation', type: 'Scholarship', date: 'Closes in 1 month' }
  ];

  return (
    <div className="px-4 py-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-extrabold text-white mb-2">Opportunities Board</h1>
        <p className="text-slate-400 text-lg">Find internships, placements, hackathons, and scholarships to boost your career.</p>
      </motion.div>

      <div className="flex gap-4 mb-8 overflow-x-auto custom-scrollbar pb-2">
        <button className="px-4 py-2 rounded-xl bg-primary/20 text-primary border border-primary/30 whitespace-nowrap">All</button>
        <button className="px-4 py-2 rounded-xl glass hover:bg-white/5 whitespace-nowrap">Internships</button>
        <button className="px-4 py-2 rounded-xl glass hover:bg-white/5 whitespace-nowrap">Placements</button>
        <button className="px-4 py-2 rounded-xl glass hover:bg-white/5 whitespace-nowrap">Hackathons</button>
        <button className="px-4 py-2 rounded-xl glass hover:bg-white/5 whitespace-nowrap">Scholarships</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {opportunities.map((opp, idx) => (
          <motion.div 
            key={opp.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-bold text-white">{opp.title}</h2>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-secondary/20 text-secondary border border-secondary/30">
                  {opp.type}
                </span>
              </div>
              <p className="text-xl text-primary font-medium mb-4">{opp.company}</p>
              <p className="text-slate-400 mb-6 text-sm">
                Join our world-class team and work on cutting edge technologies. We are looking for passionate individuals ready to make an impact.
              </p>
            </div>
            
            <div className="flex justify-between items-center border-t border-white/10 pt-4">
              <span className="text-slate-500 text-sm">{opp.date}</span>
              <button className="btn-primary py-1.5 px-4 text-sm">Apply Now</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Opportunities;
