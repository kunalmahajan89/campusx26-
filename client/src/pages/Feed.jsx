import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { usePostStore } from '../store/postStore';
import { 
  Heart, 
  MessageSquare, 
  Send, 
  Image, 
  Share2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { toast } from 'sonner';

export default function Feed() {
  const { user } = useAuthStore();
  const { posts, addPost, likePost, addComment } = usePostStore();
  
  const [newPostText, setNewPostText] = useState('');
  const [commentInputs, setCommentInputs] = useState({});
  const [attachedImage, setAttachedImage] = useState(null);

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    addPost(newPostText, user);
    
    // XP reward for sharing/posting
    useAuthStore.getState().addXP(25); 

    setNewPostText('');
    setAttachedImage(null);
    toast.success("Post broadcasted to network! +25 XP ⚡");
  };

  const handleLike = (postId) => {
    likePost(postId, user.id);
  };

  const handleCommentSubmit = (e, postId) => {
    e.preventDefault();
    const commentText = commentInputs[postId];
    if (!commentText || !commentText.trim()) return;

    addComment(postId, commentText, user.name);
    
    // XP reward for engagement
    useAuthStore.getState().addXP(10);

    setCommentInputs({ ...commentInputs, [postId]: '' });
    toast.success("Comment linked to thread! +10 XP ⚡");
  };

  const simulateImageSelect = () => {
    setAttachedImage("https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60");
    toast.info("Mock attachment: Source file parsed successfully.");
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start select-none">
      
      {/* LEFT AREA: Feed & Post Composer */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* COMPOSER CARD */}
        <Card className="glass relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-secondary" />
          
          <form onSubmit={handleCreatePost} className="space-y-4">
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-sm text-white shadow-glow-blue shrink-0">
                {user?.avatar}
              </div>
              <div className="flex-1">
                <textarea
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  placeholder="Share a lab fix, portfolio review request, or referral lead..."
                  className="w-full bg-slate-950/30 border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary/50 min-h-[90px] resize-none transition-all duration-300"
                />
              </div>
            </div>

            {/* Attached Image Preview */}
            <AnimatePresence>
              {attachedImage && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative rounded-xl overflow-hidden border border-white/10"
                >
                  <img src={attachedImage} alt="Attachment" className="w-full h-44 object-cover" />
                  <button 
                    type="button"
                    onClick={() => setAttachedImage(null)}
                    className="absolute top-2 right-2 bg-slate-950/80 p-1.5 rounded-full text-slate-400 hover:text-white"
                  >
                    ×
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <button
                type="button"
                onClick={simulateImageSelect}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-slate-200 text-xs font-semibold transition-colors"
              >
                <Image className="h-4 w-4 text-primary" />
                Attach Code Graphic
              </button>
              
              <Button type="submit" variant="primary" className="py-2 px-5 text-xs tracking-wider uppercase font-bold">
                Broadcast Post
              </Button>
            </div>
          </form>
        </Card>

        {/* FEED POSTS RENDER LIST */}
        <div className="space-y-6">
          <AnimatePresence>
            {posts.map((post) => {
              const isLiked = post.likedBy?.includes(user?.id);
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <Card className="glass relative hover:border-white/10 transition-colors">
                    
                    {/* Header profile row */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center font-bold text-sm text-slate-300">
                          {post.userAvatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">{post.userName}</span>
                            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider
                              ${post.userRole === 'senior' 
                                ? 'bg-primary/20 text-primary border border-primary/20' 
                                : post.userRole === 'teacher'
                                ? 'bg-accent/20 text-accent border border-accent/20'
                                : 'bg-white/5 text-slate-400 border border-white/5'
                              }
                            `}>
                              {post.userRole}
                            </span>
                            {post.userCompany && (
                              <span className="text-[10px] text-slate-500 font-mono">@{post.userCompany}</span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">{post.timestamp}</span>
                        </div>
                      </div>

                      <button className="text-slate-500 hover:text-slate-300 transition-colors">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Post Content */}
                    <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap mb-5">{post.content}</p>

                    {/* Quick Stats & Actions */}
                    <div className="flex items-center gap-6 py-2.5 border-y border-white/5 mb-4 text-xs font-mono text-slate-400">
                      <button 
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-2 transition-colors
                          ${isLiked ? 'text-red-450 font-bold' : 'hover:text-red-400'}
                        `}
                      >
                        <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                        <span>{post.likes} LIKES</span>
                      </button>
                      
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.comments.length} COMMENTS</span>
                      </div>
                    </div>

                    {/* Comment list container */}
                    {post.comments.length > 0 && (
                      <div className="space-y-3 pl-4 border-l border-white/5 mb-4 max-h-[220px] overflow-y-auto pr-1">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="text-xs bg-white/2 rounded-xl p-2.5 border border-white/2 space-y-1">
                            <div className="flex justify-between items-center font-bold text-slate-300">
                              <span>{comment.userName}</span>
                              <span className="text-[9px] text-slate-500 font-mono">{comment.timestamp}</span>
                            </div>
                            <p className="text-slate-400 leading-relaxed">{comment.content}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Write comment input block */}
                    <form 
                      onSubmit={(e) => handleCommentSubmit(e, post.id)}
                      className="flex gap-2"
                    >
                      <input
                        type="text"
                        value={commentInputs[post.id] || ''}
                        onChange={(e) => setCommentInputs({
                          ...commentInputs,
                          [post.id]: e.target.value
                        })}
                        placeholder="Write a comment..."
                        className="flex-1 bg-slate-950/40 border border-white/5 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-colors"
                      />
                      <button 
                        type="submit"
                        className="p-2 bg-white/5 border border-white/5 rounded-xl hover:bg-primary/20 hover:text-primary transition-all shrink-0"
                      >
                        <Send className="h-3.5 w-3.5" />
                      </button>
                    </form>

                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* MOCK INFINITE SCROLL */}
        <div className="pt-4 text-center">
          <Button 
            variant="secondary" 
            onClick={() => toast.info("Archive sync: all post logs fully fetched.")}
            className="w-full py-3"
          >
            Load Archival Threads
          </Button>
        </div>

      </div>

      {/* RIGHT AREA: Networking Guild Rules / Mentorship */}
      <div className="space-y-6">
        <Card className="glass relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent" />
          <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-accent animate-pulse" />
            Social Engagement Rules
          </h3>
          <ul className="text-xs text-slate-400 space-y-3 leading-relaxed">
            <li>🗣️ <strong className="text-slate-200">Share Lab Queries</strong>: Stuck on memory deadlock prevention? Publish snippets to get solutions.</li>
            <li>💼 <strong className="text-slate-200">Referrals & Reviews</strong>: Seniors review resume portfolios. Engage constructively!</li>
            <li>⚡ <strong className="text-slate-200">Earn XP Rewards</strong>: Get +25 XP per thread post, +10 XP per response comment.</li>
          </ul>
        </Card>

        <Card className="glass relative overflow-hidden p-6 text-center space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Simulated Networking Node</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            The frontend connects to simulated client modules. Zero external server loads. Fully optimized.
          </p>
          <div className="flex justify-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-accent animate-ping" />
            <span className="text-[10px] font-mono text-accent">NODE LIVE (100% PERSISTENT)</span>
          </div>
        </Card>
      </div>

    </div>
  );
}
