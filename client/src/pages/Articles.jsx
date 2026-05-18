import React from 'react';
import { motion } from 'framer-motion';

const Articles = () => {
  const articles = [
    {
      id: 1,
      title: 'How to ace your first technical interview',
      author: 'Jane Doe',
      date: 'Oct 15, 2026',
      readTime: '5 min read',
      tags: ['Career', 'Interview'],
      snippet: 'Technical interviews can be daunting, but with the right preparation and mindset, you can showcase your skills effectively. Here is a step-by-step guide...'
    },
    {
      id: 2,
      title: 'Understanding React Server Components',
      author: 'John Smith',
      date: 'Oct 12, 2026',
      readTime: '8 min read',
      tags: ['Web Dev', 'React'],
      snippet: 'React Server Components are revolutionizing how we build web applications by combining the rich interactivity of client-side apps with the performance...'
    },
    {
      id: 3,
      title: 'The Future of AI in Education',
      author: 'Dr. Emily Chen',
      date: 'Oct 10, 2026',
      readTime: '12 min read',
      tags: ['AI', 'Education'],
      snippet: 'Artificial Intelligence is fundamentally changing the landscape of modern education. From personalized learning paths to automated grading systems...'
    }
  ];

  return (
    <div className="px-4 py-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
      >
        <div>
          <h1 className="text-4xl font-extrabold text-white mb-2">Knowledge Base</h1>
          <p className="text-slate-400 text-lg">Read articles, tutorials, and insights shared by peers and professors.</p>
        </div>
        <button className="btn-primary">Write Article</button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, idx) => (
          <motion.div 
            key={article.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card flex flex-col group cursor-pointer"
          >
            <div className="flex gap-2 mb-4">
              {article.tags.map(tag => (
                <span key={tag} className="px-2 py-1 rounded text-xs font-semibold bg-white/5 text-slate-300 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{article.title}</h2>
            <p className="text-slate-400 text-sm mb-6 flex-1 line-clamp-3">
              {article.snippet}
            </p>
            
            <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xs">
                  {article.author.charAt(0)}
                </div>
                <div>
                  <p className="text-xs text-white font-medium">{article.author}</p>
                  <p className="text-xs text-slate-500">{article.date}</p>
                </div>
              </div>
              <span className="text-xs text-slate-500">{article.readTime}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
